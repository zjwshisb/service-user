import React from "react";

const context = React.createContext<((a: APP.Action) => boolean) | undefined>(undefined)

export default context
