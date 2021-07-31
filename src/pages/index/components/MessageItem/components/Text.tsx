import React from 'react'
import { View } from "@tarojs/components";
import styles from '../index.module.less'

const Index: React.FC<{
  content: string
}> = props => {
  return React.useMemo(() => {
    return  <View className={`${styles.content} ${styles.text}`}>
      {props.content}
    </View>
  } ,[props.content])
}
export default Index
