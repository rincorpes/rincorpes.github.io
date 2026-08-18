import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@rincorpes/paradoxjs": fileURLToPath(
        new URL("../../packages/javascript/paradoxjs/src/index.ts", import.meta.url)
      ),
    },
  },
  server: {
    host: "localhost",
    port: 4173,
  },
  preview: {
    host: "localhost",
    port: 4173,
  },
});
