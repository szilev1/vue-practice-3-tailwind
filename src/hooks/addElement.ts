import { ref } from 'vue'
import { useItemStore } from '@/stores/items'

export default function useAddElement() {
  // Constants
  //   const databaseUrl = process.env.DATABASE_URL

  // Refs
  const isCreating = ref(false)

  // Hooks
  const itemStore = useItemStore()

  // Methods
  const handleAddElement = (newElement) => {
    isCreating.value = true

    //--
    fetch('https://vue-demo-31-default-rtdb.europe-west1.firebasedatabase.app/elements.json', {
      // fetch(`${databaseUrl}/elements`, {
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
        alert('Element successfully created')
        console.log('Firebase response:', data)
        //--
        const createdElement = {
          id: data.name,
          name: newElement.name,
          description: newElement.description
        }
        itemStore.createItemSuccess(createdElement)
      })
      .catch((error) => {
        console.log(error)
        itemStore.crudFailure(error?.message || 'Client error')
        isCreating.value = false
      })
  }

  return { handleAddElement, isCreating }
}
