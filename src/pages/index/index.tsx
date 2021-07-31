import React from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {getMessages} from "@/api";
import {getToken} from "@/util/auth";
import styles from './index.module.less'

import SendContext from './context'
import Input from './components/Input'
import MessageContent from './components/MessageContent/index'

const pageSize = 100

const Index = () => {

  const [messages, setMessages] = React.useState<APP.Message[]>([])

  const [loading, setLoading] = React.useState(false)

  const [noMore, setNoMore] = React.useState(false)

  const [task, setTask] = React.useState<Taro.SocketTask | undefined>()

  const [toTop, setToTop] = React.useState(false)

  const connect = React.useCallback(() => {
    Taro.connectSocket({
      url: `${WS_URL}?token=` + getToken()
    }).then(t => {
      t.onError(() => {
        Taro.showToast({
          title: '连接服务器失败',
          icon: 'none'
        })
      })
      t.onOpen(() => {
        Taro.showToast({
          title: '连接服务器成功'
        })
      })
      t.onMessage(result => {
        if (result.data != '') {
          const action: APP.Action = JSON.parse(result.data)
          switch (action.action) {
            case 'receive-message': {
              const msg = action.data as APP.Message
              setMessages(prev => {
                return [msg].concat(prev)
              })
              setToTop(prevState => !prevState)
            }
          }
        }
      })
      t.onClose(() => {
        setTask(undefined)
      })
      setTask(t)
    })

  }, [])

  const init = React.useCallback(() => {
    setNoMore(false)
    getMessages(undefined, pageSize).then(res => {
      if (res.data.length < 100) {
        setNoMore(true)
      }
      setMessages(res.data)
      connect()
    })
  } ,[connect])


  const send = React.useCallback((act: APP.Action) : boolean => {
    if (task) {
      task.send({
        data: JSON.stringify(act)
      })
      setMessages(prev => {
        return [act.data].concat(prev)
      })
      setToTop(prevState => !prevState)
      return true
    } else {
      Taro.showModal({
        title: '提示',
        content: '聊天服务器已断开',
        confirmText: '重新连接'
      }).then(res => {
        if (res.confirm) {
          connect()
        }
      })
      return false
    }
  }, [connect, task])



  React.useEffect(() => {
    init()
    return () => {
      setTask(prevState => {
        prevState?.close({})
        return undefined
      })
    }
  } ,[init])


  const getMoreMessage = React.useCallback(async () => {
    if (!loading  && !noMore) {
      setLoading(true)
      if (messages.length > 0) {
        const id = messages[messages.length - 1].id
        if (id) {
          const res = await getMessages(id, pageSize)
          setMessages(prevState => {
            setLoading(false)
            return [...prevState.concat(res.data)]
          })
          if (res.data.length < 100) {
            setNoMore(true)
          }
        }
      }
    }

  }, [ loading, messages, noMore])

  return (
    <SendContext.Provider value={send}>
      <View className={styles.index}>
        <View className={styles.messageContent}>
          <MessageContent messages={messages} top={toTop}>
            {
              noMore && messages.length > 50 && <View className={styles.loadMore}>
                没有更多了
              </View>
            }
            {
              (!noMore && messages.length >= pageSize) && <View className={styles.loadMore} onClick={getMoreMessage}>
                  点击加载更多
                </View>
            }
          </MessageContent>
        </View>
        <Input />
      </View>
    </SendContext.Provider>
  )
}

export default Index

