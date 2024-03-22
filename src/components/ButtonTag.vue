<script setup lang="ts">
const { subtitle } = defineProps<{
  subtitle: string
}>()
</script>

<template>
  <button class="bg-gray-300 px-2 mt-3 mb-4 mx-4 border border-black rounded">
    {{ subtitle }}
  </button>
</template>
