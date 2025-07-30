<template>
  <div class="q-gutter-md">
    <!-- Profile Header -->
    <q-card>
      <q-card-section class="text-center">
        <q-avatar size="80px" class="q-mb-md">
          <div class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-2xl rounded-full w-full h-full flex items-center justify-center">
            {{ authStore.userAvatar }}
          </div>
          <q-badge floating color="green" rounded>
            <q-icon name="check_circle" color="white" size="xs" />
          </q-badge>
        </q-avatar>

        <h2 class="text-h5 q-mb-xs">{{ authStore.user.name }}</h2>
        <p class="text-grey-6 q-mb-md">@{{ authStore.user.name.toLowerCase().replace(' ', '') }}</p>
        
        <div class="flex items-center justify-center text-grey-6 q-mb-lg">
          <q-icon name="event" class="q-mr-xs" />
          <span>Tham gia từ 1/1/2025</span>
        </div>

        <div class="row q-gutter-sm justify-center q-mb-lg">
          <div class="col-auto">
            <q-chip color="blue-1" text-color="blue-8" icon="military_tech">
              Level 10
            </q-chip>
          </div>
          <div class="col-auto">
            <q-chip color="blue-1" text-color="blue-8" icon="star">
              1,000 XP
            </q-chip>
          </div>
        </div>

        <div class="row q-gutter-sm justify-center">
          <q-btn color="primary" icon="edit" label="Chỉnh sửa thông tin" />
          <q-btn outline color="grey-8" icon="lock" label="Đổi mật khẩu" disable />
        </div>
      </q-card-section>
    </q-card>

    <!-- Main Stats -->
    <div class="row q-gutter-md">
      <div class="col-6 col-md-3" v-for="stat in mainStats" :key="stat.label">
        <q-card>
          <q-card-section class="text-center">
            <div :class="`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto q-mb-sm`">
              <q-icon :name="stat.icon" :class="stat.textColor" size="md" />
            </div>
            <div class="text-h4 text-weight-bold q-mb-xs">{{ stat.number }}</div>
            <div class="text-grey-6 text-caption">{{ stat.label }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Secondary Stats -->
    <div class="row q-gutter-md">
      <div class="col-12 col-md-4" v-for="stat in secondaryStats" :key="stat.title">
        <q-card>
          <q-card-section>
            <div class="flex items-center justify-between">
              <div>
                <div :class="`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center q-mb-sm`">
                  <q-icon :name="stat.icon" :class="stat.textColor" />
                </div>
                <div class="text-caption text-grey-6 q-mb-xs">{{ stat.title }}</div>
                <div class="text-caption text-grey-5">{{ stat.subtitle }}</div>
              </div>
              <div :class="`text-h4 text-weight-bold ${stat.textColor}`">
                {{ stat.number }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Progress Chart -->
    <q-card>
      <q-card-section>
        <h3 class="text-h6 text-weight-bold q-mb-lg">Biểu đồ tiến bộ</h3>
        <div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center" style="height: 300px">
          <div class="text-center">
            <q-icon name="bar_chart" size="4rem" color="purple-6" class="q-mb-md" />
            <p class="text-grey-6">Biểu đồ tiến bộ theo tuần</p>
            <p class="text-grey-5 text-caption q-mt-sm">Dữ liệu sẽ được hiển thị ở đây</p>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Contact Info -->
    <q-card>
      <q-card-section>
        <h3 class="text-h6 text-weight-bold q-mb-lg">Thông tin liên hệ</h3>
        <div class="q-gutter-md">
          <div class="flex items-center">
            <q-icon name="email" class="text-grey-5 q-mr-md" />
            <span>{{ authStore.user.email }}</span>
          </div>
          <div class="flex items-center">
            <q-icon name="phone" class="text-grey-5 q-mr-md" />
            <span>12345678910</span>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Logout Section -->
    <q-card>
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="col">
            <h4 class="text-h6 text-weight-bold q-mb-xs">Đăng xuất</h4>
            <p class="text-grey-6 q-ma-none">Thoát khỏi tài khoản hiện tại</p>
          </div>
          <div class="col-auto">
            <q-btn 
              color="red" 
              icon="logout" 
              label="Đăng xuất"
              @click="confirmLogout"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useAuthStore } from '../../stores/auth'

const $q = useQuasar()
const authStore = useAuthStore()

const mainStats = [
  {
    icon: 'chat',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    number: '1,000',
    label: 'Tổng câu trả lời'
  },
  {
    icon: 'check_circle',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    number: '82%',
    label: 'Tỷ lệ chính xác'
  },
  {
    icon: 'menu_book',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    number: '2,125',
    label: 'Từ đã học'
  },
  {
    icon: 'local_fire_department',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600',
    number: '28',
    label: 'Chuỗi dài nhất'
  }
]

const secondaryStats = [
  {
    icon: 'local_fire_department',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    number: '15',
    title: 'Chuỗi hiện tại',
    subtitle: 'Ngày liên tiếp'
  },
  {
    icon: 'schedule',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    number: '2.5s',
    title: 'Thời gian trung bình',
    subtitle: 'Mỗi câu hỏi'
  },
  {
    icon: 'event',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    number: '45',
    title: 'Ngày học tập',
    subtitle: 'Tổng số ngày'
  }
]

const confirmLogout = () => {
  $q.dialog({
    title: 'Xác nhận đăng xuất',
    message: 'Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?',
    cancel: true,
    persistent: true,
    ok: {
      label: 'Đăng xuất',
      color: 'red'
    },
    cancel: {
      label: 'Hủy',
      flat: true
    }
  }).onOk(() => {
    authStore.logout()
    $q.notify({
      type: 'positive',
      message: 'Đã đăng xuất thành công!',
      position: 'top'
    })
  })
}
</script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(to right, var(--q-primary), var(--q-secondary));
}

.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #f3e8ff, #dbeafe);
}
</style>
