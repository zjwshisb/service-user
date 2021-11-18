import {getReqId} from "@/api";

export async function newAction(content, type: APP.MessageType = "text") : Promise<APP.Action<APP.Message>> {
  const time = parseInt(((new Date()).getTime() / 1000).toFixed(0))
  const res = await getReqId()
  return {
    data: {
      content,
      type,
      req_id: res.data.reqId,
      source: 0,
      avatar: '',
      received_at: time
    },
    time: time,
    action: 'send-message',
  }
}
