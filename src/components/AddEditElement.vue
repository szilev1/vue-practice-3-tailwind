<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import ButtonTag from '@/components/ButtonTag.vue'
import useAddElement from '@/hooks/addElement'
import useEditElement from '@/hooks/editElement'
import { useItemStore } from '@/stores/items'

// Refs
const addElementMode: Ref<boolean> = ref(false)
const editElementMode: Ref<boolean> = ref(false)
const elementName: Ref<string | null> = ref(null)
const elementDescription: Ref<string | null> = ref(null)

// Hooks
const itemStore = useItemStore()
const { handleAddElement, isCreating } = useAddElement()
const { handleEditElement, isEditing } = useEditElement()

// Methods
const toggleForm = () => {
  if (editElementMode.value) {
    editElementMode.value = false
    itemStore.setSelectedItem(null)
  } else {
    addElementMode.value = !addElementMode.value
    handleResetForm()
  }
}

const handleResetForm = () => {
  elementDescription.value = null
  elementName.value = null
}

const handleSubmit = () => {
  const element = {
    name: elementName.value || '',
    description: elementDescription.value || ''
  }

  if (addElementMode.value) {
    handleAddElement(element)
    addElementMode.value = false
  }
  if (editElementMode.value && itemStore.selectedItem)
    handleEditElement({ id: itemStore.selectedItem.id, ...element })
  handleResetForm()
}

watch(
  () => itemStore.selectedItem,
  (newValue) => {
    if (newValue) {
      elementName.value = newValue.name
      elementDescription.value = newValue.description
      if (addElementMode.value) addElementMode.value = false
      editElementMode.value = true
    } else {
      handleResetForm()
      editElementMode.value = false
    }
  },
  { deep: true }
)
</script>

<template>
  <span v-if="isCreating">Creating...</span>
  <span v-if="isEditing">Editing...</span>
  <div v-else>
    <ButtonTag
      @click="toggleForm"
      :subtitle="addElementMode || editElementMode ? 'Close' : 'Add element'"
    />
    <form v-if="addElementMode || editElementMode" @submit.prevent="handleSubmit">
      <label class="m-4" htmlFor="elementName">Add name:</label>
      <input
        class="custom-input"
        id="elementName"
        name="elementName"
        type="text"
        v-model="elementName"
        required
      />
      <label htmlFor="elementDescription">Add description:</label>
      <input
        class="custom-input"
        id="elementDescription"
        name="elementDescription"
        type="text"
        v-model="elementDescription"
        required
      />
      <ButtonTag type="button" @click="handleResetForm" subtitle="Reset" />
      <ButtonTag type="submit" :subtitle="editElementMode ? 'Edit element' : 'Add element'" />
    </form>
  </div>
</template>
