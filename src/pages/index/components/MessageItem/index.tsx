import React from 'react'
import {View, Image} from '@tarojs/components'

const Index: React.FC<{
  message: APP.Message
}> = props => {
  return <View className='message-item' data-right={!props.message.is_server}>
    <Image src={props.message.avatar} className='message-avatar' />
    <View className='message-content'>
      {props.message.content}
    </View>
  </View>
}
export default Index
