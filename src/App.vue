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

      <!-- Global Dialogs -->
      <LoginDialog
        v-model="showLoginDialog"
        @login="handleLogin"
        @switch-to-register="switchToRegister"
      />

      <RegisterDialog
        v-model="showRegisterDialog"
        @register="handleRegister"
        @switch-to-login="switchToLogin"
      />
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
import LoginDialog from "./components/dialogs/LoginDialog.vue";
import RegisterDialog from "./components/dialogs/RegisterDialog.vue";
import { useAuthStore } from "./stores/auth";

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
  authStore.login(userData);
  showLoginDialog.value = false;
  $q.notify({
    type: "positive",
    message: `Chào mừng ${userData.name}!`,
    position: "top",
  });
  // Redirect to chat page after login
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
