import React from 'react'
import {View} from '@tarojs/components'


import './index.less'
import MessageItem from "./components/MessageItem/index"
import {getMessages} from "../../api";
import {getToken} from "../../util/auth";
import SendContext from './context'
import Input from './components/Input'


const Index = () => {


  const [websocket, setWebsocket] = React.useState<WebSocket | undefined>()

  const [messages, setMessages] = React.useState<APP.Message[]>([])


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
              const newState = prev.slice(0)
              newState.push(msg)
              return newState
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
    })
  }, [connect])


  const send = React.useCallback((act: APP.Action) => {
    if (websocket) {
      setMessages(prev => {
        const newState = prev.slice(0)
        newState.push(act.data)
        return newState
      })
      websocket.send(JSON.stringify(act))
    }
  }, [websocket])


  const ref = React.useRef<HTMLElement>(null)


  React.useLayoutEffect(() => {
    if (ref.current != null) {
      const {scrollHeight, clientHeight} = ref.current
      const maxScrollTop = scrollHeight - clientHeight
      ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  })

  return (
    <SendContext.Provider value={send}>
      <View className='index'>
        <View className='message-content' ref={ref}>
          {
            messages.map(v => {
              return <MessageItem message={v} key={v.req_id} />
            })
          }
        </View>
        <Input />
    </View>
    </SendContext.Provider>
  )
}

export default Index

