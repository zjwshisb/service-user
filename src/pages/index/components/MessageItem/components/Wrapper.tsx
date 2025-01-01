import React from 'react'
import { View } from "@tarojs/components";
import classNames from "classnames";

const Wrapper: React.FC<React.PropsWithChildren<{
  direction: "left" | "right",
  background?: boolean
}>> = ({direction, children, background = false}) => {

  return  <View className={classNames("box-border rounded overflow-hidden max-w-full flex", {
    "bg-[#95EC69]": direction === "right" && background,
    "text-[#0F170A]": direction === "right" && background,
    "bg-white" : direction === "left" && background,
  })}>
      {children}
    </View>
}
export default Wrapper
