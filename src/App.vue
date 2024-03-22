<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="py-2 my-2 bg-green-100">
      <RouterLink class="p-2 m-2 hover:bg-green-300" :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink class="p-2 m-2 hover:bg-green-300" :to="{ name: 'about' }">About</RouterLink>
      <RouterLink class="p-2 m-2 hover:bg-green-300" :to="{ name: 'hooks' }">Hooks</RouterLink>
      <RouterLink class="p-2 m-2 hover:bg-green-300" :to="{ name: 'elements' }"
        >Elements</RouterLink
      >
      <RouterLink class="p-2 m-2 hover:bg-green-300" :to="{ name: 'items' }">Items</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 4.75rem 0;
}
body {
  margin: 0;
}
</style>
