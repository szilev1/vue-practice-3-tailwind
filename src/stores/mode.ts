import { defineStore } from 'pinia'

export default defineStore('modal', {
  state: () => ({
    isNightMode: false
  }),
  // getters: {
  //   toggleNightMode(state) {
  //     console.log('clicked toggleNightMode')
  //     return !state.isNightMode
  //   }
  // },
  actions: {
    toggleNightMode() {
      console.log('clicked toggleNightMode')
      console.log(this.isNightMode);
      this.isNightMode = !this.isNightMode
    }
  }
})
