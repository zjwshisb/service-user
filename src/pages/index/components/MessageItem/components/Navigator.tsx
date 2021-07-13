import React from 'react'
import { View,Image } from "@tarojs/components";
import Taro from '@tarojs/taro'

const Index: React.FC<{
  content: string
}> = props => {

  const item: APP.NavigatorContent = JSON.parse(props.content)

  return  <View className='content navigator'>
      <View className='card' onClick={() => Taro.navigateTo({
        url: item.url
      })}
      >
        <Image className='image' src={item.content}  />
        <View className='title'>{item.title}</View>
      </View>
    </View>
}
export default Index
