import React from 'react'
import {ScrollView} from '@tarojs/components'

import MessageItem from "../MessageItem/index"

const Index: React.FC<{
  messages: APP.Message[],
  onScrollToUpper: () => void,
}> = (props) => {

  const onScrollToUpper = React.useCallback(async () => {
    await props.onScrollToUpper()
  }, [props])

  const [top, setTop] = React.useState(0)

  const view = React.useRef(undefined)

  const scrollBottom = React.useRef(0)

  const onScroll = React.useCallback((e) => {
    scrollBottom.current = e.detail.scrollHeight - e.detail.scrollTop
  }, [])

  React.useLayoutEffect(() => {
    if (view.current) {
      setTop(prevState => {
        if (view.current !== undefined) {
          // @ts-ignore
          console.log(view.current.scrollHeight)
          // @ts-ignore
          const t = view.current.scrollHeight - scrollBottom.current
          console.log(t)
          if (t === prevState) {
            return t + 1
          }
          return t
        }
        return prevState
      })
    }
  }, [props.messages])


  return (
    <ScrollView ref={view} scrollTop={top}  scrollY className='message-content'
      onScroll={onScroll}
      upperThreshold={30}
      onScrollToUpper={onScrollToUpper}
    >
      {
        props.messages.map(v => {
          return <MessageItem message={v} key={v.req_id} />
        })
      }
    </ScrollView>
  )
}

export default Index

