import type { LoginDto } from '@/helpers/interface/login.interface'
import type { RegisterDto } from '@/helpers/interface/register.interface'
import type { User } from '@/helpers/interface/user.interface'
import axiosInstance from '@/plugins/axios/axios.plugin'
import { authEnumRoutes } from '@/router/auth/auth.enum.routes'
import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)
  async function verifyUser() {
    const { data } = await axiosInstance<User>('auth', {
      method: 'GET',
    })
    user.value = data
  }
  async function login(loginDto: LoginDto) {
    try {
      const { data } = await axiosInstance<{
        access_token: string
      }>('auth/login', {
        method: 'POST',
        data: loginDto,
      })
      localStorage.setItem('access_token', data.access_token)
      return { data }
    } catch (error) {
      return { error: error as AxiosError<{ errorCode?: string; explanation?: string }> }
    }
  }
  async function register(registerDto: RegisterDto) {
    try {
      const { data } = await axiosInstance<{ access_token: string }>('auth/register', {
        method: 'POST',
        data: registerDto,
      })
      localStorage.setItem('access_token', data.access_token)
      await verifyUser()
      return { data }
    } catch (error) {
      return { error: error as AxiosError<{ errorCode?: string; explanation?: string }> }
    }
  }

  function logout() {
    localStorage.removeItem('access_token')
    window.location.href = authEnumRoutes.login.path
  }

  return { user, verifyUser, login, register, logout }
})
