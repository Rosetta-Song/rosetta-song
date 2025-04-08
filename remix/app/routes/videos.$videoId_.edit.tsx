import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getVideo, updateVideo } from "../data_videos";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.videoId, "Missing videoId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateVideo(params.videoId, updates);
  return redirect(`/videos/${params.videoId}`);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.videoId, "Missing videoId param");
  const video = await getVideo(params.videoId);
  if (!video) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ video });
};

export default function EditVideo() {
  const { video } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Form key={video.id.videoId} id="video-form" method="post">
      <p>
        <span>Title</span>
        <input
          aria-label="Video title"
          defaultValue={video.snippet.title}
          name="title"
          placeholder="Video title"
          type="text"
        />
      </p>
      <label>
        <span>Description</span>
        <textarea
          defaultValue={video.snippet.description}
          name="description"
          rows={6}
        />
      </label>
      <label>
        <span>Thumbnail URL</span>
        <input
          aria-label="Thumbnail URL"
          defaultValue={video.snippet.thumbnails.high.url}
          name="thumbnail"
          placeholder="https://example.com/thumbnail.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Channel Title</span>
        <input
          defaultValue={video.snippet.channelTitle}
          name="channelTitle"
          placeholder="Channel title"
          type="text"
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button onClick={() => navigate(-1)} type="button">
          Cancel
        </button>
      </p>
    </Form>
  );
}
