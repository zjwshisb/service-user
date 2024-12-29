import React from 'react'
import {View, Input, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {newAction} from "@/util/action";
import {getToken} from "@/util/auth"
import PictureImg from '@/asset/img/picture.png'
import context from "../../context";
import classNames from "classnames";

const Index = () => {

  const [value, setValue] = React.useState('')



  const [isIphonex, setIphonex] = React.useState(false)

  React.useEffect(() => {
    setIphonex(() => {
      const model = Taro.getSystemInfoSync().model
      return /iphone\sx/i.test(model) || (/iphone/i.test(model) && /unknown/.test(model)) || /iphone\s11/i.test(model)
         || /iphone\s12/.test(model);
    })
  }, [])


  const send = React.useContext(context)


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
    <View className={classNames(`border-t border-solid flex flex-shrink-0 items-center bg-[#F5F6F7]`, {
      "pb-9": isIphonex
    })}>
      <View className={"w-[80%] p-2 text-xl"}>
        <Input cursorSpacing={20}
          value={value}
               className={"bg-white p-1 rounded"}
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
      <View className={"flex justify-between"}>
        <Image src={PictureImg} className={"w-10 h-auto flex"} mode='widthFix' onClick={selectImg} />
      </View>
    </View>
  )
}

export default Index

