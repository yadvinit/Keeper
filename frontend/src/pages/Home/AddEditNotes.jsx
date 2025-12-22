import React,{useState} from 'react'
import { MdClose } from "react-icons/md";
import TagInput from '../../components/Input/TagInput'
import axios from 'axios'
import { API_BASE_URL } from "../../config/api";



const AddEditNotes = ({onClose,noteData,type,getAllNotes}) => {
    const [title,setTitle] = useState(noteData?.title ||'')
    const [content, setContent] = useState(noteData?.content ||'')
    const [tags, setTags] = useState(noteData?.tags || [])
    const [error, setError] = useState(null)


    
    const editNote= async()=>{
        const noteId = noteData._id
        try {
            const token = localStorage.getItem("access_token");
             const res = await axios.put(`${API_BASE_URL}/api/note/edit/${noteId}`,
                {title,content,tags},{
                  headers:{
                    Authorization: `Bearer ${token}`
                  }
                })
            

            if(res.data.success === false){
                setError(res.data.message)
                return
            }
            getAllNotes()
            onClose()
            setError("")
            

            
        } catch (error) {
            setError(error.message)
            
        }
    }

    const addNewNote= async()=>{
        try {
            const token = localStorage.getItem("access_token");
            const res = await axios.post(`${API_BASE_URL}/api/note/add`,
                {title,content,tags},{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })

            if(res.data.success === false){
                setError(res.data.message)
                return
            }
            getAllNotes()
            onClose()
            setError("")
            
        } catch (error) {
            setError(error.message)
            
        }
    }

    const handleAddNote=()=>{
        if(!content || !title){
            setError("Please fill all the fields")
            return
        }
        setError("")
        if(type==="edit"){
            editNote()
        }
        else{
            addNewNote()
        }

    }

    
    return (
    <div className="relative">
        <button 
            className="w-10 h-10 rounded-full flex items-center justify-center absolute top-3 right-3 hover:bg-slate-50"
            onClick={onClose}
        >
        <MdClose className="text-xl text-slate-400"/>
        </button>
        <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-sm text-red-400 uppercase">Title</label>
        <input 
            type="text"
            className="text-xl text-slate-950 outline-none" 
            placeholder="Write a title..." 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
           
        />
        </div>
        <div className="flex flex-col gap-2 mt-4">
            <label className="input-label text-red-400 uppercase"> Content</label>
            <textarea className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                placeholder="Add the content..."
                rows={6}
                value={content}
                onChange={(e)=>setContent(e.target.value)}
            ></textarea>

        </div>
        <div className="mt-3">
            <label className="input-label text-red-400 uppercase">tags</label>
            <TagInput 
                tags={tags}
                setTags={setTags}
            />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button className="w-full rounded-md bg-[#2B85FF] text-white font-medium mt-5 p-3"
            onClick={handleAddNote}>
            {type==="edit"?"UPDATE":"ADD"}
        </button>
      
    </div>
  )
}

export default AddEditNotes
