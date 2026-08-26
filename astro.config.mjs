import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [],
  alias: {
    "@src": "/src",
  },
  env: {
    schema: {
      YT_API_KEY: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
    },
  },
  site: "https://allmylinks-ten.vercel.app/",
});
