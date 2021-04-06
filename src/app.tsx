import { Provider } from 'react-redux'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

import configStore from './store'


import './app.less'

const store = configStore()

const index = (props) => {
    return (
      <Provider store={store}>
        {props.children}
      </Provider>
    )
}

export default index
