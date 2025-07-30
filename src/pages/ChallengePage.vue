<template>
  <q-page class="bg-gradient-to-br from-purple-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          🎯 Thử thách EnglishBot
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Kiểm tra kỹ năng tiếng Anh của bạn với các thử thách thú vị và cạnh tranh với bạn bè
        </p>
      </div>

      <!-- Challenge Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <q-card v-for="challenge in challenges" :key="challenge.id" class="card-hover cursor-pointer" @click="selectChallenge(challenge)">
          <q-card-section class="text-center">
            <div class="text-5xl mb-4">{{ challenge.icon }}</div>
            <h3 class="text-xl font-semibold mb-2">{{ challenge.title }}</h3>
            <p class="text-gray-600 mb-4">{{ challenge.description }}</p>
            
            <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>🎯 {{ challenge.questions }} câu hỏi</span>
              <span>⏱️ {{ challenge.duration }} phút</span>
            </div>
            
            <q-badge 
              :color="getDifficultyColor(challenge.difficulty)" 
              :label="challenge.difficulty"
              class="mb-4"
            />
            
            <q-btn 
              color="primary" 
              label="Bắt đầu"
              class="full-width"
              @click.stop="startChallenge(challenge)"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- Leaderboard Section -->
      <q-card class="mb-8">
        <q-card-section>
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            🏆 Bảng xếp hạng tuần này
          </h2>
          
          <div class="space-y-4">
            <div v-for="(player, index) in leaderboard" :key="player.id" 
                 class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-4">
                <div class="flex items-center justify-center w-8 h-8 rounded-full"
                     :class="getRankColor(index + 1)">
                  <span class="font-bold text-white">{{ index + 1 }}</span>
                </div>
                <q-avatar :color="getAvatarColor(index)" text-color="white" size="md">
                  {{ player.name.substring(0, 2).toUpperCase() }}
                </q-avatar>
                <div>
                  <h4 class="font-semibold text-gray-900">{{ player.name }}</h4>
                  <p class="text-sm text-gray-600">{{ player.school }}</p>
                </div>
              </div>
              
              <div class="text-right">
                <div class="font-bold text-lg text-purple-600">{{ player.score }}</div>
                <div class="text-sm text-gray-500">điểm</div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Recent Attempts -->
      <q-card v-if="recentAttempts.length > 0">
        <q-card-section>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            📊 Lần thử gần đây
          </h2>
          
          <div class="space-y-4">
            <div v-for="attempt in recentAttempts" :key="attempt.id"
                 class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-semibold text-gray-900">{{ attempt.challengeName }}</h4>
                <p class="text-sm text-gray-600">{{ formatDate(attempt.date) }}</p>
              </div>
              
              <div class="text-right">
                <div class="font-bold text-lg" :class="getScoreColor(attempt.score)">
                  {{ attempt.score }}/{{ attempt.maxScore }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ Math.round((attempt.score / attempt.maxScore) * 100) }}%
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Challenge Dialog -->
    <q-dialog v-model="showChallengeDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">🚀 Bắt đầu thử thách</div>
          <div class="text-subtitle2">{{ selectedChallenge?.title }}</div>
        </q-card-section>

        <q-card-section>
          <p class="mb-4">{{ selectedChallenge?.description }}</p>
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">📋 Thông tin thử thách:</h4>
            <ul class="space-y-1 text-sm">
              <li>🎯 Số câu hỏi: {{ selectedChallenge?.questions }}</li>
              <li>⏱️ Thời gian: {{ selectedChallenge?.duration }} phút</li>
              <li>📈 Độ khó: {{ selectedChallenge?.difficulty }}</li>
            </ul>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Hủy" @click="showChallengeDialog = false" />
          <q-btn color="primary" label="Bắt đầu ngay" @click="confirmStart" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'

interface Challenge {
  id: string
  title: string
  description: string
  icon: string
  questions: number
  duration: number
  difficulty: 'Dễ' | 'Trung bình' | 'Khó'
}

interface LeaderboardPlayer {
  id: string
  name: string
  school: string
  score: number
}

interface RecentAttempt {
  id: string
  challengeName: string
  score: number
  maxScore: number
  date: Date
}

const $q = useQuasar()
const showChallengeDialog = ref(false)
const selectedChallenge = ref<Challenge | null>(null)

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Từ vựng cơ bản',
    description: 'Kiểm tra kiến thức từ vựng tiếng Anh cơ bản',
    icon: '📝',
    questions: 20,
    duration: 15,
    difficulty: 'Dễ'
  },
  {
    id: '2',
    title: 'Ngữ pháp nâng cao',
    description: 'Thử thách về các cấu trúc ngữ pháp phức tạp',
    icon: '🧠',
    questions: 25,
    duration: 20,
    difficulty: 'Khó'
  },
  {
    id: '3',
    title: 'Đọc hiểu',
    description: 'Bài tập đọc hiểu với các đoạn văn thú vị',
    icon: '📖',
    questions: 15,
    duration: 25,
    difficulty: 'Trung bình'
  },
  {
    id: '4',
    title: 'Nghe và hiểu',
    description: 'Luyện tập kỹ năng nghe với audio tự nhiên',
    icon: '🎧',
    questions: 18,
    duration: 20,
    difficulty: 'Trung bình'
  },
  {
    id: '5',
    title: 'Thành ngữ',
    description: 'Khám phá các thành ngữ phổ biến trong tiếng Anh',
    icon: '🎭',
    questions: 12,
    duration: 10,
    difficulty: 'Khó'
  },
  {
    id: '6',
    title: 'Phát âm',
    description: 'Kiểm tra và cải thiện kỹ năng phát âm',
    icon: '����️',
    questions: 10,
    duration: 15,
    difficulty: 'Dễ'
  }
]

const leaderboard: LeaderboardPlayer[] = [
  { id: '1', name: 'Nguyễn Minh Anh', school: 'THPT Lê Quý Đôn', score: 2850 },
  { id: '2', name: 'Trần Thành Hòa', school: 'THPT Nguyễn Du', score: 2420 },
  { id: '3', name: 'Lê Thu Trang', school: 'THPT Marie Curie', score: 2180 },
  { id: '4', name: 'Phạm Văn Nam', school: 'THPT Chu Văn An', score: 1950 },
  { id: '5', name: 'Hoàng Lan Anh', school: 'THPT Trần Hưng Đạo', score: 1820 }
]

const recentAttempts = ref<RecentAttempt[]>([
  {
    id: '1',
    challengeName: 'Từ vựng cơ bản',
    score: 18,
    maxScore: 20,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    challengeName: 'Ngữ pháp nâng cao',
    score: 15,
    maxScore: 25,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
])

const selectChallenge = (challenge: Challenge) => {
  selectedChallenge.value = challenge
  showChallengeDialog.value = true
}

const startChallenge = (challenge: Challenge) => {
  selectChallenge(challenge)
}

const confirmStart = () => {
  showChallengeDialog.value = false
  $q.notify({
    type: 'positive',
    message: `Bắt đầu thử thách "${selectedChallenge.value?.title}"!`,
    position: 'top'
  })
  // Here you would navigate to the actual challenge interface
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Dễ': return 'green'
    case 'Trung bình': return 'orange'
    case 'Khó': return 'red'
    default: return 'grey'
  }
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1: return 'bg-yellow-500'
    case 2: return 'bg-gray-400'
    case 3: return 'bg-orange-600'
    default: return 'bg-blue-500'
  }
}

const getAvatarColor = (index: number) => {
  const colors = ['yellow', 'grey', 'orange', 'blue', 'purple']
  return colors[index % colors.length]
}

const getScoreColor = (score: number) => {
  const percentage = score > 15 ? 80 : (score / 20) * 100
  if (percentage >= 80) return 'text-green-600'
  if (percentage >= 60) return 'text-orange-600'
  return 'text-red-600'
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}
</style>
