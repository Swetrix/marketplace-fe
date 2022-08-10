import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import App from './App'
import reportWebVitals from './reportWebVitals'

console.log('%cWelcome, hacker, glad you opened your console, you seem serious about your craft and will go a long way!\nP.S. All the bugs, feature requests are welcome to be sent to security@swetrix.com', 'color: #818cf8;background: #1f2937;font-size: 20px;text-shadow: 2px 2px black')

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
