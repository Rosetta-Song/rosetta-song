import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

app = Flask(__name__)

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


@app.route("/search_spotify", methods=["GET"])
def search_spotify():
    query = request.args.get("query")
    search_type = request.args.get("type", "track")  # Default to searching for tracks

    if not query:
        return jsonify({"error": "query parameter is required"}), 400

    access_token = get_spotify_access_token()
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    search_url = "https://api.spotify.com/v1/search"
    params = {
        "q": query,
        "type": search_type,
        "limit": 10
    }

    response = requests.get(search_url, headers=headers, params=params)

    if response.status_code != 200:
        return jsonify({"error": f"Spotify API error: {response.json()}"}), response.status_code

    return jsonify(response.json())


@app.route("/simple_search", methods=["GET"])
def simple_search():
    query = request.args.get("query")
    if not query:
        return jsonify({"error": "query parameter is required"}), 400

    access_token = get_spotify_access_token()
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    search_url = "https://api.spotify.com/v1/search"
    params = {
        "q": query,
        "type": "track",
        "limit": 20
    }

    response = requests.get(search_url, headers=headers, params=params)

    if response.status_code != 200:
        return jsonify({"error": f"Spotify API error: {response.json()}"}), response.status_code

    data = response.json()
    tracks = []

    for item in data.get("tracks", {}).get("items", []):
        tracks.append({
            "id": item.get("id"),
            "name": item.get("name"),
            "album": item.get("album", {}).get("name"),
            "avatar": item.get("album", {}).get("images", [{}])[0].get("url"),
            "artist": ", ".join(artist.get("name") for artist in item.get("artists", [])),
           
        })

    return jsonify(tracks)


@app.route("/getSimpleTrack", methods=["GET"])
def get_simple_track():
    track_id = request.args.get("id")
    if not track_id:
        return jsonify({"error": "id parameter is required"}), 400

    access_token = get_spotify_access_token()
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    track_url = f"https://api.spotify.com/v1/tracks/{track_id}"
    response = requests.get(track_url, headers=headers)

    if response.status_code != 200:
        return jsonify({"error": f"Spotify API error: {response.json()}"}), response.status_code

    data = response.json()
    simplified_track = {
        "id": data.get("id"),
        "name": data.get("name"),
        "album": data.get("album", {}).get("name"),
        "artist": ", ".join(artist.get("name") for artist in data.get("artists", [])),
        "avatar": data.get("album", {}).get("images", [{}])[0].get("url"),
    }

    return jsonify(simplified_track)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8084)