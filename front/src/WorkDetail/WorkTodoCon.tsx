import { useEffect, useState } from "react"
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

    const [inputTodo,setInputTodo]= useState<string>()
    const AddTodo = async () => {
        const addTodoRes = await axios.post(`${URLstate}/todo/add`,{contents : inputTodo, workId})
        const addTodo = addTodoRes.data
        setTodoList([...todoList,addTodo])
    }

    const handleKeyDown = (event : React.KeyboardEvent) => {
        if (event.key === "Enter") {
            AddTodo();
        }
    };

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
            <input type="text" onChange={e=>setInputTodo(e.target.value)} onKeyDown={handleKeyDown}/> 
            <button type="button" onClick={AddTodo}>생성하기</button>
            
            {todoList.map((value : Contentinterface)=>{
                return <WorkTodo key={value.contentId.toString()} contentId={value.contentId} contents={value.contents} checked={value.checked}></WorkTodo>
            })}
        </div>
    )
}