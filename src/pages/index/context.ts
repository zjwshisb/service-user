import React from "react";

const context = React.createContext<((a: APP.Action) => Promise<boolean>) | undefined>(undefined)

export default context
