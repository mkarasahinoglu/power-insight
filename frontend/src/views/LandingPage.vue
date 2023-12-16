<template>
  <v-container class="d-flex justify-center align-start fill-height">
    <v-row v-if="!auth.isLoggedin" class="d-flex justify-center">
      <v-col cols="6">
        <v-col cols="12">
          <v-sheet class="d-flex justify-center bg-black">
            <v-tabs v-model="register">
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
            <v-window v-model="register">
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
  </v-container>
</template>

<script setup>
import { ref } from "vue"
import { authStore } from "@/store/auth"
const auth = authStore()
const register = ref(false)
import RegisterComp from "../components/auth/Register.vue"
import LoginComp from "../components/auth/Login.vue"
</script>
