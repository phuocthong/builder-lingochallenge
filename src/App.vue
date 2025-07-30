<template>
  <div id="q-app">
    <q-layout view="hHh lpR fFf">
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

const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const authStore = useAuthStore();

const showLoginDialog = ref(false);
const showRegisterDialog = ref(false);

// Provide methods to show dialogs globally
provide("showLogin", () => {
  showRegisterDialog.value = false;
  showLoginDialog.value = true;
});

provide("showRegister", () => {
  showLoginDialog.value = false;
  showRegisterDialog.value = true;
});

const handleLogin = (userData: { name: string; email: string }) => {
  console.log('App.vue handleLogin called with:', userData);
  authStore.login(userData);
  showLoginDialog.value = false;
  $q.notify({
    type: "positive",
    message: `Chào mừng ${userData.name}!`,
    position: "top",
  });
  // Redirect to chat page after login
  console.log('Redirecting to chat...');
  $router.push('/chat');
};

const handleRegister = (userData: { name: string; email: string }) => {
  authStore.login(userData);
  showRegisterDialog.value = false;
  $q.notify({
    type: "positive",
    message: `Đăng ký thành công! Chào mừng ${userData.name}!`,
    position: "top",
  });
  // Redirect to chat page after register
  $router.push('/chat');
};

const switchToRegister = () => {
  showLoginDialog.value = false;
  showRegisterDialog.value = true;
};

const switchToLogin = () => {
  showRegisterDialog.value = false;
  showLoginDialog.value = true;
};
</script>

<style>
#q-app {
  font-family: 'Inter', -apple-system, Roboto, Helvetica, sans-serif;
}
</style>
