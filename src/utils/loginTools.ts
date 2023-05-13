// 检测是否存在token
const checkToken = () => {
  if (localStorage.getItem('token')) {
    return true
  }
  return false
}

// 获取token
const getToken = () => {
  return localStorage.getItem('token')
}

// 删除token
const removeToken = ()=>{
  localStorage.removeItem('token')
}

// 设置token
const setToken = (token: string)=>{
  localStorage.setItem('token', token)
}

export {
  checkToken,
  getToken,
  removeToken,
  setToken
}