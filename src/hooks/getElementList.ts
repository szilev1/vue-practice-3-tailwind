import { useItemStore } from '@/stores/items'

const DATABASE_URL = 'https://vue-demo-31-default-rtdb.europe-west1.firebasedatabase.app'
// const databaseUrl = process.env.VUE_APP_DATABASE_URL

export default function useGetElementList() {
  const itemStore = useItemStore()

  function getElementList() {
    itemStore.isLoading = true

    fetch(`${DATABASE_URL}/elements.json`)
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
        //--
        console.log('Loaded list', elements)
        //--
        itemStore.getItemListSuccess(elements)
      })
      .catch((error) => {
        console.log(error)
        itemStore.crudFailure(error?.message || 'Client error')
      })
  }

  return { getElementList }
}
