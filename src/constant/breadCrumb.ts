
type BreadList = {
  [key: string]: any
}
const BREAD_CRUMB_LIST: BreadList = {
  'account': [
    {
      childPageName: '管理员列表',
      routerName: 'accountInfo'
    }, {
      childPageName: '创建管理员',
      routerName: 'accountCreate'
    }
  ],
  'setting': [
    {
      childPageName: '角色设置',
      routerName: 'roleSetting'
    }, {
      childPageName: '权限设置',
      routerName: 'privilegeSetting'
    }
  ]
}

export default BREAD_CRUMB_LIST