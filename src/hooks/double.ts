import { ref, type Ref, watch } from 'vue'

export default function useDouble(): { multiplicand: Ref<number>; result: Ref<number> } {
  const multiplicand: Ref<number> = ref(0)
  const result: Ref<number> = ref(0)

  // A watch figyeli a multiplicand változó értékének változását, amely az input mezőbe beírt érték
  // Tehát ha az input mező értéke változik, akkor triggereli a watch-ban lévő fv-t
  watch(multiplicand, function (newValueOfMultiplicand: number) {
    result.value = newValueOfMultiplicand * 2
  })

  return { multiplicand, result }
}
