export default defineNuxtConfig({
    app: {
        head: {
            title: "Sasflix",
        }
    },

    css: [
        "~/assets/scss/normalize.scss",
        "~/assets/scss/main.scss",
        "~/assets/scss/variables.scss",
        "~/assets/scss/main.scss",
    ],

    runtimeConfig: {
        public: {
            // Получаем переменные окружения из .env
            apiBaseUrl: process.env.API_BASE_URL || "https://dummyjson.com"
        }
    },

    modules: ["@pinia/nuxt"],
    pinia: {
        storesDirs: ["~/store/**"],
    }
})