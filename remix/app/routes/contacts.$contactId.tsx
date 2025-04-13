import { Form, json, useFetcher, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { FunctionComponent } from "react";

import type { ContactRecord } from "../data";
import { getSimpleTrack, updateContact } from "../data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getSimpleTrack(params.contactId);

  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ contact });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
};

export default function Contact() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <div id="contact">
      <div className="absolute top-18 right-20 ...">
        <Form action="edit">
          <button hidden type="submit">Generate AI Video&nbsp;&nbsp;&nbsp;</button>
        </Form>
      </div>
      <div hidden className="absolute top-18 right-20 ...">
        <h1>
          <Favorite contact={contact} />
        </h1>
      </div>
 
     
      <div id="prompt" className="relative">
       
        <h1>Video Generator</h1>
        
        <p>&nbsp;&nbsp;Generate AI Video from Spotify tracks</p>
        <br />
        <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${contact.id}?utm_source=generator`}
            width="100%"
            height="252"
            title="Spotify Track Player"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
       
        <div>
            
            <textarea
              id="prompt"
              name="prompt"
              placeholder={contact.notes ? contact.notes : "Enter your prompt here..."}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700"
              rows={5}
            ></textarea>
           
          </div>
   
       
          <div>
          <div className="grid grid-cols-5 gap-4">
            <div className="...">   
              <Form method="post" action="model">
                <label htmlFor="model">Model: </label>
                <select
                  id="model"
                  name="model"
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="rosseta">Rosseta 4</option>
                  <option value="synthesia">Synthesia</option>
                  <option value="hailuo">Hailuo</option>
                  <option value="alibaba-qwen">Alibaba Qwen</option>
                  <option value="kling">Kling</option>
                  <option value="runway">Runway</option>
                  <option value="google-veo">Google Veo</option>
                  <option value="openai-sora">OpenAI Sor</option>
                  <option value="pika">Pika</option>
                  <option value="luma">Luma</option>
                  <option value="adobe-firefly">Adobe Firefly</option>
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gemini-25">Gemini-2.5 Pro</option>
                  <option value="claude-37">Claude 3.7</option>
                  <option value="llama-3">Llama 3</option>
                  <option value="deep-sek">Deep Seek</option>
                </select>
            </Form>
            </div>
            <div className="...">
            <Form method="post" action="language">
              <label htmlFor="language">Language: </label>
              <select
                id="language"
                name="language"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="ru">Russian</option>
                <option value="ar">Arabic</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="pa">Punjabi</option>
                <option value="tr">Turkish</option>
                <option value="vi">Vietnamese</option>
                <option value="th">Thai</option>
                <option value="id">Indonesian</option>
                <option value="ms">Malay</option>
                <option value="sw">Swahili</option>
                <option value="tl">Tagalog</option>
                <option value="fi">Finnish</option>
                <option value="no">Norwegian</option>
                <option value="da">Danish</option>
                <option value="sv">Swedish</option>
                <option value="el">Greek</option>
                <option value="hu">Hungarian</option>
                <option value="cs">Czech</option>
                <option value="ro">Romanian</option>
                <option value="sk">Slovak</option>
                <option value="bg">Bulgarian</option>
                <option value="hr">Croatian</option>
                <option value="sl">Slovenian</option>
                <option value="lt">Lithuanian</option>
                <option value="lv">Latvian</option>
                <option value="et">Estonian</option>
              </select>
            </Form>
            
            </div>
            <div className="...">
            <Form method="post" action="style">
              <label htmlFor="style">Style: </label>
              <select
                id="style"
                name="style"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="realistic">Lyrics</option>
                <option value="realistic">Lip sync</option>
                <option value="realistic">Realistic</option>
                <option value="cartoon">Cartoon</option>
                <option value="anime">Anime</option>
                <option value="abstract">Abstract</option>
                <option value="minimalist">Minimalist</option>
                <option value="retro">Retro</option>
                <option value="futuristic">Futuristic</option>
                <option value="nature">Nature</option>
                <option value="urban">Urban</option>
              </select>
            </Form>
            </div>
            <div className="...">
            <Form method="post" action="theme">
              <label htmlFor="theme">Theme: </label>
              <select
                id="theme"
                name="theme"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="colorful">Colorful</option>
                <option value="minimal">Minimal</option>
                <option value="retro">Retro</option>
                <option value="futuristic">Futuristic</option>
                <option value="nature">Nature</option>
                <option value="abstract">Abstract</option>
                <option value="business">Business</option>
                <option value="funny">Funny</option>
                <option value="romantic">Romantic</option>
                <option value="adventure">Adventure</option>
                <option value="horror">Horror</option>
                <option value="fantasy">Fantasy</option>
              </select>

            </Form>
            </div>
            <div className="...">
            
              <div id="action-button" className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Generate AI Video&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
                <div className="absolute bottom-10 right-2 ...">
                    <h1>
                      <Favorite contact={contact} />
                    </h1>
                  </div>
              </div>  
            </div>
            
          </div>
          </div>
         </div>
     
      </div>
    
  );
}

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
        )}
      </button>
    </fetcher.Form>
  );
};