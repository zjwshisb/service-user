import React from 'react'
import { View } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import Taro from "@tarojs/taro"
import { setToken } from "../../util/auth";
import { handleLogin } from "../../api";

import './index.less'

const Index = () =>  {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const login = React.useCallback(form => {
    handleLogin(form).then(res => {
      setToken(res.data.token)
      Taro.navigateTo({
        url: '/pages/index/index'
      })
    }).catch(() => {
      Taro.showToast({
        title: '账号密码错误',
        duration: 3
      })
    })
  } ,[])

  return (
    <View className='login'>
      <View className='title'>
        客服系统用户端
      </View>
      <AtForm customStyle={{border: "none"}}>
        <AtInput title='登录账号' name='username' value={username} type='text' onChange={value => setUsername(value.toString())} />
        <AtInput title='登录密码' name='password' value={password} type='password' onChange={value => setPassword(value.toString())} />
      </AtForm>
      <View className='action-content'>
        <AtButton type='primary' size='small' formType='submit' onClick={() => login({
          username,password
        })} >登录</AtButton>
      </View>
    </View>
  )
}

export default Index

