from flask import Flask, request, jsonify
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

app = Flask(__name__)

DEVELOPER_KEY = 'AIzaSyAZDgbg5jjsDGlxR6Bu1ftmvKZ6jkYLdJI'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def get_youtube_service():
    return build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)

@app.route("/search_video_by_id", methods=["GET"])
def search_video_by_id():
    video_id = request.args.get("video_id")
    if not video_id:
        return jsonify({"error": "video_id parameter is required"}), 400

    youtube = get_youtube_service()
    try:
        search_response = youtube.videos().list(
            part="id,snippet",
            id=video_id
        ).execute()

        if "items" not in search_response or not search_response["items"]:
            return jsonify({"error": "No video found with the provided ID"}), 404

        video_details = search_response["items"][0]
        return jsonify(video_details)
    except HttpError as e:
        return jsonify({"error": f"An HTTP error {e.resp.status} occurred: {e.content}"}), 500

if __name__ == "__main__":
    app.run(port=8083)