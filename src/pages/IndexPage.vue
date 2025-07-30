<template>
  <q-page>
    <!-- Trang giới thiệu cho người dùng chưa đăng nhập -->
    <div v-if="!authStore.isLoggedIn" class="min-h-screen bg-gradient-to-br">
      <!-- Hero Section -->
      <div class="relative overflow-hidden bg-gradient-to-r text-white">
        <div class="q-pa-xl">
          <div class="text-center">
            <h1 class="text-h2 text-weight-bold q-mb-lg">
              🚀 Học tiếng Anh thông minh với 
              <span class="text-yellow-4">EnglishBot</span>
            </h1>
            <p class="text-h5 q-mb-xl" style="max-width: 800px; margin: 0 auto;">
              Nền tảng học tiếng Anh AI thông minh, giúp bạn nâng cao kỹ năng 
              ngôn ngữ một cách hiệu quả và thú vị
            </p>
            <div class="row justify-center q-gutter-md">
              <q-btn 
                size="xl"
                color="yellow"
                text-color="dark"
                label="🎯 Bắt đầu ngay"
                @click="showRegister"
                class="text-weight-bold q-px-xl q-py-md"
              />
              <q-btn 
                size="xl"
                outline
                color="white"
                label="📚 Tìm hiểu thêm"
                @click="$router.push('/about')"
                class="text-weight-bold q-px-xl q-py-md"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="q-py-xl bg-white">
        <div style="max-width: 1200px; margin: 0 auto;" class="q-px-md">
          <div class="text-center q-mb-xl">
            <h2 class="text-h3 text-weight-bold text-grey-9 q-mb-md">
              ✨ Tính năng nổi bật
            </h2>
            <p class="text-h6 text-grey-6" style="max-width: 800px; margin: 0 auto;">
              EnglishBot mang đến trải nghiệm học tập toàn diện với công nghệ AI tiên tiến
            </p>
          </div>

          <div class="row q-gutter-lg">
            <div class="col-12 col-md-6 col-lg-4" v-for="feature in features" :key="feature.id">
              <q-card class="card-hover">
                <q-card-section class="text-center">
                  <div class="text-h1 q-mb-md">{{ feature.icon }}</div>
                  <h3 class="text-h6 text-weight-medium q-mb-sm">{{ feature.title }}</h3>
                  <p class="text-grey-6">{{ feature.description }}</p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="q-py-xl bg-gradient-to-br">
        <div style="max-width: 1200px; margin: 0 auto;" class="q-px-md">
          <div class="text-center q-mb-xl">
            <h2 class="text-h3 text-weight-bold text-grey-9 q-mb-md">
              📊 Thống kê ấn tượng
            </h2>
          </div>

          <div class="row q-gutter-lg">
            <div class="col-12 col-md-3" v-for="stat in stats" :key="stat.label">
              <div class="text-center">
                <div class="text-h2 text-weight-bold text-primary q-mb-sm">
                  {{ stat.number }}
                </div>
                <div class="text-h6 text-grey-6">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="q-py-xl bg-gradient-to-r text-white">
        <div style="max-width: 1000px; margin: 0 auto;" class="text-center q-px-md">
          <h2 class="text-h3 text-weight-bold q-mb-lg">
            🎓 Sẵn sàng bắt đầu hành trình?
          </h2>
          <p class="text-h6 q-mb-lg">
            Tham gia cùng hàng nghìn học viên đã cải thiện tiếng Anh với EnglishBot
          </p>
          <q-btn 
            size="xl"
            color="yellow"
            text-color="dark"
            label="🚀 Đăng ký miễn phí"
            @click="showRegister"
            class="text-weight-bold q-px-xl q-py-md"
          />
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-grey-9 text-white q-py-xl">
        <div style="max-width: 1200px; margin: 0 auto;" class="q-px-md">
          <div class="row q-gutter-lg">
            <div class="col-12 col-md-6">
              <div class="row items-center q-gutter-sm q-mb-md">
                <q-icon name="school" size="md" />
                <span class="text-h5 text-weight-bold">EnglishBot</span>
              </div>
              <p class="text-grey-4 q-mb-md">
                Nền tảng học tiếng Anh AI thông minh, giúp bạn nâng cao kỹ năng ngôn ngữ hiệu quả
              </p>
            </div>
            
            <div class="col-12 col-md-3">
              <h3 class="text-h6 text-weight-medium q-mb-md">Liên kết</h3>
              <div class="column q-gutter-sm">
                <router-link to="/about" class="text-grey-4 text-decoration-none">Giới thiệu</router-link>
                <router-link to="/challenge" class="text-grey-4 text-decoration-none">Thử thách</router-link>
                <a href="#" class="text-grey-4 text-decoration-none">Hướng dẫn</a>
              </div>
            </div>
            
            <div class="col-12 col-md-3">
              <h3 class="text-h6 text-weight-medium q-mb-md">Hỗ trợ</h3>
              <div class="column q-gutter-sm">
                <a href="#" class="text-grey-4 text-decoration-none">Trung tâm trợ giúp</a>
                <a href="#" class="text-grey-4 text-decoration-none">Liên hệ</a>
                <a href="#" class="text-grey-4 text-decoration-none">Điều khoản</a>
              </div>
            </div>
          </div>
          
          <q-separator class="q-my-lg" color="grey-8" />
          <div class="text-center text-grey-4">
            <p>&copy; 2025 EnglishBot. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>

    <!-- Giao diện chat cho người dùng đã đăng nhập -->
    <div v-else class="min-h-screen bg-grey-1">
      <ChatInterface />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useAuthStore } from '../stores/auth'
import ChatInterface from '../components/ChatInterface.vue'

const authStore = useAuthStore()
const showRegister = inject('showRegister') as () => void

const features = [
  {
    id: 1,
    icon: "🤖",
    title: "AI Thông minh",
    description: "Chatbot AI hiểu và phản hồi tự nhiên, giúp bạn luyện tập hội thoại"
  },
  {
    id: 2,
    icon: "🎯",
    title: "Học theo cấp độ",
    description: "Nội dung được tùy chỉnh theo trình độ và mục tiêu của bạn"
  },
  {
    id: 3,
    icon: "🏆",
    title: "Thử thách thú vị",
    description: "Tham gia các cuộc thi và thách đấu để kiểm tra kiến thức"
  },
  {
    id: 4,
    icon: "👥",
    title: "Học cùng b��n bè",
    description: "Kết nối và cạnh tranh với bạn bè để tăng động lực học tập"
  },
  {
    id: 5,
    icon: "📈",
    title: "Theo dõi tiến độ",
    description: "Xem báo cáo chi tiết về quá trình học tập của bạn"
  },
  {
    id: 6,
    icon: "🎁",
    title: "Phần thưởng hấp dẫn",
    description: "Nhận điểm thưởng và đổi quà khi hoàn thành mục tiêu"
  }
]

const stats = [
  { number: "10K+", label: "Học viên" },
  { number: "95%", label: "Hài lòng" },
  { number: "1M+", label: "Câu hỏi" },
  { number: "24/7", label: "Hỗ trợ" }
]
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
