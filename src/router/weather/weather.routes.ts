import type { RouteRecordRaw } from 'vue-router'
import { weatherEnumRoutes } from './weather.enum.routes'

const weatherRoutes: Array<RouteRecordRaw> = [
  {
    path: weatherEnumRoutes.dashboard.path,
    name: weatherEnumRoutes.dashboard.name,
    meta: weatherEnumRoutes.dashboard.meta,
    component: () => import('@/views/weather/DashboardPage.vue'),
  },
]
export default weatherRoutes
