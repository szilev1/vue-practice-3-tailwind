<!-- Composition API script setup syntax -->
<script setup lang="ts">
import ButtonTag from '@/components/ButtonTag.vue'
import type { Item } from '@/stores/types'

const { active, details, element } = defineProps<{
  active?: boolean
  details?: boolean
  element: Item
}>()

const emit = defineEmits(['handle-change-status', 'handle-delete-element', 'handle-edit-element'])

const handleChangeStatus = () => emit('handle-change-status', element.id)

const handleEditElement = () => emit('handle-edit-element', element.id)

const handleDeleteElement = () => emit('handle-delete-element', element.id)
</script>

<template>
  <!-- alapból a tömbben lévő osztályok érvényesek, de ha az "active" prop true, akkor a bg-green-200 is -->
  <div :class="['w-64 m-4 border border-black border-1 rounded-md', { 'bg-green-200': active }]">
    <h3 class="mt-4">{{ element.name }}</h3>
    <p class="m-4" v-if="details">{{ element.description }}</p>
    <ButtonTag
      v-if="!details"
      @click="handleChangeStatus"
      :subtitle="active ? 'Set inactive' : 'Set active'"
    />
    <ButtonTag v-if="!details" @click="handleEditElement" subtitle="Edit" />
    <ButtonTag v-if="!details" @click="handleDeleteElement" subtitle="Remove" />
  </div>
</template>

<!-- Options API
<script>
import ButtonTag from '@/components/ButtonTag.vue'

export default {
  name: 'ElementItem',
  components: {
    ButtonTag
  },
  props: {
    active: Boolean,
    details: Boolean,
    element: {
      id: Number,
      name: String,
      description: String
    }
  },
  emits: ['handle-change-status', 'handle-delete-element']
}
</script> -->
