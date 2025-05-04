import type { RouteRecordRaw } from 'vue-router'
import { authEnumRoutes } from './auth.enum.routes'

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: authEnumRoutes.login.path,
    name: authEnumRoutes.login.name,
    component: () => import('@/views/auth/pages/LoginPage.vue'),
    meta: authEnumRoutes.login.meta,
  },
  {
    path: authEnumRoutes.register.path,
    name: authEnumRoutes.register.name,
    component: () => import('@/views/auth/pages/RegisterPage.vue'),
    meta: authEnumRoutes.register.meta,
  },
]
export default authRoutes
