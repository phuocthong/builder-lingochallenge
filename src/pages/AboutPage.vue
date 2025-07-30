<template>
  <q-page class="bg-gradient-to-br from-purple-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          🌟 Về EnglishBot
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Chúng tôi tin rằng việc học tiếng Anh có thể trở nên thú vị và hiệu
          quả thông qua công nghệ AI tiên tiến
        </p>
      </div>

      <!-- Mission Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            🎯 Sứ mệnh của chúng tôi
          </h2>
          <p class="text-lg text-gray-600 mb-4">
            EnglishBot được tạo ra với mục tiêu democratize việc học tiếng Anh,
            giúp mọi người có thể tiếp cận với phương pháp học tập hiện đại và
            hiệu quả.
          </p>
          <p class="text-lg text-gray-600 mb-6">
            Chúng tôi kết hợp trí tuệ nhân tạo với pedagogy để tạo ra trải
            nghiệm học tập cá nhân hóa cho từng học viên.
          </p>
          <q-btn
            color="primary"
            size="lg"
            label="Bắt đầu học ngay"
            @click="$router.push('/')"
          />
        </div>
        <div class="text-center">
          <div
            class="w-64 h-64 mx-auto bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-6xl"
          >
            🤖
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          ✨ Tại sao chọn EnglishBot?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <q-card
            v-for="feature in features"
            :key="feature.id"
            class="card-hover"
          >
            <q-card-section class="text-center">
              <div class="text-5xl mb-4">{{ feature.icon }}</div>
              <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.description }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Team Section -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          👥 Đội ngũ phát triển
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <q-card
            v-for="member in teamMembers"
            :key="member.id"
            class="text-center"
          >
            <q-card-section>
              <q-avatar size="80px" class="mb-4">
                <img :src="member.avatar" :alt="member.name" />
              </q-avatar>
              <h3 class="text-xl font-semibold mb-2">{{ member.name }}</h3>
              <p class="text-purple-600 font-medium mb-2">{{ member.role }}</p>
              <p class="text-gray-600 text-sm">{{ member.description }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="bg-white rounded-2xl p-8 text-center shadow-lg">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">
          📧 Liên hệ với chúng tôi
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          Có câu hỏi hoặc đề xuất? Chúng tôi rất muốn lắng nghe từ bạn!
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <q-btn
            color="primary"
            size="lg"
            label="📧 Email: support@englishbot.vn"
            flat
          />
          <q-btn
            color="secondary"
            size="lg"
            label="📱 Hotline: 1900-1234"
            flat
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const features = [
  {
    id: 1,
    icon: "🧠",
    title: "AI Thông minh",
    description: "Sử dụng machine learning để hiểu và phản hồi tự nhiên",
  },
  {
    id: 2,
    icon: "📚",
    title: "Nội dung phong phú",
    description: "Hàng nghìn bài học từ cơ bản đến nâng cao",
  },
  {
    id: 3,
    icon: "🎮",
    title: "Gamification",
    description: "Học tập thông qua trò chơi và thử thách thú vị",
  },
  {
    id: 4,
    icon: "📊",
    title: "Theo dõi tiến độ",
    description: "Báo cáo chi tiết về quá trình học tập của bạn",
  },
  {
    id: 5,
    icon: "🌍",
    title: "Cộng đồng",
    description: "Kết nối và học tập cùng với bạn bè",
  },
  {
    id: 6,
    icon: "📱",
    title: "Đa nền tảng",
    description: "Học mọi lúc mọi nơi trên web và mobile",
  },
];

const teamMembers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    role: "CEO & Founder",
    description: "Chuyên gia giáo dục với 10+ năm kinh nghiệm",
    avatar: "https://via.placeholder.com/150/6366f1/ffffff?text=CEO",
  },
  {
    id: 2,
    name: "Trần Thị B",
    role: "CTO",
    description: "Kỹ sư AI hàng đầu, chuyên về NLP và Machine Learning",
    avatar: "https://via.placeholder.com/150/8b5cf6/ffffff?text=CTO",
  },
  {
    id: 3,
    name: "Lê Văn C",
    role: "Head of Education",
    description: "Thạc sĩ Ngôn ngữ Anh, 15+ năm giảng dạy",
    avatar: "https://via.placeholder.com/150/06b6d4/ffffff?text=EDU",
  },
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
