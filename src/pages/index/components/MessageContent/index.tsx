import React from 'react'
import {ScrollView} from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.less'
import MessageItem from "../MessageItem/index"

const Index: React.FC<{
  messages: APP.Message[],
  top: boolean,
  onScrollTop: () => void
}> = (props) => {

  const [top, setTop] = React.useState(0)

  const [height, setHeight] = React.useState(0)




  Taro.useReady(() => {
    const query = Taro.createSelectorQuery()
    query.select('#content').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      setHeight(res[0].height)
    })
  })

  React.useEffect(() => {
    setTop(prevState => {
      if (prevState === -1) {
        return -2
      } else {
        return -1
      }
    })
  }, [props.top])

  React.useEffect(() => {
  }, [props.messages])


  return (
    <ScrollView id='content' className={styles.scrollView} scrollTop={top} scrollY
      enableFlex
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
    </ScrollView>
  )
}

export default Index

