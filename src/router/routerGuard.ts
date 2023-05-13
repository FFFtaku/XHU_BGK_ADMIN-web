import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { checkToken } from '@utils/loginTools'

const globalBeforeEach = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (!checkToken() && to.name !== 'entryPage') {
    // 直接使用next对象和router.push是一样的
    return next({
      name: 'entryPage'
    })
  }
  next()
}
export {
  globalBeforeEach
}