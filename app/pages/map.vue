<script setup lang="ts">
const { LocationManager, showAlert } = useWebApp()
const center = ref({ latitude: 37.588144, longitude: 55.733842 })
LocationManager.getLocation((location) => {
  console.log(location)
  center.value = location
})

function onClick() {
  showAlert('No tasks available for you right now')
}
</script>

<template>
  <ClientOnly>
    <YandexMap :centerLat="center.latitude" :centerLon="center.longitude" />

    <button
      class="absolute bottom-10 left-1/2 w-[calc(100%-40px)] -translate-x-1/2 transform rounded-lg bg-blue-500 p-2 text-lg text-white hover:bg-blue-600"
      @click="onClick"
    >
      Get a task
    </button>
  </ClientOnly>
</template>
