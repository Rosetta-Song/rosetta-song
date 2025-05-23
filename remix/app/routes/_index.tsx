import type {  LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  NavLink,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";

import { createEmptyContact, getSpotifyTracks } from "../data";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react";


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



export default function Index() {
  const { contacts, query } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();

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
<>
  


      
        
      <div className="flex flex-row" id="index">
        <div id="index-logo" className="basis-1/5">
            
            <div id="logo-side-dark" aria-label="Rosetta Song"></div>
         
        </div> 
      
          <div className="basis-3/5">
            <Form
              id="index-search-form"
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
                className={`w-full p-4 border rounded ${searching ? "loading" : ""}`}
                defaultValue={ query ?? ""}
                placeholder={ query ?? "Search your song"}
                type="search"
                name="q"
              />
              <div id="index-search-spinner" aria-hidden hidden={!searching} />
            </Form>
          </div>
        
          <div className="basis-1/5">
                <blockquote className="text-center text-2xl font-semibold text-gray-900 italic dark:text-white">
            
               Create professional video with &nbsp;
                      <div className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-[#1DB954]">
                         <span className="relative text-white dark:text-gray-950">Spotify</span>
                      </div>
                    <br /> it&apos;s simple now!
                  </blockquote>
             </div>    
           </div>

           <div className="flex flex-row">
            <div className="basis-64">01</div>
            <div className="basis-64">02</div>
            <div className="basis-128">03</div>
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
                      
                      <div className="columns-3 flex-col items-center p-7 rounded-2xl">
              
                        {contacts.map((contact: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; album: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; avatar: string | undefined; artist: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; favorite: any; }) => (
                        /*!-- <li className="inline-flex py-4 first:pt-0 last:pb-0" key={contact.id}></li> */
                        <NavLink
                            key={contact.id}
                            className={({ isActive, isPending }) =>
                            isActive ? "active" : isPending ? "pending" : ""
                            }
                            to={`tracks/${contact.id}?q=${query ?? ""}`}
                        >
                                  {contact.name || contact.album ? (
                                  <>        
                                  
                                    <div className="flex items-center gap-4">
                                        <img
                                          className="flex-shrink-0 w-48 h-48 shadow-xl rounded-md"
                                          alt=""
                                          src={contact.avatar}
                                        />
                                        <div className="flex-grow">
                                          <span className="block text-2xl font-medium">{contact.name}</span>
                                          <span className="block font-medium text-sky-500">{contact.album}</span>
                                          <span className="block gap-2 font-medium text-gray-600 dark:text-gray-400">
                                            {contact.artist}
                                          </span>
                                        </div>
                                      </div>
                                
                                            
                                  </>
                                  ) : (
                                  <i>No Name</i>
                                  )}{" "}
                                  {contact.favorite ? <span id="starts">★</span> : null }
                              </NavLink>

                            
                        ))}
                        </div>
                    ) : (
                 
                        <p>No contacts available</p>
                    )}
                </nav>
              </div>
            
   
        <ScrollRestoration />
        <Scripts />
      
      </>
  );
}