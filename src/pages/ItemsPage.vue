<script setup lang="ts">
// import { mapWritableState /*, mapActions*/ } from 'pinia'
import { computed, onMounted, type ComputedRef } from 'vue'
// External imports
import useModeStore from '@/stores/mode'
import AddEditElement from '@/components/AddEditElement.vue'
import ElementItem from '@/components/ElementItem.vue'
import ButtonTag from '@/components/ButtonTag.vue'
import useGetElementList from '@/hooks/getElementList'
import useRemoveElement from '@/hooks/deleteElement'
import { useItemStore } from '@/stores/items'

// Hooks
const itemStore = useItemStore()
const modeStore = useModeStore()
const { getElementList } = useGetElementList()
const { handleRemoveElement } = useRemoveElement()

// Computed
const isDarkMode: ComputedRef<boolean> = computed(() => {
  return modeStore.isNightMode
})

// Methods
const handleChangeActiveElement = (elementId: string) => itemStore.setActiveItem(elementId)

const handleEditElement = (toBeEditedElementId: string) =>
  itemStore.setSelectedItem(toBeEditedElementId)

const handleDeleteElement = (elementId: string) => handleRemoveElement(elementId)

const toggleDarkMode = () => {
  modeStore.toggleNightMode()
}

// Lifecycle hooks
onMounted(function () {
  getElementList()
})
</script>

<template>
  <div class="flex flex-col items-center">
    <h1>Items</h1>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <ButtonTag
      @click="toggleDarkMode"
      :subtitle="isDarkMode ? 'Set light mode' : 'Set dark mode'"
    />
  </div>
  <section class="flex flex-col justify-center">
    <span v-if="itemStore.isLoading">Loading...</span>
    <div v-else>
      <ul class="flex flex-wrap justify-evenly ps-0 m-0">
        <li v-for="element in itemStore.itemList" :key="element.id">
          <ElementItem
            :active="element.id === itemStore.activeItem?.id"
            :element="element"
            @handle-change-status="handleChangeActiveElement"
            @handle-delete-element="handleDeleteElement"
            @handle-edit-element="handleEditElement"
          />
        </li>
      </ul>
      <AddEditElement />
    </div>
  </section>
  <hr class="m-12" />
  <section class="flex flex-col items-center">
    <h2 class="mx-auto mt-0 mb-8">Active element:</h2>
    <ElementItem v-if="itemStore.activeItem" :details="true" :element="itemStore.activeItem" />
    <span v-else>No active element</span>
  </section>
</template>
