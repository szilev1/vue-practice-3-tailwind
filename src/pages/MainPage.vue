<script setup lang="ts">
// import { mapWritableState /*, mapActions*/ } from 'pinia'
import { computed, onMounted, onUpdated, ref, type ComputedRef, type Ref } from 'vue'
// External imports
import useModeStore from '@/stores/mode'
import AddEditElement from '@/components/AddEditElement.vue'
import ElementItem from '@/components/ElementItem.vue'
import ButtonTag from '@/components/ButtonTag.vue'
import type { Item } from '@/stores/types'

// Refs
const activeElement: Ref<Item | null> = ref(null)
const addElement: Ref<boolean> = ref(false)
const elements: Ref<Item[]> = ref([])
const loading: Ref<boolean> = ref(false)

const modeStore = useModeStore() // Access the Pinia store instance

const isDarkMode: ComputedRef<boolean> = computed(() => {
  return modeStore.isNightMode // Accessing the isNightMode variable from your store
})

const toggleDarkMode = () => {
  modeStore.toggleNightMode() // Call the method to toggle the mode
}

// Methods
function handleChangeActiveElement(element: Item) {
  if (activeElement.value?.id !== element.id) {
    activeElement.value = element
  } else {
    activeElement.value = null
  }
}

function handleCreateElement(newElement: Item) {
  console.log('New element: ', newElement)
  //--
  addElement.value = !addElement.value
  elements.value?.push(newElement)
}

function handleRemoveElement(elementId: string) {
  elements.value = elements.value.filter((element) => element.id !== elementId)
  if (activeElement.value?.id === elementId) activeElement.value = null
}

// Lifecycle hooks
onMounted(function () {
  loading.value = true
  setTimeout(() => {
    elements.value = [
      {
        id: '1',
        name: 'Element 1',
        description: 'This is Element 1.'
      },
      {
        id: '2',
        name: 'Element 2',
        description: 'This is Element 2.'
      },
      {
        id: '3',
        name: 'Element 3',
        description: 'This is Element 3.'
      }
    ]
    loading.value = false
  }, 1500)
})

onUpdated(function () {
  //--
  console.log('Active element: ', activeElement.value?.name)
})
</script>

<template>
  <div class="flex flex-col items-center">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <ButtonTag
      @click="toggleDarkMode"
      :subtitle="isDarkMode ? 'Set light mode' : 'Set dark mode'"
    />
  </div>
  <section class="flex flex-col justify-center">
    <span v-if="loading">Loading...</span>
    <div v-else>
      <ul class="flex flex-wrap justify-evenly ps-0 m-0">
        <li v-for="element in elements" :key="element.id">
          <ElementItem
            :active="element.id === activeElement?.id"
            :element="element"
            @handle-change-status="handleChangeActiveElement"
            @handle-delete-element="handleRemoveElement"
          />
        </li>
      </ul>
      <ButtonTag
        @click="addElement = !addElement"
        :subtitle="addElement ? 'Cancel' : 'Add element'"
      />
      <AddEditElement v-if="addElement" @handle-add-element="handleCreateElement" />
    </div>
  </section>
  <hr class="m-12" />
  <section class="flex flex-col items-center">
    <h2 class="mx-auto mt-0 mb-8">Active element:</h2>
    <ElementItem v-if="activeElement" :details="true" :element="activeElement" />
    <span v-else>No active element</span>
  </section>
</template>
