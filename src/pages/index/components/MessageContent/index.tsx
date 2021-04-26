import React from 'react'
import {ScrollView, View} from '@tarojs/components'
import Taro from '@tarojs/taro'

import MessageItem from "../MessageItem/index"

const Index: React.FC<{
  messages: APP.Message[],
  onScrollToUpper: () => void,
}> = (props) => {

  const [scrollTop, setScrollTop] = React.useState(0)

  const ref = React.useRef(0)

  const lastMessage = React.useRef<APP.Message>()

  const getScrollHeight = React.useCallback(() => {
    const select = Taro.createSelectorQuery()
    let a = 0
    let scrollViewHeight = 0
    // select.select('#inner-content').boundingClientRect()
    // select.exec(res => {
    //   a = res.height
    // })
    select.select('#message-content').boundingClientRect()
    select.selectViewport().scrollOffset()
    select.exec(v => {
      console.log(v)
    })
    return a - scrollViewHeight
  }, [])


  const onScrollToUpper = React.useCallback(() => {
    if (props.messages.length > 0) {
      ref.current = getScrollHeight()
      props.onScrollToUpper()
    }
  }, [getScrollHeight, props])


  React.useLayoutEffect(() => {
    const length = props.messages.length
    if (length > 0) {
      const newLast = props.messages[length - 1]
      if (lastMessage.current) {
        // 接受到新消息或者发送消息,滚动到底部
        if (lastMessage.current.req_id !== newLast.req_id) {
          setScrollTop(getScrollHeight())
        }
      }
      lastMessage.current = props.messages[length - 1]
    }
    setScrollTop(getScrollHeight())
  }, [getScrollHeight, props.messages])


  return (
    <ScrollView scrollTop={scrollTop} scrollY id='message-content' className='message-content'
      onScrollToUpper={onScrollToUpper}
    >
      <View id='inner-content' className='inner-content'>
        {
          props.messages.map(v => {
            return <MessageItem message={v} key={v.req_id} />
          })
        }
      </View>
    </ScrollView>
  )
}

export default Index

