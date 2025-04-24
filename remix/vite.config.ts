import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
      host: '127.0.0.1',
      port: 3000,
      allowedHosts: [
        'http://127.0.0.1:3000',
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
