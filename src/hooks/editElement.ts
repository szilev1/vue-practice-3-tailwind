import { ref, type Ref } from 'vue'
import { TYPE, useToast } from 'vue-toastification'
// External imports
import { useItemStore } from '@/stores/items'
import type { Item } from '@/stores/types'
import databaseURL from '@/config/app.settings'
import { toastOptions } from '@/config/toast.config'

export default function useEditElement() {
  // Refs
  const isEditing: Ref<boolean> = ref(false)

  // Hooks
  const itemStore = useItemStore()
  const toast = useToast()

  // Methods
  const handleEditElement = (editedElement: Item) => {
    isEditing.value = true

    fetch(`${databaseURL}/elements/${editedElement.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: editedElement.name,
        description: editedElement.description
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
        isEditing.value = false
        const updatedElement = {
          id: editedElement.id,
          name: data.name,
          description: data.description
        }
        itemStore.editItemSuccess(updatedElement)
        toast.success('Item is successfully edited!', { ...toastOptions, type: TYPE.SUCCESS })
      })
      .catch((error) => {
        console.log(error)
        itemStore.crudFailure(error?.message || 'Client error')
        isEditing.value = false
        toast.error('Failed to edit item!', { ...toastOptions, type: TYPE.ERROR })
      })
  }

  return { handleEditElement, isEditing }
}
