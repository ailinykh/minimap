import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      yandexApiKey: process.env.YANDEX_API_KEY,
    },
    telegram_bot_token: process.env.TELEGRAM_BOT_TOKEN,
    jwt_secret_token: process.env.JWT_SECRET_TOKEN,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: [process.env.DEVELOPMENT_HOSTNAME ?? 'localhost'],
    },
  },

  modules: ['@nuxt/icon', '@nuxt/scripts'],
})
