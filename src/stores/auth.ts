import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  name: string
  email: string
  avatar: string
  isLoggedIn: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>({
    name: '',
    email: '',
    avatar: '',
    isLoggedIn: false
  })

  const isLoggedIn = computed(() => user.value.isLoggedIn)
  
  const userAvatar = computed(() => {
    if (!user.value.name) return 'U'
    return user.value.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  })

  const login = (userData: { name: string; email: string }) => {
    user.value = {
      ...userData,
      avatar: userData.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2),
      isLoggedIn: true
    }
  }

  const logout = () => {
    user.value = {
      name: '',
      email: '',
      avatar: '',
      isLoggedIn: false
    }
  }

  return {
    user,
    isLoggedIn,
    userAvatar,
    login,
    logout
  }
})
