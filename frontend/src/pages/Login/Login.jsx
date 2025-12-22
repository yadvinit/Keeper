import React from 'react'
import {useState} from 'react'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link,useNavigate} from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import {useDispatch} from "react-redux"
import axios from 'axios'
import {signInStart,signInFailure,signInSuccess} from "../../redux/user/userSlice"
// axios default baseURL is set in main.jsx


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin= async(e) =>{
    e.preventDefault()
    if(!validateEmail(email)){
      setError('Invalid email address')
      return
    }
    if(!password){
      setError('Password is required')
      return
    }

    setError("")

    try {

      dispatch(signInStart())
      const res = await axios.post('/api/auth/login',{email,password})

      if(res.data.success === false){
        dispatch(signInFailure(res.data.message))
        return;
      }

      console.log('Login response:', res.data)
      const token = res.data.access_token;
      localStorage.setItem('access_token', token);
      dispatch(signInSuccess(res.data.user))
      console.log('Navigation to home')
      navigate("/")

      
    } catch (error) {

    dispatch(signInFailure(error.message))
      
    }

    //loginapi

  }

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login </h4>
          <input 
            type="text"
            placeholder="Email" 
            className="input-box" 
            value={email} 
            onChange={(e)=>{setEmail(e.target.value)}} 
          />

          
          <PasswordInput 
            value={password} 
            onChange={(e)=>{setPassword(e.target.value)}} 
            
          />
          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}
          <button type="submit" className="btn-primary">Login</button>

          <p className="text-sm text-center mt-4">
            Not a member?
            <Link to={"/signup"} className="font-medium text-[#2B85FF]"> create account</Link>
            
          </p>
          <p className="text-sm text-center mt-4">
            <Link to={"/hydra"} className="font-medium text-[#2B85FF]"> login using hydra</Link>
          </p >
        
        </form>
      </div>
      
    </div>
  )
}

export default Login
