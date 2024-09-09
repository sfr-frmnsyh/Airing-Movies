import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/main.css"],
  runtimeConfig: {
    // The private keys which are only available within server-side

    // Keys within public, will be also exposed to the client-side
    public: {
      API_KEY: process.env.API_KEY,
      API_BASE: process.env.API_BASE,
    },
  },
  meta: {
    title: "Airing Movies",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Get complete information about currently airing movies",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
});
