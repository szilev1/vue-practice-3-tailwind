import { ref } from 'vue'

export default function useAddElem() {
  // Refs
  const elementName = ref(null)
  const elementDescription = ref(null)

  // Methods
  function handleSubmit(
    emit: (arg0: string, arg1: { id: number; name: null; description: null }) => void
  ) {
    const newElement = newElementParameters()
    emit('handle-add-element', newElement)
  }

  function handleReset() {
    elementName.value = null
    elementDescription.value = null
  }

  // Utils
  function newElementParameters() {
    const element = {
      id: createId(),
      name: elementName.value,
      description: elementDescription.value
    }
    return element
  }

  function createId() {
    const currentDate = new Date()
    return Math.floor(currentDate.getTime() / 1000)
  }

  return { elementName, elementDescription, handleSubmit, handleReset }
}
