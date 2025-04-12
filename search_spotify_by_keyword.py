import os
import requests
from flask import Flask, request, jsonify, redirect
from dotenv import load_dotenv
import base64

# Load environment variables
load_dotenv()

# Spotify API credentials
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

# Spotify API endpoints
AUTH_URL = "https://accounts.spotify.com/authorize"
TOKEN_URL = "https://accounts.spotify.com/api/token"
SEARCH_URL = "https://api.spotify.com/v1/search"

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Spotify API Integration. Please visit /login to authenticate.", 200

# Route to initiate Spotify authorization
@app.route("/login", methods=["GET"])
def login():
    scope = "user-read-private user-read-email"
    auth_url = (
        f"{AUTH_URL}?response_type=code&client_id={SPOTIFY_CLIENT_ID}"
        f"&redirect_uri={SPOTIFY_REDIRECT_URI}&scope={scope}"
    )
    return redirect(auth_url)

# Route to handle Spotify callback
@app.route("/callback", methods=["GET"])
def callback():
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "Authorization code not provided"}), 400

    # Exchange authorization code for access token
    auth_header = base64.b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()).decode()
    headers = {"Authorization": f"Basic {auth_header}"}
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": SPOTIFY_REDIRECT_URI,
    }

    response = requests.post(TOKEN_URL, headers=headers, data=data)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch access token"}), response.status_code

    tokens = response.json()
    access_token = tokens.get("access_token")

    # Redirect to the search route with the access token and a default keyword
    return redirect(f"/search?access_token={access_token}&keyword=Imagine")

# Route to search for tracks by keyword
@app.route("/search", methods=["GET"])
def search_tracks():
    keyword = request.args.get("keyword")
    access_token = request.args.get("access_token")
    if not keyword or not access_token:
        return jsonify({"error": "Keyword and access token are required"}), 400

    headers = {"Authorization": f"Bearer {access_token}"}
    params = {"q": keyword, "type": "track", "limit": 10}

    response = requests.get(SEARCH_URL, headers=headers, params=params)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from Spotify"}), response.status_code

    data = response.json()
    results = [
        {
            "name": item["name"],
            "artist": item["artists"][0]["name"],
            "album": item["album"]["name"],
            "preview_url": item["preview_url"],
            "external_url": item["external_urls"]["spotify"],
        }
        for item in data.get("tracks", {}).get("items", [])
    ]

    return jsonify(results)

if __name__ == "__main__":
    load_dotenv()
    print(f"Loaded CLIENT_ID: {os.getenv('SPOTIFY_CLIENT_ID')}, CLIENT_SECRET: {os.getenv('SPOTIFY_CLIENT_SECRET')}")
    app.run(ssl_context="adhoc", port=5000)