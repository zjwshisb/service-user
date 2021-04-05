declare namespace APP {
  export type Action<T> = {
    req_id: number,
    data: T,
    time: number,
    action: string,
    is_success: boolean
  }
  export type MessageType = 'text' | 'image'

  export type Message = {
    content: string,
    type: MessageType,
    is_server?: boolean
  }
}
