import { ref, type Ref } from 'vue'

import { useItemStore } from '@/stores/items'

export default function useRemoveElement() {
  // Hooks
  const itemStore = useItemStore()

  // Refs
  const isRemoving: Ref<boolean> = ref(false)

  // Methods
  const handleRemoveElement = (elementId: string) => {
    isRemoving.value = true

    fetch(
      `https://vue-demo-31-default-rtdb.europe-west1.firebasedatabase.app/elements/${elementId}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then((response) => {
        isRemoving.value = false
        if (response.ok) {
          alert('Element succesfully removed')
          itemStore.deleteItemSuccess(elementId)
        } else {
          itemStore.error = 'Api error'
        }
      })
      .catch((error) => {
        console.log(error)
        itemStore.crudFailure(error?.message || 'Client error')
        isRemoving.value = false
        // errorRemove.value = error.message
      })
  }

  return { handleRemoveElement, isRemoving }
}
