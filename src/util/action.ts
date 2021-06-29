export function createReqId(minNum: number = 10000000000, maxMun: number = 99999999999) : number{
  return parseInt((Math.random() * (maxMun- minNum) + minNum).toString(), 10)
}
export function newAction(content, type: APP.MessageType = "text") : APP.Action<APP.Message> {
  const time = parseInt(((new Date()).getTime() / 1000).toFixed(0))
  return {
    data: {
      content,
      type,
      req_id:createReqId(),
      source: 0,
      avatar: '',
      received_at: time
    },
    time: time,
    action: 'send-message',
  }
}
