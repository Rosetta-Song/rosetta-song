import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteVideo } from "../data_videos";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.videoId, "Missing videoId param");
  await deleteVideo(params.videoId);
  return redirect("/");
};
