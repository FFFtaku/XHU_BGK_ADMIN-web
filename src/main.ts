import { createApp } from 'vue'
import App from './App.vue'
import router from '@router/index'
import { globalBeforeEach } from '@router/routerGuard'
// element icon库需要引入并注册为全局组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入全局样式
import '@assets/style/normalize.css'
import './base.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局路由守卫
// router.beforeEach(globalBeforeEach)
app.use(router)
app.mount('#app')
