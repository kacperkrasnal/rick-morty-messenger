import { createRouter, createWebHistory } from 'vue-router'
import MessageView from "@/views/MessageView";
import HistoryView from "@/views/HistoryView";

const routes = [
  {
    path: '/',
    name: 'message',
    component: MessageView
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
