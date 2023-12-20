<template>
  <v-container class="fill-height justify-center">
      <v-sheet width="500" class="pa-5 rounded">
        <v-form @submit.prevent="handleRegister" class="mb-6">
          <v-text-field class="mt-2" v-model="name" :rules="[auth.nameRules.min,auth.nameRules.noNumeric,auth.nameRules.required]" :label="$t('message.name')" variant="outlined"></v-text-field>
          <v-text-field class="mt-2" v-model="email" :rules="[auth.emailRules.email,auth.emailRules.required]" :label="$t('message.email')" variant="outlined"></v-text-field>
          <v-text-field class="mt-2" v-model="password" :label="$t('message.password')"
            :rules="[auth.passwordRules.required,auth.passwordRules.length,auth.passwordRules.numeric,auth.passwordRules.uppercase]" 
            type="password" variant="outlined"></v-text-field>
          <v-select class="mt-2" v-model="role" :items="['Admin','Editor']" :label="$t('message.role')" variant="outlined"></v-select>
          <v-btn class="me-4" type="submit">
            {{ $t("message.register") }}
          </v-btn>
        </v-form>
        <v-alert class="ma-2 pa-2 elevation-1" style="font-size: 12px;" variant="outlined" type="warning" v-show="auth.registerMessage!==null&&auth.registerMessage!==true">
          {{ auth.registerMessage }}
        </v-alert>
        <v-alert class="ma-2 pa-2 elevation-1" style="font-size: 18px;" variant="outlined" type="success" v-show="auth.registerMessage===true">
          {{ $t("message.registerSuccessful") }}
        </v-alert>
      </v-sheet>
  </v-container>  
</template>

<script setup>
  import { authStore } from '@/store/auth'
  import { ref } from 'vue'
  const auth = authStore()

  const name = ref("")
  const email = ref("")
  const password = ref("")
  const role = ref(null)

  const handleRegister = async () => {
    auth.registerMessage = null
    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    }
    
    await auth.register(newUser)

    if(auth.registerMessage===true) {
      name.value=""
      email.value=""
      password.value=""
      role.value=null

      auth.nameRules.min = true
      auth.nameRules.noNumeric = true
      auth.nameRules.required = true
      auth.passwordRules.length = true
      auth.passwordRules.numeric = true
      auth.passwordRules.required = true
      auth.passwordRules.uppercase = true
      auth.emailRules.email = true
      auth.emailRules.required = true
    }
  }
</script>
