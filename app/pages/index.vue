<script setup lang="ts">
const status = ref('loading')

onMounted(async () => {
  const webApp = await useWebAppAsync()
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
    if (webApp.LocationManager.isAccessGranted) {
      navigateTo('/map')
    } else if (!webApp.LocationManager.isLocationAvailable) {
      status.value = 'locationRequired'
    } else if (webApp.LocationManager.isAccessRequested) {
      status.value = 'accessRequested'
    } else if (!webApp.LocationManager.isAccessGranted) {
      status.value = 'requestAccess'
    }
  })
})

async function shareLocation() {
  const { LocationManager } = await useWebAppAsync()
  LocationManager.getLocation((location) => {
    console.log(location)
    return navigateTo('/map')
  })
}
</script>

<template>
  <LoadingScreen v-if="status == 'loading'" />
  <LockScreen
    v-if="status == 'locationRequired'"
    icon="material-symbols:share-location"
    title="Location Required"
    description="Unfortunately your device does not support location services. Try mobile phone please"
  />
  <LockScreen
    v-else-if="status == 'accessRequested'"
    icon="material-symbols:share-location"
    title="Location Required"
    description="We need to know your location to provide you a task"
    button="Open Settings"
    @action="LocationManager.openSettings"
  />
  <LockScreen
    v-else-if="status == 'requestAccess'"
    icon="material-symbols:share-location"
    title="Location Required"
    description="We need to know your location to provide you a task"
    button="Share Location"
    @action="shareLocation"
  />
  <LoadingScreen v-else />
</template>
