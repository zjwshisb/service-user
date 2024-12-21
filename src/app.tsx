import { Provider } from 'mobx-react'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

import counterStore from './store/counter'


import './app.less'
import React from "react";

const store = {
  counterStore
}

const index :React.FC<React.PropsWithChildren> = (props) => {
    return (
      <Provider store={store}>
        {props.children}
      </Provider>
    )
}

export default index
