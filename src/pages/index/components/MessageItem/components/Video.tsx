import React from 'react'
import {Video} from "@tarojs/components";

const Index: React.FC<{
  content: string
}> = props => {
  return <Video className={"!relative"}  src={props.content} showFullscreenBtn={true} autoplay={false}></Video>
}
export default Index
