import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 6789
  },
  plugins: [
    svelte({
      preprocess: [preprocess()],
    }),
  ],
});
