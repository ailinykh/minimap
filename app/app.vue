<script setup lang="ts">
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
})

declare global {
  interface Window extends TelegramWebApp {}
}

const { onLoaded } = useScript(
  'https://telegram.org/js/telegram-web-app.js?59',
  {
    use() {
      return { Telegram: window.Telegram }
    },
    // bundle: true,
  }
)

const loading = ref(true)

onLoaded(({ Telegram: { WebApp } }) => {
  if (!WebApp.isFullscreen) {
    WebApp.requestFullscreen()
  }

  WebApp.LocationManager.init(() => {
    loading.value = false
  })
})
</script>

<template>
  <div class="h-screen w-screen font-sans">
    <NuxtRouteAnnouncer />
    <LoadingScreen v-if="loading" />
    <NuxtPage v-else />
  </div>
</template>
