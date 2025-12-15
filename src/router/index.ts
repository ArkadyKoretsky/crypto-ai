import AiAssistant from '@/pages/AiAssistant.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import NotFound from '@/pages/NotFound.vue'
import PortfolioPage from '@/pages/PortfolioPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Dashboard', component: DashboardPage },
    { path: '/portfolio', name: 'Portfolio', component: PortfolioPage },
    { path: '/assistant', name: 'AI Assistant', component: AiAssistant },
    { path: '/:pathMatch(.*)*', name: 'Not Found', component: NotFound },
  ],
})

export default router
