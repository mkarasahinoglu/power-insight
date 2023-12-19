<template>
  <v-snackbar v-model="snackbar" color="warning" variant="flat" rounded>
     <span class="d-flex justify-center">{{errorMessage}}</span>
  </v-snackbar>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useErrorStore } from '@/store/error'

const errorStore = useErrorStore()
const snackbar = ref(false)

watchEffect(() => {
  snackbar.value = errorStore.getError !== null
  if (snackbar.value) {
    errorMessage = errorStore.getError
    setTimeout(() => {
      errorStore.clearError()
    }, 5000)
  }
})

let errorMessage = ""
</script>
