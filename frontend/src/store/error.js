import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', {
  state: () => ({
    error: null,
  }),
  getters: {
    getError: (state) => state.error,
  },
  actions: {
    handleError(error) {
      this.error = error
    },
    clearError() {
      this.error = null
    },
  },
})