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

  return (
    <ScrollView scrollY className='message-content'
      enableFlex
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

