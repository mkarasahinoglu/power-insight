<template>
  <v-app-bar flat class="bg-black d-flex align-center">
    <v-app-bar-title class="mt-2 d-none d-sm-flex">
      <v-img src="/src/assets/logo.png" :width="200" aspect-ratio="16/9" cover class="pa-2" @click="router.push('/')"></v-img>
    </v-app-bar-title>
    <v-app-bar-title class="mt-2 d-flex d-sm-none" :width="50" style="min-width: 50px;">
      <v-img src="../../../public/favicon.ico" :width="50" aspect-ratio="1" cover class="pa-2" @click="router.push('/')"></v-img>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="auth.isLoggedin" class="mt-2 d-none d-sm-flex">
      {{ auth.currentUserName }}
      <v-icon right size="xx-large" class="ml-2">mdi-account-box</v-icon>
      <v-menu activator="parent">
        <v-list
          class="text-end text-white"
          slim
          bg-color="black"
          min-width="200"
        >
          <v-list-item
            :title="$t('message.dashboard')"
            append-icon="mdi-view-dashboard"
            @click="redirectPage('/dashboard')"
            rounded
            class="mb-2"
          ></v-list-item>
          <v-list-item
            :title="$t('message.userSettings')"
            append-icon="mdi-cog"
            @click="redirectPage('/settings')"
            rounded
          >
          </v-list-item>
          <v-list-item
            :title="$t('message.logout')"
            append-icon="mdi-logout"
            @click="handleSignout"
            rounded
          >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
    <v-btn v-if="auth.isLoggedin" class="mt-2 d-flex d-sm-none">
      <v-icon right size="xx-large" class="ml-2">mdi-account-box</v-icon>
      <v-menu activator="parent">
        <v-list
          class="text-white"
          slim
          bg-color="black"
          min-width="48"
        >
          <v-list-item
            append-icon="mdi-view-dashboard"
            @click="redirectPage('/dashboard')"
            rounded
            class="mb-2"
          ></v-list-item>
          <v-list-item
            append-icon="mdi-cog"
            @click="redirectPage('/settings')"
            rounded
          >
          </v-list-item>
          <v-list-item
            append-icon="mdi-logout"
            @click="handleSignout"
            rounded
          >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
    <v-btn class="mt-2">
      <v-icon size="large">mdi-web</v-icon>
      <v-menu activator="parent">
        <v-list class="text-white text-center" slim bg-color="black">
          <v-list-item title="EN" rounded class="mb-2" @click="changeLanguage('en')"></v-list-item>
          <v-list-item title="TR" rounded class="mb-2" @click="changeLanguage('tr')"></v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
  import { authStore } from '@/store/auth'
  import { useRouter } from 'vue-router'
  const auth = authStore()
  const router = useRouter()

  const redirectPage = (path) => {
    if(router.currentRoute.value.path === path)
    {
      router.go()
    } else {
      router.push(path)
    }
    
  }

  const handleSignout = async () => {
    await auth.signout()
    router.push("/")
  }
  
  const changeLanguage = async (locale) => {
    localStorage.setItem("locale", locale)
    router.go()
  }
</script>
