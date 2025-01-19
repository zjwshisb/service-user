import React from 'react'
import {View, Image} from '@tarojs/components'
import Text from './components/Text'
import ImageMsg from './components/Image'
import Navigator from './components/Navigator'
import Wrapper from "./components/Wrapper";
import Avatar from '@/components/UserAvatar/Index'
import Notice from './components/Notice'
import Audio from './components/Audio'
import Video from './components/Video'
import Pdf from './components/Pdf'
import classNames from "classnames";

const Index: React.FC<{
  message: APP.Message
  showRead?: boolean
}> = ({showRead, message}) => {
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
      item =  <Wrapper direction={direction} background><Text content={message.content} /></Wrapper>
      break
    case "image":
      item = <Wrapper direction={direction}><ImageMsg content={message.content} /></Wrapper>
      break
    case "navigator":
      item =  <Wrapper direction={direction}><Navigator content={message.content} /></Wrapper>
      break
    case "audio":
      item = <Wrapper direction={direction}  background><Audio content={message.content} /></Wrapper>
      break
    case "video":
      item = <Wrapper direction={direction}  background><Video content={message.content} /></Wrapper>
      break
    case "pdf":
      item = <Wrapper direction={direction}><Pdf content={message.content} /></Wrapper>
      break
    default:
  }
  return <View className={classNames("flex items-start mt-2", {
    "flex-row-reverse": direction === "right",
  })}>
    <View className={"px-1 flex-shrink-0 self-start"}>
      {CusAvatar}
    </View>
    <View className={classNames("flex max-w-[60%] overflow-hidden flex-col", {
      "items-end": direction === "right",
      "items-start": direction === "left"
    })}>
      {name}
      {item}
      {
        showRead && direction === "right" && <View className={classNames("text-xs ", {
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
