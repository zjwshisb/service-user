import Taro from '@tarojs/taro'

const TOKEN = 'ws-token'

export const setToken = token => {
  Taro.setStorageSync(TOKEN, token)
}
export const removeToken = () => {
  Taro.removeStorageSync(TOKEN)
}
export const getToken = () => {
  return Taro.getStorageSync(TOKEN)
}
