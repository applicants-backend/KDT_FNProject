import axios from "axios"
import { URLstate, UserDataState, WorkState } from "../../Store/Store"
import React, { useRef, useState } from "react"
import './scss/WorkAddModal.scss'
import { preventDefault } from "@fullcalendar/core/internal"

interface Workinterface {
    workid : number,
    memberid : string,
    storeid : number,
    title : string,
    date : string
}

export default function WorkAddModal() {
    const {Storeid,Memberid} = UserDataState(state=>state)
    const {add, setAdd} = WorkState(state=>state)
    const [title,setTitle] = useState<string>("")
    const AddRef = useRef<HTMLInputElement>(null)
    const {URL} = URLstate(state=>state)
    
    const now = new Date();
    const year = now.getFullYear()
    const month = now.getMonth()+1;
    const day = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();

    const AddData = {storeid :Storeid.toString(), memberid : Memberid, title, date:`${year}년 ${month}월 ${day}일 ${hour}:${min}`}

    const WorkAdd = async () => {

        if(!title) {
            AddRef.current && AddRef.current.focus()
            return;
        }

        const AddRes = await axios.post(`${URL}/work/board/create`,AddData)
        console.log(AddRes.data.data)
        const Add: Workinterface = AddRes.data.data;
        setAdd(!add)
        setTitle("")

    }
    const handleKeyDown = (event : React.KeyboardEvent) => {
        if (event.key === "Enter") {
            WorkAdd();
        }   
    };
    
    return(
       <div className="WorkModalCon">
        <input name="title" type="text" id="title" placeholder="제목을 입력해주세요" value={title}
        ref={AddRef} onChange={(e)=>setTitle(e.target.value)} onKeyDown={handleKeyDown}/>
       </div>
    )
}