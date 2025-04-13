import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from bs4 import BeautifulSoup


load_dotenv()  # Load environment variables from .env

app = Flask(__name__)

app.config["GENIUS_API_TOKEN"] = os.getenv("GENIUS_API_TOKEN")
app.config["SPOTIFY_CLIENT_ID"] = os.getenv("SPOTIFY_CLIENT_ID")
app.config["SPOTIFY_CLIENT_SECRET"] = os.getenv("SPOTIFY_CLIENT_SECRET")

def get_spotify_access_token():
	client_id = app.config.get("SPOTIFY_CLIENT_ID")
	client_secret = app.config.get("SPOTIFY_CLIENT_SECRET")

	if not client_id or not client_secret:
		raise ValueError("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in configuration")

	auth_url = "https://accounts.spotify.com/api/token"
	auth_response = requests.post(auth_url, {
		'grant_type': 'client_credentials',
		'client_id': client_id,
		'client_secret': client_secret
	})

	if auth_response.status_code != 200:
		raise ValueError(f"Failed to get access token: {auth_response.json()}")

	return auth_response.json().get("access_token")


def get_lyrics_from_genius(song_name, artist_name):
	if not app.config.get("GENIUS_API_TOKEN"):
		raise ValueError("Missing GENIUS_API_TOKEN in environment variables")

	headers = {"Authorization": f"Bearer {app.config.get('GENIUS_API_TOKEN')}"}
	search_url = "https://api.genius.com/search"
	params = {"q": f"{song_name} {artist_name}"}

	response = requests.get(search_url, headers=headers, params=params)
	if response.status_code != 200:
		return None

	data = response.json()
	hits = data.get("response", {}).get("hits", [])
	if not hits:
		return None

	# Get the URL of the first matching song
	song_url = hits[0].get("result", {}).get("url")
	return song_url


@app.route("/get_lyrics", methods=["GET"])
def get_lyrics():
	track_id = request.args.get("id")
	if not track_id:
		return jsonify({"error": "id parameter is required"}), 400

	access_token = get_spotify_access_token()
	headers = {"Authorization": f"Bearer {access_token}"}

	# Get track details from Spotify
	track_url = f"https://api.spotify.com/v1/tracks/{track_id}"
	response = requests.get(track_url, headers=headers)
	if response.status_code != 200:
		return jsonify({"error": f"Spotify API error: {response.json()}"}), response.status_code

	track_data = response.json()
	song_name = track_data.get("name")
	artist_name = ", ".join(artist.get("name") for artist in track_data.get("artists", []))

	# Fetch lyrics using Genius API
	lyrics_url = get_lyrics_from_genius(song_name, artist_name)
	if not lyrics_url:
		return jsonify({"error": "Lyrics not found"}), 404

	# Return the lyrics URL
	return jsonify({"song_name": song_name, "artist_name": artist_name, "lyrics_url": lyrics_url})


if __name__ == "__main__":
	app.run(host="127.0.0.1", port=5174)