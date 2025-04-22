import requests
import urllib.parse
from flask import Flask, jsonify, render_template, request, send_file
from spotify1 import (
	get_album,
	get_all_trackids,
	get_track,
	get_play,
	check_regex,
	query_spotify,
	format_duration,
)

app = Flask(__name__)

@app.route("/spotify", methods=["POST"])
def download():
	if not request.form:
		return "No arguments provided"
	url_type, id = check_regex(request.form.get("url"))
	if url_type == "album":
		return render_template("spotify.html", data=get_album(id), types="album")
	elif url_type == "track":
		return render_template("spotify.html", data=get_track(id), types="track")
	elif url_type == "playlist":
		return render_template("spotify.html", data=get_play(id), types="playlist")
	else:
		return (
			render_template(
				"index.html", error="Invalid URL...Please check the URL and try again"
			),
			400,
		)


@app.route("/api/search")
def api():
	q = request.args.get("q")
	return query_spotify(q) if q else "No arguments provided"


@app.get("/api/getalltracks")
def get_all_tracks():
	album_id = request.args.get("id")
	album = bool(request.args.get("album"))
	if album_id:
		return jsonify(get_all_trackids(album_id, album))
	else:
		return "No arguments provided", 400

@app.get("/api/tracks/<string:track_id>")
def track_details(track_id: str):
	if track_id:
		try:
			print(f"Received track_id: {track_id}")  # Debugging line
			track_data = get_track(track_id)
			print(f"Track data: {track_data}")  # Debugging line
			return jsonify(track_data)
		except Exception as e:
			print(f"Error fetching track details: {e}")  # Debugging line
			return "Invalid Track ID", 400
	else:
		return "No arguments provided", 400

@app.route('/get_lyrics', methods=['GET'])
def get_lyrics():
	# Sample call: http://127.0.0.1:5000/get_lyrics?id=5xTtaWoae3wi06K5WfVUUH
	track_id = request.args.get('id')
	if not track_id:
		return jsonify({"error": "Id is required"}), 400

	# Fetch track metadata
	api_url = f"http://127.0.0.1:5000/api/tracks/{track_id}"
	try:
		response = requests.get(api_url)
		if response.status_code != 200:
			return jsonify({"error": "Failed to fetch track metadata"}), response.status_code

		track_data = response.json()
		track_name = track_data.get("track_name")
		track_artist = track_data.get("track_artist")
		# Add print statements for debugging
		print("Track Name:", track_name)
		print("Track Artist:", track_artist)

		# Fetch lyrics from a lyrics API
		# URL-encode track_artist and track_name
		encoded_artist = urllib.parse.quote(track_artist)
		encoded_name = urllib.parse.quote(track_name)

		# Construct the API URL
		lyrics_api_url = f"https://rosetta-song-6885aa3a6f3e.herokuapp.com/?trackid={track_id}&format=lrc"
		print("Constructed Lyrics API URL:", lyrics_api_url)  # Debugging line
		lyrics_response = requests.get(lyrics_api_url)
		print("Lyrics API Response Status Code:", lyrics_response.status_code)  # Debugging line
		print("Lyrics API Response Content:", lyrics_response.text)  # Debugging line
		if lyrics_response.status_code != 200:
			return jsonify({"error": "Lyrics not found"}), 404

		lyrics_data = lyrics_response.json()
		lyrics = lyrics_data.get("lyrics", "No lyrics available")

		return jsonify({"track_name": track_name, "lyrics": lyrics, "lyrics_data": lyrics_data})

	except requests.exceptions.RequestException as e:
		return jsonify({"error": "Failed to connect to the API", "details": str(e)}), 500

app.add_template_filter(format_duration)
if __name__ == "__main__":
	app.run(debug=True, host="0.0.0.0", port=5000)
