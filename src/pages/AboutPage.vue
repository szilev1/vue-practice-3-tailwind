<template>
  <div class="flex flex-col items-center">
    <h1 class="text-[#42b883]">This is an about page</h1>
    <p class="text-custom-green">This is an about page</p>
    <div class="[mask-type:luminance]">This is an about page</div>
    <div class="bg-[#bada55] text-[22px] before:content-['Sajt']">
      <!-- ... -->
    </div>
    <!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
    <img class="w-16 md:w-32 lg:w-48" src="@/assets/logo.png" alt="Vue logo" />
    <!-- Width of 16 by default, but 32 when screen width is >= 768 and <= 1024 and
      16 when sceen width is > 1024 -->
    <img class="w-16 md:max-lg:w-32" src="@/assets/logo.png" alt="Vue logo" />
    <!-- Width of 16 by default, but 32 ceen width is >= 768 and <= 1024 and
      48 when sceen width is >= 1024 -->
    <img class="w-16 md:max-lg:w-32 lg:w-48" src="@/assets/logo.png" alt="Vue logo" />
    <p class="text-2xl tablet:text-5xl">This is a text with a custom breakpoint</p>
    <p class="min-[420px]:text-gray-50 max-[600px]:bg-sky-300">
      This is a text with breakpoints added by arbitrary values
    </p>
    <div class="custom-utility w-40 h-10"></div>
    <div class="custom-background w-40 h-10"></div>
    <div class="custom-margin custom-background w-40 h-10"></div>
    <div class="custom-margin-2 custom-background-2 w-40 h-10"></div>
    <ButtonTag
      @click="toggleDarkMode"
      :subtitle="isDarkMode ? 'Set light mode' : 'Set dark mode'"
    />
    <ButtonTag @click="handleChangePage" :subtitle="'Back to main page'" />
  </div>
</template>

<!-- Composition API no setup synatx -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useModeStore from '@/stores/mode'
import ButtonTag from '@/components/ButtonTag.vue'

// Hooks
const router = useRouter()
const modeStore = useModeStore() // Access the Pinia store instance

// Computed
const isDarkMode = computed(() => {
  return modeStore.isNightMode // Accessing the isNightMode variable from your store
})

// Methods
const toggleDarkMode = () => {
  modeStore.toggleNightMode() // Call the method to toggle the mode
}

const handleChangePage = () => router.push({ name: 'home' })
</script>

<!-- Composition API no setup synatx -->
<!-- <script>
import { computed } from 'vue'
import useModeStore from '@/stores/mode'
import ButtonTag from '@/components/ButtonTag.vue'

export default {
  name: 'AboutPage',
  components: { ButtonTag },
  //props: ['pid'],
  setup() {
    // const a = computed(() => props)
    // console.log('props: ', a)

    const modeStore = useModeStore() // Access the Pinia store instance
    const isDarkMode = computed(() => {
      return modeStore.isNightMode // Accessing the isNightMode variable from your store
    })
    const toggleDarkMode = () => {
      modeStore.toggleNightMode() // Call the method to toggle the mode
    }
    return {
      isDarkMode,
      toggleDarkMode
    }
  }
}
</script> -->
