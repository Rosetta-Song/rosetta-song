Frontend JS Rosetta Song
This repository contains the frontend JavaScript application for the Rosetta Song project.

Environment Variables
Before running the application, create a .env file in the root directory and populate it with the following variables:

DEVELOPER_KEY=AIzaSyCqgxbKmHsOQpUs1TaIRJqreTCtHyzaDEQ
SPOTIFY_CLIENT_ID=""
SPOTIFY_CLIENT_SECRET=""

DEVELOPER_KEY: Your API key for the Google API (likely for lyrics or other data).

SPOTIFY_CLIENT_ID: Your Spotify API Client ID.

SPOTIFY_CLIENT_SECRET: Your Spotify API Client Secret.

Setup and Running Instructions
To run the application and perform tests, follow these steps:

1. Run Python Backend
Open separate terminal windows for each Python script.

First, install the required Python dependencies:

pip install -r requirements.txt

The requirements.txt file should contain:

httplib2~=0.22.0
google-api-python-client~=2.166.0
flask~=3.1.0
python-dotenv~=1.1.0
requests~=2.32.3
cryptography~=44.0.2

Then, in separate terminals, run the Python scripts:

python3 spotify.py
```bash
python3 get_lyrics_4.py

2. Install Node.js Dependencies
Navigate to the frontend/remix directory:

cd frontend/remix

Install the Node.js project dependencies:

sudo npm i

3. Run Node.js in Development Mode
From the frontend/remix directory, start the development server:

npm run dev

URLs
Once the servers are running, you can access the application through the following URLs in your browser:

Main Application: http://localhost:5173/

Example Contact Page: http://localhost:5173/contacts/02d1E4NRuh7OEQO4vCb9PD

Search Example (Shakira): http://localhost:5173/?q=Shakira

Contact with Search Query: http://localhost:5173/contacts/7jxHeJLVpnP7S08JFF4GBi?q=Shakira

