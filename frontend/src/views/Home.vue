<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <h1 v-if="auth.isLoggedin">Home</h1>
  </v-container>
  
</template>

<script setup>
import { authStore } from "@/store/auth"
import { onMounted } from "vue"
const auth = authStore()
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(()=> {
  if(!auth.isLoggedin) router.push("/")
})
</script>