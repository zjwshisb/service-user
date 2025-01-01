import React from 'react'
import { Image } from "@tarojs/components";
import Taro from '@tarojs/taro'

const Index: React.FC<{
  content: string
}> = props => {

  const preview = React.useCallback((url: string) => {
      Taro.previewImage({
        urls: [url]
      }).then()
  }, [])

  return <Image lazyLoad
        className={"max-w-full h-auto"}
        showMenuByLongpress
        src={props.content}
        mode='widthFix'
        onClick={() => preview(props.content)}
      />
}
export default Index
