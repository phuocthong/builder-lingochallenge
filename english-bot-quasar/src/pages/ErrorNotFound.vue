<template>
  <q-page class="flex flex-center bg-gradient-to-br from-purple-50 to-blue-50">
    <div class="text-center">
      <q-icon name="error_outline" size="xl" color="grey-5" class="q-mb-lg" />

      <div class="text-h2 text-weight-bold text-grey-7 q-mb-md">404</div>
      <div class="text-h5 text-weight-medium text-grey-6 q-mb-md">
        Trang không tồn tại
      </div>
      <div class="text-grey-5 q-mb-xl">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại ho���c đã bị di chuyển.
      </div>

      <q-btn
        color="primary"
        label="Về trang chủ"
        icon="home"
        @click="$router.push('/')"
        size="lg"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
// 404 error page
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #f3f4f6, #dbeafe);
}
</style>
