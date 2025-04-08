import { useEffect, useState } from "react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { getVideos } from "../data_videos";

import {
  Form,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const videos = await getVideos(q);
  return json({ videos, q });
};

export default function App() {
  const { videos, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  const [query, setQuery] = useState(q ?? "");

  useEffect(() => {
    setQuery(q ?? "");
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap"
          rel="stylesheet"
        ></link>
        <Meta />
        <Links />
      </head>
      <body id="index-body">
        <div id="index">
        <h1 id="index-logo">
            
            <div id="logo-side-dark" aria-label="Rosseta Song"></div>
         
        </h1> 
        <NavLink to="/">
        
          </NavLink>
          <div>
            <Form
              id="search-form"
              onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
              role="search"
            >
              <input
                id="q"
                aria-label="Search videos"
                className={searching ? "loading" : ""}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Search"
                type="search"
                name="q"
                value={query}
              />
              <div aria-hidden hidden={!searching} id="search-spinner" />
            </Form>
          </div>
          <nav hidden>
            {videos.length ? (
              <ul>
                {videos.map((video) => (
                  <li key={video.id.videoId}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                      to={`videos/${video.id.videoId}`}
                    >
                      {video.snippet.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No videos found</i>
              </p>
            )}
          </nav>
        </div>
        <div
          className={
            navigation.state === "loading" && !searching ? "loading" : ""
          }
          id="detail"
        >
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

import appStylesHref from "../styles/app.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];
