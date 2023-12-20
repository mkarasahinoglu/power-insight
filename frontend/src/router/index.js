// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        children: [
          {
            path: '',
            name: 'Factories',
            component: () => import('@/views/Dashboard.vue')
          },
          {
            path: ':factoryName/details',
            name: 'Details',
            component: () => import('@/views/FactoryDetails.vue')
          }
        ] 
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/components/UserSettings.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
