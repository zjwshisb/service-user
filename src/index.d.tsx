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
  export type MessageType = 'text' | 'image'

  export type Message = {
    content: string,
    type: MessageType,
    is_server: boolean,
    req_id: number,
  }
}
