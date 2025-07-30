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
            @click="showLogin"
            class="q-mr-sm"
          />
          <q-btn 
            outline
            label="Đăng ký"
            color="primary"
            @click="showRegister"
          />
        </template>
      </div>
    </div>
  </q-toolbar>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const showLogin = inject('showLogin') as () => void
const showRegister = inject('showRegister') as () => void

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
