import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import ProfileInfo from './Cards/ProfileInfo'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { signOutStart, signOutSuccess, signOutFailure } from '../redux/user/userSlice'

const Navbar = ({userInfo,onSearchNote,handleClearSearch}) => {
    const [searchQuery, setSearchQuery] = useState('')
    
    const handleSearch = ()=>{
        if(searchQuery){
            onSearchNote(searchQuery)
        }
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onLogout = async() => {
       try {
            dispatch(signOutStart())
            const res = await axios.get("http://localhost:3000/api/auth/logout",{withCredentials:true})
            if(res.data.success===false){
                dispatch(signOutFailure(res.data.message))
                
                toast.error(res.data.message)
                return
            }
            toast.success(res.data.message)
            dispatch(signOutSuccess())
            navigate('/login')
        
       } catch (error) {
            toast.error(error.message)
            dispatch(signOutFailure(error.message))
        
       }
    }

    const onClearSearch = () => {
        setSearchQuery('')
        handleClearSearch()
    }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 shadow-md">
        <Link to="/" className="flex items-center gap-2">
             <h2  className="text-xl font-medium text-black py-2">
                <span className="text-slate-500" >Keeper </span>
                <span className="text-slate-900">✈️</span>
            </h2>
        </Link>
        
        <SearchBar
            value={searchQuery}
            onChange={({target})=> setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}

        />

        <ProfileInfo
            onLogout={onLogout}
            userInfo={userInfo}
        />
    </div>

  )
}

export default Navbar
