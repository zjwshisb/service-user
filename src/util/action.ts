import {getReqId} from "@/api/index";

export async function newAction(content: string, type: APP.MessageType = "text") : Promise<APP.Action<APP.Message>> {
  const time = parseInt(((new Date()).getTime() / 1000).toFixed(0))
  const reqId = await getReqId().then(res => res.data.req_id)
  return {
    data: {
      admin_id: 0,
      content,
      type,
      req_id: reqId,
      source: 0,
      avatar: '',
      received_at: time
    },
    time: time,
    action: 'send-message',
  }
}
