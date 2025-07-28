<template>
  <div class="chat-interface">
    <div class="chat-header q-pa-md bg-primary text-white">
      <div class="text-h6">🤖 English Learning Bot</div>
      <div class="text-caption">Học tiếng Anh thông qua trò chuyện</div>
    </div>

    <q-scroll-area class="chat-messages" style="height: 400px">
      <div class="q-pa-md">
        <div v-for="(message, index) in messages" :key="index" class="message-item q-mb-md">
          <q-chat-message
            :name="message.from === 'user' ? 'Bạn' : 'Bot'"
            :text="[message.text]"
            :sent="message.from === 'user'"
            :bg-color="message.from === 'user' ? 'primary' : 'grey-3'"
            :text-color="message.from === 'user' ? 'white' : 'dark'"
          />
        </div>
      </div>
    </q-scroll-area>

    <div class="chat-input q-pa-md bg-grey-1">
      <div class="row q-gutter-sm">
        <div class="col">
          <q-input
            v-model="currentMessage"
            placeholder="Nhập câu trả lời của bạn..."
            outlined
            dense
            @keyup.enter="sendMessage"
            :disable="!authStore.isLoggedIn"
          />
        </div>
        <div class="col-auto">
          <q-btn
            color="primary"
            icon="send"
            round
            @click="sendMessage"
            :disable="!currentMessage.trim() || !authStore.isLoggedIn"
          />
        </div>
      </div>
      
      <div v-if="!authStore.isLoggedIn" class="text-center q-mt-md">
        <q-btn color="primary" label="Đăng nhập để bắt đầu học" @click="$emit('show-login')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

interface Message {
  from: 'user' | 'bot'
  text: string
  timestamp: Date
}

const messages = ref<Message[]>([])
const currentMessage = ref('')

const sampleQuestions = [
  {
    bot: "Hello! Hãy dịch câu này sang tiếng Việt: 'The weather is beautiful today.'",
    answer: "Thời tiết hôm nay thật đẹp."
  },
  {
    bot: "What does 'library' mean in Vietnamese?",
    answer: "thư viện"
  },
  {
    bot: "Translate to English: 'Tôi đang học tiếng Anh.'",
    answer: "I am learning English."
  }
]

let currentQuestionIndex = 0

function sendMessage() {
  if (!currentMessage.value.trim()) return

  // Add user message
  messages.value.push({
    from: 'user',
    text: currentMessage.value,
    timestamp: new Date()
  })

  // Simulate bot response
  setTimeout(() => {
    const isCorrect = Math.random() > 0.3 // 70% chance of being "correct"
    const response = isCorrect 
      ? "✅ Chính xác! Bạn đã trả lời đúng."
      : "❌ Chưa chính xác. Hãy thử lại!"

    messages.value.push({
      from: 'bot',
      text: response,
      timestamp: new Date()
    })

    // Send next question after a short delay
    if (isCorrect) {
      setTimeout(() => {
        askNextQuestion()
      }, 1000)
    }
  }, 1000)

  currentMessage.value = ''
}

function askNextQuestion() {
  const question = sampleQuestions[currentQuestionIndex % sampleQuestions.length]
  messages.value.push({
    from: 'bot',
    text: question.bot,
    timestamp: new Date()
  })
  currentQuestionIndex++
}

onMounted(() => {
  // Welcome message
  messages.value.push({
    from: 'bot',
    text: "Chào mừng bạn đến với English Learning Bot! 🎉\nTôi sẽ giúp bạn học tiếng Anh thông qua các câu hỏi tương tác.",
    timestamp: new Date()
  })

  // Start with first question if logged in
  if (authStore.isLoggedIn) {
    setTimeout(() => {
      askNextQuestion()
    }, 1000)
  }
})

defineEmits(['show-login'])
</script>

<style scoped>
.chat-interface {
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
