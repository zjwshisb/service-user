import React from 'react'
import Taro from '@tarojs/taro'
import {isPhone} from "@/util";
import {Text, View} from "@tarojs/components";
import styles from '../index.module.less'

const Index: React.FC<{
  content: string
}> = props => {

  const makePhoneCall = React.useCallback((content: string) => {
    if (isPhone(content)) {
      Taro.makePhoneCall({
        phoneNumber: content
      })
    }
  } ,[])

  return React.useMemo(() => {
    return  <View className={`${styles.content} ${styles.text}`}>
      <Text className={isPhone(props.content)? styles.phone : ''} onClick={() => makePhoneCall(props.content)}>{props.content}</Text>
    </View>
  } ,[makePhoneCall, props.content])
}
export default Index
