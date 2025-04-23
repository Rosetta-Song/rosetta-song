import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
      port: 5173,
      allowedHosts: [
        'be77-64-226-182-42.ngrok-free.app',
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
