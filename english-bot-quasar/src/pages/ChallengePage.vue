<template>
  <q-page class="bg-gradient-to-br from-purple-50 to-blue-50">
    <div class="q-pa-md">
      <div class="text-center q-mb-lg">
        <div class="text-h4 text-weight-bold">⚡ Thách đấu</div>
        <div class="text-grey-6">
          Thử thách bản thân và cạnh tranh với bạn bè
        </div>
      </div>

      <div v-if="!authStore.isLoggedIn" class="text-center q-pa-xl">
        <q-card class="q-pa-lg">
          <q-icon name="flash_on" size="xl" color="grey-5" />
          <div class="text-h6 q-mt-md">Đăng nhập để tham gia thách đấu</div>
          <div class="text-grey-6 q-mt-sm">
            Cạnh tranh với người chơi khác và nâng cao kỹ năng
          </div>
        </q-card>
      </div>

      <div v-else>
        <!-- Challenge Options -->
        <div class="row q-gutter-md q-mb-lg">
          <div class="col-12 col-md-6">
            <q-card class="challenge-card text-center q-pa-lg">
              <q-icon name="person" size="xl" color="blue" class="q-mb-md" />
              <div class="text-h6 text-weight-bold q-mb-sm">Thách đấu 1v1</div>
              <div class="text-grey-6 q-mb-md">
                Thách đấu trực tiếp với một người chơi khác
              </div>
              <q-btn color="blue" label="Tìm đối thủ" @click="findOpponent" />
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card class="challenge-card text-center q-pa-lg">
              <q-icon name="groups" size="xl" color="purple" class="q-mb-md" />
              <div class="text-h6 text-weight-bold q-mb-sm">Phòng nhóm</div>
              <div class="text-grey-6 q-mb-md">
                Tham gia phòng thách đấu với nhiều người
              </div>
              <q-btn color="purple" label="Tham gia phòng" @click="joinRoom" />
            </q-card>
          </div>
        </div>

        <!-- Recent Challenges -->
        <q-card class="q-mb-lg">
          <q-card-section>
            <div class="text-h6 q-mb-md">🏆 Thách đấu gần đây</div>
            <q-list>
              <q-item v-for="challenge in recentChallenges" :key="challenge.id">
                <q-item-section avatar>
                  <q-avatar
                    :color="
                      challenge.result === 'win'
                        ? 'green'
                        : challenge.result === 'lose'
                          ? 'red'
                          : 'grey'
                    "
                    text-color="white"
                  >
                    <q-icon
                      :name="
                        challenge.result === 'win'
                          ? 'emoji_events'
                          : challenge.result === 'lose'
                            ? 'close'
                            : 'remove'
                      "
                    />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ challenge.opponent }}</q-item-label>
                  <q-item-label caption
                    >{{ challenge.mode }} - {{ challenge.date }}</q-item-label
                  >
                </q-item-section>

                <q-item-section side>
                  <div class="text-right">
                    <div class="text-weight-bold">{{ challenge.score }}</div>
                    <q-chip
                      :color="
                        challenge.result === 'win'
                          ? 'green'
                          : challenge.result === 'lose'
                            ? 'red'
                            : 'grey'
                      "
                      text-color="white"
                      size="sm"
                    >
                      {{ getResultText(challenge.result) }}
                    </q-chip>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <!-- Leaderboard -->
        <q-card>
          <q-card-section>
            <div class="text-h6 q-mb-md">📊 Bảng xếp hạng thách đấu</div>
            <q-list>
              <q-item v-for="(player, index) in leaderboard" :key="player.id">
                <q-item-section avatar>
                  <q-avatar :color="getRankColor(index + 1)" text-color="white">
                    {{ index + 1 }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-medium">{{
                    player.name
                  }}</q-item-label>
                  <q-item-label caption
                    >{{ player.wins }} thắng /
                    {{ player.losses }} thua</q-item-label
                  >
                </q-item-section>

                <q-item-section side>
                  <div class="text-right">
                    <div class="text-weight-bold text-primary">
                      {{ player.rating }}
                    </div>
                    <div class="text-caption text-grey-6">ELO</div>
                  </div>
                </q-item-section>

                <q-item-section side v-if="player.isCurrentUser">
                  <q-chip color="primary" text-color="white" size="sm">
                    Bạn
                  </q-chip>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { Notify } from "quasar";

const authStore = useAuthStore();

interface Challenge {
  id: string;
  opponent: string;
  mode: string;
  result: "win" | "lose" | "draw";
  score: string;
  date: string;
}

interface LeaderboardPlayer {
  id: string;
  name: string;
  rating: number;
  wins: number;
  losses: number;
  isCurrentUser?: boolean;
}

const recentChallenges = ref<Challenge[]>([]);
const leaderboard = ref<LeaderboardPlayer[]>([]);

onMounted(() => {
  recentChallenges.value = [
    {
      id: "1",
      opponent: "Minh Anh",
      mode: "Thách đấu 1v1",
      result: "win",
      score: "8-6",
      date: "2 giờ trước",
    },
    {
      id: "2",
      opponent: "Đức Huy",
      mode: "Phòng nhóm",
      result: "lose",
      score: "5-7",
      date: "1 ngày trước",
    },
    {
      id: "3",
      opponent: "Thu Hà",
      mode: "Thách đấu 1v1",
      result: "win",
      score: "9-4",
      date: "2 ngày trước",
    },
  ];

  leaderboard.value = [
    {
      id: "1",
      name: "Đức Huy",
      rating: 1850,
      wins: 45,
      losses: 12,
    },
    {
      id: "2",
      name: "Thu Hà",
      rating: 1720,
      wins: 38,
      losses: 18,
    },
    {
      id: "3",
      name: "Minh Anh",
      rating: 1680,
      wins: 42,
      losses: 25,
    },
    {
      id: "4",
      name: authStore.user?.name || "Bạn",
      rating: 1520,
      wins: 28,
      losses: 20,
      isCurrentUser: true,
    },
  ];
});

function findOpponent() {
  Notify.create({
    type: "info",
    message: "🔍 Đang tìm kiếm đối thủ...",
    caption: "Vui lòng đợi trong giây lát",
    position: "top",
  });

  setTimeout(() => {
    Notify.create({
      type: "positive",
      message: "✅ Đã tìm thấy đối thủ!",
      caption: "Bắt đầu thách đấu với Minh Anh",
      position: "top",
    });
  }, 2000);
}

function joinRoom() {
  Notify.create({
    type: "info",
    message: "🏠 Đang tìm phòng trống...",
    caption: "Đang kết nối đến phòng thích hợp",
    position: "top",
  });

  setTimeout(() => {
    Notify.create({
      type: "positive",
      message: "🎮 Đã tham gia phòng thành công!",
      caption: "Phòng #1234 - 3/8 người chơi",
      position: "top",
    });
  }, 1500);
}

function getResultText(result: string) {
  switch (result) {
    case "win":
      return "Thắng";
    case "lose":
      return "Thua";
    case "draw":
      return "Hòa";
    default:
      return "Unknown";
  }
}

function getRankColor(rank: number) {
  switch (rank) {
    case 1:
      return "amber";
    case 2:
      return "grey-5";
    case 3:
      return "orange";
    default:
      return "primary";
  }
}
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #f3f4f6, #dbeafe);
}

.challenge-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.challenge-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
