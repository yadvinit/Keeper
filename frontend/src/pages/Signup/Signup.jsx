import React from 'react'
import { useState } from 'react'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
// axios default baseURL is set in main.jsx


const Signup= () => {
  const [email, setEmail] = useState('')
  const [Username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup= async(e) =>{
    e.preventDefault()
    if(!Username){
      setError('Username is required')
      return
    }
    if(!validateEmail(email)){
      setError('Invalid email address')
      return
    }
    if(!password){
      setError('Password is required')
      return
    }

    setError("")

    //signup api

    try {
      const res = await axios.post('/api/auth/signup',
        {username:Username,email,password})

      if(res.data.success === false){
        setError(res.data.message)
        return
      }
      setError("")
      navigate('/login')
      
    } catch (error) {
      setError(error.message)
      
    }

  }

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSignup}>
          <h4 className="text-2xl mb-7">Signup </h4>
          <input 
            type="text"
            placeholder="Username" 
            className="input-box" 
            value={Username} 
            onChange={(e)=>{setUsername(e.target.value)}}
            
          />
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
          <button type="submit" className="btn-primary">Signup</button>
          <p className="text-sm text-center mt-4">
            Already a member?
            <Link to={"/Login"} className="font-medium text-[#2B85FF]"> Login to account</Link>
          </p>
        
        </form>
      </div>
      
    </div>
  )
}

export default Signup
