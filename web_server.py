import json
import os
from flask import Flask, request, jsonify
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from dotenv import load_dotenv

load_dotenv() #loads the environment variables from .env

app = Flask(__name__)

app.config["DEVELOPER_KEY"] = os.getenv("DEVELOPER_KEY")


def get_youtube_service():
    DEVELOPER_KEY = app.config.get("DEVELOPER_KEY")
    if not DEVELOPER_KEY:
        raise ValueError("Missing DEVELOPER_KEY in configuration")

    YOUTUBE_API_SERVICE_NAME = 'youtube'
    YOUTUBE_API_VERSION = 'v3'

    return build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)


@app.route("/search_by_keyword", methods=["GET"])
def search_by_keyword():
    keyword = request.args.get("keyword")
    if not keyword:
        return jsonify({"error": "keyword parameter is required"}), 400

    youtube = get_youtube_service()
    try:
        search_response = youtube.search().list(
            part="id,snippet",
            q=keyword,
            type="video,channel,playlist",
            maxResults=10
        ).execute()

        if "items" not in search_response or not search_response["items"]:
            return jsonify({"error": "No results found for the provided keyword"}), 404

        results = []
        for item in search_response["items"]:
            result = {
                "kind": item.get("kind"),
                "etag": item.get("etag"),
                "id": {
                    "kind": item["id"].get("kind"),
                    "videoId": item["id"].get("videoId"),
                    "channelId": item["id"].get("channelId"),
                    "playlistId": item["id"].get("playlistId")
                },
                "snippet": {
                    "publishedAt": item["snippet"].get("publishedAt"),
                    "channelId": item["snippet"].get("channelId"),
                    "title": item["snippet"].get("title"),
                    "description": item["snippet"].get("description"),
                    "thumbnails": item["snippet"].get("thumbnails"),
                    "channelTitle": item["snippet"].get("channelTitle"),
                    "liveBroadcastContent": item["snippet"].get("liveBroadcastContent")
                }
            }
            results.append(result)

        return jsonify(results)
    except HttpError as e:
        return jsonify({"error": f"An HTTP error {e.resp.status} occurred: {e.content}"}), 500


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
    with app.test_request_context('/search_video_by_id?video_id=e5Pit2WJ6dI'):
        response = search_video_by_id()
        if isinstance(response, tuple):
            print(json.dumps(response[0].get_json(), indent=4))
        else:
            print(json.dumps(response.get_json(), indent=4))
    print("-------------------")
    with app.test_request_context('/search_by_keyword?keyword=Shakira'):
        response = search_by_keyword()
    if isinstance(response, tuple):
        print(json.dumps(response[0].get_json(), indent=4))
    else:
        print(json.dumps(response.get_json(), indent=4))
    app.run(port=8083)