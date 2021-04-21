import React from 'react'
import {View, Input, Image} from '@tarojs/components'
import {newAction} from "../../util/action";
import './index.less'
import MessageItem from "./components/MessageItem/index"
import Face from '../../asset/img/face.svg'
import More from '../../asset/img/more.svg'
import { getMessages } from "../../api";
import { getToken } from "../../util/auth";

const Index = () => {

  const [websocket, setWebsocket] = React.useState<WebSocket | undefined>()

  const [messages, setMessages] = React.useState<APP.Message[]>([])

  const [value, setValue] = React.useState('')

  const connect = React.useCallback(() => {
    const ws = new WebSocket(`${WS_URL}?token=` + getToken())
    ws.onopen = e => {
      console.log(e)
    }
    ws.onmessage = e => {
      if (e.data != '') {
        const action: APP.Action = JSON.parse(e.data)
        switch (action.action) {
          case 'message': {
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


  const send = React.useCallback((msg: string) => {
    if (websocket) {
      const act = newAction(msg)
      setValue('')
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
    <View className='index'>
      <View className='message-content' ref={ref}>
        {
          messages.map(v => {
            return <MessageItem message={v} key={v.req_id} />
          })
        }
      </View>
      <View className='input-content'>
        <View className='input'>
          <Input value={value} onInput={e => setValue(e.detail.value)} onConfirm={e => send(e.detail.value)} />
        </View>
        <View className='action'>
          <Image src={Face} className='icon' />
          <Image src={More} className='icon' />
        </View>
      </View>
    </View>
  )
}

export default Index

