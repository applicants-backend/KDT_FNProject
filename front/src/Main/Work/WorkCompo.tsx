import { URLstate, WorkState } from "../../Store/Store";
import { useNavigate } from "react-router";
import './scss/WorkCompo.scss'
import { useEffect, useState } from "react";
import axios from "axios";

interface Workdata {
    workid : number ;
    title : string ; 
    date : string ;
}

export default function WorkCompo (props : Workdata) {
   const {setWorkId} = WorkState(state=>state)
   const {URL} =URLstate(state=>state)
   const [checked, setChecked] = useState()
   const [unchecked, setUnchecked] = useState()



    
   const navigate = useNavigate();
    const enterTodo = () => {
        setWorkId(props.workid)
        navigate('/workdetail')
        console.log(props.workid)
    }

    useEffect(()=>{
        const loadCheckList = async () => {
            const WorkListRes = await axios.get(`${URL}/work/boards/detail/${props.workid}`)
            console.log(WorkListRes)
            setChecked(WorkListRes.data.data.contents.filter((value : any) => value.checked !== null && value.checked.trim() !=='').length)
            setUnchecked(WorkListRes.data.data.contents.length)
        }
        loadCheckList()
    },[])

    return (
        <div onClick={(e)=>{enterTodo()}} className="CompoCon">
            <div className="date">{props.date}</div>
            <div className="title">{props.title}</div>
            <div className="todo">{checked} / {unchecked}</div>
        </div>
    )
}