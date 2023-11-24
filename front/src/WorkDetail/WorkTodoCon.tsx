import { useEffect, useState } from "react"
import { TodoState, URLstate, UserDataState, WorkState } from "../Store/Store"
import axios from "axios"
import WorkTodo from "./WorkTodo"


interface Contentinterface {
    contentsid : BigInt,
    contents : string,
    checked : string
}

export default function WorkTodoCon () {
    const {Memberid} = UserDataState(state=>state)
    const {URL} = URLstate(state=>state)
    const {todoList,setTodoList} = TodoState(state=>state)
    const {workId} = WorkState(state=>state)

    const [inputTodo,setInputTodo]= useState<string>()

    const AddTodo = async () => {
        const addTodoRes = await axios.post(`${URL}/work/content/create`,{memberid : Memberid ,contents : inputTodo, workid:workId})
        const addTodo : Contentinterface = addTodoRes.data.data
        console.log(addTodo)
        setTodoList([addTodo,...todoList])
    }

    const handleKeyDown = (event : React.KeyboardEvent) => {
        if (event.key === "Enter") {
            AddTodo();
        }
    };
    const deleteWork = async() => {
        const deletedWork = await axios.delete(`${URL}/work/board/delete/${workId}`)
        console.log(deletedWork)
    }


    useEffect(()=>{
        const loadTodo = async () => {
            try {
                const loadRes = await axios.get(`${URL}/work/boards/detail/${workId}`);
                const loadedContents : Contentinterface[] = loadRes.data.data.contents;
    
                if (loadedContents && Array.isArray(loadedContents)) {
                    setTodoList(loadedContents);
                    console.log(loadedContents)
                } 
            } catch (error) {
                // 오류 처리
                console.error("Error loading contents:", error);
            }
        }
        loadTodo();
    },[workId])



    return (
        <div>
            <button type="button" onClick={deleteWork}>글 삭제</button>
            <input type="text" onChange={e=>setInputTodo(e.target.value)} onKeyDown={handleKeyDown}/> 
            <button type="button" onClick={AddTodo}>생성하기</button>
            
            {todoList && todoList.map((value : Contentinterface)=>{
                return <WorkTodo key={value.contentsid?.toString()} contentsid={value.contentsid} contents={value.contents} checked={value.checked}></WorkTodo>
            })}
        </div>
    )
}