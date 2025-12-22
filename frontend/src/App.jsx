import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { ToastContainer, } from 'react-toastify';
import Hydra from './pages/hydra/hydra';
const App = () => {

return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/hydra" element={<Hydra/>}/>
  </Routes>
  <ToastContainer position="top-center"/>
  </BrowserRouter>
  )
}
 

export default App
