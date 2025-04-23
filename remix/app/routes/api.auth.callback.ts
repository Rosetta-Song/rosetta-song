import { json, redirect } from "@remix-run/node";
import cookie from "cookie";

export const loader = async ({ request }: { request: Request }) => {
  // Parse code from URL
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return redirect("/");
  }

  const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
  const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const spotify_redirect_uri = 'http://127.0.0.1:3000/api/auth/callback';

  const urlToken = 'https://accounts.spotify.com/api/token';
  const authOptions: RequestInit = {
    method: 'POST',
    body: new URLSearchParams({
      code: code || '',
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code',
    }),
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString(
          'base64',
        ),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const response = await fetch(urlToken, authOptions);
    const json: {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
      scope: string;
    } = await response.json();

    const setCookie = cookie.serialize(
      'spotify-access-token',
      json.access_token,
      {
        maxAge: json.expires_in,
        sameSite: 'strict',
        httpOnly: true,
        path: '/',
      },
    );
    return redirect('/', {
      headers: {
        'Set-Cookie': setCookie,
      },
    });
  } catch (err: unknown) {
    return json({ error: 'Failed to authenticate' }, { status: 500 });
  }
};

