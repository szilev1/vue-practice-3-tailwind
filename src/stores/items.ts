import { ref, computed, onUpdated, type Ref } from 'vue'
import { defineStore } from 'pinia'
// Local imports
import type { Item } from './types'

export const useItemStore = defineStore('item', () => {
  // Refs
  const isLoading: Ref<boolean> = ref(false)
  const itemList: Ref<Item[] | null> = ref(null)
  const error: Ref<string | null> = ref(null)
  const activeItem: Ref<Item | null> = ref(null)
  const selectedItem: Ref<Item | null> = ref(null)
  //--
  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)
  //--

  function setActiveItem(id: string | null) {
    if (activeItem.value?.id !== id) {
      activeItem.value = itemList.value?.find((elem) => elem.id === id) || null
    } else {
      activeItem.value = null
    }
  }

  function setSelectedItem(id: string | null) {
    if (selectedItem.value?.id !== id) {
      selectedItem.value = itemList.value?.find((elem) => elem.id === id) || null
    } else {
      selectedItem.value = null
    }
  }

  function crudFailure(errorMessage: string) {
    isLoading.value = false
    error.value = errorMessage
  }

  function getItemListSuccess(items: Item[]) {
    isLoading.value = false
    error.value = null
    itemList.value = items
  }

  function createItemSuccess(item: Item) {
    isLoading.value = false
    error.value = null
    itemList.value = itemList.value === null ? [item] : itemList.value.concat(item)
  }

  function editItemSuccess(item: Item) {
    isLoading.value = false
    error.value = null

    const index = itemList.value?.findIndex((elem) => elem.id === item.id)
    if (index && index > -1 && itemList.value) {
      itemList.value[index] = item

      if (activeItem.value?.id === item.id) activeItem.value = item
      if (selectedItem.value?.id === item.id) selectedItem.value = null
    }
  }

  function deleteItemSuccess(id: string) {
    isLoading.value = false
    error.value = null
    itemList.value = itemList.value?.filter((item) => item.id !== id) || null

    if (activeItem.value?.id === id) activeItem.value = null
    if (selectedItem.value?.id === id) selectedItem.value = null
  }

  onUpdated(() => {
    console.log('store isLoading', isLoading.value)
    console.log('store itemList', itemList.value)
    console.log('store selectedItem', selectedItem.value)
    console.log('store error', error.value)
  })

  return {
    activeItem,
    createItemSuccess,
    crudFailure,
    deleteItemSuccess,
    editItemSuccess,
    error,
    getItemListSuccess,
    isLoading,
    itemList,
    selectedItem,
    setActiveItem,
    setSelectedItem,
    count,
    doubleCount
  }
})
