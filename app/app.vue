<script setup lang="ts">
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
})
</script>

<template>
  <div class="h-screen w-screen font-sans">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
