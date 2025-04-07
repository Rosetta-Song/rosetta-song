import googleapiclient.discovery
import google_auth_oauthlib.flow
import google.auth.transport.requests

def get_authenticated_youtube():
	"""Authenticates and returns a YouTube Data API service."""

	CLIENT_SECRETS_FILE = "client_secret_428369234594-8qevo1u56brnmub09srn24ptp1kro36u.apps.googleusercontent.com.json" #replace with your file name.
	SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"]

	flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
		CLIENT_SECRETS_FILE, SCOPES)

	credentials = flow.run_local_server(port=0)
	return googleapiclient.discovery.build("youtube", "v3", credentials=credentials)

def get_spanish_captions(youtube, video_id):
	"""Retrieves Spanish captions for a YouTube video."""

	# ... (rest of your caption retrieval logic, using the 'youtube' service)
	caption_request = youtube.captions().list(
		part="snippet",
		videoId=video_id
	)
	caption_response = caption_request.execute()

	spanish_caption_id = None

	if "items" in caption_response:
		for caption in caption_response["items"]:
			if caption["snippet"]["language"] == "es":
				spanish_caption_id = caption["id"]
				break

	if spanish_caption_id:
		# Download captions
		download_request = youtube.captions().download(
			id=spanish_caption_id,
			tfmt="srt"
		)
		download_response = download_request.execute()
		return download_response.decode("utf-8")
	else:
		return "Spanish captions not found."

# Example usage:
video_id = "kJQP7kiw5Fk"  # Replace with the actual video ID

youtube = get_authenticated_youtube()
captions = get_spanish_captions(youtube, video_id)
print(captions)