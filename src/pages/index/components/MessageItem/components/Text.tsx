import React from 'react'
import { View } from "@tarojs/components";

const Index: React.FC<{
  content: string
}> = props => {
  return  <View className='message-content text'>
    {props.content}
  </View>
}
export default Index
