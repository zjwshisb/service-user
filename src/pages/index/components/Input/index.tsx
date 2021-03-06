import React from 'react'
import {View, Input, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {newAction} from "@/util/action";
import {getToken} from "@/util/auth"
import {getTemplateId, handleSubscribe} from "@/api/index";
import PictureImg from '@/asset/img/picture.png'
import styles from './index.module.less'
import context from "../../context";

const Index = () => {

  const [value, setValue] = React.useState('')

  const [templateId, setTemplateId] = React.useState('')

  const [hadSubscribe, setHadSubscribe] = React.useState<boolean>(false)

  const [isIphonex, setIphonex] = React.useState(false)

  React.useEffect(() => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      getTemplateId().then(res => {
        setTemplateId(res.data.id)
      })
    }
    setIphonex(() => {
      const model = Taro.getSystemInfoSync().model
      return /iphone\sx/i.test(model) || (/iphone/i.test(model) && /unknown/.test(model)) || /iphone\s11/i.test(model)
         || /iphone\s12/.test(model);
    })
  }, [])


  const send = React.useContext(context)

  const subscribeMessage = React.useCallback(() => {
    if (templateId !== '' && !hadSubscribe) {
      Taro.requestSubscribeMessage({
        tmplIds: [templateId]
      }).then(r => {
        setHadSubscribe(true)
        if (r[templateId] === 'accept') {
          handleSubscribe().then().catch()
        }
      }).catch(() => {
        setHadSubscribe(true)
      })
    }

  }, [hadSubscribe, templateId])

  const selectImg = React.useCallback(() => {
    Taro.chooseImage({}).then(res => {
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
            const result: APP.Resp<APP.ImageResp> = JSON.parse(r.data)
            if (result.success) {
              newAction(result.data.url, 'image').then(act => {
                send(act).then().catch()
              })
            }
          }
        })
      })
    })
  }, [send])

  return (
    <View className={`${styles.inputArea} ${isIphonex ? styles.iphonex : ''}`}>
      <View className={styles.input}>
        <Input cursorSpacing={20}
          onClick={subscribeMessage}
          value={value}
          onInput={e => setValue(e.detail.value)}
          confirmHold
          onConfirm={e => {
                 if (send && e.detail.value.length > 0) {
                   newAction(e.detail.value).then(act => {
                     send(act).then(() => {
                       setValue('')
                     })
                   })
                 }
               }}
        />
      </View>
      <View className={styles.action}>
        <Image src={PictureImg} className={styles.icon} mode='widthFix' onClick={selectImg} />
      </View>
    </View>
  )
}

export default Index

