import Taro from '@tarojs/taro'

export function isWeapp() : boolean {
  return Taro.getEnv() === "WEAPP"
}
export function isH5() :boolean {
  return Taro.getEnv() === "WEB"
}
