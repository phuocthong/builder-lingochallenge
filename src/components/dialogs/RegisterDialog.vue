<template>
  <q-dialog v-model="isVisible" persistent>
    <q-card style="min-width: 400px" class="q-pa-md">
      <q-card-section>
        <div class="text-h6 text-center">🎯 Đăng ký EnglishBot</div>
        <div class="text-subtitle2 text-center text-grey-6">
          Tạo tài khoản mới để bắt đầu hành trình học tiếng Anh!
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleSubmit" class="q-gutter-md">
          <q-input
            v-model="formData.name"
            label="Họ và tên"
            outlined
            :rules="[val => !!val || 'Vui lòng nhập họ và tên']"
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
            :rules="[
              val => !!val || 'Vui lòng nhập mật khẩu',
              val => val.length >= 6 || 'Mật khẩu phải có ít nhất 6 ký tự'
            ]"
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

          <q-input
            v-model="formData.confirmPassword"
            label="Xác nhận mật khẩu"
            :type="showConfirmPassword ? 'text' : 'password'"
            outlined
            :rules="[
              val => !!val || 'Vui lòng xác nhận mật khẩu',
              val => val === formData.password || 'Mật khẩu không khớp'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showConfirmPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </q-input>

          <q-checkbox 
            v-model="agreeToTerms" 
            label="Tôi đồng ý với điều khoản sử dụng"
            :rules="[val => !!val || 'Bạn phải đồng ý với điều khoản']"
          />

          <div class="q-pt-md">
            <q-btn
              type="submit"
              label="Đăng ký"
              color="primary"
              class="full-width"
              size="lg"
              :loading="loading"
              :disable="!agreeToTerms"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <div class="text-grey-6">
          Đã có tài khoản?
          <q-btn flat color="primary" @click="switchToLogin" dense>
            Đăng nhập
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

interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'register', data: { name: string; email: string }): void
  (e: 'switch-to-login'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isVisible = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeToTerms = ref(false)

const formData = ref<RegisterData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal
})

watch(isVisible, (newVal) => {
  emit('update:modelValue', newVal)
})

const handleSubmit = () => {
  loading.value = true
  
  setTimeout(() => {
    emit('register', {
      name: formData.value.name,
      email: formData.value.email
    })
    
    loading.value = false
    formData.value = { name: '', email: '', password: '', confirmPassword: '' }
    agreeToTerms.value = false
  }, 1000)
}

const switchToLogin = () => {
  emit('switch-to-login')
}

const close = () => {
  isVisible.value = false
}
</script>
