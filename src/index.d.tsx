declare namespace APP {

  export type Resp<T = any> = {
    data: T,
    success: true
  }

  export type Action<T = any> = {
    data: T,
    time: number,
    action: string,
  }

  export type ImageResp = {
    url: string
  }

  export type MessageType = 'text' | 'image' | 'navigator' | 'notice'

  export type NavigatorContent = {
    content: string,
    title: string,
    url: string
  }

  export type Message<T = string> = {
    id?: number,
    content: T,
    type: MessageType,
    source: number,
    req_id: number,
    avatar : string,
    received_at: number,
    admin_name: string
  }
}
