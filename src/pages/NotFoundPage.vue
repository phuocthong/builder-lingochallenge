<template>
  <q-page class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
    <div class="text-center max-w-md mx-auto px-4">
      <!-- 404 Icon -->
      <div class="text-8xl mb-8">🤖💫</div>
      
      <!-- Error Message -->
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">
        Trang không tồn tại
      </h2>
      <p class="text-gray-600 mb-8">
        Oops! Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. 
        Hãy quay về trang chủ để tiếp tục học tập nhé!
      </p>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <q-btn 
          color="primary"
          size="lg"
          label="🏠 Về trang chủ"
          @click="$router.push('/')"
          class="px-6"
        />
        <q-btn 
          outline
          color="primary"
          size="lg"
          label="🔙 Quay lại"
          @click="$router.go(-1)"
          class="px-6"
        />
      </div>
      
      <!-- Quick Links -->
      <div class="mt-12">
        <p class="text-gray-500 mb-4">Hoặc truy cập các trang khác:</p>
        <div class="flex flex-wrap gap-2 justify-center">
          <q-chip 
            clickable 
            color="blue-1" 
            text-color="blue-8"
            @click="$router.push('/about')"
          >
            📖 Giới thiệu
          </q-chip>
          <q-chip 
            clickable 
            color="purple-1" 
            text-color="purple-8"
            @click="$router.push('/challenge')"
          >
            🎯 Thử thách
          </q-chip>
          <q-chip 
            clickable 
            color="green-1" 
            text-color="green-8"
            @click="$router.push('/friends')"
          >
            👥 Bạn bè
          </q-chip>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// No additional logic needed for 404 page
</script>
