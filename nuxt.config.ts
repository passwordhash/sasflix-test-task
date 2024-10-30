export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
      "~/assets/scss/normalize.scss",
      "~/assets/scss/main.scss",
      "~/assets/scss/variables.scss",
      "~/assets/scss/main.scss",
  ],

  app: {
      head: {
          title: "Sasflix",
      }
  },

  runtimeConfig: {
      public: {
          apiBaseUrl: process.env.API_BASE_URL || "https://dummyjson.com"
      }
  },

  modules: ["@nuxt/image"]
})