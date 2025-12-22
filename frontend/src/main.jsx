import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import {persistor ,store} from "./redux/store"
import {PersistGate} from "redux-persist/integration/react"
import axios from 'axios'
import { API_BASE_URL } from './config/api'

// Global axios defaults: set API base URL and include credentials for CORS
axios.defaults.baseURL = API_BASE_URL || ''
axios.defaults.withCredentials = true


createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <PersistGate loading = {null} persistor={persistor} >
    <App />
    </PersistGate>
  </Provider>,
)


