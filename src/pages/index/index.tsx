import React from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {getMessages} from "@/api";
import {getToken} from "@/util/auth";
import {isWeapp, isH5} from "@/util/env";
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
      url: `${WS_URL}/user/ws?token=` + getToken()
    }).then(t => {
      t.onError(() => {
        Taro.showToast({
          title: '连接服务器失败',
          icon: 'none'
        })
      })
      t.onOpen(() => {
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
              // h5下这里会有莫名其妙的bug
              if (isWeapp()) {
                setToTop(prevState => !prevState)
              }
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
  }, [connect])


  const send = React.useCallback((act: APP.Action): Promise<boolean> => {
    return (new Promise((resolve, reject) => {
      if (task) {
        task.send({
          data: JSON.stringify(act),
          success: () => {
            setMessages(prev => {
              return [...[act.data].concat(prev)]
            })
            // h5下这里会有莫名其妙的bug，所以去掉
            if (isWeapp()) {
              setToTop(prevState => !prevState)
            }
            resolve(true)
          },
          fail: res => {
            Taro.showToast({
              icon: 'none',
              title: res.errMsg
            })
            reject(res.errMsg)
          }
        })
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
        reject("服务器已断开")
      }
    }))
  }, [connect, task])

  const close = React.useCallback(() => {
    if (isWeapp()) {
      Taro.closeSocket().then().catch(err => {
        console.log(err)
      })
    }
    if (isH5()) {
      setTask(prevState => {
        if (prevState) {
          prevState.ws.close()
        }
        return undefined
      })
    }
  }, [])


  React.useEffect(() => {
    init()
    return () => {
      close()
    }
  }, [close, init])


  const getMoreMessage = React.useCallback(async () => {
    if (!loading && !noMore) {
      setLoading(true)
      if (messages.length > 0) {
        const id = messages[messages.length - 1].id
        if (id) {
          const res = await getMessages(id, pageSize)
          setLoading(false)
          setMessages(prevState => {
            return [...prevState.concat(res.data)]
          })
          if (res.data.length < 100) {
            setNoMore(true)
          }
        }
      }
    }

  }, [loading, messages, noMore])

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

