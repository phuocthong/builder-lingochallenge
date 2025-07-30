<template>
  <div class="profile-page">
    <!-- Header matching existing design -->
    <div class="profile-header">
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
            <div class="nav-item" @click="router.push('/about')">
              Giới thiệu
            </div>
            <div class="nav-item" @click="router.push('/challenge')">
              Thử thách
            </div>
          </div>
        </div>

        <!-- Right: User Info -->
        <div class="header-right">
          <div class="user-stats">
            <div class="stat-item">
              <q-icon name="emoji_events" size="16px" color="grey-6" />
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

    <!-- Main Profile Content -->
    <div class="profile-main">
      <!-- Sidebar Navigation -->
      <div class="sidebar-nav">
        <div
          class="nav-link"
          :class="{ active: activeTab === 'dashboard' }"
          @click="activeTab = 'dashboard'"
        >
          <q-icon name="home" size="29px" />
          <span class="nav-label">Dashboard</span>
        </div>
        <div
          class="nav-link"
          :class="{ active: activeTab === 'friends' }"
          @click="activeTab = 'friends'"
        >
          <q-icon name="people" size="29px" />
          <span class="nav-label">Bạn bè</span>
        </div>
        <div
          class="nav-link"
          :class="{ active: activeTab === 'add-friends' }"
          @click="activeTab = 'add-friends'"
        >
          <q-icon name="person_add" size="29px" />
          <span class="nav-label">Thêm bạn bè</span>
        </div>
        <div
          class="nav-link"
          :class="{ active: activeTab === 'tasks' }"
          @click="activeTab = 'tasks'"
        >
          <q-icon name="assignment" size="29px" />
          <span class="nav-label">Nhiệm vụ</span>
        </div>
        <div
          class="nav-link"
          :class="{ active: activeTab === 'exchange' }"
          @click="activeTab = 'exchange'"
        >
          <q-icon name="credit_card" size="29px" />
          <span class="nav-label">Đổi điểm</span>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="main-content">
        <!-- User Profile Section -->
        <div class="profile-card">
          <div class="user-avatar-section">
            <div class="user-avatar-large">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fbe605de9df4a4de687c68395dde916e8%2F2eaa38061fbb4810aac7c773423d5a93?format=webp&width=800"
                alt="User Avatar"
                class="avatar-image"
              />
              <div class="online-indicator">
                <q-icon name="check_circle" color="green" size="18px" />
              </div>
            </div>
          </div>

          <div class="user-name-section">Người dùng</div>
          <div class="user-username">@nguoidung</div>

          <div class="join-date">
            <q-icon name="calendar_today" size="23px" />
            <span>Tham gia từ 1/1/2025</span>
          </div>

          <div class="profile-badges">
            <div class="badge-item level">
              <q-icon name="emoji_events" color="primary" size="17px" />
              <span class="badge-label">Cấp độ</span>
              <span class="badge-value primary">Level 10</span>
            </div>

            <div class="badge-item xp">
              <q-icon name="star" color="primary" size="19px" />
              <span class="badge-label">Điểm kinh nghiệm</span>
              <span class="badge-value primary">1,000 XP</span>
            </div>

            <div class="badge-item edit">
              <q-icon name="edit" color="white" size="17px" />
              <span class="badge-value white">Chỉnh sửa thông tin</span>
            </div>

            <div class="badge-item disabled">
              <q-icon name="lock" size="23px" style="opacity: 0.5" />
              <span class="badge-value disabled">Đổi mật khẩu</span>
            </div>
          </div>
        </div>

        <!-- Stats Section Row 1 -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon blue">
              <q-icon name="help" color="primary" size="26px" />
            </div>
            <div class="stat-number">1,000</div>
            <div class="stat-label">Tổng câu trả lời</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon green">
              <q-icon name="check" color="green" size="14px" />
            </div>
            <div class="stat-number">82%</div>
            <div class="stat-label">Tỷ lệ chính xác</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon purple">
              <q-icon name="book" color="deep-purple" size="23px" />
            </div>
            <div class="stat-number">2,125</div>
            <div class="stat-label">Từ đã học</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon orange">
              <q-icon name="local_fire_department" color="orange" size="17px" />
            </div>
            <div class="stat-number">28</div>
            <div class="stat-label">Chuỗi dài nhất</div>
          </div>
        </div>

        <!-- Stats Section Row 2 -->
        <div class="stats-row">
          <div class="stat-card-wide streak">
            <div class="stat-content">
              <div class="stat-icon blue">
                <q-icon
                  name="local_fire_department"
                  color="primary"
                  size="20px"
                />
              </div>
              <div class="stat-info">
                <div class="stat-label">Chuỗi hiện tại</div>
                <div class="stat-sublabel">Ngày liên tiếp</div>
              </div>
            </div>
            <div class="stat-number primary">15</div>
          </div>

          <div class="stat-card-wide time">
            <div class="stat-content">
              <div class="stat-icon green">
                <q-icon name="schedule" color="green" size="24px" />
              </div>
              <div class="stat-info">
                <div class="stat-label">Thời gian trung bình</div>
                <div class="stat-sublabel">Mỗi câu hỏi</div>
              </div>
            </div>
            <div class="stat-number green">2.5s</div>
          </div>

          <div class="stat-card-wide days">
            <div class="stat-content">
              <div class="stat-icon purple">
                <q-icon name="calendar_month" color="deep-purple" size="20px" />
              </div>
              <div class="stat-info">
                <div class="stat-label">Ngày học tập</div>
                <div class="stat-sublabel">Tổng số ngày</div>
              </div>
            </div>
            <div class="stat-number purple">45</div>
          </div>
        </div>

        <!-- Progress Chart Section -->
        <div class="chart-section">
          <div class="chart-title">Biểu đồ tiến bộ</div>
          <div class="chart-container">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fbe605de9df4a4de687c68395dde916e8%2F1aa75d4ca5474067bf1f69799c70ed9b?alt=media&token=6dbe7743-e64e-49fe-8546-741663c59b56&apiKey=be605de9df4a4de687c68395dde916e8"
              alt="Progress Chart"
              class="chart-image"
            />
          </div>
        </div>

        <!-- Contact Info Section -->
        <div class="contact-section">
          <div class="contact-title">Thông tin liên hệ</div>
          <div class="contact-item">
            <q-icon name="email" size="23px" />
            <span class="contact-text">nguoidung@gmail.com</span>
          </div>
          <div class="contact-item">
            <q-icon name="phone" size="22px" />
            <span class="contact-text">12345678910</span>
          </div>
        </div>

        <!-- Logout Section -->
        <div class="logout-section">
          <div class="logout-info">
            <div class="logout-title">Đăng xuất</div>
            <div class="logout-subtitle">Thoát khỏi tài khoản hiện tại</div>
          </div>
          <div class="logout-button" @click="handleLogout">
            <q-icon name="logout" color="white" size="40px" />
            <span class="logout-text">Đăng xuất</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const activeTab = ref("dashboard");

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<style scoped>
.profile-page {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background: #fff;
}

/* Header Styles */
.profile-header {
  display: flex;
  width: 100%;
  padding: 16px 24px 17px 24px;
  border: 1px solid #e5e7eb;
  background: #fff;
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
  background: #6d28d9;
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
  background-color: #f3f4f6;
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
  color: #4b5563;
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
  color: #16a34a;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.correct-text {
  color: #4b5563;
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
  color: #4b5563;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.streak-number {
  color: #2563eb;
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
  border-radius: 50%;
  background: #6d28d9;
  color: #fff;
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
  border: 1px solid #e2e8f0;
  background: #fff;
  cursor: pointer;
  color: #000;
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

/* Main Profile Content */
.profile-main {
  display: flex;
  height: calc(100vh - 73px);
  background: #fff;
}

/* Sidebar Navigation */
.sidebar-nav {
  width: 285px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid rgba(92, 94, 100, 0.7);
  padding: 15px;
}

.nav-link {
  display: flex;
  padding: 15px 18px;
  align-items: center;
  gap: 18px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #f3f4f6;
}

.nav-link.active {
  background: #ede9fe;
  color: #5b21b6;
}

.nav-label {
  color: #5c5e64;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: -0.4px;
}

.nav-link.active .nav-label {
  color: #5b21b6;
}

/* Main Content Area */
.main-content {
  flex: 1;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  overflow-y: auto;
}

/* Profile Card */
.profile-card {
  width: 895px;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 11px;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}

.user-avatar-section {
  position: relative;
  width: 81px;
  height: 88px;
}

.user-avatar-large {
  position: relative;
}

.avatar-image {
  width: 81px;
  height: 84px;
  border-radius: 84px;
  border: 2px solid #858597;
  object-fit: cover;
}

.online-indicator {
  position: absolute;
  right: 0;
  bottom: 4px;
}

.user-name-section {
  color: #000;
  font-family: Roboto;
  font-size: 30px;
  font-weight: 500;
  line-height: 26px;
}

.user-username {
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 300;
  line-height: 26px;
}

.join-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(0, 0, 0, 0.75);
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.profile-badges {
  display: flex;
  justify-content: center;
  gap: 21px;
  width: 855px;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 7px;
  min-width: 150px;
}

.badge-item.level {
  background: rgba(37, 99, 235, 0.3);
}

.badge-item.xp {
  background: rgba(37, 99, 235, 0.3);
  opacity: 0.5;
}

.badge-item.edit {
  background: rgba(37, 99, 235, 0.7);
  cursor: pointer;
}

.badge-item.disabled {
  background: rgba(107, 114, 128, 0.5);
  opacity: 0.5;
}

.badge-label {
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
}

.badge-value {
  font-family: Roboto;
  font-size: 16px;
  font-weight: 700;
}

.badge-value.primary {
  color: #2563eb;
}

.badge-value.white {
  color: #fff;
}

.badge-value.disabled {
  color: rgba(0, 0, 0, 0.5);
}

/* Stats Rows */
.stats-row {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 895px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 51px 26px 50px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  flex: 1;
}

.stat-icon {
  width: 53px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.stat-icon.blue {
  background: #bed0f9;
}

.stat-icon.green {
  background: rgba(22, 163, 74, 0.25);
}

.stat-icon.purple {
  background: rgba(109, 40, 217, 0.29);
}

.stat-icon.orange {
  background: rgba(217, 119, 6, 0.3);
}

.stat-number {
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 27px;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: 8px;
}

.stat-label {
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 17px;
  font-weight: 300;
  line-height: 25px;
}

/* Wide Stats Cards */
.stat-card-wide {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 31px 68px 31px 19px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  flex: 1;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-sublabel {
  color: #000;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 300;
  line-height: 25px;
}

.stat-number.primary {
  color: #2563eb;
}

.stat-number.green {
  color: #16a34a;
}

.stat-number.purple {
  color: #6d28d9;
}

/* Chart Section */
.chart-section {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 23px 33px 22px;
  width: 895px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}

.chart-title {
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 26px;
  font-weight: 700;
  line-height: 25px;
}

.chart-container {
  width: 100%;
  height: 290px;
}

.chart-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Contact Section */
.contact-section {
  width: 877px;
  padding: 17px 13px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  border-radius: 11px;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}

.contact-title {
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 24px;
  font-weight: 500;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.contact-text {
  color: rgba(0, 0, 0, 0.75);
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

/* Logout Section */
.logout-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 23px 130px 23px 15px;
  width: 877px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}

.logout-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.logout-title {
  color: #000;
  font-family: Inter;
  font-size: 22px;
  font-weight: 700;
  line-height: 21px;
}

.logout-subtitle {
  color: #000;
  font-family: Inter;
  font-size: 21px;
  font-weight: 400;
  line-height: 21px;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 13px 17px;
  border-radius: 8px;
  background: #fd2c2c;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-button:hover {
  background: #dc2626;
}

.logout-text {
  color: #fff;
  font-family: Inter;
  font-size: 24px;
  font-weight: 400;
  line-height: 24px;
}
</style>
