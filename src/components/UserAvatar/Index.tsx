import React from 'react'
import Taro from "@tarojs/taro";
import {Image, OpenData, View} from "@tarojs/components";
import DefaultAvatar from '../../asset/img/default.png'

const env = Taro.getEnv()

const Index = () => {
  let avatar = <Image src={DefaultAvatar} className='message-avatar'  />

  switch (env) {
    case Taro.ENV_TYPE.WEAPP:
      avatar = <View className='message-avatar'>
        <OpenData type='userAvatarUrl' />
      </View>
    default: {

    }
  }
  return avatar
}
export default Index
