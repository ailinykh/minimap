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

onLoaded(async ({ Telegram: { WebApp: webApp } }) => {
  if (
    !webApp.isFullscreen &&
    !['macos', 'web', 'weba'].includes(webApp.platform)
  ) {
    webApp.requestFullscreen()
  }

  const { hash } = useRequestURL()
  const webAppData = parseInitData(hash)

  await $fetch('/api/session', {
    method: 'POST',
    body: { webAppData },
  }).catch((e) => {
    // TODO: show error message
    webApp.showAlert(e)
  })

  webApp.LocationManager.init(() => {
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
