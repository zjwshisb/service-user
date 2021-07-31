import React from 'react'
import {View, Image} from '@tarojs/components'
import Text from './components/Text'
import ImageMsg from './components/Image'
import Navigator from './components/Navigator'
import Avatar from '../../../../components/UserAvatar/Index'
import styles from './index.module.less'

const Index: React.FC<{
  message: APP.Message
}> = props => {
  return <View className={`${styles.messageItem} ${props.message.source === 0 ? styles.right : ''}`}>
    {
      props.message.source !== 0  ?
        <Image src={props.message.avatar} className={styles.messageAvatar} />
      : <Avatar />
    }
    {
      props.message.type === 'text' && <Text content={props.message.content} />
    }
    {
      props.message.type === 'image' && <ImageMsg content={props.message.content} />
    }
    {
      props.message.type === "navigator" && <Navigator content={props.message.content} />
    }
  </View>
}
export default Index
