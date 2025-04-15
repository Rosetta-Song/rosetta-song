import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useNavigation,
  useSubmit,
  useLocation,
} from "@remix-run/react";

import appStylesHref from "./styles/app.css";

import { createEmptyContact, getSpotifyTracks } from "./data";
import { Key, useEffect } from "react";

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/tracks/${contact.id}/edit`);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const {contacts, query }  = await getSpotifyTracks(q);
 
  return json({ contacts, query });
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export default function App() {
  const { contacts = [], query } = useLoaderData<typeof loader>(); // Default to an empty array
  const navigation = useNavigation();
  const submit = useSubmit();
  const location = useLocation();

  const isIndexPage = location.pathname === "/";

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = query ?? "";
    }
  }, [query]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div
          id="sidebar"
          style={{ display: isIndexPage ? "none" : "flex" }}
        >
          <NavLink id="top-bar" to="/">
            <h1 id="logo">
            
               <div id="logo-side-dark-topbar" aria-label="Rosseta Song"></div>
              
            
            </h1>
          </NavLink>
          <div>
            <Form
              id="search-form"
              role="search"
              onChange={(event) => {
                const isFirstSearch = query === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
            >
              <input
                id="q"
                aria-label="Search contacts"
                className={searching ? "loading" : ""}
                defaultValue={query ?? "Top Hits"}
                placeholder={query ?? "Top Search"}
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts?.length ? (
              <ul className="contact-list">
                {contacts.map((contact: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; album: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; avatar: string | undefined; twitter: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; favorite: any; }) => (
                  <li key={contact.id} className="flex space-x-4 p-2 hover:bg-gray-100 rounded-md">
                
                    <NavLink
                      className={({ isActive, isPending }) =>
                        `flex-1 ${isActive ? "text-blue-500 font-bold" : isPending ? "text-gray-500" : "text-gray-800"}`
                      }
                      to={`tracks/${contact.id}?q=${query}`}
                    >
                      {contact.name || contact.album ? (
                        <>
                            {contact.avatar && (
                              <img
                                src={contact.avatar}
                                alt={`${contact.name || "Contact"}'s avatar`}
                                className="flex-shrink-0  w-24 h-24 object-cover rounded-md"
                              
                              />
                            )}
                          <div className="grid">
                            <span className="font-medium">{contact.name}</span>
                            <span className="text-sm text-gray-500">{contact.album}</span>
                          </div>  
                        </>
                      ) : (
                        <i className="text-gray-500">No Name</i>
                      )}
                    </NavLink>
                    {contact.favorite && <span className="text-yellow-500">★</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
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
        <LiveReload />
      </body>
    </html>
  );
}