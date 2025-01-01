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

  export type Receipt = {
    msg_id: number,
    req_id: string,
    user_id: number
  }

  export type File = {
    "id": number,
    "path": string,
    "url": string
    "thumb_url": string
    "name": string
    "type": string
  }


  export type MessageType = 'text' | 'image' | 'navigator' | 'notice' | "audio" | "video"

  export type NavigatorContent = {
    image: string,
    title: string,
    url: string
  }

  export type Message<T = string> = {
    id?: number,
    content: T,
    type: MessageType,
    success?: boolean,
    source: number,
    req_id: string,
    avatar : string,
    received_at: number,
    admin_name?: string,
    admin_id: number,
    is_read?: boolean
  }

  export type ChatSetting = {
    is_show_queue: boolean,
    is_show_read: boolean
  }
}
