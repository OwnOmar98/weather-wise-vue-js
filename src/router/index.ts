import { pinia } from '@/plugins'
import { useAuthStore } from '@/stores/auth.store'
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router'
import { authEnumRoutes } from './auth/auth.enum.routes'
import authRoutes from './auth/auth.routes'
import weatherRoutes from './weather/weather.routes'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    // Add other properties as needed...
  }
}
const routes: RouteRecordRaw[] = [...authRoutes, ...weatherRoutes].flat(3)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore(pinia)
    const access_token = localStorage.getItem('access_token')
    if (!authStore.user?.id && access_token) await authStore.verifyUser()
    if (authStore.user?.id && !to.meta.requiresAuth) next('')
    if (to.meta.requiresAuth && !authStore.user?.id)
      next({
        name: authEnumRoutes.login.name,
      })
    else next()
  },
)
export default router
