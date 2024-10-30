export default defineNuxtConfig({
  app: {
      head: {
          title: "Sasflix",
      }
  },

  devtools: { enabled: true },

  css: [
      "~/assets/scss/normalize.scss",
      "~/assets/scss/main.scss",
      "~/assets/scss/variables.scss",
      "~/assets/scss/main.scss",
  ],

  // modules: ["@pinia/nuxt"],
  runtimeConfig: {
      public: {
          apiBaseUrl: process.env.API_BASE_URL || "https://dummyjson.com"
      }
  },

  modules: ["@pinia/nuxt"],
})