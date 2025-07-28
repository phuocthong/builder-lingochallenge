<template>
  <div class="chat-history">
    <q-list>
      <q-item
        v-for="session in historySessions"
        :key="session.id"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-icon :name="session.icon" :color="session.color" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ session.title }}</q-item-label>
          <q-item-label caption>
            {{ session.score }}/{{ session.total }} - {{ session.date }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-chip
            :color="
              session.score / session.total >= 0.8
                ? 'green'
                : session.score / session.total >= 0.6
                  ? 'orange'
                  : 'red'
            "
            text-color="white"
            size="sm"
          >
            {{ Math.round((session.score / session.total) * 100) }}%
          </q-chip>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="!authStore.isLoggedIn" class="text-center q-pa-md text-grey-6">
      Đăng nhập để xem lịch sử học tập
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

interface HistorySession {
  id: string;
  title: string;
  score: number;
  total: number;
  date: string;
  icon: string;
  color: string;
}

const rawHistory = ref<HistorySession[]>([
  {
    id: "1",
    title: "Từ vựng cơ bản",
    score: 8,
    total: 10,
    date: "2 giờ trước",
    icon: "book",
    color: "green",
  },
  {
    id: "2",
    title: "Ngữ pháp tiếng Anh",
    score: 6,
    total: 10,
    date: "1 ngày trước",
    icon: "grammar",
    color: "orange",
  },
  {
    id: "3",
    title: "Hội thoại hàng ngày",
    score: 9,
    total: 10,
    date: "2 ngày trước",
    icon: "chat",
    color: "green",
  },
  {
    id: "4",
    title: "Phát âm",
    score: 5,
    total: 10,
    date: "3 ngày trước",
    icon: "volume_up",
    color: "red",
  },
  {
    id: "5",
    title: "Đọc hiểu",
    score: 7,
    total: 10,
    date: "1 tuần trước",
    icon: "menu_book",
    color: "orange",
  },
]);

const historySessions = computed(() => {
  return authStore.isLoggedIn ? rawHistory.value : [];
});
</script>

<style scoped>
.chat-history {
  max-height: 300px;
  overflow-y: auto;
}
</style>
