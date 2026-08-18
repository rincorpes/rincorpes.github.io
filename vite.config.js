import { defineConfig } from "vite";
import { existsSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

const localParadoxPath = fileURLToPath(
  new URL("../../packages/javascript/paradoxjs/src/index.ts", import.meta.url)
);

export default defineConfig({
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
