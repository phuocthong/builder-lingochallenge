<template>
  <q-dialog v-model="isVisible" persistent>
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
            @click="handleDemoLogin"
            :loading="loading"
            :disable="loading"
          />
          <q-btn
            color="secondary"
            label="Test Login (Debug)"
            class="full-width q-py-sm q-mt-sm"
            @click="testLogin"
            outline
          />
          <div class="text-center q-mt-sm text-caption text-grey-6">
            Hoặc đăng nhập thủ công bên dưới
          </div>
        </div>

        <q-form @submit="handleSubmit" class="q-gutter-md">
          <q-input
            v-model="formData.name"
            label="Tên đăng nhập"
            outlined
            :rules="[val => !!val || 'Vui lòng nhập tên đăng nhập']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            v-model="formData.email"
            label="Email"
            type="email"
            outlined
            :rules="[
              val => !!val || 'Vui lòng nhập email',
              val => /.+@.+\..+/.test(val) || 'Email không hợp lệ'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            v-model="formData.password"
            label="Mật khẩu"
            :type="showPassword ? 'text' : 'password'"
            outlined
            :rules="[val => !!val || 'Vui lòng nhập mật khẩu']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <div class="q-pt-md">
            <q-btn
              type="submit"
              label="Đăng nhập"
              color="primary"
              class="full-width"
              size="lg"
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <div class="text-grey-6">
          Chưa có tài khoản?
          <q-btn flat color="primary" @click="switchToRegister" dense>
            Đăng ký ngay
          </q-btn>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Hủy" @click="close" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface LoginData {
  name: string
  email: string
  password: string
}

interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'login', data: { name: string; email: string }): void
  (e: 'switch-to-register'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isVisible = ref(false)
const loading = ref(false)
const showPassword = ref(false)

const formData = ref<LoginData>({
  name: '',
  email: '',
  password: ''
})

watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal
})

watch(isVisible, (newVal) => {
  emit('update:modelValue', newVal)
})

const handleDemoLogin = () => {
  console.log('Demo login clicked!')
  loading.value = true

  setTimeout(() => {
    console.log('Emitting login event with:', {
      name: 'Phước Thông',
      email: 'phuocthoang@demo.com'
    })

    emit('login', {
      name: 'Phước Thông',
      email: 'phuocthoang@demo.com'
    })

    loading.value = false
    formData.value = { name: '', email: '', password: '' }
  }, 500)
}

const handleSubmit = () => {
  loading.value = true
  
  setTimeout(() => {
    emit('login', {
      name: formData.value.name,
      email: formData.value.email
    })
    
    loading.value = false
    formData.value = { name: '', email: '', password: '' }
  }, 1000)
}

const switchToRegister = () => {
  emit('switch-to-register')
}

const close = () => {
  isVisible.value = false
}
</script>
