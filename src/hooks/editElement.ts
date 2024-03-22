import { ref, type Ref } from 'vue'
import { useItemStore } from '@/stores/items'
import type { Item } from '@/stores/types'

const DATABASE_URL = 'https://vue-demo-31-default-rtdb.europe-west1.firebasedatabase.app'

export default function useEditElement() {
  // Refs
  const isEditing: Ref<boolean> = ref(false)

  // Hooks
  const itemStore = useItemStore()

  // Methods
  const handleEditElement = (editedElement: Item) => {
    isEditing.value = true
    //--
    console.log('editedElement in hook', editedElement)

    //--
    fetch(`${DATABASE_URL}/elements/${editedElement.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: editedElement.name,
        description: editedElement.description
      })
    })
      // .then((response) => {
      //   isEditing.value = false
      //   if (response.ok) {
      //     alert('Element succesfully edited')
      //     //--
      //     //emit('get-element-list')
      //     // getElementList()
      //   } else {
      //     throw new Error('Could not save data!')
      //   }
      // })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Could not save data!')
        }
      })
      .then((data) => {
        isEditing.value = false
        alert('Element successfully created')
        console.log('Firebase response:', data)
        //--
        const updatedElement = {
          id: editedElement.id,
          name: data.name,
          description: data.description
        }
        itemStore.editItemSuccess(updatedElement)
        //-- return createdElement
      })
      .catch((error) => {
        console.log(error)
        itemStore.crudFailure(error?.message || 'Client error')
        isEditing.value = false
      })
  }

  return { handleEditElement, isEditing }
}
