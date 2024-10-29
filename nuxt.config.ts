export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
      '~/assets/css/normalize.scss',
      '~/assets/css/fonts.scss',
      '~/assets/css/main.scss'
  ],
    app: {
        head: {
            title: "Sasflix",
        }
    },

})
