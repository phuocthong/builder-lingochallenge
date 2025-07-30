<template>
  <div class="chat-container h-screen flex flex-col">
    <!-- Chat Header -->
    <div
      class="bg-white border-b border-gray-200 p-4 flex items-center justify-between"
    >
      <div class="flex items-center space-x-3">
        <q-avatar color="primary" text-color="white" size="md">
          <q-icon name="smart_toy" />
        </q-avatar>
        <div>
          <h3 class="font-semibold text-gray-900">EnglishBot AI</h3>
          <p class="text-sm text-green-500">🟢 Đang hoạt động</p>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <q-btn flat round icon="refresh" @click="clearChat">
          <q-tooltip>Bắt đầu cuộc trò chuyện mới</q-tooltip>
        </q-btn>
        <q-btn flat round icon="settings">
          <q-tooltip>Cài đặt</q-tooltip>
        </q-btn>
      </div>
    </div>

    <!-- Messages Area -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex w-full"
        :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
      >
        <!-- AI Message (Left) -->
        <div
          v-if="message.sender === 'ai'"
          class="flex items-start space-x-3 max-w-xs sm:max-w-md lg:max-w-lg"
        >
          <q-avatar color="primary" text-color="white" size="sm">
            <q-icon name="smart_toy" />
          </q-avatar>
          <div class="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <p class="text-gray-800">{{ message.text }}</p>
            <div class="text-xs text-gray-500 mt-1">
              {{ formatTime(message.timestamp) }}
            </div>
          </div>
        </div>

        <!-- User Message (Right) -->
        <div
          v-else
          class="flex items-start space-x-3 max-w-xs sm:max-w-md lg:max-w-lg"
        >
          <div class="bg-blue-500 text-white rounded-lg p-3 shadow-sm">
            <p>{{ message.text }}</p>
            <div class="text-xs text-blue-100 mt-1">
              {{ formatTime(message.timestamp) }}
            </div>
          </div>
          <q-avatar color="secondary" text-color="white" size="sm">
            {{ authStore.userAvatar }}
          </q-avatar>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="isTyping" class="flex justify-start">
        <div
          class="flex items-start space-x-3 max-w-xs sm:max-w-md lg:max-w-lg"
        >
          <q-avatar color="primary" text-color="white" size="sm">
            <q-icon name="smart_toy" />
          </q-avatar>
          <div class="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <div class="flex space-x-1">
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="bg-white border-t border-gray-200 p-4">
      <div class="flex items-center space-x-3">
        <q-input
          v-model="newMessage"
          placeholder="Nhập tin nhắn của bạn..."
          outlined
          dense
          class="flex-1"
          @keypress.enter="sendMessage"
          :disable="isTyping"
        >
          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="attach_file"
              class="mr-2"
              @click="attachFile"
            >
              <q-tooltip>Đính kèm file</q-tooltip>
            </q-btn>
          </template>
        </q-input>

        <q-btn
          round
          color="primary"
          icon="send"
          @click="sendMessage"
          :disable="!newMessage.trim() || isTyping"
        />
      </div>

      <!-- Quick Suggestions -->
      <div v-if="showSuggestions" class="mt-3 flex flex-wrap gap-2">
        <q-chip
          v-for="suggestion in quickSuggestions"
          :key="suggestion"
          clickable
          color="blue-1"
          text-color="blue-8"
          @click="selectSuggestion(suggestion)"
          class="text-sm"
        >
          {{ suggestion }}
        </q-chip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const authStore = useAuthStore();
const messages = ref<Message[]>([]);
const newMessage = ref("");
const isTyping = ref(false);
const showSuggestions = ref(true);
const messagesContainer = ref<HTMLElement>();

const quickSuggestions = [
  "Hello! How are you?",
  "Tôi muốn học từ vựng mới",
  "Kiểm tra ngữ pháp của tôi",
  "Luyện tập phát âm",
  "Bài tập về thì quá khứ",
];

onMounted(() => {
  // Welcome message
  addMessage(
    "Xin chào! Tôi là EnglishBot, trợ lý AI giúp bạn học tiếng Anh. Hôm nay bạn muốn học gì? 😊",
    "ai",
  );
});

const addMessage = (text: string, sender: "user" | "ai") => {
  const message: Message = {
    id: Date.now().toString(),
    text,
    sender,
    timestamp: new Date(),
  };
  messages.value.push(message);
  nextTick(() => scrollToBottom());
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  const userMessage = newMessage.value;
  addMessage(userMessage, "user");
  newMessage.value = "";
  showSuggestions.value = false;

  // Simulate AI response
  isTyping.value = true;
  setTimeout(() => {
    const responses = [
      'Tuyệt vời! Hãy cùng nhau luyện tập nhé. Bạn có thể thử trả lời câu hỏi này: "What is your favorite hobby?"',
      'Rất hay! Tôi sẽ giúp bạn cải thiện ngữ pháp. Hãy thử sửa câu này: "I am go to school yesterday"',
      'Excellent! Let\'s practice some vocabulary. Can you tell me the meaning of "enthusiastic"?',
      'Tốt lắm! Bạn đã tiến bộ rất nhiều. H��y thử tạo một câu với từ "because"',
      "Great job! 🎉 Bạn muốn luyện tập thêm về chủ đề gì?",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    isTyping.value = false;
    addMessage(randomResponse, "ai");
  }, 1500);
};

const selectSuggestion = (suggestion: string) => {
  newMessage.value = suggestion;
  sendMessage();
};

const clearChat = () => {
  messages.value = [];
  showSuggestions.value = true;
  addMessage(
    "Chào mừng trở lại! Tôi sẵn sàng giúp bạn học tiếng Anh. Bạn muốn bắt đầu từ đâu? 😊",
    "ai",
  );
};

const attachFile = () => {
  // File attachment functionality
  console.log("Attach file clicked");
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.chat-container {
  max-width: 100%;
}

@media (max-width: 440px) {
  .chat-container {
    padding: 0;
  }
}

.typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #9ca3af;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
