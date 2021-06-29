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

  const [task, setTask] = React.useState<Taro.SocketTask | undefined>()


  const connect = React.useCallback(() => {
    Taro.connectSocket({
      url: `${WS_URL}?token=` + getToken()
    }).then(t => {
      t.onMessage(result => {
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
      setTask(t)
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
    if (task) {
      task?.send({
        data: JSON.stringify(act)
      })
      setMessages(prev => {
        return [act.data].concat(prev)
      })
    }
  }, [task])


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
            noMore ?   <View className='load-more'>
              没有更多了
            </View> : <View className='load-more' onClick={getMoreMessage}>
              点击加载更多
            </View>
          }

        </MessageContent>
        <Input />
    </View>
    </SendContext.Provider>
  )
}

export default Index

