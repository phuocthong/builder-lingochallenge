<template>
  <q-toolbar class="header-toolbar">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo-section">
        <div class="logo-icon">
          <q-icon name="computer" size="24px" color="white" />
        </div>
        <span class="logo-text">Logo</span>
      </div>

      <!-- Navigation -->
      <div class="navigation">
        <router-link to="/" class="nav-link">Trang chủ</router-link>
        <router-link to="/about" class="nav-link">Giới thiệu</router-link>
        <router-link to="/challenge" class="nav-link">Thử thách</router-link>
        <router-link to="/friends" class="nav-link">Bạn bè</router-link>
        <router-link to="/shop" class="nav-link">Cửa hàng</router-link>
      </div>

      <!-- User Stats & Profile -->
      <div class="user-section">
        <template v-if="authStore.isLoggedIn">
          <!-- User Stats -->
          <div class="user-stats">
            <div class="stat-item">
              <q-icon name="emoji_events" size="16px" color="grey-6" class="q-mr-xs" />
              <span class="stat-text"># 45</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">523</span>
              <span class="stat-label">đúng</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Streak:</span>
              <span class="stat-streak">7</span>
            </div>
          </div>

          <!-- User Profile -->
          <div class="user-profile">
            <div class="user-avatar">
              {{ authStore.userAvatar }}
            </div>
            <span class="user-name">{{ authStore.user.name }}</span>
          </div>

          <!-- Logout Button -->
          <q-btn
            class="logout-btn"
            @click="handleLogout"
          >
            <q-icon name="logout" size="16px" class="q-mr-sm" />
            Đăng xuất
          </q-btn>
        </template>

        <template v-else>
          <!-- Login/Register Buttons -->
          <q-btn
            flat
            label="Đăng nhập"
            color="grey-7"
            @click="handleLoginClick"
            class="q-mr-sm"
          />
          <q-btn
            outline
            label="Đăng ký"
            color="primary"
            @click="handleRegisterClick"
          />
        </template>
      </div>
    </div>

    <!-- Login Dialog -->
    <q-dialog v-model="showLoginDialog" persistent>
      <q-card style="min-width: 400px" class="q-pa-md">
        <q-card-section>
          <div class="text-h6 text-center">🚀 Đăng nhập EnglishBot</div>
          <div class="text-subtitle2 text-center text-grey-6">
            Chào mừng bạn trở lại! Hãy đăng nhập để tiếp tục học tập.
          </div>
        </q-card-section>

        <q-card-section>
          <!-- Test Button -->
          <div class="q-mb-md">
            <q-btn
              color="red"
              label="TEST CLICK"
              class="full-width"
              @click="testClick"
            />
          </div>

          <!-- Demo Login Button -->
          <div class="q-mb-lg">
            <q-btn
              color="primary"
              label="🚀 Đăng nhập Demo (Phước Thông)"
              class="full-width q-py-sm"
              @click="doLogin"
            />
            <div class="text-center q-mt-sm text-caption text-grey-6">
              Click để đăng nhập nhanh
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Hủy" @click="showLoginDialog = false" />
          <q-btn
            flat
            label="Chuyển sang Đăng ký"
            color="primary"
            @click="switchToRegister"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Register Dialog -->
    <q-dialog v-model="showRegisterDialog" persistent>
      <q-card style="min-width: 400px" class="q-pa-md">
        <q-card-section>
          <div class="text-h6 text-center">✨ Đăng ký EnglishBot</div>
          <div class="text-subtitle2 text-center text-grey-6">
            Tạo tài khoản mới để bắt đầu hành trình học tiếng Anh!
          </div>
        </q-card-section>

        <q-card-section>
          <!-- Demo Register Button -->
          <div class="q-mb-lg">
            <q-btn
              color="primary"
              label="✨ Đăng ký Demo (Phước Thông)"
              class="full-width q-py-sm"
              @click="() => handleRegister({name: 'Phước Thông', email: 'phuocthoang@demo.com'})"
            />
            <div class="text-center q-mt-sm text-caption text-grey-6">
              Click để tạo tài khoản demo
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Hủy" @click="showRegisterDialog = false" />
          <q-btn
            flat
            label="Đã có tài khoản? Đăng nhập"
            color="primary"
            @click="switchToLogin"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-toolbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const $q = useQuasar()

// Local state for dialogs
const showLoginDialog = ref(false)
const showRegisterDialog = ref(false)

const handleLoginClick = () => {
  console.log('Login button clicked!')
  showRegisterDialog.value = false
  showLoginDialog.value = true
}

const handleRegisterClick = () => {
  console.log('Register button clicked!')
  showLoginDialog.value = false
  showRegisterDialog.value = true
}

const handleLogin = (userData: { name: string; email: string }) => {
  console.log('Login handler called with:', userData)
  authStore.login(userData)
  showLoginDialog.value = false
  $q.notify({
    type: "positive",
    message: `Ch��o mừng ${userData.name}!`,
    position: "top",
  })
  router.push('/chat')
}

const handleRegister = (userData: { name: string; email: string }) => {
  console.log('Register handler called with:', userData)
  authStore.login(userData)
  showRegisterDialog.value = false
  $q.notify({
    type: "positive",
    message: `Đăng ký thành công! Chào mừng ${userData.name}!`,
    position: "top",
  })
  router.push('/chat')
}

const switchToRegister = () => {
  showLoginDialog.value = false
  showRegisterDialog.value = true
}

const switchToLogin = () => {
  showRegisterDialog.value = false
  showLoginDialog.value = true
}

const testClick = () => {
  alert('TEST BUTTON HOẠT ĐỘNG!')
  console.log('Test button clicked!')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.header-toolbar {
  background: white;
  border-bottom: 1px solid #E5E7EB;
  color: #111827;
  min-height: 73px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  gap: 148px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  display: flex;
  padding: 8px;
  border-radius: 8px;
  background: #6D28D9;
}

.logo-text {
  color: #111827;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #F3F4F6;
  color: #111827;
}

.nav-link.router-link-active {
  color: #2563EB;
  font-weight: 600;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-text {
  color: #4B5563;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.stat-number {
  color: #16A34A;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.stat-label {
  color: #4B5563;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.stat-streak {
  color: #2563EB;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #6D28D9;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.user-name {
  color: #111827;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.logout-btn {
  padding: 10px 12px;
  border: 1px solid #E2E8F0;
  background: white;
  border-radius: 6px;
  color: black;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

.logout-btn:hover {
  background: #F8F9FA;
}
</style>
