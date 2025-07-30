<template>
  <q-page>
    <!-- Trang giới thiệu cho người dùng chưa đăng nhập -->
    <div
      v-if="!authStore.isLoggedIn"
      class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50"
    >
      <!-- Hero Section -->
      <div
        class="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white"
      >
        <div class="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              🚀 Học tiếng Anh thông minh với
              <span class="text-yellow-300">EnglishBot</span>
            </h1>
            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Nền tảng học tiếng Anh AI thông minh, giúp bạn nâng cao k�� năng
              ngôn ngữ một cách hiệu quả và thú vị
            </p>
            <div
              class="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <q-btn
                size="xl"
                color="yellow"
                text-color="dark"
                label="🎯 Bắt đầu ngay"
                @click="showRegister"
                class="font-semibold px-8 py-4"
              />
              <q-btn
                size="xl"
                outline
                color="white"
                label="📚 Tìm hiểu thêm"
                @click="$router.push('/about')"
                class="font-semibold px-8 py-4"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              ✨ Tính năng nổi bật
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              EnglishBot mang đến trải nghiệm học tập toàn diện với công nghệ AI
              tiên tiến
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <q-card
              v-for="feature in features"
              :key="feature.id"
              class="card-hover"
            >
              <q-card-section class="text-center">
                <div class="text-6xl mb-4">{{ feature.icon }}</div>
                <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
                <p class="text-gray-600">{{ feature.description }}</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="py-24 bg-gradient-to-r from-purple-50 to-blue-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              📊 Thống kê ấn tượng
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                {{ stat.number }}
              </div>
              <div class="text-lg text-gray-600">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div
        class="py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
      >
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl md:text-5xl font-bold mb-6">
            🎓 Sẵn sàng bắt đầu hành trình?
          </h2>
          <p class="text-xl mb-8">
            Tham gia cùng hàng nghìn học viên đã cải thiện tiếng Anh với
            EnglishBot
          </p>
          <q-btn
            size="xl"
            color="yellow"
            text-color="dark"
            label="🚀 Đăng ký miễn phí"
            @click="showRegister"
            class="font-semibold px-8 py-4"
          />
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="md:col-span-2">
              <div class="flex items-center space-x-2 mb-4">
                <q-icon name="school" size="md" />
                <span class="text-2xl font-bold">EnglishBot</span>
              </div>
              <p class="text-gray-400 mb-4">
                Nền tảng học tiếng Anh AI thông minh, giúp bạn nâng cao kỹ năng
                ngôn ngữ hiệu quả
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Liên kết</h3>
              <ul class="space-y-2 text-gray-400">
                <li>
                  <router-link to="/about" class="hover:text-white"
                    >Giới thiệu</router-link
                  >
                </li>
                <li>
                  <router-link to="/challenge" class="hover:text-white"
                    >Thử thách</router-link
                  >
                </li>
                <li><a href="#" class="hover:text-white">Hướng dẫn</a></li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Hỗ trợ</h3>
              <ul class="space-y-2 text-gray-400">
                <li>
                  <a href="#" class="hover:text-white">Trung tâm trợ giúp</a>
                </li>
                <li><a href="#" class="hover:text-white">Liên hệ</a></li>
                <li><a href="#" class="hover:text-white">Điều khoản</a></li>
              </ul>
            </div>
          </div>

          <div
            class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2025 EnglishBot. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>

    <!-- Giao diện chat cho người dùng đã đăng nhập -->
    <div v-else class="min-h-screen bg-gray-50">
      <ChatInterface />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { useAuthStore } from "../stores/auth";
import ChatInterface from "../components/ChatInterface.vue";

const authStore = useAuthStore();
const showRegister = inject("showRegister") as () => void;

const features = [
  {
    id: 1,
    icon: "🤖",
    title: "AI Thông minh",
    description:
      "Chatbot AI hiểu và phản hồi tự nhiên, giúp bạn luyện tập hội thoại",
  },
  {
    id: 2,
    icon: "🎯",
    title: "Học theo cấp độ",
    description: "Nội dung được tùy chỉnh theo trình độ và mục tiêu của bạn",
  },
  {
    id: 3,
    icon: "🏆",
    title: "Thử thách thú vị",
    description: "Tham gia các cuộc thi và thách đấu để kiểm tra kiến thức",
  },
  {
    id: 4,
    icon: "👥",
    title: "Học cùng bạn bè",
    description: "Kết nối và cạnh tranh với bạn bè để tăng động lực học tập",
  },
  {
    id: 5,
    icon: "📈",
    title: "Theo dõi tiến độ",
    description: "Xem báo cáo chi tiết về quá trình học tập của bạn",
  },
  {
    id: 6,
    icon: "🎁",
    title: "Phần thưởng hấp dẫn",
    description: "Nhận điểm thưởng và đổi quà khi hoàn thành mục tiêu",
  },
];

const stats = [
  { number: "10K+", label: "Học viên" },
  { number: "95%", label: "Hài lòng" },
  { number: "1M+", label: "Câu hỏi" },
  { number: "24/7", label: "Hỗ trợ" },
];
</script>

<style scoped>
.card-hover {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
</style>
