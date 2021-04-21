import request from "../util/request";

export const handleLogin = (data) => {
  return request<{token: string}>({
    url: '/login',
    method: 'POST',
    data
  })
}
export const getMessages = () => {
  return request<APP.Message[]>({
    url: '/ws/messages'
  })
}
