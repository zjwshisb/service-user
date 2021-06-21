import Taro from '@tarojs/taro'
import { getToken, removeToken } from "./auth"

function request<T = any>(options: Taro.request.Option) : Promise<APP.Resp<T>> {
  if (options.header === undefined) {
    options.header = {}
  }
  const token = getToken()
  options.header.accept = 'application/json'
  if (token) {
    options.header.Authorization = 'Bearer ' + token
  }
  options.url = BASE_URL + options.url
  return Taro.request(options).then(res => {
    switch (res.statusCode) {
      case 200: {
        return Promise.resolve(res.data)
      }
      case 401: {
        removeToken()
        Taro.reLaunch({
          url: '/pages/login/index'
        })
        return Promise.reject(res)
      }
      case 404: {
        Taro.showToast({
          title: '数据不见啦！',
          icon: "none",
          mask: true
        }).catch()
        return Promise.reject(res)
      }
      case 422: {
        break
      }
      case 500:
      case 502:
      case 503:
      case 504:
        Taro.showToast({
          title: '服务器发生了点问题',
          icon: "none",
          mask: true
        }).catch()
        return Promise.reject(res)
      default:
        return Promise.reject(res)
    }
  }).catch(res => {
    switch (res.status) {
      case 401: {
        removeToken()
        Taro.reLaunch({
          url: '/pages/login/index'
        })
        return Promise.reject(res)
      }
      case 404: {
        Taro.showToast({
          title: '数据不见啦！',
          icon: "none",
          mask: true
        }).catch()
        return Promise.reject(res)
      }
      case 422: {
        break
      }
      case 500:
      case 502:
      case 503:
      case 504:
        Taro.showToast({
          title: '服务器发生了点问题',
          icon: "none",
          mask: true
        }).catch()
        return Promise.reject(res)
      default:
        return Promise.reject(res)
    }
  })
}
export default request
