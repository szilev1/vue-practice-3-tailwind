<script setup lang="ts">
import type { Notification } from '@/hooks/types'

const { notification } = defineProps<{
  notification: Notification
}>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="true"
      class="fixed z-50 left-[5%] bottom-[5%] px-5 py-3 text-white bg-green-500 border rounded-md"
    >
      <p>{{ notification.message }}</p>
    </div>
  </Teleport>
</template>
