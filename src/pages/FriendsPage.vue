<template>
  <q-page class="bg-gradient-to-br from-purple-50 to-blue-50">
    <!-- Kiểm tra đăng nhập -->
    <div
      v-if="!authStore.isLoggedIn"
      class="flex items-center justify-center min-h-screen"
    >
      <q-card class="max-w-md mx-auto">
        <q-card-section class="text-center">
          <q-icon name="lock" size="xl" color="grey-5" class="q-mb-md" />
          <h2 class="text-h5 q-mb-md">🔒 Yêu cầu đăng nhập</h2>
          <p class="text-grey-6 q-mb-lg">Bạn cần đăng nhập để quản lý bạn bè</p>
          <q-btn
            color="primary"
            label="Quay lại trang chủ"
            @click="$router.push('/')"
          />
        </q-card-section>
      </q-card>
    </div>

    <!-- Main Friends Interface -->
    <div v-else class="max-w-6xl mx-auto q-pa-md">
      <!-- Header -->
      <div class="text-center q-mb-lg">
        <h1 class="text-h3 text-weight-bold text-grey-9 q-mb-md">
          👥 Bạn bè EnglishBot
        </h1>
        <p class="text-h6 text-grey-6 max-w-2xl mx-auto">
          Kết nối với bạn bè, thách đấu và cùng nhau học tiếng Anh
        </p>
      </div>

      <!-- Tabs -->
      <q-card>
        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey-6"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab
            name="friends"
            icon="people"
            :label="`Bạn bè (${friends.length})`"
          />
          <q-tab
            name="requests"
            icon="person_add"
            :label="`Lời mời (${friendRequests.length})`"
          />
          <q-tab name="search" icon="search" label="Tìm kiếm" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <!-- Friends List Tab -->
          <q-tab-panel name="friends">
            <div v-if="friends.length === 0" class="text-center q-py-xl">
              <q-icon
                name="favorite_border"
                size="4rem"
                color="grey-4"
                class="q-mb-md"
              />
              <h3 class="text-h6 text-grey-6 q-mb-sm">Chưa có bạn bè</h3>
              <p class="text-grey-5 q-mb-lg">
                Hãy tìm kiếm và kết bạn với người khác!
              </p>
              <q-btn
                color="primary"
                icon="search"
                label="Tìm bạn bè"
                @click="activeTab = 'search'"
              />
            </div>

            <div v-else class="row q-gutter-md">
              <div
                class="col-12 col-md-6 col-lg-4"
                v-for="friend in friends"
                :key="friend.id"
              >
                <q-card class="card-hover">
                  <q-card-section>
                    <!-- Avatar and Status -->
                    <div class="row items-center q-gutter-md q-mb-md">
                      <q-avatar size="48px">
                        <div
                          class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full w-full h-full flex items-center justify-center"
                        >
                          {{ friend.avatar }}
                        </div>
                        <q-badge
                          floating
                          :color="friend.isOnline ? 'green' : 'grey'"
                          rounded
                        />
                      </q-avatar>

                      <div class="col">
                        <h3 class="text-subtitle1 text-weight-medium q-ma-none">
                          {{ friend.name }}
                        </h3>
                        <p class="text-caption text-grey-6 q-ma-none">
                          {{ friend.username }}
                        </p>
                        <p
                          class="text-caption"
                          :class="
                            friend.isOnline ? 'text-green-6' : 'text-grey-5'
                          "
                        >
                          {{
                            friend.isOnline
                              ? "🟢 Online"
                              : `🔴 ${friend.lastSeen}`
                          }}
                        </p>
                      </div>
                    </div>

                    <!-- Stats -->
                    <div class="row q-gutter-xs q-mb-md">
                      <div
                        class="col-6 bg-yellow-1 q-pa-sm rounded-borders text-center"
                      >
                        <q-icon
                          name="emoji_events"
                          color="yellow-7"
                          size="sm"
                          class="q-mb-xs"
                        />
                        <div class="text-caption text-weight-medium">
                          #{{ friend.stats.rank }}
                        </div>
                      </div>
                      <div
                        class="col-6 bg-green-1 q-pa-sm rounded-borders text-center"
                      >
                        <q-icon
                          name="star"
                          color="green-7"
                          size="sm"
                          class="q-mb-xs"
                        />
                        <div class="text-caption text-weight-medium">
                          {{ friend.stats.totalCorrect }}
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="row q-gutter-xs">
                      <q-btn
                        color="primary"
                        icon="bolt"
                        label="Thử thách"
                        @click="challengeFriend(friend)"
                        class="col"
                        dense
                      />
                      <q-btn
                        outline
                        color="primary"
                        icon="chat"
                        dense
                        @click="chatWithFriend(friend)"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>

          <!-- Friend Requests Tab -->
          <q-tab-panel name="requests">
            <div v-if="friendRequests.length === 0" class="text-center q-py-xl">
              <q-icon
                name="person_add_alt"
                size="4rem"
                color="grey-4"
                class="q-mb-md"
              />
              <h3 class="text-h6 text-grey-6 q-mb-sm">Không có lời mời nào</h3>
              <p class="text-grey-5">Bạn sẽ thấy các lời mời kết bạn ở đây</p>
            </div>

            <div v-else class="q-gutter-md">
              <q-card
                v-for="request in friendRequests"
                :key="request.id"
                bordered
              >
                <q-card-section>
                  <div class="row items-center justify-between">
                    <div class="col row items-center q-gutter-md">
                      <q-avatar size="48px">
                        <div
                          class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full w-full h-full flex items-center justify-center"
                        >
                          {{ request.avatar }}
                        </div>
                      </q-avatar>

                      <div>
                        <h3 class="text-subtitle1 text-weight-medium q-ma-none">
                          {{ request.name }}
                        </h3>
                        <p class="text-caption text-grey-6 q-ma-none">
                          {{ request.username }}
                        </p>
                        <div class="text-caption text-grey-5">
                          📅 {{ request.sentAt }}
                          <span v-if="request.mutualFriends > 0">
                            • 👥 {{ request.mutualFriends }} bạn chung
                          </span>
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
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>

          <!-- Search Tab -->
          <q-tab-panel name="search">
            <!-- Search Form -->
            <div class="row q-gutter-md q-mb-lg">
              <div class="col">
                <q-input
                  v-model="searchQuery"
                  placeholder="Tìm theo tên, username hoặc email..."
                  outlined
                  dense
                  @keypress.enter="handleSearch"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <div class="col-auto">
                <q-btn
                  color="primary"
                  icon="search"
                  @click="handleSearch"
                  :disable="!searchQuery.trim() || isSearching"
                  :loading="isSearching"
                />
              </div>
            </div>

            <!-- Search Results -->
            <div v-if="searchResults.length > 0" class="q-mb-lg">
              <h3 class="text-h6 text-weight-medium q-mb-md">
                Kết quả tìm kiếm ({{ searchResults.length }})
              </h3>
              <div class="q-gutter-md">
                <q-card
                  v-for="person in searchResults"
                  :key="person.id"
                  bordered
                >
                  <q-card-section>
                    <div class="row items-center justify-between">
                      <div class="col row items-center q-gutter-md">
                        <q-avatar size="48px">
                          <div
                            class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full w-full h-full flex items-center justify-center"
                          >
                            {{ person.avatar }}
                          </div>
                          <q-badge
                            floating
                            :color="person.isOnline ? 'green' : 'grey'"
                            rounded
                          />
                        </q-avatar>

                        <div>
                          <h3
                            class="text-subtitle1 text-weight-medium q-ma-none"
                          >
                            {{ person.name }}
                          </h3>
                          <p class="text-caption text-grey-6 q-ma-none">
                            {{ person.username }}
                          </p>
                          <div class="text-caption text-grey-5">
                            🏆 Hạng #{{ person.stats.rank }} • ✅
                            {{ person.stats.totalCorrect }} đúng • 🔥
                            {{ person.stats.accuracy }}% chính xác
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
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <!-- Quick Suggestions -->
            <div>
              <h3 class="text-h6 text-weight-medium q-mb-md">
                💡 Gợi ý kết bạn
              </h3>
              <div class="row q-gutter-md">
                <div class="col-12 col-md-6">
                  <div
                    class="q-pa-md bg-gradient-to-r from-purple-50 to-blue-50 rounded-borders"
                  >
                    <div class="row items-center q-gutter-md q-mb-md">
                      <q-icon
                        name="emoji_events"
                        size="2rem"
                        color="yellow-7"
                      />
                      <div>
                        <h4 class="text-subtitle1 text-weight-medium q-ma-none">
                          Kết bạn với Top Players
                        </h4>
                        <p class="text-caption text-grey-6 q-ma-none">
                          Học hỏi từ những người giỏi nhất
                        </p>
                      </div>
                    </div>
                    <q-btn
                      outline
                      color="primary"
                      label="Xem danh sách"
                      class="full-width"
                      dense
                    />
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div
                    class="q-pa-md bg-gradient-to-r from-green-50 to-blue-50 rounded-borders"
                  >
                    <div class="row items-center q-gutter-md q-mb-md">
                      <q-icon name="email" size="2rem" color="green-7" />
                      <div>
                        <h4 class="text-subtitle1 text-weight-medium q-ma-none">
                          Mời qua Email
                        </h4>
                        <p class="text-caption text-grey-6 q-ma-none">
                          Mời bạn bè tham gia EnglishBot
                        </p>
                      </div>
                    </div>
                    <q-btn
                      outline
                      color="green"
                      label="Gửi lời mời"
                      class="full-width"
                      dense
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

      <!-- Challenge Modal -->
      <FriendChallengeModal
        v-model="showChallengeModal"
        :friend="selectedFriend"
        @send-challenge="handleSendChallenge"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "../stores/auth";
import FriendChallengeModal from "../components/friends/FriendChallengeModal.vue";

interface Friend {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
  stats: {
    rank: number;
    totalCorrect: number;
    streak: number;
    accuracy: number;
  };
}

interface FriendRequest {
  id: string;
  name: string;
  username: string;
  avatar: string;
  sentAt: string;
  mutualFriends: number;
}

const $q = useQuasar();
const authStore = useAuthStore();

const activeTab = ref("friends");
const friends = ref<Friend[]>([]);
const friendRequests = ref<FriendRequest[]>([]);
const searchQuery = ref("");
const searchResults = ref<Friend[]>([]);
const isSearching = ref(false);
const showChallengeModal = ref(false);
const selectedFriend = ref<Friend | null>(null);

// Methods
const handleSearch = async () => {
  if (!searchQuery.value.trim()) return;

  isSearching.value = true;

  try {
    // Simulate API search
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const results = [
      {
        id: "search-1",
        name: "Bảo Trân",
        username: "@baotran_eng",
        email: "bao.tran@email.com",
        avatar: "BT",
        isOnline: false,
        lastSeen: "5 phút trước",
        stats: { rank: 20, totalCorrect: 856, streak: 3, accuracy: 85 },
      },
      {
        id: "search-2",
        name: "Quốc Duy",
        username: "@quocduy_learn",
        email: "quoc.duy@email.com",
        avatar: "QD",
        isOnline: true,
        stats: { rank: 18, totalCorrect: 945, streak: 7, accuracy: 88 },
      },
    ].filter(
      (person) =>
        person.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        person.username
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        person.email.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );

    searchResults.value = results;
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Có lỗi xảy ra khi tìm kiếm",
      position: "top",
    });
  } finally {
    isSearching.value = false;
  }
};

const sendFriendRequest = (targetUser: Friend) => {
  $q.notify({
    type: "positive",
    message: `Đã gửi lời mời kết bạn đến ${targetUser.name}!`,
    position: "top",
  });
  searchResults.value = searchResults.value.filter(
    (p) => p.id !== targetUser.id,
  );
};

const acceptFriendRequest = (request: FriendRequest) => {
  const newFriend: Friend = {
    id: request.id,
    name: request.name,
    username: request.username,
    email: `${request.username}@email.com`,
    avatar: request.avatar,
    isOnline: Math.random() > 0.5,
    stats: {
      rank: Math.floor(Math.random() * 50) + 1,
      totalCorrect: Math.floor(Math.random() * 2000) + 500,
      streak: Math.floor(Math.random() * 20) + 1,
      accuracy: Math.floor(Math.random() * 30) + 70,
    },
  };

  friends.value.push(newFriend);
  friendRequests.value = friendRequests.value.filter(
    (req) => req.id !== request.id,
  );

  $q.notify({
    type: "positive",
    message: `Đã chấp nhận lời mời kết bạn từ ${request.name}!`,
    position: "top",
  });
};

const declineFriendRequest = (requestId: string) => {
  const request = friendRequests.value.find((req) => req.id === requestId);
  friendRequests.value = friendRequests.value.filter(
    (req) => req.id !== requestId,
  );

  if (request) {
    $q.notify({
      type: "info",
      message: `Đã từ chối lời mời kết bạn từ ${request.name}`,
      position: "top",
    });
  }
};

const challengeFriend = (friend: Friend) => {
  selectedFriend.value = friend;
  showChallengeModal.value = true;
};

const chatWithFriend = (friend: Friend) => {
  $q.notify({
    type: "info",
    message: `Mở chat với ${friend.name}`,
    position: "top",
  });
};

const handleSendChallenge = (friend: Friend, settings: any) => {
  $q.notify({
    type: "positive",
    message: `Đã gửi thách đấu ${settings.challengeType} đến ${friend.name}! 🎯`,
    position: "top",
  });
};

// Initialize sample data
onMounted(() => {
  const mockFriends: Friend[] = [
    {
      id: "friend-1",
      name: "Minh Anh",
      username: "@minhanh2024",
      email: "minh.anh@email.com",
      avatar: "MA",
      isOnline: true,
      stats: { rank: 12, totalCorrect: 1456, streak: 8, accuracy: 92 },
    },
    {
      id: "friend-2",
      name: "Thành Hòa",
      username: "@thanhhoa_vn",
      email: "thanh.hoa@email.com",
      avatar: "TH",
      isOnline: true,
      stats: { rank: 5, totalCorrect: 2195, streak: 23, accuracy: 94 },
    },
    {
      id: "friend-3",
      name: "Thu Trang",
      username: "@trang.thu",
      email: "thu.trang@email.com",
      avatar: "TT",
      isOnline: false,
      lastSeen: "2 giờ trước",
      stats: { rank: 8, totalCorrect: 1834, streak: 15, accuracy: 89 },
    },
  ];

  const mockFriendRequests: FriendRequest[] = [
    {
      id: "req-1",
      name: "Hoàng Nam",
      username: "@hoangnam_dev",
      avatar: "HN",
      sentAt: "2 giờ trước",
      mutualFriends: 3,
    },
    {
      id: "req-2",
      name: "Mai Linh",
      username: "@mailinh.english",
      avatar: "ML",
      sentAt: "1 ngày trước",
      mutualFriends: 1,
    },
  ];

  friends.value = mockFriends;
  friendRequests.value = mockFriendRequests;
});
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #f3e8ff, #dbeafe);
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #8b5cf6, #3b82f6);
}

.card-hover {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>
