import React from "react";

const context = React.createContext<{
  send: ((a: APP.Action) => Promise<boolean>) | undefined,
  is_show_queue?: boolean,
  is_show_read?: boolean
}>({
  send: undefined,
  is_show_queue: false,
  is_show_read: false
})

export default context
