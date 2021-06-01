import React from 'react'
import {View, Image} from '@tarojs/components'
import Text from './components/Text'
import ImageMsg from './components/Image'
import Avatar from '../../../../components/UserAvatar/Index'

const Index: React.FC<{
  message: APP.Message
}> = props => {
  return <View className='message-item' id={`r${props.message.req_id}`} data-right={!props.message.is_server}>
    {
      props.message.is_server ? <Image src={props.message.avatar} className='message-avatar' />
      : <Avatar />
    }
    {
      props.message.type === 'text' && <Text content={props.message.content} />
    }
    {
      props.message.type === 'image' && <ImageMsg content={props.message.content} />
    }
  </View>
}
export default Index
