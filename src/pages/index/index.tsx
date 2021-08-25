import React from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {getMessages} from "@/api";
import {getToken} from "@/util/auth";
import {isH5, isWeapp} from "@/util/env";
import {AtActivityIndicator} from "taro-ui";
import styles from './index.module.less'

import SendContext from './context'
import Input from './components/Input'
import MessageContent from './components/MessageContent/index'


const pageSize = 30

const Index = () => {

  const [messages, setMessages] = React.useState<APP.Message[]>([])

  const [loading, setLoading] = React.useState(false)

  const [noMore, setNoMore] = React.useState(false)

  const [task, setTask] = React.useState<Taro.SocketTask | undefined>()

  // 控制滚动条滚动到底部
  const [toTop, setToTop] = React.useState(false)

  const connect = React.useCallback(() => {
    Taro.connectSocket({
      url: `${WS_URL}?token=` + getToken()
    }).then(t => {
      t.onError(() => {
        setTask(undefined)
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
      if (res.data.length < pageSize) {
        setNoMore(true)
      }
      setMessages(res.data)
      connect()
    }).catch(() => {})
  } ,[connect])


  const send = React.useCallback((act: APP.Action) : Promise<boolean> => {
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
    if (isWeapp()){
      setTask(prevState => {
        if (prevState) {
          Taro.closeSocket().then().catch(() => {
          })
        }
        return undefined
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
  } ,[])

  React.useEffect(() => {
    init()
    return () => {
      close()
    }
  } ,[close, init])


  const getMoreMessage = React.useCallback(async () => {
    if (!loading  && !noMore) {
      setLoading(true)
      if (messages.length > 0) {
        const id = messages[messages.length - 1].id
        if (id) {
          try {
            const res = await getMessages(id, pageSize)
            setMessages(prevState => {
              setLoading(false)
              return [...prevState.concat(res.data)]
            })
            if (res.data.length < pageSize) {
              setNoMore(true)
            }
          }catch (e) {

          }
        }
      }
    }
  }, [loading, messages, noMore])

  return (
    <SendContext.Provider value={send}>
      <View className={styles.index}>
        <View className={styles.messageContent}>
          <MessageContent messages={messages} top={toTop} onScrollTop={getMoreMessage}>
            {
              loading &&
              <View className={styles.loading}>
                <AtActivityIndicator color='#999999' size={25} content='加载中' mode='center' />
              </View>
            }
            {
              noMore && messages.length > pageSize && <View className={styles.notice}>
                没有更多了
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

