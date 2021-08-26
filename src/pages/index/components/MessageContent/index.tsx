import React from 'react'
import {ScrollView, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {isH5, isWeapp} from "@/util/env";
import styles from './index.module.less'
import MessageItem from "../MessageItem/index"

const Index: React.FC<{
  messages: APP.Message[],
  top: boolean,
  onScrollTop: () => void
}> = (props) => {

  const [top, setTop] = React.useState(0)

  const [height, setHeight] = React.useState(0)

  const view = React.useRef<HTMLDivElement>()

  Taro.useReady(() => {
    const query = Taro.createSelectorQuery()
    query.select('#content').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      if (res.length > 0 && res[0]) {
        setHeight(res[0].height)
      }
    })
  })

  React.useEffect(() => {
    if (isWeapp()) {
      setTop(prevState => {
        if (prevState === -1) {
          return -2
        } else {
          return -1
        }
      })
    }
    // h5用上面这个方法会出Bug
    if (isH5()) {
      if (view.current) {
        view.current.scrollTop = 0
      }
    }

  }, [props.top])

  React.useEffect(() => {
  }, [props.messages])


  return (
    <ScrollView id='content' className={styles.scrollView} scrollTop={top} scrollY
      enableFlex
      ref={view}
      onScroll={e => {
        const t = (height - e.detail.scrollTop) - e.detail.scrollHeight
        if (t > -30) {
          props.onScrollTop()
        }
      }}
    >
      {
        props.messages.map(v => {
          return <MessageItem message={v} key={v.req_id} />
        })
      }
      {props.children}
      <View className={styles.space}>&nbsp;</View>
    </ScrollView>
  )
}

export default Index

