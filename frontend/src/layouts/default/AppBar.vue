<template>
  <v-app-bar flat class="bg-black d-flex align-center">
    <v-app-bar-title class="mt-2 d-none d-sm-flex">
      <v-img src="/src/assets/logo.png" :width="200" aspect-ratio="16/9" cover class="pa-2" @click="router.push('/home')"></v-img>
    </v-app-bar-title>
    <v-app-bar-title class="mt-2 d-flex d-sm-none" :width="50" style="min-width: 50px;">
      <v-img src="../../../public/favicon.ico" :width="50" aspect-ratio="1" cover class="pa-2" @click="router.push('/home')"></v-img>
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
            title="Dashboard"
            append-icon="mdi-view-dashboard"
            @click="redirectDashboard"
            rounded
            class="mb-2"
            
          ></v-list-item>
          <v-list-item
            title="User Settings"
            append-icon="mdi-cog"
            @click=""
            rounded
          >
          </v-list-item>
          <v-list-item
            title="Sign Out"
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
            @click="redirectDashboard"
            rounded
            class="mb-2"
          ></v-list-item>
          <v-list-item
            append-icon="mdi-cog"
            @click=""
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
  </v-app-bar>
</template>

<script setup>
  import { authStore } from '@/store/auth'
  const auth = authStore()
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const redirectDashboard = () => {
    console.log(router.push("/dashboard"))
    router.push("/dashboard")
  }

  const handleSignout = async () => {
    await auth.signout()
    router.push("/")
  }

</script>
