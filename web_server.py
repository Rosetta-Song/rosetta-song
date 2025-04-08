import json
from flask import Flask, request, jsonify
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

app = Flask(__name__)

# API keys are deprecated for many YouTube Data API operations.
# You should use OAuth 2.0 for authentication.
# Follow the instructions in the Google Cloud documentation to set up OAuth 2.0:
# https://cloud.google.com/docs/authentication/getting-started
#
# Once you have your credentials, you'll typically store them in a file
# (e.g., credentials.json) and use a library like google-auth to manage
# the authentication flow.
#
# For this example, we'll assume you have a function to get authenticated
# YouTube service using OAuth 2.0. Replace the get_youtube_service()
# function below with your OAuth 2.0 implementation.

# Placeholder for OAuth 2.0 based YouTube service
def get_youtube_service():
    # This is a placeholder and WILL NOT WORK with API keys.
    # Replace with your OAuth 2.0 authentication logic.
    # Example using google-auth (requires installation: pip install google-auth google-auth-oauthlib google-auth-httplib2):
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    import os
    #
    # SCOPES = ['https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/youtube.captions.readonly']
    # CREDENTIALS_PATH = 'client_secret.json'  # Replace with your path
    # TOKEN_PATH = 'token.json'
    #
    # creds = None
    # if os.path.exists(TOKEN_PATH):
    #     creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
    # if not creds or not creds.valid:
    #     if creds and creds.expired and creds.refresh_token:
    #         creds.refresh(Request())
    #     else:
    #         flow = InstalledAppFlow.from_client_secrets_file(
    #             CREDENTIALS_PATH, SCOPES)
    #         auth_url, _ = flow.authorization_url()  # Get the authorization URL
    #         print(f"Authorization URL: {auth_url}")  # Print it
    #         creds = flow.run_local_server(port=0)
    #     with open(TOKEN_PATH, 'w') as token:
    #         token.write(creds.to_json())
    # return build('youtube', 'v3', credentials=creds)
    # For now, we'll return a build with the API key, but this will likely fail.
    DEVELOPER_KEY = 'AIzaSyAZDgbg5jjsDGlxR6Bu1ftmvKZ6jkYLdJI' # REMOVE OR REPLACE WITH OAUTH 2.0
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


@app.route("/get_captions_by_video_id", methods=["GET"])
def get_captions_by_video_id():
    video_id = request.args.get("video_id")
    language = request.args.get("language", "en")
    if not video_id:
        return jsonify({"error": "video_id parameter is required"}), 400

    youtube = get_youtube_service()
    try:
        caption_request = youtube.captions().list(
            part="snippet",
            videoId=video_id
        )
        caption_response = caption_request.execute()

        if "items" not in caption_response or not caption_response["items"]:
            return jsonify({"error": "No captions found for the provided video ID"}), 404

        captions = []
        for caption in caption_response["items"]:
            if caption["snippet"]["language"] == language:
                caption_data = {
                    "id": caption["id"],
                    "language": caption["snippet"]["language"],
                    "name": caption["snippet"]["name"]
                }
                if "isAutoGenerated" in caption["snippet"]:
                    caption_data["is_auto_generated"] = caption["snippet"]["isAutoGenerated"]

                # Download the caption
                download_request = youtube.captions().download(
                    id=caption["id"],
                    tfmt="srt"
                )
                download_response = download_request.execute()
                caption_data["content"] = download_response.decode("utf-8")

                captions.append(caption_data)

        return jsonify(captions)
    except HttpError as e:
        return jsonify({"error": f"An HTTP error {e.resp.status} occurred: {e.content}"}), 500

if __name__ == "__main__":
    with app.test_request_context('/search_video_by_id?video_id=e5Pit2WJ6dI'):
        response = search_video_by_id()
        if isinstance(response, tuple):
            print(json.dumps(response[0].get_json(), indent=4))
        else:
            print(json.dumps(response.get_json(), indent=4))
    print("----------------")
    # with app.test_request_context('/get_captions_by_video_id?video_id=e5Pit2WJ6dI&language=en'):
    #     response = get_captions_by_video_id()
    #     if isinstance(response, tuple):
    #         print(json.dumps(response[0].get_json(), indent=4))
    #     else:
    #         print(json.dumps(response.get_json(), indent=4))
    app.run(port=8083)