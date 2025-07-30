<template>
  <div class="fixed-login-buttons" v-if="!authStore.isLoggedIn">
    <button class="login-btn" @click="doLogin">
      🚀 ĐĂNG NHẬP
    </button>
    <button class="register-btn" @click="doRegister">
      ✨ ĐĂNG KÝ
    </button>
    <div class="user-info" v-if="authStore.isLoggedIn">
      Xin chào {{ authStore.user.name }}!
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const $q = useQuasar()

const doLogin = () => {
  console.log('Fixed login button clicked!')
  
  // Directly login without any dialog
  authStore.login({
    name: 'Phước Thông',
    email: 'phuocthoang@demo.com'
  })
  
  $q.notify({
    type: "positive",
    message: `Chào mừng Phước Thông!`,
    position: "top",
  })
  
  // Redirect to chat
  router.push('/chat')
}

const doRegister = () => {
  console.log('Fixed register button clicked!')
  
  // Directly register without any dialog
  authStore.login({
    name: 'Phước Thông',
    email: 'phuocthoang@demo.com'
  })
  
  $q.notify({
    type: "positive",
    message: `Đăng ký thành công! Chào mừng Phước Thông!`,
    position: "top",
  })
  
  // Redirect to chat
  router.push('/chat')
}
</script>

<style scoped>
.fixed-login-buttons {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-btn, .register-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.login-btn {
  background: #2563EB;
  color: white;
}

.login-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.register-btn {
  background: #16A34A;
  color: white;
}

.register-btn:hover {
  background: #15803d;
  transform: translateY(-2px);
}

.user-info {
  padding: 8px 12px;
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 6px;
  font-size: 12px;
  color: #0369a1;
}
</style>
