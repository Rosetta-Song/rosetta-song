import { ActionFunction, json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import cookie from 'cookie';

export const action: ActionFunction = async ({}: ActionFunctionArgs) => {
  const cookieHeader = cookie.serialize('spotify-access-token', '', {
    maxAge: 0,
    sameSite: 'strict',
    httpOnly: true,
    path: '/',
  });

  return json(
    {}, 
    {
      headers: {
        "Set-Cookie": cookieHeader
      }
    }
  );
};

// Adding a default export for Remix routes
export default function DeleteCookieRoute() {
  return null;
}
