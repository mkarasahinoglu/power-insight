<template>
  <v-container class="d-flex justify-center align-start">
    <v-row v-if="!auth.isLoggedin" class="d-flex justify-center">
      <v-col cols="8">
        <v-col cols="12">
          <v-sheet class="d-flex justify-center bg-black">
            <v-tabs v-model="tabChange">
              <v-tab>
                Login
              </v-tab>
              <v-tab>
                Register
              </v-tab>
            </v-tabs>
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <v-sheet class="d-flex justify-center bg-black">
            <v-window v-model="tabChange">
              <v-window-item>
                <login-comp />
              </v-window-item>
              <v-window-item>
                <register-comp />
              </v-window-item>
            </v-window>
          </v-sheet>
        </v-col>
      </v-col>
    </v-row>
    <h1 v-else>Welcome !</h1>
  </v-container>
</template>

<script setup>
import { ref } from "vue"
import { authStore, refreshToken } from "@/store/auth"
const auth = authStore()
const tabChange = ref(false)
import RegisterComp from "../components/auth/Register.vue"
import LoginComp from "../components/auth/Login.vue"
import { onMounted } from "vue"

onMounted(async () => {
  await refreshToken()
})
</script>
