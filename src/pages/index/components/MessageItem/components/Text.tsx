import React from 'react'
import { View } from "@tarojs/components";

const Index: React.FC<{
  content: string
}> = props => {
  return React.useMemo(() => {
    return  <View className='content text'>
      {props.content}
    </View>
  } ,[props.content])
}
export default Index
