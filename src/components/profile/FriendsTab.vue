<template>
  <div class="q-gutter-md">
    <!-- Search Header -->
    <div class="row q-gutter-md">
      <div class="col">
        <h3 class="text-h5 text-weight-bold q-ma-none">Bạn bè</h3>
      </div>
      <div class="col-12 col-sm-6">
        <q-input
          v-model="searchTerm"
          placeholder="Tìm kiếm bạn bè..."
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- Friends List -->
    <div class="q-gutter-md">
      <q-card v-for="friend in filteredFriends" :key="friend.id">
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="col row items-center q-gutter-md">
              <q-avatar size="48px">
                <div class="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold rounded-full w-full h-full flex items-center justify-center">
                  {{ friend.avatar }}
                </div>
                <q-badge floating color="yellow" rounded>
                  <q-icon name="star" color="white" size="xs" />
                </q-badge>
              </q-avatar>
              
              <div>
                <h4 class="text-subtitle1 text-weight-medium q-ma-none">{{ friend.name }}</h4>
                <p class="text-grey-6 q-ma-none">{{ friend.username }}</p>
                <div class="text-caption text-yellow-7">
                  ⭐ Đang hoạt động
                </div>
              </div>
            </div>

            <div class="col-auto row q-gutter-xs">
              <q-btn 
                color="primary" 
                icon="bolt" 
                label="Thử thách"
                @click="challengeFriend(friend)"
                dense
              />
              <q-btn flat round icon="more_horiz">
                <q-menu>
                  <q-list style="min-width: 150px">
                    <q-item clickable v-close-popup @click="viewProfile(friend)">
                      <q-item-section avatar>
                        <q-icon name="person" />
                      </q-item-section>
                      <q-item-section>Xem hồ sơ</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="sendMessage(friend)">
                      <q-item-section avatar>
                        <q-icon name="message" />
                      </q-item-section>
                      <q-item-section>Nhắn tin</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup @click="removeFriend(friend)">
                      <q-item-section avatar>
                        <q-icon name="person_remove" color="red" />
                      </q-item-section>
                      <q-item-section class="text-red">Xóa bạn</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Empty State -->
    <q-card v-if="filteredFriends.length === 0">
      <q-card-section class="text-center q-py-xl">
        <q-icon name="people_outline" size="4rem" color="grey-4" class="q-mb-md" />
        <h4 class="text-h6 text-grey-6 q-mb-sm">
          {{ searchTerm ? 'Không tìm thấy bạn bè' : 'Chưa có bạn bè' }}
        </h4>
        <p class="text-grey-5 q-mb-lg">
          {{ searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Hãy tìm kiếm và kết bạn với những người học khác!' }}
        </p>
        <q-btn 
          v-if="!searchTerm"
          color="primary" 
          icon="person_add" 
          label="Tìm bạn bè"
          @click="$emit('switch-tab', 'add-friends')"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

interface Friend {
  id: string
  name: string
  username: string
  avatar: string
  level: number
  points: number
  status: 'online' | 'offline' | 'in-game'
  streak: number
  isOnline: boolean
}

const emit = defineEmits(['switch-tab'])

const $q = useQuasar()
const searchTerm = ref('')
const friends = ref<Friend[]>([])

const filteredFriends = computed(() => 
  friends.value.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
)

const challengeFriend = (friend: Friend) => {
  $q.notify({
    type: 'info',
    message: `⚡ Đã gửi lời mời thách đấu cho ${friend.name}!`,
    position: 'top'
  })
}

const viewProfile = (friend: Friend) => {
  $q.notify({
    type: 'info',
    message: `Xem hồ sơ của ${friend.name}`,
    position: 'top'
  })
}

const sendMessage = (friend: Friend) => {
  $q.notify({
    type: 'info',
    message: `Mở chat với ${friend.name}`,
    position: 'top'
  })
}

const removeFriend = (friend: Friend) => {
  $q.dialog({
    title: 'Xác nhận xóa bạn',
    message: `Bạn có chắc chắn muốn xóa ${friend.name} khỏi danh sách bạn bè?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    friends.value = friends.value.filter(f => f.id !== friend.id)
    $q.notify({
      type: 'positive',
      message: `Đã xóa ${friend.name} khỏi danh sách bạn bè`,
      position: 'top'
    })
  })
}

// Initialize sample friends
onMounted(() => {
  const sampleFriends: Friend[] = [
    {
      id: '1',
      name: 'Minh Anh',
      username: '@minhanh2024',
      avatar: 'MA',
      level: 15,
      points: 2850,
      status: 'online',
      streak: 12,
      isOnline: true
    },
    {
      id: '2',
      name: 'Thành Hòa',
      username: '@thanhhoa_vn',
      avatar: 'TH',
      level: 22,
      points: 4200,
      status: 'online',
      streak: 8,
      isOnline: true
    },
    {
      id: '3',
      name: 'Thu Trang',
      username: '@trang.thu',
      avatar: 'TT',
      level: 18,
      points: 3150,
      status: 'offline',
      streak: 5,
      isOnline: false
    },
    {
      id: '4',
      name: 'Văn Nam',
      username: '@vannam_eng',
      avatar: 'VN',
      level: 14,
      points: 2100,
      status: 'offline',
      streak: 15,
      isOnline: false
    },
    {
      id: '5',
      name: 'Lan Anh',
      username: '@lananh.study',
      avatar: 'LA',
      level: 20,
      points: 3800,
      status: 'online',
      streak: 9,
      isOnline: true
    }
  ]

  friends.value = sampleFriends
})
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #8b5cf6, #3b82f6);
}
</style>
