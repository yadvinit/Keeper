import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { ToastContainer, } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute'

const App = () => {

return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  </Routes>
  <ToastContainer position="top-center"/>
</BrowserRouter>
  )
}
 

export default App
