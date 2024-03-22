<script setup lang="ts">
// // import { mapWritableState /*, mapActions*/ } from 'pinia'
// import { computed, onMounted, reactive, ref, watch } from 'vue'
// import useModeStore from '@/stores/mode'
// import AddEditElement from '@/components/AddEditElement.vue'
// import ElementItem from '@/components/ElementItem.vue'
// import ButtonTag from '@/components/ButtonTag.vue'
// import useGetElementList from '@/hooks/getElementList'
// import useRemoveElement from '@/hooks/deleteElement'

// // Refs
// const activeElement = ref(null)
// const editElement = reactive({ id: '', description: '', name: '' })
// //  const editElement = reactive({})

// // Hooks
// const { elementList: elements, getElementList, isLoading } = useGetElementList()
// const updateElementList = () => getElementList()
// const { handleRemoveElement } = useRemoveElement(updateElementList)
// const modeStore = useModeStore() // Access the Pinia store instance

// const isDarkMode = computed(() => {
//   return modeStore.isNightMode // Accessing the isNightMode variable from your store
// })

// const toggleDarkMode = () => {
//   modeStore.toggleNightMode() // Call the method to toggle the mode
// }

// // Methods
// function handleChangeActiveElement(elementId) {
//   //--
//   if (activeElement.value?.id !== elementId) {
//     const activeElem = elements.value.find((elem) => elem.id === elementId)
//     activeElement.value = activeElem
//   } else {
//     activeElement.value = null
//   }
// }

// const handleEditElement = (toBeEditedElementId) => {
//   const toBeEditedElem = elements.value.find((elem) => elem.id === toBeEditedElementId)

//   editElement.id = toBeEditedElem.id
//   editElement.name = toBeEditedElem.name
//   editElement.description = toBeEditedElem.description
// }

// function handleDeleteElement(elementId) {
//   handleRemoveElement(elementId)
//   if (activeElement.value?.id === elementId) activeElement.value = null
//   // elements.value = elements.value.filter((element) => element.id !== elementId)
// }

// // Watch
// watch(
//   () => elements,
//   (newValue) => {
//     if (newValue && activeElement) {
//       const activeElem = elements.value.find((elem) => elem.id === activeElement.value?.id)
//       activeElement.value = activeElem
//     }
//   },
//   { deep: true }
// )

// // Lifecycle hooks
// onMounted(function () {
//   getElementList()
// })
</script>

<template>
  <h1>Elements page</h1>
  <!-- <div class="flex flex-col items-center">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <ButtonTag
      @click="toggleDarkMode"
      :subtitle="isDarkMode ? 'Set light mode' : 'Set dark mode'"
    />
  </div>
  <section class="flex flex-col justify-center">
    <span v-if="isLoading">Loading...</span>
    <div v-else>
      <ul class="flex flex-wrap justify-evenly ps-0 m-0">
        <li v-for="element in elements" :key="element.id">
          <ElementItem
            :active="element.id === activeElement?.id"
            :element="element"
            @handle-change-status="handleChangeActiveElement"
            @handle-delete-element="handleDeleteElement"
            @handle-edit-element="handleEditElement"
          />
        </li>
      </ul>
      <AddEditElement :editElement="editElement" />
    </div>
  </section>
  <hr class="m-12" />
  <section class="flex flex-col items-center">
    <h2 class="mx-auto mt-0 mb-8">Active element:</h2>
    <ElementItem v-if="activeElement" :details="true" :element="activeElement" />
    <span v-else>No active element</span>
  </section> -->
</template>
