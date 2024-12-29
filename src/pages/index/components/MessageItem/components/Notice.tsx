import React from 'react'
import {View} from '@tarojs/components'


const Notice: React.FC<{
  message: APP.Message
}> = ({message}) => {
  return <View className={"w-full text-center text-xs"}>
    <View className={"bg-[#E1E1E1] text-[##4A4A4A] inline-block px-1 rounded max-w-[70%]"}>{message.content}</View>
  </View>
}
export default Notice
