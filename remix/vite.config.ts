import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
      host: '127.0.0.1',
      port: 3000,
      allowedHosts: [
        'f2fe-64-226-182-42.ngrok-free.app',
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
