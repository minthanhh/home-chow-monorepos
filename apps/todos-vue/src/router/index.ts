import { createRouter, createWebHistory } from 'vue-router'
import AuthenticateView from '@/views/authenticate/AuthenticateView.vue'
import { userUserStore } from '@/stores'
import { userService } from '@/shareds/services'
import { SidebarLayout } from '@/shareds/layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'authenticate',
      component: AuthenticateView
    },
    {
      path: '/',
      component: SidebarLayout,
      children: [
        {
          path: '/',
          name: 'home',
          components: {
            default: () => import('../views/dashboard/DashboardView.vue'),
            CommonSidebar: () => import('../shareds/components/commons/CommonSidebar.vue')
          }
        },
        {
          path: '/foods-management',
          name: 'foods',
          components: {
            default: () => import('../views/foods/FoodsView.vue'),
            CommonSidebar: () => import('../shareds/components/commons/CommonSidebar.vue')
          }
        },
        {
          path: '/blogs-management',
          name: 'blogs',
          components: {
            default: () => import('../views/blogs/BlogsView.vue'),
            CommonSidebar: () => import('../shareds/components/commons/CommonSidebar.vue')
          }
        },
        {
          path: '/education-management',
          name: 'education',
          components: {
            default: () => import('../views/educations/EducationView.vue'),
            CommonSidebar: () => import('../shareds/components/commons/CommonSidebar.vue')
          }
        },
        {
          path: '/chats-management',
          name: 'chat',
          components: {
            default: () => import('../views/chats/ChatsView.vue'),
            CommonSidebar: () => import('../shareds/components/commons/CommonSidebar.vue')
          }
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const { accessToken, refreshToken, setUser, user } = userUserStore()

  if ((!accessToken || !refreshToken) && !user && to.name !== 'authenticate') {
    return { name: 'authenticate', replace: true }
  }

  if (!user && accessToken && refreshToken) {
    try {
      const response = await userService.me()
      setUser(response.data)
      return { name: 'home', replace: true }
    } catch (error: any) {
      return { name: 'authenticate', replace: true }
    }
  }

  if (user && accessToken && refreshToken && to.name === 'authenticate') {
    return { name: 'home' }
  }
})

export default router
