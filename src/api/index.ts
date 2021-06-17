import request from "../util/request";

export const handleLogin = (data) => {
  return request<{token: string}>({
    url: '/login',
    method: 'POST',
    data
  })
}
export const getTemplateId = () => {
  return request<{id: string}>({
    url: '/template-id',
    method: 'GET'
  })
}
export const getMessages = (id?: number) => {
  return request<APP.Message[]>({
    url: '/ws/messages',
    data: {
      id
    }
  })
}
