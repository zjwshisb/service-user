import React from 'react'
import { View,Image } from "@tarojs/components";
import Taro from '@tarojs/taro'

const Index: React.FC<{
  content: string
}> = props => {

  const item: APP.NavigatorContent = JSON.parse(props.content)

  const goto = React.useCallback((url) => {
    Taro.navigateTo({
      url
    }).catch(() => {
      Taro.showToast({
        icon: 'none',
        title: '路径不存在'
      })
    })
  } , [])

  return  <View className='content navigator'>
      <View className='card' onClick={() => goto(item.url)}>
        <Image className='image' src={item.content}  />
        <View className='title'>{item.title}</View>
      </View>
    </View>
}
export default Index
