<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-gradient-to-r from-purple-600 to-blue-600">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-mr-sm"
        />

        <q-toolbar-title class="flex items-center">
          <q-icon name="smart_toy" size="sm" class="q-mr-sm" />
          <span class="text-weight-bold">English<span class="text-purple-200">Bot</span></span>
        </q-toolbar-title>

        <!-- Desktop Navigation -->
        <div class="gt-sm q-gutter-sm">
          <q-btn flat label="🏠 Trang chủ" to="/" />
          <q-btn flat label="⚡ Thách đấu" to="/challenge" />
          <q-btn flat label="👥 Bạn bè" to="/friends" />
          <q-btn v-if="authStore.isLoggedIn" flat label="👤 Hồ sơ" to="/profile" />
        </div>

        <!-- Auth Section -->
        <div class="q-ml-md">
          <template v-if="authStore.isLoggedIn">
            <!-- User Stats (Desktop) -->
            <div class="gt-md inline-flex items-center q-mr-md bg-white bg-opacity-20 rounded q-pa-xs">
              <q-chip dense color="amber" text-color="dark" icon="emoji_events">
                #{{ authStore.user.stats?.rank }}
              </q-chip>
              <q-chip dense color="red" text-color="white" icon="local_fire_department">
                {{ authStore.user.stats?.streak }}
              </q-chip>
              <q-chip dense color="green" text-color="white">
                {{ authStore.user.stats?.totalCorrect }}
              </q-chip>
            </div>

            <!-- User Avatar & Menu -->
            <q-btn-dropdown flat round>
              <template v-slot:label>
                <q-avatar color="primary" text-color="white" size="md">
                  {{ authStore.user.avatar }}
                </q-avatar>
              </template>
              
              <q-list>
                <q-item clickable v-close-popup @click="$router.push('/profile')">
                  <q-item-section avatar>
                    <q-icon name="person" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Hồ sơ cá nhân</q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-separator />
                
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section avatar>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Đăng xuất</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </template>

          <template v-else>
            <q-btn flat label="Đăng ký" @click="showRegisterDialog = true" class="q-mr-sm" />
            <q-btn unelevated color="white" text-color="primary" label="Đăng nhập" @click="showLoginDialog = true" />
          </template>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="280"
      :breakpoint="1024"
      bordered
      class="bg-grey-1"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item-label header class="text-purple-8 text-weight-bold">
            ĐIỀU HƯỚNG
          </q-item-label>

          <q-item clickable :active="$route.path === '/'" to="/" v-ripple>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Trang chủ</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable :active="$route.path === '/challenge'" to="/challenge" v-ripple>
            <q-item-section avatar>
              <q-icon name="flash_on" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Thách đấu</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable :active="$route.path === '/friends'" to="/friends" v-ripple>
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Bạn bè</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="authStore.isLoggedIn" clickable :active="$route.path === '/profile'" to="/profile" v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Hồ sơ</q-item-label>
            </q-item-section>
          </q-item>

          <template v-if="authStore.isLoggedIn">
            <q-separator class="q-my-md" />
            
            <q-item-label header class="text-purple-8 text-weight-bold">
              THÔNG TIN
            </q-item-label>

            <q-item>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ authStore.user.avatar }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">{{ authStore.user.name }}</q-item-label>
                <q-item-label caption>@{{ authStore.user.name.toLowerCase().replace(' ', '') }}</q-item-label>
              </q-item-section>
            </q-item>

            <!-- Mobile Stats -->
            <div class="q-pa-md">
              <div class="row q-gutter-sm">
                <div class="col bg-amber-1 rounded-borders q-pa-sm text-center">
                  <div class="text-amber-8 text-weight-bold">{{ authStore.user.stats?.rank }}</div>
                  <div class="text-caption text-grey-7">Hạng</div>
                </div>
                <div class="col bg-red-1 rounded-borders q-pa-sm text-center">
                  <div class="text-red-8 text-weight-bold">{{ authStore.user.stats?.streak }}</div>
                  <div class="text-caption text-grey-7">Streak</div>
                </div>
                <div class="col bg-green-1 rounded-borders q-pa-sm text-center">
                  <div class="text-green-8 text-weight-bold">{{ authStore.user.stats?.totalCorrect }}</div>
                  <div class="text-caption text-grey-7">Đúng</div>
                </div>
              </div>
            </div>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Login Dialog -->
    <q-dialog v-model="showLoginDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Đăng nhập</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="loginForm.name"
            autofocus
            label="Tên hiển thị"
            class="q-mb-md"
          />
          <q-input
            dense
            v-model="loginForm.email"
            label="Email"
            type="email"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Hủy" v-close-popup />
          <q-btn flat label="Đăng ký" @click="switchToRegister" />
          <q-btn flat label="Đăng nhập" @click="handleLogin" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Register Dialog -->
    <q-dialog v-model="showRegisterDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Đăng ký tài khoản</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="registerForm.name"
            autofocus
            label="Tên hiển thị"
            class="q-mb-md"
          />
          <q-input
            dense
            v-model="registerForm.email"
            label="Email"
            type="email"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Hủy" v-close-popup />
          <q-btn flat label="Đăng nhập" @click="switchToLogin" />
          <q-btn flat label="Đăng ký" @click="handleRegister" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const leftDrawerOpen = ref(false)
const showLoginDialog = ref(false)
const showRegisterDialog = ref(false)

const loginForm = ref({
  name: '',
  email: ''
})

const registerForm = ref({
  name: '',
  email: ''
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function handleLogin() {
  if (loginForm.value.name && loginForm.value.email) {
    authStore.login({
      name: loginForm.value.name,
      email: loginForm.value.email
    })
    showLoginDialog.value = false
    loginForm.value = { name: '', email: '' }
  }
}

function handleRegister() {
  if (registerForm.value.name && registerForm.value.email) {
    authStore.login({
      name: registerForm.value.name,
      email: registerForm.value.email
    })
    showRegisterDialog.value = false
    registerForm.value = { name: '', email: '' }
  }
}

function switchToRegister() {
  showLoginDialog.value = false
  showRegisterDialog.value = true
}

function switchToLogin() {
  showRegisterDialog.value = false
  showLoginDialog.value = true
}

function logout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(to right, #7c3aed, #3b82f6);
}
</style>
