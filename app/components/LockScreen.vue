<script setup lang="ts">
const props = defineProps({
  icon: String,
  title: String,
  description: String,
  button: String,
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <main class="flex flex-1 items-center justify-center">
      <div class="px-8 text-center">
        <Icon :name="props.icon" class="text-[96px] text-gray-400" />
        <h1 class="my-8 text-2xl font-bold">{{ props.title }}</h1>
        <p class="text-gray-500">{{ props.description }}</p>
      </div>
    </main>

    <footer class="mb-8 p-8" v-if="props.button">
      <button
        class="w-full rounded-lg bg-blue-500 py-3 text-white transition hover:bg-blue-600"
        @click="$emit('action')"
      >
        {{ props.button }}
      </button>
    </footer>
  </div>
</template>
