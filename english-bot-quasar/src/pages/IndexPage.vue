<template>
  <q-page class="bg-gradient-to-br from-purple-50 to-blue-50">
    <div class="q-pa-md">
      <div class="row q-gutter-md">
        <!-- Main Chat Interface -->
        <div class="col-12 col-xl-8">
          <q-card class="full-height">
            <q-card-section class="q-pa-none">
              <ChatInterface />
            </q-card-section>
          </q-card>
        </div>

        <!-- Right Sidebar -->
        <div class="col-12 col-xl-4">
          <div class="column q-gutter-md">
            <!-- Chat History -->
            <q-card>
              <q-card-section>
                <div class="text-h6 q-mb-md">📚 Lịch sử học tập</div>
                <ChatHistory />
              </q-card-section>
            </q-card>

            <!-- Leaderboard -->
            <q-card>
              <q-card-section>
                <div class="text-h6 q-mb-md">🏆 Bảng xếp h���ng</div>
                <Leaderboard />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ChatInterface from '../components/ChatInterface.vue'
import ChatHistory from '../components/ChatHistory.vue'
import Leaderboard from '../components/Leaderboard.vue'
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #f3f4f6, #dbeafe);
}
</style>
