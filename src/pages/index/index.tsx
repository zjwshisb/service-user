import React from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'

import {getMessages} from "@/api";
import {getToken} from "@/util/auth";
import './index.less'

import SendContext from './context'
import Input from './components/Input'
import MessageContent from './components/MessageContent/index'


const Index = () => {

  const [messages, setMessages] = React.useState<APP.Message[]>([])

  const [loading, setLoading] = React.useState(false)

  const [initFinished, setInitFinished] = React.useState(false)

  const [noMore, setNoMore] = React.useState(false)


  const connect = React.useCallback(() => {
    Taro.connectSocket({
      url: `${WS_URL}?token=` + getToken()
    })
    Taro.onSocketOpen(e => {
      console.log(e)
    })
    Taro.onSocketMessage(result => {
      if (result.data != '') {
        const action: APP.Action = JSON.parse(result.data)
        switch (action.action) {
          case 'receive-message': {
            const msg = action.data as APP.Message
            setMessages(prev => {
              return [msg].concat(prev)
            })
          }
        }
      }
    })
  }, [])


  React.useEffect(() => {
    getMessages().then(res => {
      setMessages(res.data)
      connect()
      setInitFinished(true)
    })
  }, [connect])


  const send = React.useCallback((act: APP.Action) => {
    Taro.sendSocketMessage({
      data: JSON.stringify(act)
    }).then().catch()
    setMessages(prev => {
      return [act.data].concat(prev)
    })
  }, [])


  const getMoreMessage = React.useCallback(async () => {
    if (!loading && initFinished && !noMore) {
      setLoading(true)
      if (messages.length > 0) {
        const id = messages[messages.length - 1].id
        if (id) {
          const res = await getMessages(id)
          if (res.data.length <= 0){
            setNoMore(true)
          } else {
            setMessages(prevState => {
              setLoading(false)
              return [...prevState.concat(res.data)]
            })
          }
        }
      }
    }

  }, [initFinished, loading, messages, noMore])

  return (
    <SendContext.Provider value={send}>
      <View className='index'>
        <MessageContent  messages={messages} >
          {
            noMore ?   <view className='load-more'>
              没有更多了
            </view> : <view className='load-more' onClick={getMoreMessage}>
              加载更多
            </view>
          }

        </MessageContent>
        <Input />
    </View>
    </SendContext.Provider>
  )
}

export default Index

