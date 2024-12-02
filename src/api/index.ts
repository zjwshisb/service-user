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
export const getTemplateId = () => {
  return request<{id: string}>({
    url: '/template-id',
    method: 'GET'
  })
}
export const getMessages = (id?: number, size = 100) => {
  return request<APP.Message[]>({
    url: '/chat/messages',
    data: {
      id,
      size
    }
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
export const handleSubscribe = () => {
  return request({
    url: '/subscribe',
    method: 'POST'
  })
}
