<template>
  <div class="leaderboard">
    <q-list>
      <q-item v-for="(player, index) in leaderboardData" :key="player.id">
        <q-item-section avatar>
          <q-avatar
            :color="getRankColor(index + 1)"
            text-color="white"
            size="md"
          >
            {{ index + 1 }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-medium">{{
            player.name
          }}</q-item-label>
          <q-item-label caption>
            <q-icon name="local_fire_department" color="red" size="xs" />
            {{ player.streak }} ngày
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-right">
            <div class="text-weight-bold text-primary">
              {{ player.points.toLocaleString() }}
            </div>
            <div class="text-caption text-grey-6">điểm</div>
          </div>
        </q-item-section>

        <q-item-section side v-if="player.isCurrentUser">
          <q-chip color="primary" text-color="white" size="sm"> Bạn </q-chip>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="!authStore.isLoggedIn" class="text-center q-pa-md text-grey-6">
      Đăng nhập để xem bảng xếp hạng
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

interface LeaderboardPlayer {
  id: string;
  name: string;
  points: number;
  streak: number;
  isCurrentUser?: boolean;
}

const rawLeaderboard = ref<LeaderboardPlayer[]>([
  {
    id: "1",
    name: "Minh Anh",
    points: 2850,
    streak: 12,
  },
  {
    id: "2",
    name: "Đức Huy",
    points: 2420,
    streak: 8,
  },
  {
    id: "3",
    name: "Thu Hà",
    points: 2150,
    streak: 15,
  },
  {
    id: "4",
    name: "Văn Nam",
    points: 1980,
    streak: 5,
  },
  {
    id: "5",
    name: "Lan Anh",
    points: 1750,
    streak: 9,
  },
]);

const leaderboardData = computed(() => {
  if (!authStore.isLoggedIn) return [];

  const data = [...rawLeaderboard.value];

  // Add current user if logged in
  if (authStore.user) {
    const userInList = data.find((p) => p.name === authStore.user?.name);
    if (!userInList) {
      data.push({
        id: authStore.user.id,
        name: authStore.user.name,
        points: authStore.user.stats?.totalCorrect || 0,
        streak: authStore.user.stats?.streak || 0,
        isCurrentUser: true,
      });
    } else {
      userInList.isCurrentUser = true;
    }
  }

  // Sort by points descending
  return data.sort((a, b) => b.points - a.points).slice(0, 10);
});

function getRankColor(rank: number): string {
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
.leaderboard {
  max-height: 300px;
  overflow-y: auto;
}
</style>
