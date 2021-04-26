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
    id?: number,
    content: string,
    type: MessageType,
    is_server: boolean,
    req_id: number,
    avatar : string,
    received_at: number
  }

  export type WebsocketContext = {
    messages: APP.Message[],
    websocket?: WebSocket,
    send?: (a: APP.Action) => void
  }
}
