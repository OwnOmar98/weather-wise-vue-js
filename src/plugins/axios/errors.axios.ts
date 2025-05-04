import { pinia } from '@/plugins'
import { useAuthStore } from '@/stores/auth.store'
import { AxiosError } from 'axios'

export const handleAxiosError = async (error: AxiosError<Record<string, unknown>>) => {
  const authStore = useAuthStore(pinia)
  if (error.response?.status === 401) {
    authStore.logout()
  }
  return Promise.reject(error)
}
