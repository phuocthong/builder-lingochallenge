<template>
  <q-page class="bg-white">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container">
        <!-- Large Icon -->
        <div class="hero-icon">
          <div class="icon-wrapper">
            <q-icon name="computer" size="48px" color="white" />
          </div>
        </div>

        <!-- Main Title -->
        <div class="hero-title">
          <h1 class="main-title">Học Tiếng Anh Thông Qua</h1>
          <h1 class="sub-title">Trò Chuyện AI</h1>
        </div>

        <!-- Description -->
        <p class="hero-description">
          Khám phá cách học ti��ng Anh hiệu quả nhất với AI chatbot thông minh, thách đấu bạn bè và hệ thống phần thưởng hấp dẫn.
        </p>

        <!-- CTA Buttons -->
        <div class="cta-buttons">
          <q-btn 
            class="primary-btn"
            @click="showRegister"
          >
            <q-icon name="auto_awesome" class="q-mr-sm" />
            Bắt Đầu Miễn Phí
            <q-icon name="arrow_forward" class="q-ml-sm" />
          </q-btn>
          
          <q-btn 
            class="secondary-btn"
            @click="showLogin"
          >
            <q-icon name="play_arrow" class="q-mr-sm" />
            Đăng Nhập
          </q-btn>
        </div>

        <!-- Stats -->
        <div class="stats-section">
          <div class="stat-item">
            <div class="stat-icon">
              <q-icon name="people" size="20px" />
            </div>
            <div class="stat-number">10,000+</div>
            <div class="stat-label">Người học</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-icon">
              <q-icon name="quiz" size="20px" />
            </div>
            <div class="stat-number">50,000+</div>
            <div class="stat-label">Câu hỏi</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-icon">
              <q-icon name="star" size="20px" />
            </div>
            <div class="stat-number">95%</div>
            <div class="stat-label">Hài lòng</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-icon">
              <q-icon name="schedule" size="20px" />
            </div>
            <div class="stat-number">24/7</div>
            <div class="stat-label">Hỗ trợ</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Tại Sao Chọn Lingo?</h2>
          <p class="section-description">
            Những tính năng độc đáo giúp bạn học tiếng Anh hiệu quả và thú vị hơn bao giờ hết
          </p>
        </div>

        <div class="features-grid">
          <q-card class="feature-card">
            <q-card-section class="feature-content">
              <div class="feature-icon">
                <q-icon name="smart_toy" size="32px" />
              </div>
              <h3 class="feature-title">AI Chatbot Thông Minh</h3>
              <p class="feature-description">
                Học tiếng Anh qua trò chuyện tự nhiên với AI bot được thiết kế đặc biệt
              </p>
            </q-card-section>
          </q-card>

          <q-card class="feature-card">
            <q-card-section class="feature-content">
              <div class="feature-icon">
                <q-icon name="people" size="32px" />
              </div>
              <h3 class="feature-title">Thách Đấu Bạn Bè</h3>
              <p class="feature-description">
                Cạnh tranh với bạn bè trong các cuộc thi tiếng Anh thú vị và hấp dẫn
              </p>
            </q-card-section>
          </q-card>

          <q-card class="feature-card">
            <q-card-section class="feature-content">
              <div class="feature-icon">
                <q-icon name="emoji_events" size="32px" />
              </div>
              <h3 class="feature-title">Hệ Thống Xếp Hạng</h3>
              <p class="feature-description">
                Theo dõi tiến bộ và cạnh tranh với hàng nghìn người học khác
              </p>
            </q-card-section>
          </q-card>

          <q-card class="feature-card">
            <q-card-section class="feature-content">
              <div class="feature-icon">
                <q-icon name="target" size="32px" />
              </div>
              <h3 class="feature-title">Nhiệm Vụ Hàng Ngày</h3>
              <p class="feature-description">
                Hoàn thành các nhiệm vụ để duy trì động lực và nhận phần thưởng
              </p>
            </q-card-section>
          </q-card>

          <q-card class="feature-card">
            <q-card-section class="feature-content">
              <div class="feature-icon">
                <q-icon name="redeem" size="32px" />
              </div>
              <h3 class="feature-title">Đổi Thưởng Hấp Dẫn</h3>
              <p class="feature-description">
                Quy đổi điểm thành thẻ cào điện thoại và nhiều phần quà khác
              </p>
            </q-card-section>
          </q-card>

          <q-card class="feature-card">
            <q-card-section class="feature-content">
              <div class="feature-icon">
                <q-icon name="analytics" size="32px" />
              </div>
              <h3 class="feature-title">Thống Kê Chi Tiết</h3>
              <p class="feature-description">
                Theo dõi chi tiết quá trình học tập với biểu đồ và báo cáo
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- How It Works Section -->
    <div class="how-it-works-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Cách Thức Hoạt Động</h2>
          <p class="section-description">
            Chỉ 3 bước đơn giản để bắt đầu hành trình học tiếng Anh
          </p>
        </div>

        <div class="steps-container">
          <div class="step-item">
            <div class="step-number">1</div>
            <h3 class="step-title">Đăng Ký Miễn Phí</h3>
            <p class="step-description">
              Tạo tài khoản chỉ trong 30 giây với email hoặc số điện thoại
            </p>
          </div>

          <div class="step-item">
            <div class="step-number">2</div>
            <h3 class="step-title">Bắt Đầu Chat</h3>
            <p class="step-description">
              Trò chuyện với AI bot và trả lời các câu hỏi tiếng Anh thú vị
            </p>
          </div>

          <div class="step-item">
            <div class="step-number">3</div>
            <h3 class="step-title">Nhận Phần Thưởng</h3>
            <p class="step-description">
              Tích lũy điểm và đổi lấy thẻ cào, quà tặng hấp dẫn
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Dialog -->
    <q-dialog v-model="showLoginDialog" persistent>
      <q-card style="min-width: 400px" class="q-pa-md">
        <q-card-section>
          <div class="text-h6 text-center">🚀 Đăng nhập EnglishBot</div>
          <div class="text-subtitle2 text-center text-grey-6">
            Chào mừng bạn trở lại! Hãy đăng nhập để tiếp tục học tập.
          </div>
        </q-card-section>

        <q-card-section>
          <!-- Demo Login Button -->
          <div class="q-mb-lg">
            <q-btn
              color="primary"
              label="🚀 Đăng nhập Demo (Phước Thông)"
              class="full-width q-py-sm"
              @click="handleLogin({name: 'Phước Thông', email: 'phuocthoang@demo.com'})"
            />
            <div class="text-center q-mt-sm text-caption text-grey-6">
              Click để đăng nhập nhanh
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Hủy" @click="showLoginDialog = false" />
          <q-btn
            flat
            label="Chuyển sang Đăng ký"
            color="primary"
            @click="switchToRegister"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Register Dialog -->
    <q-dialog v-model="showRegisterDialog" persistent>
      <q-card style="min-width: 400px" class="q-pa-md">
        <q-card-section>
          <div class="text-h6 text-center">✨ Đăng ký EnglishBot</div>
          <div class="text-subtitle2 text-center text-grey-6">
            Tạo tài khoản mới để bắt đầu hành trình học tiếng Anh!
          </div>
        </q-card-section>

        <q-card-section>
          <!-- Demo Register Button -->
          <div class="q-mb-lg">
            <q-btn
              color="primary"
              label="✨ Đăng ký Demo (Phước Thông)"
              class="full-width q-py-sm"
              @click="handleRegister({name: 'Phước Thông', email: 'phuocthoang@demo.com'})"
            />
            <div class="text-center q-mt-sm text-caption text-grey-6">
              Click để tạo tài khoản demo
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Hủy" @click="showRegisterDialog = false" />
          <q-btn
            flat
            label="Đã có tài khoản? Đăng nhập"
            color="primary"
            @click="switchToLogin"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const $q = useQuasar()

// Local state for dialogs
const showLoginDialog = ref(false)
const showRegisterDialog = ref(false)

const showLogin = () => {
  console.log('IndexPage: Show login clicked!')
  showRegisterDialog.value = false
  showLoginDialog.value = true
}

const showRegister = () => {
  console.log('IndexPage: Show register clicked!')
  showLoginDialog.value = false
  showRegisterDialog.value = true
}

const handleLogin = (userData: { name: string; email: string }) => {
  console.log('IndexPage: Login handler called with:', userData)
  authStore.login(userData)
  showLoginDialog.value = false
  $q.notify({
    type: "positive",
    message: `Chào mừng ${userData.name}!`,
    position: "top",
  })
  router.push('/chat')
}

const handleRegister = (userData: { name: string; email: string }) => {
  console.log('IndexPage: Register handler called with:', userData)
  authStore.login(userData)
  showRegisterDialog.value = false
  $q.notify({
    type: "positive",
    message: `Đăng ký thành công! Chào mừng ${userData.name}!`,
    position: "top",
  })
  router.push('/chat')
}

const switchToRegister = () => {
  showLoginDialog.value = false
  showRegisterDialog.value = true
}

const switchToLogin = () => {
  showRegisterDialog.value = false
  showLoginDialog.value = true
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.10) 100%, rgba(109, 40, 217, 0.10) 0%);
  padding: 80px 0;
  text-align: center;
}

.hero-icon {
  margin-bottom: 34px;
}

.icon-wrapper {
  display: inline-flex;
  padding: 16px;
  border-radius: 50%;
  background: linear-gradient(90deg, #2563EB 100%, #6D28D9 0%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1);
}

.hero-title {
  margin-bottom: 34px;
}

.main-title {
  font-size: 60px;
  font-weight: 700;
  line-height: 60px;
  color: #111827;
  margin: 0 0 6px 0;
}

.sub-title {
  font-size: 60px;
  font-weight: 700;
  line-height: 60px;
  color: #6D28D9;
  margin: 0;
}

.hero-description {
  font-size: 20px;
  color: #4B5563;
  text-align: center;
  line-height: 32.5px;
  max-width: 732px;
  margin: 0 auto 34px auto;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 50px;
}

.primary-btn {
  background: linear-gradient(0deg, #8457FF 0%, #8457FF 100%), linear-gradient(90deg, #2563EB 100%, #6D28D9 0%);
  color: white;
  padding: 8px 32px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1);
}

.secondary-btn {
  background: white;
  color: #5B21B6;
  border: 2px solid #E9D5FF;
  padding: 8px 32px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1);
}

.stats-section {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-icon {
  display: flex;
  padding: 8px;
  border-radius: 50%;
  background: #EDE9FE;
}

.stat-number {
  font-size: 30px;
  font-weight: 700;
  color: #111827;
  line-height: 36px;
}

.stat-label {
  font-size: 16px;
  font-weight: 500;
  color: #4B5563;
  line-height: 24px;
}

/* Features Section */
.features-section {
  background: white;
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  line-height: 40px;
  margin: 0 0 16px 0;
}

.section-description {
  font-size: 20px;
  color: #4B5563;
  line-height: 28px;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1);
}

.feature-content {
  text-align: center;
  padding: 24px;
}

.feature-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  margin: 0 auto 22px auto;
  border-radius: 50%;
  background: linear-gradient(90deg, #EFF6FF 100%, #F5F3FF 0%);
}

.feature-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  line-height: 28px;
  letter-spacing: -0.5px;
  margin: 0 0 16px 0;
}

.feature-description {
  font-size: 14px;
  color: #4B5563;
  line-height: 22.75px;
  margin: 0;
}

/* How It Works Section */
.how-it-works-section {
  background: linear-gradient(90deg, #EFF6FF 100%, #F5F3FF 0%);
  padding: 80px 0;
}

.steps-container {
  display: flex;
  justify-content: center;
  gap: 32px;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 360px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(90deg, #2563EB 100%, #6D28D9 0%);
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 21px;
}

.step-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  line-height: 28px;
  margin: 0 0 21px 0;
}

.step-description {
  font-size: 16px;
  color: #4B5563;
  line-height: 24px;
  margin: 0;
}
</style>
