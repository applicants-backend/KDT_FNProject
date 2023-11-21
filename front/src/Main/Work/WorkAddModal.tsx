import axios from "axios"
import { URLstate, UserDataState, WorkState } from "../../Store/Store"
import React, { useRef, useState } from "react"



export default function WorkAddModal() {
    const {Memberid,Storeid} = UserDataState(state=>state)
    const {workList,setWorkList} = WorkState(state=>state)
    const [title,setTitle] = useState<String>()
    const AddRef = useRef<HTMLInputElement>(null)

    const AddData = {Memberid, Storeid, title, date:Date()}
    
    const WorkAdd = async () => {

        if(!title) {
            AddRef.current && AddRef.current.focus()
            return;
        }

        const AddRes = await axios.post(`${URLstate}/work/add`,AddData)
        const Add = AddRes.data
        setWorkList(...workList,Add)

    }
    const handleKeyDown = (event : React.KeyboardEvent) => {
        if (event.key === "Enter") {
            WorkAdd();
        }
    };
    


    return(
       <form name="WorkAddForm">
        <input name="title" type="text" id="title" placeholder="제목을 입력해주세요"
        ref={AddRef} onChange={(e)=>setTitle(e.target.value)}/>
        <button type="button" onClick={(e)=>WorkAdd()} onKeyDown={handleKeyDown}>만들기</button>
       </form>
    )
}