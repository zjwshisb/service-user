import React from 'react'
import {Text, View} from "@tarojs/components";
import Taro from '@tarojs/taro'

const Index: React.FC<{
  content: string
}> = props => {

  const [audio, _] = React.useState(() => {
    return Taro.createInnerAudioContext()
  })

  const [duration, setDuration] = React.useState(0)

  const [isPlay, setIsPlay] = React.useState(false)

  React.useEffect(() => {
    audio.autoplay = false
    audio.src = props.content
    audio.onPlay(() => {
      setIsPlay(true)
    })
    audio.onStop(() => {
      setIsPlay(false)
    })
    audio.onError((res) => {
      Taro.showToast({
        icon: 'error',
        title: res.errMsg
      })
    })
    audio.onCanplay(() => {
      setDuration(audio.duration)
    })
    return () => {
      audio.destroy()
    }
  }, [audio])

   const play = React.useCallback(() => {
     if (audio.paused) {
       audio.startTime = 0
       audio.play()
     } else {
       audio.stop()
     }
   }, [audio])


  return <View className={"text-xs py-1.5"} onClick={play}>{
    isPlay && <Text>播放中-</Text>
  }<Text>语音{duration.toFixed(0)}'s</Text></View>
}
export default Index
