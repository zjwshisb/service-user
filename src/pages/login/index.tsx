import React from 'react'
import {Button, Input, View} from "@tarojs/components";
import Taro from "@tarojs/taro"
import {setToken} from "@/util/auth";
import {handleLogin} from "@/api";


const Index = () => {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const login = React.useCallback(form => {
    if (!form.username) {
      Taro.showToast({
        icon:"none",
        title: "请输入账号"
      })
      return
    }
    if (!form.password) {
      Taro.showToast({
        icon:"none",
        title: "请输入密码"
      })
      return
    }
    handleLogin(form).then(res => {

      setToken(res.data.token)
      Taro.navigateTo({
        url: '/pages/index/index'
      })
    }).catch((err) => {
      if (err.success === false) {
        Taro.showToast({
          title: err.message,
          duration: 3
        })
      }
    })
  }, [])

  return (
    <View className='pt-36'>
      <View className='text-center mb-10'>
        客服系统用户端
      </View>
      <div className={"flex items-center flex-col px-[30px]"} style={{border: "20px", borderColor: "black"}}>
        <View className={"mt-2 border-b border-gray-500 w-full"}>
          <Input
            placeholder={"请输入账号"}
            name='username' value={username} type='text'
            onInput={e => {
              setUsername(e.detail.value)
            }}
          />
        </View>
        <View className={"border-b border-gray-500 mt-4 w-full"} style={{border: "1px"}}>
          <Input name='password' value={password}
                 placeholder={"请输入密码"}
                 onInput={e => setPassword(e.detail.value)}
          />
        </View>
        <Button type='primary' className={"mt-4"}  formType='submit'  onClick={() => login({
          username, password
        })}
        >登录</Button>
      </div>

    </View>
  )
}

export default Index

