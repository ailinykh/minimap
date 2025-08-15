<script setup lang="ts">
const { LocationManager } = useWebApp()
// window.Telegram.WebApp.showAlert(`isAccessGranted: ${locationManager.isAccessGranted}`)

if (LocationManager.isAccessGranted) {
  navigateTo('/map')
}

function shareLocation() {
  LocationManager.getLocation((location) => {
    console.log(location)
    return navigateTo('/map')
  })
}
</script>

<template>
  <LockScreen
    v-if="!LocationManager.isLocationAvailable"
    icon="material-symbols:share-location"
    title="Location Required"
    description="Unfortunately your device does not support location services. Try mobile phone please"
  />
  <LockScreen
    v-else-if="LocationManager.isAccessRequested"
    icon="material-symbols:share-location"
    title="Location Required"
    description="We need to know your location to provide you a task"
    button="Open Settings"
    @action="LocationManager.openSettings"
  />
  <LockScreen
    v-else-if="!LocationManager.isAccessGranted"
    icon="material-symbols:share-location"
    title="Location Required"
    description="We need to know your location to provide you a task"
    button="Share Location"
    @action="shareLocation"
  />
  <LoadingScreen v-else />
</template>
