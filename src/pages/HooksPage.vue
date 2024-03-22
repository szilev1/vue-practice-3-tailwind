<script setup lang="ts">
import type { Ref } from 'vue'
import useDouble from '@/hooks/double'

const { multiplicand, result }: { multiplicand: Ref<number>; result: Ref<number> } = useDouble()
</script>

<template>
  <main>
    <label htmlFor="multiplicand">Add multiplicand:</label>
    <input class="custom-input" name="multiplicand" type="number" v-model="multiplicand" />
    <span>{{ `Multiplicand * 2 = ${result}` }}</span>
  </main>
</template>
