import React from 'react'
import {View, Image} from "@tarojs/components";
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
  }, [])

  return <View className={"bg-white border border-solid rounded overflow-hidden w-52 flex flex-col"} onClick={() => goto(item.url)}>
      <Image className={"w-full h-32"} src={item.image} lazyLoad />
      <View className={"text-base p-0.5 border-t border-solid"}>{item.title}</View>
    </View>
}
export default Index
