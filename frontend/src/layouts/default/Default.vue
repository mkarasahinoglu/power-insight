<template>
  <v-app class="bg-black">
    <default-bar />
    <default-view />
    <snackbar />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import Snackbar from "@/components/Snackbar.vue"
</script>
