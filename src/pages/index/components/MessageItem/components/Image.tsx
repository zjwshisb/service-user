import React from 'react'
import { View,Image } from "@tarojs/components";
import Taro from '@tarojs/taro'
import styles from '../index.module.less'

const Index: React.FC<{
  content: string
}> = props => {

  const preview = React.useCallback((url: string) => {
      Taro.previewImage({
        urls: [url]
      }).then()
  }, [])

  return  <View className={`${styles.content} ${styles.image}`}>
      <Image lazyLoad
        className={styles.image}
        showMenuByLongpress
        src={props.content}
        mode='widthFix'
        onClick={() => preview(props.content)}
      />
    </View>
}
export default Index
