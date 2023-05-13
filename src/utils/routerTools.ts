import router from '@router/index'

// 返回登录页
const backToEntryPage = ()=>{
  router.replace({
    name: 'entryPage'
  })
}

export{
  backToEntryPage
}