<template>
  <q-page class="bg-grey-1">
    <!-- Kiểm tra đăng nhập -->
    <div v-if="!authStore.isLoggedIn" class="flex items-center justify-center min-h-screen">
      <q-card class="max-w-md mx-auto">
        <q-card-section class="text-center">
          <q-icon name="lock" size="xl" color="grey-5" class="q-mb-md" />
          <h2 class="text-h5 q-mb-md">🔒 Yêu cầu đăng nhập</h2>
          <p class="text-grey-6 q-mb-lg">
            Bạn cần đăng nhập để xem hồ sơ cá nhân
          </p>
          <q-btn 
            color="primary" 
            label="Quay lại trang chủ"
            @click="$router.push('/')"
          />
        </q-card-section>
      </q-card>
    </div>

    <!-- Giao diện Profile chính -->
    <div v-else class="q-pa-md">
      <!-- Mobile Navigation -->
      <div class="lt-lg q-mb-md">
        <q-card>
          <q-card-section class="q-pa-md">
            <div class="flex items-center justify-between">
              <h1 class="text-h6 q-ma-none">Profile</h1>
              <q-select
                v-model="activeTab"
                :options="sidebarOptions"
                option-value="id"
                option-label="label"
                emit-value
                map-options
                outlined
                dense
                style="min-width: 150px"
              >
                <template v-slot:prepend>
                  <q-icon :name="getCurrentTabIcon()" />
                </template>
              </q-select>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-gutter-md">
        <!-- Desktop Sidebar -->
        <div class="col-auto gt-md">
          <q-card class="q-pa-md" style="width: 280px">
            <q-list>
              <q-item
                v-for="item in sidebarOptions"
                :key="item.id"
                clickable
                v-ripple
                :active="activeTab === item.id"
                active-class="bg-purple-1 text-purple-8"
                @click="activeTab = item.id"
                class="q-mb-xs rounded-borders"
              >
                <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-medium">{{ item.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>

        <!-- Main Content -->
        <div class="col">
          <!-- Dashboard Tab -->
          <div v-if="activeTab === 'dashboard'">
            <DashboardTab />
          </div>

          <!-- Friends Tab -->
          <div v-else-if="activeTab === 'friends'">
            <FriendsTab />
          </div>

          <!-- Add Friends Tab -->
          <div v-else-if="activeTab === 'add-friends'">
            <AddFriendsTab />
          </div>

          <!-- Tasks Tab -->
          <div v-else-if="activeTab === 'tasks'">
            <TasksTab />
          </div>

          <!-- Exchange Tab -->
          <div v-else-if="activeTab === 'exchange'">
            <ExchangeTab />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import DashboardTab from '../components/profile/DashboardTab.vue'
import FriendsTab from '../components/profile/FriendsTab.vue'
import AddFriendsTab from '../components/profile/AddFriendsTab.vue'
import TasksTab from '../components/profile/TasksTab.vue'
import ExchangeTab from '../components/profile/ExchangeTab.vue'

const authStore = useAuthStore()
const activeTab = ref('dashboard')

const sidebarOptions = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'friends', label: 'Bạn bè', icon: 'people' },
  { id: 'add-friends', label: 'Thêm bạn bè', icon: 'person_add' },
  { id: 'tasks', label: 'Nhiệm vụ', icon: 'assignment' },
  { id: 'exchange', label: 'Đổi điểm', icon: 'credit_card' }
]

const getCurrentTabIcon = () => {
  const currentTab = sidebarOptions.find(item => item.id === activeTab.value)
  return currentTab?.icon || 'home'
}
</script>
