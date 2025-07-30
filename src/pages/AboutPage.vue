<template>
  <q-page class="bg-white">
    <div class="container">
      <!-- About Header -->
      <div class="about-header">
        <h1 class="page-title">🌟 Về EnglishBot</h1>
        <p class="page-description">
          Chúng tôi tin rằng việc học tiếng Anh có thể trở nên thú vị và hiệu
          quả thông qua công nghệ AI tiên tiến
        </p>
      </div>

      <!-- Mission Section -->
      <div class="mission-section">
        <div class="mission-content">
          <div class="mission-text">
            <h2 class="mission-title">🎯 Sứ mệnh của chúng tôi</h2>
            <p class="mission-description">
              EnglishBot được tạo ra với mục tiêu democratize việc học tiếng
              Anh, giúp mọi người có thể tiếp cận với phương pháp học tập hiện
              đại và hiệu quả.
            </p>
            <p class="mission-description">
              Chúng tôi kết hợp trí tuệ nhân tạo với pedagogy để tạo ra trải
              nghiệm học tập cá nhân hóa cho từng học viên.
            </p>
            <q-btn
              color="primary"
              size="lg"
              label="Bắt đầu học ngay"
              @click="$router.push('/')"
              class="mission-btn"
            />
          </div>
          <div class="mission-visual">
            <div class="robot-icon">🤖</div>
          </div>
        </div>
      </div>

      <!-- Why Choose Section -->
      <div class="why-choose-section">
        <h2 class="section-title">✨ Tại sao chọn EnglishBot?</h2>
        <div class="features-grid">
          <q-card
            v-for="feature in features"
            :key="feature.id"
            class="feature-card"
          >
            <q-card-section class="feature-content">
              <div class="feature-icon">{{ feature.icon }}</div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Team Section -->
      <div class="team-section">
        <h2 class="section-title">👥 Đội ngũ phát triển</h2>
        <div class="team-grid">
          <q-card
            v-for="member in teamMembers"
            :key="member.id"
            class="team-card"
          >
            <q-card-section class="team-content">
              <q-avatar size="80px" class="team-avatar">
                <div class="avatar-placeholder">{{ member.avatar }}</div>
              </q-avatar>
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-role">{{ member.role }}</p>
              <p class="member-description">{{ member.description }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="contact-section">
        <q-card class="contact-card">
          <q-card-section class="contact-content">
            <h2 class="contact-title">📧 Liên hệ với chúng tôi</h2>
            <p class="contact-description">
              Có câu hỏi hoặc đề xuất? Chúng tôi rất muốn lắng nghe từ bạn!
            </p>
            <div class="contact-buttons">
              <q-btn
                color="primary"
                size="lg"
                label="📧 Email: support@englishbot.vn"
                flat
                class="contact-btn"
              />
              <q-btn
                color="secondary"
                size="lg"
                label="📱 Hotline: 1900-1234"
                flat
                class="contact-btn"
              />
            </div>
          </q-card-section>
        </q-card>
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
    avatar: "CEO",
  },
  {
    id: 2,
    name: "Trần Thị B",
    role: "CTO",
    description: "Kỹ sư AI hàng đầu, chuyên về NLP và Machine Learning",
    avatar: "CTO",
  },
  {
    id: 3,
    name: "Lê Văn C",
    role: "Head of Education",
    description: "Thạc sĩ Ngôn ngữ Anh, 15+ năm giảng dạy",
    avatar: "EDU",
  },
];
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 32px;
}

.about-header {
  text-align: center;
  margin-bottom: 80px;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px 0;
}

.page-description {
  font-size: 20px;
  color: #4b5563;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.mission-section {
  margin-bottom: 80px;
}

.mission-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.mission-title {
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px 0;
}

.mission-description {
  font-size: 18px;
  color: #4b5563;
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.mission-btn {
  margin-top: 24px;
}

.mission-visual {
  text-align: center;
}

.robot-icon {
  font-size: 120px;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.why-choose-section {
  margin-bottom: 80px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin: 0 0 48px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-content {
  text-align: center;
  padding: 32px 24px;
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
}

.feature-description {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.5;
  margin: 0;
}

.team-section {
  margin-bottom: 80px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.team-card {
  text-align: center;
}

.team-content {
  padding: 32px 24px;
}

.team-avatar {
  margin-bottom: 16px;
}

.avatar-placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.member-name {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.member-role {
  font-size: 16px;
  font-weight: 500;
  color: #7c3aed;
  margin: 0 0 12px 0;
}

.member-description {
  font-size: 14px;
  color: #4b5563;
  margin: 0;
  line-height: 1.5;
}

.contact-section {
  margin-top: 40px;
}

.contact-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.contact-content {
  padding: 48px 32px;
  text-align: center;
}

.contact-title {
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px 0;
}

.contact-description {
  font-size: 18px;
  color: #4b5563;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.contact-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.contact-btn {
  min-width: 300px;
}
</style>
