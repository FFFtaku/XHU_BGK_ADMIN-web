import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import EntryPage from '@views/EntryPage/index.vue'
import BaseLayout from '@layout/BaseLayout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'entryPage',
    component: EntryPage
  }, {
    path: '/dashboard',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@views/Dashboard/index.vue')
      }
    ]
  }, {
    path: '/account',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'accountInfo',
        component: () => import('@views/Account/AccountInfo/index.vue')
      }, {
        path: 'create',
        name: 'accountCreate',
        component: () => import('@views/Account/AccountCreate/index.vue')
      }
    ]
  }, {
    path: '/setting',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'roleSetting',
        component: () => import('@views/Setting/RoleSetting/index.vue')
      },{
        path: '',
        name: 'privilegeSetting',
        component: () => import('@views/Setting/PrivilegeSetting/index.vue')
      }
    ]
  }, {
    path: '/instituteInfo',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'instituteInfo',
        component: () => import('@views/InstituteInfo/index.vue')
      }
    ]
  }, {
    path: '/resource',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'resource',
        component: () => import('@views/Resource/index.vue')
      }
    ]
  }, {
    path: '/upload',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'upload',
        component: () => import('@views/Upload/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
