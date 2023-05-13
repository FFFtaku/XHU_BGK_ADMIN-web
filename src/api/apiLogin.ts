import http from './request/http'

interface PostLogin {
  adminName: string,
  adminPassword: string
}
function postLogin(argu: PostLogin) {
  return http.post('/admin/login', argu)
}


type PostLogout = undefined
function postLogout(argu: PostLogout) {
  return http.post('/admin/logout', argu)
}

export {
  postLogin,
  postLogout
}