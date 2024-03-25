import { ref, type Ref } from 'vue'
import { TYPE, useToast } from 'vue-toastification'
// External imports
import { useItemStore } from '@/stores/items'
import databaseURL from '@/config/app.settings'
import { toastOptions } from '@/config/toast.config'

export default function useRemoveElement() {
  // Hooks
  const itemStore = useItemStore()
  const toast = useToast()

  // Refs
  const isRemoving: Ref<boolean> = ref(false)

  // Methods
  const handleRemoveElement = (elementId: string) => {
    isRemoving.value = true

    fetch(`${databaseURL}/elements/${elementId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        isRemoving.value = false
        if (response.ok) {
          itemStore.deleteItemSuccess(elementId)
          toast.success('Item is successfully removed!', { ...toastOptions, type: TYPE.SUCCESS })
        } else {
          itemStore.error = 'Api error'
        }
      })
      .catch((error) => {
        console.log(error)
        itemStore.crudFailure(error?.message || 'Client error')
        isRemoving.value = false
        toast.error('Failed to remove item!', { ...toastOptions, type: TYPE.ERROR })
      })
  }

  return { handleRemoveElement, isRemoving }
}
