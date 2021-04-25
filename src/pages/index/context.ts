import React from "react";

const context = React.createContext<((a: APP.Action) => void) | undefined>(undefined)

export default context
