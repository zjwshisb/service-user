import { Provider } from 'mobx-react'

import settingStore from './store/setting'


import './app.less'
import React from "react";

const store = {
  settingStore
}

const index :React.FC<React.PropsWithChildren> = (props) => {
    return (
      <Provider store={store}>
        {props.children}
      </Provider>
    )
}

export default index
