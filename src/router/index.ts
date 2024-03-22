import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import HooksPage from '@/pages/HooksPage.vue'
import ElementsPage from '@/pages/ElementsPage.vue'
import ItemsPage from '@/pages/ItemsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
      // props: true
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/hooks',
      name: 'hooks',
      component: HooksPage
    },
    {
      path: '/elements',
      name: 'elements',
      component: ElementsPage
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsPage
    }
  ]
})

export default router
