<template>
  <v-container class="fill-height justify-center">
      <v-sheet width="500" class="pa-5 rounded">
        <v-form @submit.prevent="handleSignin" class="mb-6">
          <v-text-field v-model="email" :label="$t('message.email')" variant="outlined"></v-text-field>
          <v-text-field v-model="password" :label="$t('message.password')" type="password" variant="outlined"></v-text-field>
          <v-checkbox v-model="rememberOption" :label="$t('message.rememberMe')" type="checkbox"></v-checkbox>
          <v-btn class="me-4" type="submit">
            {{ $t("message.login") }}
          </v-btn>
        </v-form>
        <v-alert class="ma-2 pa-2 elevation-1" style="font-size: 12px;" variant="outlined" type="warning" v-show="auth.loginMessage!==null&&auth.loginMessage!==true">
          {{ auth.loginMessage }}
        </v-alert>
      </v-sheet>
  </v-container>
</template>

<script setup>
  import { authStore } from '@/store/auth'
  import { onMounted } from 'vue'
  import { ref } from 'vue'
  const auth = authStore()
  const email = ref("")
  const password = ref("")
  const rememberOption = ref(false)
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const handleSignin = async () => {
    auth.loginMessage = null
    const signInUser = {
      email : email.value,
      password : password.value
    }
    await auth.signin(signInUser,rememberOption.value)
    router.push('/')  
  }

  onMounted(() => {
    const rememberedUser = JSON.parse(localStorage.getItem("rememberUser"))
    if(rememberedUser) {
      email.value = rememberedUser.email
      password.value = rememberedUser.password
      rememberOption.value = true
    }
  })
</script>