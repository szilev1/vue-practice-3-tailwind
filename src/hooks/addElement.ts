import { ref } from 'vue'
import { TYPE, useToast } from 'vue-toastification'
// External imports
import { useItemStore } from '@/stores/items'
import type { Item } from '@/stores/types'
import databaseUrl from '@/config/app.settings'
import { toastOptions } from '@/config/toast.config'

export default function useAddElement() {
  // Refs
  const isCreating = ref(false)

  // Hooks
  const itemStore = useItemStore()
  const toast = useToast()

  // Methods
  const handleAddElement = (newElement: Omit<Item, 'id'>) => {
    isCreating.value = true

    fetch(`${databaseUrl}/elements.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newElement.name,
        description: newElement.description
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Could not save data!')
        }
      })
      .then((data) => {
        isCreating.value = false
        const createdElement: Item = {
          id: data.name,
          name: newElement.name,
          description: newElement.description
        }
        itemStore.createItemSuccess(createdElement)
        toast.success('Item is successfully created!', { ...toastOptions, type: TYPE.SUCCESS })
      })
      .catch((error) => {
        console.log(error)
        itemStore.crudFailure(error?.message || 'Client error')
        isCreating.value = false
        toast.error('Failed to create item!', { ...toastOptions, type: TYPE.ERROR })
      })
  }

  return { handleAddElement, isCreating }
}
