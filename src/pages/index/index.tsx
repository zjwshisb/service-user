import React from 'react'
import Taro from '@tarojs/taro'
import {View, Input, Button} from '@tarojs/components'

import './index.less'
import {newAction} from "../../util/action";

const Index = () =>  {

  const [websocket, setWebsocket] = React.useState<WebSocket | undefined>()

  React.useEffect(() => {
    const ws = new WebSocket('ws://localhost:9090/user/ws?token=' + Taro.getStorageSync("token"))
    ws.onopen = e => {
      console.log(e)
    }
    ws.onmessage = e => {
      console.log(e)
    }
    ws.onclose = e => {
      console.log(e)
    }
    ws.onerror = e => {
      console.log(e)
    }
    setWebsocket(ws)
  } , [])

  const [list, setList] = React.useState<string[]>([])

  const [value, setValue] = React.useState('')

  const send = React.useCallback(() => {
    if (websocket) {
      websocket.send(JSON.stringify(newAction(value)))
    }
  }, [websocket, value])

  return (
    <View className='index'>
      <Input onInput={e => setValue(e.detail.value)} />
      <Button onClick={send}>提交</Button>
    </View>
  )
}

export default Index

