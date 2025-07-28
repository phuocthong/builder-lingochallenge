<template>
  <q-page class="bg-gradient-to-br from-purple-50 to-blue-50">
    <div class="q-pa-md">
      <div class="row items-center justify-between q-mb-lg">
        <div>
          <div class="text-h4 text-weight-bold">👥 Bạn bè</div>
          <div class="text-grey-6">Kết nối và thách đấu với bạn bè</div>
        </div>
        <q-btn color="primary" icon="person_add" label="Thêm bạn" />
      </div>

      <div v-if="!authStore.isLoggedIn" class="text-center q-pa-xl">
        <q-card class="q-pa-lg">
          <q-icon name="people" size="xl" color="grey-5" />
          <div class="text-h6 q-mt-md">Đăng nhập để xem bạn bè</div>
          <div class="text-grey-6 q-mt-sm">Kết nối với bạn bè và thách đấu cùng nhau</div>
        </q-card>
      </div>

      <div v-else class="row q-gutter-md">
        <div v-for="friend in friends" :key="friend.id" class="col-12 col-sm-6 col-md-4">
          <q-card class="friend-card">
            <q-card-section>
              <div class="row items-center q-mb-md">
                <q-avatar size="lg" color="primary" text-color="white" class="q-mr-md">
                  {{ friend.avatar }}
                </q-avatar>
                <div class="col">
                  <div class="text-h6 text-weight-medium">{{ friend.name }}</div>
                  <div class="text-caption text-grey-6">Level {{ friend.level }}</div>
                </div>
                <q-chip 
                  :color="getStatusColor(friend.status)" 
                  text-color="white" 
                  size="sm"
                >
                  {{ getStatusText(friend.status) }}
                </q-chip>
              </div>

              <div class="row q-gutter-sm q-mb-md">
                <div class="col bg-yellow-1 rounded-borders q-pa-sm text-center">
                  <div class="text-caption text-grey-6">Điểm</div>
                  <div class="text-h6 text-weight-bold text-yellow-8">{{ friend.points.toLocaleString() }}</div>
                </div>
                <div class="col bg-red-1 rounded-borders q-pa-sm text-center">
                  <div class="text-caption text-grey-6">Streak</div>
                  <div class="text-h6 text-weight-bold text-red-8">{{ friend.streak }}</div>
                </div>
              </div>

              <div class="row q-gutter-sm">
                <q-btn 
                  size="sm" 
                  outline 
                  color="blue" 
                  icon="chat" 
                  label="Nhắn tin" 
                  class="col"
                  @click="sendMessage(friend)"
                />
                <q-btn 
                  size="sm" 
                  outline 
                  color="orange" 
                  icon="flash_on" 
                  :label="friend.status === 'in-game' ? 'Đang chơi' : !friend.isOnline ? 'Offline' : 'Thách đấu'"
                  class="col"
                  :disable="!friend.isOnline || friend.status === 'in-game'"
                  @click="challengeFriend(friend)"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { Notify } from 'quasar'

const authStore = useAuthStore()

interface Friend {
  id: string
  name: string
  avatar: string
  level: number
  points: number
  status: 'online' | 'offline' | 'in-game'
  streak: number
  isOnline: boolean
}

const friends = ref<Friend[]>([])

onMounted(() => {
  friends.value = [
    {
      id: '1',
      name: 'Minh Anh',
      avatar: 'MA',
      level: 15,
      points: 2850,
      status: 'online',
      streak: 12,
      isOnline: true
    },
    {
      id: '2',
      name: 'Đức Huy',
      avatar: 'DH',
      level: 22,
      points: 4200,
      status: 'in-game',
      streak: 8,
      isOnline: true
    },
    {
      id: '3',
      name: 'Thu Hà',
      avatar: 'TH',
      level: 18,
      points: 3150,
      status: 'offline',
      streak: 5,
      isOnline: false
    },
    {
      id: '4',
      name: 'Văn Nam',
      avatar: 'VN',
      level: 12,
      points: 1800,
      status: 'online',
      streak: 3,
      isOnline: true
    }
  ]
})

function getStatusColor(status: string) {
  switch (status) {
    case 'online': return 'green'
    case 'in-game': return 'blue'
    case 'offline': return 'grey'
    default: return 'grey'
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'online': return 'Online'
    case 'in-game': return 'Đang chơi'
    case 'offline': return 'Offline'
    default: return 'Unknown'
  }
}

function sendMessage(friend: Friend) {
  Notify.create({
    type: 'info',
    message: `💬 Gửi tin nhắn cho ${friend.name}!`,
    caption: 'Tính năng chat sẽ được phát triển trong phiên bản tiếp theo.',
    position: 'top'
  })
}

function challengeFriend(friend: Friend) {
  if (!friend.isOnline) {
    Notify.create({
      type: 'warning',
      message: `😔 ${friend.name} hiện đang offline!`,
      position: 'top'
    })
    return
  }

  if (friend.status === 'in-game') {
    Notify.create({
      type: 'warning',
      message: `🎮 ${friend.name} đang trong trận đấu khác!`,
      position: 'top'
    })
    return
  }

  Notify.create({
    type: 'positive',
    message: `⚡ Đã gửi lời mời thách đấu cho ${friend.name}!`,
    position: 'top'
  })
}
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #f3f4f6, #dbeafe);
}

.friend-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.friend-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
