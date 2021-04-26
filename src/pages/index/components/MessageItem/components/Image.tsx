import React from 'react'
import { View,Image } from "@tarojs/components";
import Taro from '@tarojs/taro'

const Index: React.FC<{
  content: string
}> = props => {

  const preview = React.useCallback((url: string) => {
      Taro.previewImage({
        urls: [url]
      }).then()
  }, [])

  return  <View className='content image'>
      <Image className='image' mode='aspectFit' src={props.content} onClick={() => preview(props.content)} />
    </View>
}
export default Index
