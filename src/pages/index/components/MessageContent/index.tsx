import React from 'react'
import {ScrollView} from '@tarojs/components'
import styles from './index.module.less'
import MessageItem from "../MessageItem/index"

const Index: React.FC<{
  messages: APP.Message[],
  top: boolean,
}> = (props) => {

  const [top, setTop] = React.useState(0)

  React.useEffect(() => {
    setTop(prevState => {
      if (prevState > 0) {
        return 0
      } else {
        return 1
      }
    })
  }, [props.top])


  return (
    <ScrollView scrollY className={styles.scrollView} scrollTop={top}
      lowerThreshold={300}
      onScrollToLower={() => {
                  console.log('lower')
                }}
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

