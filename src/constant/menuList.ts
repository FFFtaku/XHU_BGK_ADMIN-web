import {
  Orange,
  User,
  Monitor,
  HelpFilled,
  Histogram,
  UploadFilled
} from '@element-plus/icons-vue'

const MENU_LIST = [
  {
    uniqueTag: 'dashboard',
    title: '面板',
    icon: Orange,
    role: 'All',
    routerName: 'dashboard',
    basePath: '/dashboard'
  }, {
    uniqueTag: 'accountInfo',
    title: '账户管理',
    icon: User,
    role: 'Admin',
    routerName: 'accountInfo',
    basePath: '/account'
  }, {
    uniqueTag: 'instituteInfo',
    title: '学院信息管理',
    icon: Monitor,
    role: 'All',
    routerName: 'instituteInfo',
    basePath: '/instituteInfo'
  }, {
    uniqueTag: 'resource',
    title: '数据资源管理',
    icon: HelpFilled,
    role: 'All',
    routerName: 'resource',
    basePath: '/resource'
  }, {
    uniqueTag: 'upload',
    title: '资源上传',
    icon: UploadFilled,
    role: 'All',
    routerName: 'upload',
    basePath: '/upload'
  }, {
    uniqueTag: 'setting',
    title: '系统设置',
    icon: Histogram,
    role: 'All',
    routerName: 'roleSetting',
    basePath: '/setting'
  }
]

export default MENU_LIST