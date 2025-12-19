import React from 'react'
import { MdOutlinePushPin ,MdCreate,MdDelete} from "react-icons/md";
import moment from "moment"

const NoteCard = ({title,date,content,isPinned,onPinNote,onEdit,onDelete,tags}) => {


  return (
    
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all  ease-in-out">
        <div className="flex items-center justify-between">
            <div>
                <h6 className="text-sm font-medium" >{title} </h6>
                <span className="text-xs text-green-700">{moment(date).format("DO MMM YYYy")}</span>
            </div>
            <MdOutlinePushPin
                className={`icon-btn ${isPinned? "text-blue-500":"text-slate-300"}`}
                onClick={onPinNote}
            />   
        </div>
        <p className="text-sm text-slate-600">{content?.slice(0,60)}
        </p>
        <div className="flex items-center justify-between mt-2">
            <div className=" test-sm text-slate-500 ">{tags.map((item)=>{
                ` #${item} `
            })}</div>
            <div className="flex gap-2">
                <MdCreate className="icon-btn hover:text-blue-600"
                onClick={onEdit} />

                <MdDelete className="icon-btn hover:text-red-600"
                onClick={onDelete} />
            </div>  
        </div>
    </div>

    
  )
}

export default NoteCard
