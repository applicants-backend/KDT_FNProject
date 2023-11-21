import { useEffect } from "react"
import { TodoState, URLstate, WorkState } from "../Store/Store"
import axios from "axios"
import WorkTodo from "./WorkTodo"

interface Contentinterface {
    contentId : BigInt,
    contents : string,
    checked : string
}

export default function WorkTodoCon () {
    const {todoList,setTodoList} = TodoState(state=>state)
    const {workId} = WorkState(state=>state)

    useEffect(()=>{
        const loadTodo = async () => {
            const loadRes = await axios.get(`${URLstate}/todo/${workId}`)
            const loadTodo = loadRes.data
            setTodoList(loadTodo)
        }
        loadTodo();
    },[])

    return (
        <div>
            {todoList.map((value : Contentinterface)=>{
                return <WorkTodo key={value.contentId.toString()} contentId={value.contentId} contents={value.contents} checked={value.checked}></WorkTodo>
            })}
        </div>
    )
}