<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <h1 v-if="auth.isLoggedin">Welcome !</h1>
    <v-btn class="ma-2 pa-2" v-if="auth.isLoggedin" @click="handleSignout">Sign Out</v-btn>
  </v-container>
  
</template>

<script setup>
import { authStore } from "@/store/auth"
import { onMounted } from "vue"
const auth = authStore()
import { useRouter } from 'vue-router'
const router = useRouter()

const handleSignout = async () => {
  await auth.signout()

  router.push("/")
}

onMounted(()=> {
  if(!auth.isLoggedin) router.push("/")
})
</script>