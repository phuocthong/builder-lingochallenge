<template>
  <div class="chat-page">
    <!-- Header exactly matching Figma -->
    <div class="chat-header">
      <div class="header-content">
        <!-- Left: Logo and Navigation -->
        <div class="header-left">
          <div class="logo-section">
            <div class="logo-icon">
              <q-icon name="computer" color="white" size="24px" />
            </div>
            <div class="logo-text">Logo</div>
          </div>
          <div class="navigation">
            <div class="nav-item" @click="router.push('/')">Trang chủ</div>
            <div class="nav-item" @click="router.push('/about')">Giới thiệu</div>
            <div class="nav-item" @click="router.push('/challenge')">Thử thách</div>
            <div class="nav-item" @click="router.push('/friends')">Bạn bè</div>
            <div class="nav-item" @click="router.push('/shop')">Cửa hàng</div>
          </div>
        </div>

        <!-- Right: User Info -->
        <div class="header-right">
          <div class="user-stats">
            <div class="stat-item">
              <q-icon name="emoji_events" size="16px" />
              <span class="stat-text"># 45</span>
            </div>
            <div class="stat-correct">
              <span class="correct-number">523</span>
              <span class="correct-text">đúng</span>
            </div>
            <div class="stat-streak">
              <span class="streak-label">Streak:</span>
              <span class="streak-number">7</span>
            </div>
          </div>
          
          <div class="user-info">
            <div class="user-avatar">ND</div>
            <div class="user-name">Người dùng</div>
          </div>
          
          <div class="logout-btn" @click="handleLogout">
            <q-icon name="logout" size="16px" />
            <span>Đăng xuất</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="main-content">
      <div class="content-container">
        <!-- Left Side: Chat Interface -->
        <div class="chat-section">
          <!-- Chat Header with Bot Info -->
          <div class="chat-header-panel">
            <div class="bot-icon">
              <q-icon name="computer" color="white" size="20px" />
            </div>
            <div class="chat-title-info">
              <div class="chat-title">Thách đấu với Bot</div>
              <div class="chat-subtitle">Bot sẽ đưa ra câu hỏi mỗi 30-60 giây</div>
            </div>
          </div>

          <!-- Chat Messages Area -->
          <div class="chat-messages">
            <!-- Bot Message 1 -->
            <div class="message-row bot-message">
              <div class="message-avatar">
                <q-icon name="computer" color="black" size="16px" />
              </div>
              <div class="message-bubble bot-bubble">
                <div class="message-text">
                  Xin chào! Tôi là EnglishBot. Tôi sẽ đưa ra các câu hỏi tiếng Anh định kỳ để các bạn trả lời.
                </div>
                <div class="message-time">21:23</div>
              </div>
            </div>

            <!-- Bot Message 2 -->
            <div class="message-row bot-message">
              <div class="message-avatar">
                <q-icon name="computer" color="black" size="16px" />
              </div>
              <div class="message-bubble bot-bubble">
                <div class="message-text">Dịch từ "Intelligent" sang tiếng Việt</div>
                <div class="message-time">21:23</div>
                <div class="message-participants">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/94861390f9be0eb42544493a89935a3e8537e779?width=38" class="participant-avatar" />
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/808cc85b683761b4f2649b219713e811950b7da6?width=38" class="participant-avatar" />
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/d0b0d0d7bf9e895d63b544b8849b7b88a157a184?width=38" class="participant-avatar" />
                </div>
              </div>
            </div>

            <!-- Bot Answer Message -->
            <div class="message-row bot-answer">
              <div class="answer-bubble">
                <div class="answer-text">Đáp án đúng là: "thông minh"</div>
                <div class="answer-time">21:23</div>
              </div>
            </div>

            <!-- Bot Message 3 -->
            <div class="message-row bot-message">
              <div class="message-avatar">
                <q-icon name="computer" color="black" size="16px" />
              </div>
              <div class="message-bubble bot-bubble">
                <div class="message-text">Dịch từ "Amazing" sang tiếng Việt</div>
                <div class="message-time">21:23</div>
                <div class="message-participants">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/afd6b1f2255dd111fa11b26060334ab2b8550b68?width=34" class="participant-avatar small" />
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/57601513ec477a7832bf1a848cd546ad59d68b24?width=34" class="participant-avatar small" />
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/a799c61d39d6c04d560750f802eb88c5ea24ee80?width=34" class="participant-avatar small" />
                </div>
              </div>
            </div>

            <!-- Bot Answer Message 2 -->
            <div class="message-row bot-answer">
              <div class="answer-bubble">
                <div class="answer-text">Đáp án đúng là: "tuyệt vời"</div>
                <div class="answer-time">21:24</div>
              </div>
            </div>

            <!-- User Icon -->
            <div class="user-message-indicator">
              <q-icon name="person" size="24px" />
            </div>
          </div>

          <!-- Chat Input Area -->
          <div class="chat-input-area">
            <div class="input-container">
              <q-input
                v-model="currentMessage"
                placeholder="Nhập câu trả lời của bạn..."
                outlined
                dense
                class="message-input"
                :disabled="!authStore.isLoggedIn"
              />
              <q-btn
                icon="send"
                color="primary"
                @click="sendMessage"
                :disabled="!currentMessage.trim() || !authStore.isLoggedIn"
                class="send-button"
              />
            </div>
            <div class="login-status">
              <div class="status-indicator"></div>
              <span class="status-text">Đăng nhập với tên: Người dùng</span>
            </div>
          </div>
        </div>

        <!-- Right Side: History and Leaderboard -->
        <div class="sidebar">
          <!-- Chat History Panel -->
          <div class="history-panel">
            <div class="panel-header">
              <q-icon name="schedule" size="20px" />
              <div class="panel-title">
                <div class="title">Lịch sử câu hỏi</div>
                <div class="subtitle">20 câu hỏi gần nhất</div>
              </div>
            </div>
            
            <div class="history-list">
              <div class="history-item">
                <div class="history-content">
                  <div class="history-question">Dịch từ "Beautiful" sang tiếng Việt</div>
                  <div class="history-details">
                    <div class="history-answer">Đáp án: "đẹp"</div>
                    <div class="history-date">10:30 - 26/07/2024</div>
                  </div>
                  <div class="history-stats">
                    <div class="stats-section">
                      <q-icon name="people" size="12px" />
                      <span class="correct">15 đúng</span>
                      <span class="divider">/</span>
                      <span class="total">23 trả lời</span>
                    </div>
                    <div class="details-link">▼ Xem chi tiết</div>
                  </div>
                </div>
              </div>

              <div class="history-item">
                <div class="history-content">
                  <div class="history-question">Dịch từ "Happy" sang tiếng Việt</div>
                  <div class="history-details">
                    <div class="history-answer">Đáp án: "hạnh phúc"</div>
                    <div class="history-date">10:25 - 26/07/2024</div>
                  </div>
                  <div class="history-stats">
                    <div class="stats-section">
                      <q-icon name="people" size="12px" />
                      <span class="correct">12 đúng</span>
                      <span class="divider">/</span>
                      <span class="total">18 trả lời</span>
                    </div>
                    <div class="details-link">▼ Xem chi tiết</div>
                  </div>
                </div>
              </div>

              <div class="history-item">
                <div class="history-content">
                  <div class="history-question">Dịch từ "Wonderful" sang tiếng Việt</div>
                  <div class="history-details">
                    <div class="history-answer">Đáp án: "tuyệt vời"</div>
                    <div class="history-date">10:20 - 26/07/2024</div>
                  </div>
                  <div class="history-stats">
                    <div class="stats-section">
                      <q-icon name="people" size="12px" />
                      <span class="correct">18 đúng</span>
                      <span class="divider">/</span>
                      <span class="total">25 trả lời</span>
                    </div>
                    <div class="details-link">▼ Xem chi tiết</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Leaderboard Panel -->
          <div class="leaderboard-panel">
            <div class="panel-header">
              <q-icon name="emoji_events" size="20px" />
              <div class="panel-title">
                <div class="title">Bảng xếp hạng</div>
              </div>
              <q-icon name="trending_up" size="16px" />
            </div>

            <div class="leaderboard-tabs">
              <div class="tab active">Tổng</div>
              <div class="tab">Tuần</div>
              <div class="tab">Tháng</div>
              <div class="tab">Năm</div>
            </div>

            <div class="leaderboard-list">
              <!-- Rank 1 -->
              <div class="leaderboard-item gold">
                <div class="rank-icon">
                  <q-icon name="emoji_events" size="16px" />
                </div>
                <div class="user-avatar-small gold-bg">MA</div>
                <div class="user-details">
                  <div class="user-name">Minh Anh</div>
                  <div class="user-streak">Streak: 15</div>
                </div>
                <div class="user-score">
                  <div class="score">2,456</div>
                  <div class="score-label">Câu đúng</div>
                </div>
              </div>

              <!-- Rank 2 -->
              <div class="leaderboard-item silver">
                <div class="rank-icon">
                  <q-icon name="emoji_events" size="16px" style="opacity: 0.2" />
                </div>
                <div class="user-avatar-small silver-bg">TH</div>
                <div class="user-details">
                  <div class="user-name">Thành Hòa</div>
                  <div class="user-streak">Streak: 23</div>
                </div>
                <div class="user-score">
                  <div class="score">2,195</div>
                  <div class="score-label">Câu đúng</div>
                </div>
              </div>

              <!-- Rank 3 -->
              <div class="leaderboard-item bronze">
                <div class="rank-icon">
                  <q-icon name="emoji_events" size="16px" />
                </div>
                <div class="user-avatar-small bronze-bg">VN</div>
                <div class="user-details">
                  <div class="user-name">Văn Nam</div>
                  <div class="user-streak">Streak: 12</div>
                </div>
                <div class="user-score">
                  <div class="score">1,957</div>
                  <div class="score-label">Câu đúng</div>
                </div>
              </div>

              <!-- Rank 4 -->
              <div class="leaderboard-item">
                <div class="rank-icon">
                  <q-icon name="star" size="12px" />
                </div>
                <div class="user-avatar-small blue-bg">TT</div>
                <div class="user-details">
                  <div class="user-name">Thu Trang</div>
                  <div class="user-streak">Streak: 8</div>
                </div>
                <div class="user-score">
                  <div class="score">1,834</div>
                  <div class="score-label">câu đúng</div>
                </div>
              </div>

              <!-- Current User -->
              <div class="current-user-rank">
                <div class="rank-info">
                  <div class="user-avatar-small blue-bg">ND</div>
                  <div class="user-details">
                    <div class="user-name">Hạng của bạn: # 45</div>
                    <div class="user-stats">523 câu đúng • Top 4 %</div>
                  </div>
                </div>
                <div class="rank-score">
                  <div class="score blue">523</div>
                  <div class="score-detail">/ 1,250 người chơi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const currentMessage = ref('')

const sendMessage = () => {
  if (currentMessage.value.trim()) {
    // Handle sending message
    console.log('Sending message:', currentMessage.value)
    currentMessage.value = ''
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.chat-page {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
}

/* Header Styles - Exact Figma Match */
.chat-header {
  display: flex;
  width: 100%;
  padding: 16px 24px 17px 24px;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #E5E7EB;
  background: #FFF;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 148px;
  width: 100%;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 148px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  display: flex;
  padding: 8px;
  border-radius: 8px;
  background: #6D28D9;
}

.logo-text {
  color: #111827;
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
}

.navigation {
  display: flex;
  gap: 24px;
}

.nav-item {
  color: #374151;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #F3F4F6;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-text {
  color: #4B5563;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.stat-correct {
  display: flex;
  gap: 1px;
}

.correct-number {
  color: #16A34A;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.correct-text {
  color: #4B5563;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.stat-streak {
  display: flex;
  gap: 3px;
}

.streak-label {
  color: #4B5563;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.streak-number {
  color: #2563EB;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  display: flex;
  padding: 6px 5px 6px 6px;
  border-radius: 9999px;
  background: #6D28D9;
  color: #FFF;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  min-width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
}

.user-name {
  color: #111827;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.logout-btn {
  display: flex;
  padding: 10px 12px 10px 13px;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  border: 1px solid #E2E8F0;
  background: #FFF;
  cursor: pointer;
  color: #000;
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  width: 100%;
  background: #F5F3FF;
  padding: 24px 38px;
}

.content-container {
  display: flex;
  gap: 24px;
  width: 100%;
  height: 100%;
}

/* Chat Section */
.chat-section {
  width: 728px;
  border-radius: 24px;
  border: 1px solid #E2E8F0;
  background: #FFF;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.chat-header-panel {
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 12px;
  border-radius: 12px 12px 0 0;
  border: 1px solid #E2E8F0;
  background: #FFF;
}

.bot-icon {
  display: flex;
  padding: 8px;
  border-radius: 8px;
  background: #6D28D9;
}

.chat-title-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.chat-title {
  color: #111827;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.chat-subtitle {
  color: #6B7280;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.message-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.message-avatar {
  display: flex;
  padding: 8px;
  border-radius: 9999px;
  background: #EDE9FE;
  min-width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
}

.message-bubble {
  border-radius: 8px;
  background: #F3F4F6;
  padding: 9px 25px 9px 16px;
  max-width: 500px;
}

.bot-bubble {
  background: #F3F4F6;
}

.message-text {
  color: #111827;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 5px;
}

.message-time {
  color: #6B7280;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.message-participants {
  display: flex;
  gap: -5px;
  margin-top: 8px;
}

.participant-avatar {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  margin-left: -5px;
}

.participant-avatar.small {
  width: 17px;
  height: 17px;
}

.participant-avatar:first-child {
  margin-left: 0;
}

/* Bot Answer Messages */
.bot-answer {
  justify-content: flex-end;
  margin-left: 44px;
}

.answer-bubble {
  border-radius: 8px;
  border: 1px solid #BBF7D0;
  background: #DCFCE7;
  padding: 10px 16px;
  max-width: 300px;
}

.answer-text {
  color: #166534;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 8px;
}

.answer-time {
  color: #16A34A;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-align: right;
}

.user-message-indicator {
  align-self: flex-end;
  margin-right: 16px;
}

/* Chat Input */
.chat-input-area {
  padding: 16px;
  border-radius: 0 0 12px 12px;
  border: 1px solid #E2E8F0;
  background: #F9FAFB;
}

.input-container {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.message-input {
  flex: 1;
}

.send-button {
  min-width: 48px;
  height: 40px;
}

.login-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22C55E;
}

.status-text {
  color: #6B7280;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 352px;
}

/* History Panel */
.history-panel {
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  background: #FFF;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.panel-header {
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #E2E8F0;
}

.panel-title {
  flex: 1;
}

.title {
  color: #111827;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.subtitle {
  color: #6B7280;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.history-list {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #DBEAFE;
  background: #EFF6FF;
}

.history-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.history-question {
  color: #111827;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.history-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-answer {
  color: #16A34A;
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

.history-date {
  color: #6B7280;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.history-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-section {
  display: flex;
  align-items: center;
  gap: 4px;
}

.correct {
  color: #16A34A;
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

.divider {
  color: #4B5563;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.total {
  color: #4B5563;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.details-link {
  color: #2563EB;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  cursor: pointer;
}

/* Leaderboard Panel */
.leaderboard-panel {
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  background: #FFF;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.leaderboard-tabs {
  display: flex;
  padding: 16px;
  gap: 4px;
  border-bottom: 1px solid #E2E8F0;
}

.tab {
  display: flex;
  padding: 6px 12px;
  border-radius: 6px;
  color: #4B5563;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  cursor: pointer;
}

.tab.active {
  background: #EDE9FE;
  color: #5B21B6;
  font-weight: 500;
}

.leaderboard-list {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.leaderboard-item {
  display: flex;
  padding: 12px;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  margin-bottom: 0;
}

.rank-icon {
  width: 16px;
  height: 16px;
}

.user-avatar-small {
  display: flex;
  padding: 12px 9px;
  border-radius: 50%;
  color: #FFF;
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  min-width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
}

.gold-bg {
  background: linear-gradient(90deg, #EAB308 100%, #FACC15 0%);
}

.silver-bg {
  background: linear-gradient(90deg, #9CA3AF 100%, #D1D5DB 0%);
}

.bronze-bg {
  background: linear-gradient(90deg, #D97706 100%, #F59E0B 0%);
}

.blue-bg {
  background: #3B82F6;
}

.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.user-name {
  color: #111827;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.user-streak {
  color: #6B7280;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.user-score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
}

.score {
  color: #111827;
  font-family: Inter;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
}

.score.blue {
  color: #2563EB;
}

.score-label {
  color: #6B7280;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

/* Current User Rank */
.current-user-rank {
  padding: 12px;
  border-radius: 8px;
  background: #EFF6FF;
  border: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rank-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-stats {
  color: #4B5563;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.rank-score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.score-detail {
  color: #6B7280;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}
</style>
