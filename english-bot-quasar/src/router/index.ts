import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { 
        path: '', 
        name: 'Home',
        component: () => import('../pages/IndexPage.vue') 
      },
      { 
        path: '/profile', 
        name: 'Profile',
        component: () => import('../pages/ProfilePage.vue') 
      },
      { 
        path: '/friends', 
        name: 'Friends',
        component: () => import('../pages/FriendsPage.vue') 
      },
      { 
        path: '/challenge', 
        name: 'Challenge',
        component: () => import('../pages/ChallengePage.vue') 
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
