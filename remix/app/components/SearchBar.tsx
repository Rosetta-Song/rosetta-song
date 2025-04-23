import { Form, NavLink } from "@remix-run/react";
import { Key, ReactNode, ReactElement, ReactPortal, JSXElementConstructor } from "react";

interface Contact {
  id: Key | null | undefined;
  name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
  album: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
  avatar: string | undefined;
  twitter: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
  favorite: any;
}

interface SearchBarProps {
  isIndexPage: boolean;
  contacts: Contact[];
  query: string | null;
  searching: boolean;
  submit: (target: HTMLFormElement, options: { replace: boolean }) => void;
}

export function SearchBar({ isIndexPage, contacts, query, searching, submit }: SearchBarProps) {
  return (
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
        <Form style={{ display: "none" }} method="post">
          <button type="submit">New</button>
        </Form>
      </div>
      <nav>
        {contacts?.length ? (
          <ul className="contact-list">
            {contacts.map((contact) => (
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
                          className="flex-shrink-0 w-24 h-24 object-cover rounded-md"
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
  );
}
