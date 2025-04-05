import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node"; // Added redirect import
import invariant from "tiny-invariant";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";

import { getVideo, updateVideo, deleteVideo } from "../data_videos";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.videoId, "Missing videoId param");
  const formData = await request.formData();
  const actionType = formData.get("_action");

  if (actionType === "favorite") {
    return updateVideo(params.videoId, {
      favorite: formData.get("favorite") === "true",
    });
  }

  if (actionType === "delete") {
    await deleteVideo(params.videoId);
    return redirect("/");
  }

  throw new Response("Invalid action", { status: 400 });
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.videoId, "Missing videoId param");
  const video = await getVideo(params.videoId);
  if (!video) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ video });
};

export default function Video() {
  const { video } = useLoaderData<typeof loader>();

  return (
    <div id="video">
      <div>
        <img
          alt={`${video.snippet.title} thumbnail`}
          src={video.snippet.thumbnails.high.url}
        />
      </div>

      <div>
        <h1>
          {video.snippet.title} <Favorite video={video} />
        </h1>
        <p>
          <strong>Channel:</strong> {video.snippet.channelTitle}
        </p>
        <p>
          <strong>Published At:</strong> {new Date(video.snippet.publishedAt).toLocaleDateString()}
        </p>
        <p>{video.snippet.description}</p>

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this video."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <input type="hidden" name="_action" value="delete" />
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  video: { favorite?: boolean };
}> = ({ video }) => {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : video.favorite;

  return (
    <fetcher.Form method="post">
      <input type="hidden" name="_action" value="favorite" />
      <button
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};
