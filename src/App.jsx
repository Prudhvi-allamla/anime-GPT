import React from 'react'
 import appstore from './utils/appstore'
import { Provider } from 'react-redux'
import Body from './Components/Body'

const App = () => {
  return (
    <Provider store={appstore}>
       <Body />
    </Provider>
   
   
  )
}

export default App
