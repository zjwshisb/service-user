import { Provider } from 'react-redux'

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
