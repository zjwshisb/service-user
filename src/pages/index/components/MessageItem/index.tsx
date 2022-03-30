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
  let item : JSX.Element = <></>
  const CustAvatar = props.message.source !== 0 && props.message.avatar ?
    <Image src={props.message.avatar} className={styles.messageAvatar} />
    : <Avatar />
    const name =  props.message.source !== 0 ? <View className={styles.name}>{props.message.admin_name}</View> : <></>

  switch (props.message.type) {
    case "notice":
      item = <View className={styles.notice}>
        <View className={styles.text}>{props.message.content}</View>
      </View>
      break
    case "text":
      item = <View className={`${styles.messageItem} ${props.message.source === 0 ? styles.right : ''}`}>
        {CustAvatar}
        <View className={styles.body}>
          {name}
          <Text content={props.message.content} />
        </View>
      </View>
      break
    case "image":
      item = <View className={`${styles.messageItem} ${props.message.source === 0 ? styles.right : ''}`}>
        {CustAvatar}
        <View className={styles.body}>
          {name}
          <ImageMsg content={props.message.content} />
        </View>
      </View>
      break
    case "navigator":
      item = <View className={`${styles.messageItem} ${props.message.source === 0 ? styles.right : ''}`}>
        {CustAvatar}
        <View className={styles.body}>
          {name}
          <Navigator content={props.message.content} />
        </View>
      </View>
      break
    default:
  }
  return item
}
export default Index
