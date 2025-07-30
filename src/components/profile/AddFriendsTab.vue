<template>
  <div class="q-gutter-md">
    <!-- Header -->
    <div>
      <h3 class="text-h5 text-weight-bold q-mb-xs">Thêm bạn bè</h3>
      <p class="text-grey-6 q-ma-none">Tìm và kết bạn với những người học khác</p>
    </div>

    <!-- Add by Username -->
    <q-card>
      <q-card-section>
        <h4 class="text-h6 text-weight-medium q-mb-md">Thêm bạn bằng tên người dùng</h4>
        <div class="row q-gutter-md">
          <div class="col">
            <q-input
              v-model="newFriendUsername"
              placeholder="Nhập tên người dùng (vd: @nguoidung)"
              outlined
              dense
            >
              <template v-slot:prepend>
                <q-icon name="alternate_email" />
              </template>
            </q-input>
          </div>
          <div class="col-auto">
            <q-btn 
              color="primary" 
              icon="person_add" 
              label="Thêm bạn"
              @click="addFriend"
              :disable="!newFriendUsername.trim()"
              :loading="addingFriend"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Search Results -->
    <q-card v-if="searchResults.length > 0">
      <q-card-section>
        <h4 class="text-h6 text-weight-medium q-mb-md">Kết quả tìm kiếm</h4>
        <div class="q-gutter-md">
          <div v-for="person in searchResults" :key="person.id" class="q-pa-md border rounded-borders">
            <div class="row items-center justify-between">
              <div class="col row items-center q-gutter-md">
                <q-avatar size="48px">
                  <div class="bg-gradient-to-br from-green-500 to-blue-500 text-white font-bold rounded-full w-full h-full flex items-center justify-center">
                    {{ person.avatar }}
                  </div>
                  <q-badge floating :color="person.isOnline ? 'green' : 'grey'" rounded />
                </q-avatar>
                
                <div>
                  <h4 class="text-subtitle1 text-weight-medium q-ma-none">{{ person.name }}</h4>
                  <p class="text-grey-6 q-ma-none">{{ person.username }}</p>
                  <div class="text-caption text-grey-5">
                    🏆 Hạng #{{ person.rank }} • ✅ {{ person.totalCorrect }} đúng • 🔥 {{ person.accuracy }}% chính xác
                  </div>
                </div>
              </div>

              <div class="col-auto">
                <q-btn 
                  color="primary" 
                  icon="person_add" 
                  label="Kết bạn"
                  @click="sendFriendRequest(person)"
                  dense
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Friend Requests -->
    <q-card v-if="friendRequests.length > 0">
      <q-card-section>
        <h4 class="text-h6 text-weight-medium q-mb-md flex items-center">
          Lời mời kết bạn
          <q-badge color="red" :label="friendRequests.length" class="q-ml-sm" />
        </h4>
        
        <div class="q-gutter-md">
          <div v-for="request in friendRequests" :key="request.id" class="q-pa-md border rounded-borders">
            <div class="row items-center justify-between">
              <div class="col row items-center q-gutter-md">
                <q-avatar size="48px">
                  <div class="bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold rounded-full w-full h-full flex items-center justify-center">
                    {{ request.avatar }}
                  </div>
                </q-avatar>
                
                <div>
                  <h4 class="text-subtitle1 text-weight-medium q-ma-none">{{ request.name }}</h4>
                  <p class="text-grey-6 q-ma-none">{{ request.username }}</p>
                  <div class="text-caption text-grey-5">
                    📅 {{ request.sentAt }}
                    <span v-if="request.mutualFriends > 0">• 👥 {{ request.mutualFriends }} bạn chung</span>
                  </div>
                </div>
              </div>

              <div class="col-auto row q-gutter-xs">
                <q-btn 
                  color="green" 
                  icon="check" 
                  label="Chấp nhận"
                  @click="acceptFriendRequest(request)"
                  dense
                />
                <q-btn 
                  color="red" 
                  outline
                  icon="close" 
                  label="Từ chối"
                  @click="declineFriendRequest(request.id)"
                  dense
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Quick Suggestions -->
    <q-card>
      <q-card-section>
        <h4 class="text-h6 text-weight-medium q-mb-md">💡 Gợi ý kết bạn</h4>
        
        <div class="row q-gutter-md">
          <div class="col-12 col-md-6">
            <div class="q-pa-md bg-gradient-to-r from-purple-50 to-blue-50 rounded-borders">
              <div class="row items-center q-gutter-md q-mb-md">
                <q-icon name="emoji_events" size="2rem" color="yellow-7" />
                <div>
                  <h4 class="text-subtitle1 text-weight-medium q-ma-none">Kết bạn với Top Players</h4>
                  <p class="text-caption text-grey-6 q-ma-none">Học hỏi từ những người giỏi nhất</p>
                </div>
              </div>
              <q-btn outline color="primary" label="Xem danh sách" class="full-width" dense />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="q-pa-md bg-gradient-to-r from-green-50 to-blue-50 rounded-borders">
              <div class="row items-center q-gutter-md q-mb-md">
                <q-icon name="email" size="2rem" color="green-7" />
                <div>
                  <h4 class="text-subtitle1 text-weight-medium q-ma-none">Mời qua Email</h4>
                  <p class="text-caption text-grey-6 q-ma-none">Mời bạn bè tham gia EnglishBot</p>
                </div>
              </div>
              <q-btn outline color="green" label="Gửi lời mời" class="full-width" dense />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Empty States -->
    <q-card v-if="friendRequests.length === 0 && searchResults.length === 0">
      <q-card-section class="text-center q-py-xl">
        <q-icon name="person_search" size="4rem" color="grey-4" class="q-mb-md" />
        <h4 class="text-h6 text-grey-6 q-mb-sm">Tìm kiếm bạn bè</h4>
        <p class="text-grey-5">Nhập tên người dùng để tìm và kết bạn với họ</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

interface Person {
  id: string
  name: string
  username: string
  avatar: string
  isOnline: boolean
  rank: number
  totalCorrect: number
  accuracy: number
}

interface FriendRequest {
  id: string
  name: string
  username: string
  avatar: string
  sentAt: string
  mutualFriends: number
}

const $q = useQuasar()
const newFriendUsername = ref('')
const addingFriend = ref(false)
const searchResults = ref<Person[]>([])
const friendRequests = ref<FriendRequest[]>([])

const addFriend = async () => {
  if (!newFriendUsername.value.trim()) return

  addingFriend.value = true

  try {
    // Simulate API search
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock search results
    const results: Person[] = [
      {
        id: 'search-1',
        name: 'Bảo Trân',
        username: '@baotran_eng',
        avatar: 'BT',
        isOnline: false,
        rank: 20,
        totalCorrect: 856,
        accuracy: 85
      },
      {
        id: 'search-2',
        name: 'Quốc Duy',
        username: '@quocduy_learn',
        avatar: 'QD',
        isOnline: true,
        rank: 18,
        totalCorrect: 945,
        accuracy: 88
      }
    ].filter(person =>
      person.name.toLowerCase().includes(newFriendUsername.value.toLowerCase()) ||
      person.username.toLowerCase().includes(newFriendUsername.value.toLowerCase())
    )

    searchResults.value = results
    
    if (results.length === 0) {
      $q.notify({
        type: 'info',
        message: 'Không tìm thấy người dùng nào',
        position: 'top'
      })
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Có lỗi xảy ra khi tìm kiếm',
      position: 'top'
    })
  } finally {
    addingFriend.value = false
  }
}

const sendFriendRequest = (person: Person) => {
  $q.notify({
    type: 'positive',
    message: `Đã gửi lời mời kết bạn đến ${person.name}!`,
    position: 'top'
  })
  
  // Remove from search results
  searchResults.value = searchResults.value.filter(p => p.id !== person.id)
}

const acceptFriendRequest = (request: FriendRequest) => {
  $q.notify({
    type: 'positive',
    message: `Đã chấp nhận lời mời kết bạn từ ${request.name}!`,
    position: 'top'
  })
  
  // Remove from friend requests
  friendRequests.value = friendRequests.value.filter(req => req.id !== request.id)
}

const declineFriendRequest = (requestId: string) => {
  const request = friendRequests.value.find(req => req.id === requestId)
  if (request) {
    $q.notify({
      type: 'info',
      message: `Đã từ chối lời mời kết bạn từ ${request.name}`,
      position: 'top'
    })
  }
  
  friendRequests.value = friendRequests.value.filter(req => req.id !== requestId)
}

// Initialize sample friend requests
onMounted(() => {
  const sampleRequests: FriendRequest[] = [
    {
      id: 'req-1',
      name: 'Hoàng Nam',
      username: '@hoangnam_dev',
      avatar: 'HN',
      sentAt: '2 giờ trước',
      mutualFriends: 3
    },
    {
      id: 'req-2',
      name: 'Mai Linh',
      username: '@mailinh.english',
      avatar: 'ML',
      sentAt: '1 ngày trước',
      mutualFriends: 1
    }
  ]

  friendRequests.value = sampleRequests
})
</script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(to right, var(--q-purple-1), var(--q-blue-1));
}

.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #10b981, #06b6d4);
}

.border {
  border: 1px solid #e5e7eb;
}
</style>
