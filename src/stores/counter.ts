import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count: Ref<number> = ref(0)

  const doubleCount: ComputedRef<number> = computed(() => count.value * 2)

  function increment(): number {
    return count.value++
  }

  return { count, doubleCount, increment }
})
