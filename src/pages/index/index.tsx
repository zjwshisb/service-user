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

  const [websocket, setWebsocket] = React.useState<WebSocket | undefined>()

  const [messages, setMessages] = React.useState<APP.Message[]>([])

  const [loading, setLoading] = React.useState(false)

  const [initFinished, setInitFinished] = React.useState(false)

  const [noMore, setNoMore] = React.useState(false)


  const connect = React.useCallback(() => {
    const ws = new WebSocket(`${WS_URL}?token=` + getToken())
    ws.onopen = e => {
      console.log(e)
    }
    ws.onmessage = e => {
      if (e.data != '') {
        const action: APP.Action = JSON.parse(e.data)
        switch (action.action) {
          case 'receive-message': {
            const msg = action.data as APP.Message
            setMessages(prev => {
              return [msg].concat(prev)
            })
          }
        }
      }
    }
    ws.onclose = e => {
      console.log(e)
    }
    ws.onerror = e => {
      console.log(e)
    }
    setWebsocket(ws)
  }, [])


  React.useEffect(() => {
    getMessages().then(res => {
      setMessages(res.data)
      connect()
      setInitFinished(true)
    })
  }, [connect])


  const send = React.useCallback((act: APP.Action) => {
    if (websocket) {
      websocket.send(JSON.stringify(act))
      setMessages(prev => {
        return [act.data].concat(prev)
      })
    }
  }, [websocket])


  const getMoreMessage = React.useCallback(() => {
    if (!loading && initFinished && !noMore) {
      setLoading(true)
      if (messages.length > 0) {
        const id = messages[messages.length - 1].id
        if (id) {
          getMessages(id).then(res => {
            if (res.data.length <= 0){
              setNoMore(true)
            } else {
              setMessages(prevState => {
                setLoading(false)
                return [...prevState.concat(res.data)]
              })
            }
          })
        }
      }
    }

  }, [initFinished, loading, messages, noMore])

  return (
    <SendContext.Provider value={send}>
      <View className='index'>
        <MessageContent  messages={messages} onScrollToUpper={getMoreMessage} />
        <Input />
    </View>
    </SendContext.Provider>
  )
}

export default Index

