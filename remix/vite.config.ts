import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
      port: 5173,
      allowedHosts: [
        'fd87-2601-647-5500-a670-317d-893d-4cf4-fd70.ngrok-free.app'
      ]
    },
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths(),
    tailwindcss(),
  ],
});
