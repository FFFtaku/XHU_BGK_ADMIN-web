import axios from 'axios'
import { ResponseStatusEnum, ContentTypeEnum } from '@constant/httpConstant'
import { BASE_URL, TIME_OUT } from '@sys-config/httpConfig'
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ResponseResult } from './types'
import { ElMessage } from 'element-plus'
import { getToken, setToken } from '@utils/loginTools'
import { backToEntryPage } from '@utils/routerTools'

/**
 * 创建axios请求实例
 */
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})


/* ------------请求拦截器----------- */
const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers["token"] = getToken()
  return config
}

const requestInterceptorError = (error: AxiosError) => {
  // 请求过程通常不会有异常
  return Promise.reject(error)
}

/* -------------------------------- */



/* ------------响应拦截器----------- */
const responseInterceptor = (response: AxiosResponse<ResponseResult>) => {
  // 如果不传入泛型的话data是any的
  const { code, message, data } = response.data

  // 后端返回值采用restful风格，非200状态码进入错误处理
  if (code === ResponseStatusEnum.SUCCESS) {
    if (data && data.token) {
      setToken(data.token)
    }

    return Promise.resolve(data)
  } else {
    // 对某些常见错误状态统一处理
    if (code === ResponseStatusEnum.TOKEN_ERROR || code === ResponseStatusEnum.ACCOUNT_ILLEGAL) {
      ElMessage({
        type: 'error',
        message: '身份错误'
      })
      backToEntryPage()
    }else if(code === ResponseStatusEnum.API_PARAMETER_ERROR){
      ElMessage({
        type: 'error',
        message: '接口参数错误'
      })
    }else if(code === ResponseStatusEnum.SERVER_ERROR){
      ElMessage({
        type: 'error',
        message: '系统错误！'
      })
    }else{
      ElMessage({
        type: 'error',
        message: message
      })
    }

    // 如果不抛出reject将会默认走then
    return Promise.reject(message)
  }
}

const responseInterceptorError = (error: AxiosError) => {

  // http状态码为400、500等情况时，axios会自动进入这里
  // 因为采用restful风格，一般不会返回非200以外的状态码
  // 因此通常在网络连接异常的情况下才会走这里（http超时，或tcp层都未能连接成功）

  ElMessage({
    type: 'error',
    message: '网络故障，请检测网络状态',
  })
  console.log(error)
  // 需要返回reject状态的promise才会走catch，如果直接返回则走then
  return Promise.reject(error)
}

/* -------------------------------- */

service.interceptors.request.use(requestInterceptor, requestInterceptorError)
service.interceptors.response.use(responseInterceptor, responseInterceptorError)
service.defaults.headers.common['Content-Type'] = ContentTypeEnum.JSON

/**
 * 导出request方法
 */
export default <T = any>(url: string, method: string, config?: AxiosRequestConfig): Promise<T> => {
  return service.request({
    url,
    method,
    ...config
  })
}