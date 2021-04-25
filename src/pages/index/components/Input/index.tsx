import React from 'react'
import {View, Input, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {newAction} from "@/util/action";
import {getToken} from "@/util/auth"

import Face from '@/asset/img/face.svg'
import More from '@/asset/img/more.svg'
import context from "../../context";


const Index = () => {

  const [value, setValue] = React.useState('')
  const send = React.useContext(context)

  const selectImg = React.useCallback(() => {
    Taro.chooseImage({
    }).then(res => {
      res.tempFilePaths.forEach(path => {
        Taro.uploadFile({
          header: {
            Authorization: 'Bearer ' + getToken()
          },
          name: "file",
          url: BASE_URL + "/ws/image",
          filePath: path
        }).then(r => {
          if (send) {
            const result = JSON.parse(r.data)
            if (result.success) {
              send(newAction(result.data.url, 'image'))
            }
          }
        })
      })
    })
  }, [send])

  return (
    <View className='input-area'>
      <View className='input'>
        <Input value={value} onInput={e => setValue(e.detail.value)} onConfirm={e => {
          if (send) {
            send(newAction(e.detail.value))
            setValue('')
          }
        }}
        />
      </View>
      <View className='action'>
        <Image src={Face} className='icon' />
        <Image src={More} className='icon' onClick={selectImg} />
      </View>
    </View>
  )
}

export default Index

