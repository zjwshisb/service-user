import React from 'react'
import {View, Input, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {newAction} from "@/util/action";
import {getToken} from "@/util/auth"
import { getTemplateId } from "@/api";


import Face from '@/asset/img/face.svg'
import More from '@/asset/img/more.svg'
import context from "../../context";


const Index = () => {

  const [value, setValue] = React.useState('')

  const [templateId, setTemplateId] = React.useState('')

  const [subscribe, setSubscribe] = React.useState<boolean | undefined>()


  React.useEffect(() => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      getTemplateId().then(res => {
        setTemplateId(res.data.id)
      })
    }
  }, [])

  const send = React.useContext(context)

  const subscribeMessage = React.useCallback(() => {
    Taro.login().then(res => {
      if(res.code) {
        Taro.requestSubscribeMessage({
          tmplIds: [templateId]
        }).then(r => {
          if (r[templateId] === 'accept') {

          }
        })
      }
    })
  }, [templateId])

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
            if (templateId !== '') {
            }
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

