import request from "../util/request";

export const handleLogin = (data) => {
  return request<{token: string}>({
    url: '/login',
    method: 'POST',
    data
  })
}
export const getReqId = () => {
  return request<{req_id: string}>({
    url: "/chat/req-id",
    method: "GET"
  })
}

export const getMessages = ( size = 20, id?: number) => {
  const data = {
    pageSize: size,
  }
  if (id !== undefined) {
    data['id'] = id
  }
  return request<APP.Message[]>({
    url: '/chat/messages',
    data
  })
}


export const getSetting = ( ) => {
  return request<APP.ChatSetting>({
    url: '/chat/setting',
  })
}

export const handleRead = (msgId: number) => {
  return request({
    url: '/chat/read',
    method:"POST",
    data: {
      msg_id: msgId,
    }
  })
}
