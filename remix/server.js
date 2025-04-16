import { createRequestHandler } from "@remix-run/express";
import express from "express";


const app = express();

app.all(
  "*",
  createRequestHandler({
    getLoadContext() {
      // Whatever you return here will be passed as `context` to your loaders.
    },
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
