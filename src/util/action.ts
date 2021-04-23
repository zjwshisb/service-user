export function createReqId(minNum: number = 10000000000, maxMun: number = 99999999999) : number{
  return parseInt((Math.random() * (maxMun- minNum) + minNum).toString(), 10)
}
export function newAction(content, type: APP.MessageType = "text") : APP.Action<APP.Message> {
  return {
    data: {
      content,
      type,
      req_id:createReqId(),
      is_server: false,
      avatar: ''
    },
    time: (new Date()).getTime(),
    action: 'send-message',
  }
}
