<script setup lang="ts">
const props = defineProps({
  centerLat: Number,
  centerLon: Number,
})

type YandexMap = {
  ymaps3: {
    ready: Promise<void>
    YMap: any
    YMapDefaultSchemeLayer: any
    YMapDefaultFeaturesLayer: any
    YMapMarker: any
  }
}

declare global {
  interface Window extends YandexMap {}
}

const {
  public: { yandexApiKey: key },
} = useRuntimeConfig()

useHead({
  script: [
    {
      src: `https://api-maps.yandex.ru/v3/?apikey=${key}&lang=ru_RU`,
      onload: async () => {
        console.log('YandexMap loaded')
        await window.ymaps3.ready

        const {
          YMap,
          YMapDefaultSchemeLayer,
          YMapDefaultFeaturesLayer,
          YMapMarker,
        } = window.ymaps3

        const map = new YMap(document.getElementById('map'), {
          location: {
            center: [props.centerLon, props.centerLat],
            zoom: 10,
          },
        })
        map.addChild(new YMapDefaultSchemeLayer())
        map.addChild(new YMapDefaultFeaturesLayer({}))

        const markerElement = document.createElement('div')
        markerElement.className =
          'h-[15px] w-[15px] rounded-full border-3 border-white bg-red-500 shadow'

        const marker = new YMapMarker(
          {
            // source: 'markerSource',
            coordinates: [props.centerLon, props.centerLat],
            // draggable: true,
            // mapFollowsOnDrag: true,
          },
          markerElement
        )

        map.addChild(marker)
      },
    },
  ],
})
</script>

<template>
  <div id="map" class="h-screen w-screen"></div>
</template>
