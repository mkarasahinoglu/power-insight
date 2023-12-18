<template>
  <v-container class="d-flex justify-center align-start mt-10">
    <v-row class="d-flex justify-center" v-if="auth.isLoggedin">
      <v-col cols="8">
        <v-card class="bg-white pa-5 rounded" :title="$t('message.userInfo')">
          <v-form class="mb-6" disabled>
            <v-text-field class="mt-2" :label="$t('message.name')" variant="outlined" v-model="currentUser.name"></v-text-field>
            <v-text-field class="mt-2" :label="$t('message.email')" variant="outlined" v-model="currentUser.email"></v-text-field>
            <v-text-field class="mt-2" :label="$t('message.role')" variant="outlined" v-model="currentUser.role"></v-text-field>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { authStore, refreshToken } from '@/store/auth'
  import { onBeforeMount } from 'vue'
  const auth = authStore()
  import { useRouter } from 'vue-router'
  const router = useRouter()
  import { ref } from 'vue'
  const currentUser = ref(JSON.parse(localStorage.getItem("user")))
  onBeforeMount(async () => {
    await refreshToken(() => {
      router.push("/")
    })
  })
</script>