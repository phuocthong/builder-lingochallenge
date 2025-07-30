<template>
  <q-toolbar class="text-white">
    <q-toolbar-title>
      <!-- Logo -->
      <div class="row items-center q-gutter-sm">
        <q-icon name="school" size="md" />
        <span class="text-h6 text-weight-bold">EnglishBot</span>
      </div>
    </q-toolbar-title>

    <!-- Desktop Navigation -->
    <div class="gt-sm row items-center q-gutter-lg">
      <router-link 
        to="/" 
        class="text-white text-decoration-none"
        active-class="text-blue-2"
      >
        Trang chủ
      </router-link>
      <router-link 
        to="/about" 
        class="text-white text-decoration-none"
        active-class="text-blue-2"
      >
        Giới thiệu
      </router-link>
      <router-link 
        to="/challenge" 
        class="text-white text-decoration-none"
        active-class="text-blue-2"
      >
        Thử thách
      </router-link>
    </div>

    <!-- User Actions -->
    <div class="row items-center q-gutter-sm q-ml-md">
      <template v-if="!authStore.isLoggedIn">
        <!-- Login/Register Buttons -->
        <q-btn 
          flat 
          label="Đăng nhập"
          color="white"
          @click="showLogin"
          class="gt-xs"
        />
        <q-btn 
          label="Đăng ký"
          color="white"
          outline
          @click="showRegister"
          class="gt-xs"
        />
      </template>
      
      <template v-else>
        <!-- User Menu -->
        <q-btn flat round>
          <q-avatar color="white" text-color="primary" size="md">
            {{ authStore.userAvatar }}
          </q-avatar>
          
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup @click="$router.push('/profile')">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>Hồ sơ cá nhân</q-item-section>
              </q-item>
              
              <q-item clickable v-close-popup @click="$router.push('/friends')">
                <q-item-section avatar>
                  <q-icon name="people" />
                </q-item-section>
                <q-item-section>Bạn bè</q-item-section>
              </q-item>
              
              <q-separator />
              
              <q-item clickable v-close-popup @click="authStore.logout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>Đăng xuất</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </template>

      <!-- Mobile Menu -->
      <q-btn flat round icon="menu" class="lt-md">
        <q-menu>
          <q-list style="min-width: 150px">
            <q-item clickable v-close-popup @click="$router.push('/')">
              <q-item-section>Trang chủ</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="$router.push('/about')">
              <q-item-section>Giới thiệu</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="$router.push('/challenge')">
              <q-item-section>Thử thách</q-item-section>
            </q-item>
            
            <template v-if="!authStore.isLoggedIn">
              <q-separator />
              <q-item clickable v-close-popup @click="showLogin">
                <q-item-section>Đăng nhập</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="showRegister">
                <q-item-section>Đăng ký</q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const showLogin = inject('showLogin') as () => void
const showRegister = inject('showRegister') as () => void
</script>

<style scoped>
.router-link-active {
  font-weight: 600;
}
</style>
