import React from 'react'
import Taro from "@tarojs/taro";
import {Image, OpenData, View} from "@tarojs/components";
import DefaultAvatar from '../../asset/img/default.png'
import styles from './index.module.less'

const env = Taro.getEnv()

const Index = () => {
  let avatar = <Image src={DefaultAvatar} className={styles.messageAvatar}  />
  switch (env) {
    case Taro.ENV_TYPE.WEAPP:
      avatar = <View className={styles.messageAvatar}>
        <OpenData type='userAvatarUrl' />
      </View>
    default: {

    }
  }
  return avatar
}
export default Index
