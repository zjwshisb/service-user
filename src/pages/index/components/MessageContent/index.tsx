import React from 'react'
import {ScrollView} from '@tarojs/components'

import MessageItem from "../MessageItem/index"

const Index: React.FC<{
  messages: APP.Message[],
}> = (props) => {
  return (
    <ScrollView scrollY className='message-content'
      enableFlex
    >
      {
        props.messages.map(v => {
          return <MessageItem message={v} key={v.req_id} />
        })
      }
      {props.children}
    </ScrollView>
  )
}

export default Index

