import React from 'react'
import {View, Image} from "@tarojs/components";
import Taro from '@tarojs/taro'
import styles from "../index.module.less";

const Index: React.FC<{
  content: string
}> = props => {

  const item: APP.NavigatorContent = JSON.parse(props.content)


  const goto = React.useCallback((url) => {
    Taro.navigateTo({
      url
    }).catch(() => {
      Taro.showToast({
        icon: 'none',
        title: '路径不存在'
      })
    })
  }, [])

  return <View className={`${styles.content} ${styles.navigator}`}>
    <View className={styles.card} onClick={() => goto(item.url)}>
      <Image className={styles.image} src={item.content} lazyLoad />
      <View className={styles.title}>{item.title}</View>
    </View>
  </View>
}
export default Index
