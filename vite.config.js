import { defineConfig } from "vite";
import { existsSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

const localParadoxPath = fileURLToPath(
  new URL("../../packages/javascript/paradoxjs/src/index.ts", import.meta.url)
);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        portfolio: fileURLToPath(new URL("./portfolio/index.html", import.meta.url)),
        tatuyCase: fileURLToPath(new URL("./portfolio/tatuy/index.html", import.meta.url)),
      },
    },
  },
  resolve: existsSync(localParadoxPath)
    ? {
        alias: {
          "@rincorpes/paradoxjs": localParadoxPath,
        },
      }
    : undefined,
  server: {
    host: "localhost",
    port: 4173,
  },
  preview: {
    host: "localhost",
    port: 4173,
  },
});
