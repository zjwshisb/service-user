import React from 'react'
import { Image } from "@tarojs/components";
import Taro from '@tarojs/taro'
import PdfImg from '@/asset/img/pdf.png'
import {window} from "@tarojs/runtime";

const Index: React.FC<{
  content: string
}> = props => {

  const preview = React.useCallback(() => {
    if (Taro.getEnv() === "WEB") {
      window.location.href = props.content
    } else {
      Taro.downloadFile({
        url: props.content
      }).then(r => {
        Taro.openDocument({
          filePath: r.filePath
        })
      })
    }

  }, [])

  return <Image lazyLoad
        className={"w-20 h-auto"}
        src={PdfImg}
        mode='widthFix'
        onClick={preview}
      />
}
export default Index
