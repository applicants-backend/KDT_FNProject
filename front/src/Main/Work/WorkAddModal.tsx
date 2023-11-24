import axios from "axios"
import { URLstate, UserDataState, WorkState } from "../../Store/Store"
import React, { useRef, useState } from "react"

interface Workinterface {
    workid : BigInt,
    memberid : string,
    storeid : BigInt,
    title : string,
    date : string
}

export default function WorkAddModal() {
    const {Storeid,Memberid} = UserDataState(state=>state)
    const {workList,setWorkList} = WorkState(state=>state)
    const [title,setTitle] = useState<String>()
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
        setWorkList([Add,...workList]);

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