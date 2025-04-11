import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";

import appStylesHref from "../styles/app.css";

import { createEmptyContact, getSpotifyTracks } from "../data";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react";

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getSpotifyTracks(q);
  return json({ contacts, q });
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export default function App() {
  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body id="index-body">
      <div className="flex flex-row">
        <div className="basis-64">01</div>
        <div className="basis-64">02</div>
        <div className="basis-128">03</div>
      </div>
      <div className="flex flex-row" id="index">
        <div id="index-logo" className="basis-1/3">
            
            <div id="logo-side-dark" aria-label="Rosseta Song"></div>
         
        </div> 
          <div className="basis-2/3">
            <Form
              id="index-search-form"
              role="search"
              onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
            >
              <input
                id="q"
                aria-label="Search contacts"
                className={`w-full p-4 border rounded ${searching ? "loading" : ""}`}
                defaultValue={q || ""}
                placeholder="Search your song"
                type="search"
                name="q"
              />
              <div id="index-search-spinner" aria-hidden hidden={!searching} />
            </Form>
          </div>
                <blockquote className="text-center text-2xl font-semibold text-gray-900 italic dark:text-white">
                    Create your professional video using &nbsp;
                      <div className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-[#1DB954]">
                         <span className="relative text-white dark:text-gray-950">Spotify</span>
                      </div>
                    &nbsp; it&apos;s simple now with Rosseta AI.
                  </blockquote>
           </div>


        <div
          className={
            navigation.state === "loading" && !searching ? "loading" : ""
          }
          id="detail-results-wrapper"
        >    </div>
            <div id="results">
                <nav>
                    {contacts?.length ? (
                        <ul className="contact-list">
                        {contacts.map((contact: { id: Key | null | undefined; first: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; last: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; avatar: string | undefined; twitter: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; favorite: any; }) => (
                            <li className="inline-flex py-4 first:pt-0 last:pb-0" key={contact.id}>
                            <div className="ml-3 overflow-hidden">
                              <NavLink
                                  className={({ isActive, isPending }) =>
                                  isActive ? "active" : isPending ? "pending" : ""
                                  }
                                  to={`contacts/${contact.id}?q=${q ?? "Top Hits"}`}
                              >
                                  {contact.first || contact.last ? (
                                  <>
                                                    <img className="h-20 w-20 rounded-full" src={contact.avatar} alt="" />
                                                   
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{contact.first} {contact.last}</p>  
                                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">{contact.twitter}</p>
                                  </>
                                  ) : (
                                  <i>No Name</i>
                                  )}{" "}
                                  {contact.favorite ? <span id="starts">★</span> : null }
                              </NavLink>
                        
                            </div>
                            
                            </li>
                            
                        ))}
                        </ul>
                    ) : (
                 
                        <p>No contacts available</p>
                    )}
                </nav>
              </div>
            
   
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}