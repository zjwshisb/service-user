export function createReqId(minNum: number = 10000000000, maxMun: number = 99999999999) : number{
  return parseInt((Math.random() * (maxMun- minNum) + minNum).toString(), 10)
}
export function newAction(content, type: APP.MessageType = "text") : APP.Action<APP.Message> {
  return {
    req_id: createReqId(),
    data: {
      content,
      type,
    },
    time: (new Date()).getTime(),
    action: 'message',
    is_success: false
  }
}
