import databaseURL from '@/config/app.settings'
import { useItemStore } from '@/stores/items'

export default function useGetElementList() {
  const itemStore = useItemStore()

  function getElementList() {
    itemStore.isLoading = true

    fetch(`${databaseURL}/elements.json`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        const elements = []
        for (const id in data) {
          elements.push({
            id: id,
            name: data[id].name,
            description: data[id].description
          })
        }

        itemStore.getItemListSuccess(elements)
      })
      .catch((error) => {
        console.log(error)
        itemStore.crudFailure(error?.message || 'Client error')
      })
  }

  return { getElementList }
}
