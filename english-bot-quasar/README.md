# English Bot - Quasar Edition

Ứng dụng học tiếng Anh được chuyển đổi từ React sang Quasar Framework (Vue.js).

## 🚀 Tính năng

- **Chat Interface**: Giao diện chat tương tác với bot học tiếng Anh
- **Profile Management**: Quản lý hồ sơ cá nhân với thống kê chi tiết
- **Friends System**: Hệ thống bạn bè với khả năng thách đấu
- **Challenge Mode**: Các chế độ thách đấu 1v1 và phòng nhóm
- **Task System**: Hệ thống nhiệm vụ hàng ngày và hàng tuần
- **Point Exchange**: Đổi điểm lấy thẻ cào điện thoại
- **Responsive Design**: Tương thích mọi thiết bị

## 🛠️ Tech Stack

- **Frontend**: Vue 3 + Quasar Framework
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Language**: TypeScript
- **Styling**: Quasar Components + SCSS
- **Icons**: Material Icons

## 📁 Cấu trúc dự án

```
src/
├── components/          # Các component tái sử dụng
│   ├── ChatInterface.vue
│   ├── ChatHistory.vue
│   └── Leaderboard.vue
├── layouts/            # Layout components
│   └── MainLayout.vue
├── pages/              # Các trang chính
│   ├── IndexPage.vue
│   ├── ProfilePage.vue
│   ├── FriendsPage.vue
│   ├── ChallengePage.vue
│   └── ErrorNotFound.vue
├── router/             # Vue Router configuration
│   └── index.ts
├── stores/             # Pinia stores
│   └── auth.ts
├── css/                # Global styles
│   └── app.scss
├── App.vue             # Root component
└── main.ts             # Entry point
```

## 🎯 Tính năng chính

### 1. Authentication

- Đăng nhập/đăng ký đơn giản
- Lưu trữ state trong localStorage
- Auto-restore khi reload trang

### 2. Chat Learning

- Interface chat tương tác
- Câu hỏi ngẫu nhiên
- Feedback tức thì
- Lịch sử học tập

### 3. Profile System

- Thống kê chi tiết (điểm, streak, độ chính xác)
- 4 tab: Profile, Bạn bè, Nhiệm vụ, Đổi điểm
- Avatar tự động từ tên
- Level và XP system

### 4. Friends & Challenge

- Danh sách bạn bè với status real-time
- Thách đấu 1v1 và phòng nhóm
- Leaderboard ELO rating
- Chat với bạn bè

### 5. Task Management

- Nhiệm vụ hàng ngày và hàng tuần
- Progress tracking
- Point rewards
- Category system

### 6. Point Exchange

- Cửa hàng thẻ cào
- Nhiều nhà mạng
- Discount system
- Popular items

## 🚀 Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Design

- **Desktop**: Full layout với sidebar
- **Tablet**: Adaptive grid system
- **Mobile**: Drawer navigation, optimized UI

## 🎨 Thiết kế

- **Color Scheme**: Purple to Blue gradient
- **Components**: Quasar Material Design
- **Typography**: Clean, readable fonts
- **Icons**: Material Icons
- **Animations**: Smooth transitions

## 🔧 Customization

### Thêm trang mới:

1. Tạo file trong `src/pages/`
2. Thêm route trong `src/router/index.ts`
3. Thêm navigation link trong `MainLayout.vue`

### Thêm store mới:

1. Tạo file trong `src/stores/`
2. Import và sử dụng trong component

### Custom styling:

- Global styles: `src/css/app.scss`
- Component styles: `<style scoped>` trong `.vue` files

## 📝 So sánh với phiên bản React

| Feature    | React            | Quasar/Vue        |
| ---------- | ---------------- | ----------------- |
| Components | React Components | Vue SFC           |
| State      | React Context    | Pinia Store       |
| Routing    | React Router     | Vue Router        |
| Styling    | TailwindCSS      | Quasar + SCSS     |
| UI Library | Radix UI         | Quasar Components |
| Icons      | Lucide React     | Material Icons    |

## 🔄 Migration Notes

Dự án này được chuyển đổi hoàn toàn từ React sang Vue/Quasar với:

- ✅ Tất cả tính năng được giữ nguyên
- ✅ UI/UX tương tự
- ✅ Responsive design được cải thiện
- ✅ Performance tối ưu hơn với Quasar
- ✅ TypeScript support đầy đủ

## 📄 License

MIT License
