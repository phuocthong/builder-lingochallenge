<template>
  <div id="q-app">
    <q-layout view="hHh lpR fFf">
      <!-- Fixed Login Buttons -->
      <FixedLoginButtons />

      <!-- Header -->
      <q-header class="bg-white text-dark" v-if="$route.name !== 'Chat'">
        <HeaderComponent />
      </q-header>

      <!-- Page Content -->
      <q-page-container>
        <router-view />
      </q-page-container>

      <!-- Dialogs are now handled locally in each component -->
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";

const $route = useRoute();
</script>

<style>
#q-app {
  font-family: 'Inter', -apple-system, Roboto, Helvetica, sans-serif;
}
</style>
