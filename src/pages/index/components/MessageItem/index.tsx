import React from 'react'
import {View, Image} from '@tarojs/components'
import Text from './components/Text'
import ImageMsg from './components/Image'
import Navigator from './components/Navigator'
import Wrapper from "./components/Wrapper";
import Avatar from '@/components/UserAvatar/Index'
import Notice from './components/Notice'
import classNames from "classnames";

const Index: React.FC<{
  message: APP.Message
}> = ({message}) => {
  let item : React.ReactNode = <></>
  const CusAvatar = message.source !== 0 && message.avatar ?
    <Image src={message.avatar} className={"w-8  h-8 rounded self-start"} />
    : <Avatar />


  const direction = message.source === 0 ? "right" : "left";

  const name =  direction === "left" ? <View className={"text-xs text-gray-500"}>{message.admin_name}</View> : <></>

  switch (message.type) {
    case "notice":
      return <Notice message={message} />
    case "text":
      item =  <Text content={message.content} />
      break
    case "image":
      item = <ImageMsg content={message.content} />
      break
    case "navigator":
      item =  <Navigator content={message.content} />
      break
    default:
  }
  return <View className={classNames("flex items-center mt-2", {
    "flex-row-reverse": direction === "right",
  })}>
    <View className={"px-1 flex-shrink-0 self-start"}>
      {CusAvatar}
    </View>
    <View className={classNames("flex max-w-[60%] overflow-hidden flex-col items-start", {
      "items-end": direction === "right",
    })}>
      {name}
      <Wrapper direction={direction} background={message.type === "text"}>
        {item}
      </Wrapper>
      {
        direction === "right" && <View className={classNames("text-xs ", {
          "text-gray-600": message.is_read === true,
          "text-red-600" : message.is_read === false || message.is_read === undefined
        })}>
          {
            message.is_read ? "已读": "未读"
          }
          </View>
      }
    </View>

  </View>
}
export default Index
