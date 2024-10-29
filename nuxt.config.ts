export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
      '~/assets/scss/normalize.scss',
      '~/assets/scss/fonts.scss',
      `~/assets/scss/variables.scss`,
      '~/assets/scss/main.scss'
  ],
    app: {
        head: {
            title: "Sasflix",
        }
    },

})
