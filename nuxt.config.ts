import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      yandexApiKey: process.env.YANDEX_API_KEY,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['tender-crucial-mackerel.ngrok-free.app'],
    },
  },

  modules: ['@nuxt/icon', '@nuxt/scripts'],
})
