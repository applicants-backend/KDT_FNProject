import { useEffect, useState } from "react"
import { TodoState, URLstate, UserDataState, WorkState } from "../Store/Store"
import axios from "axios"
import WorkTodo from "./WorkTodo"
import './scss/WorkTodoCon.scss'


interface Contentinterface {
    contentsid : number,
    contents : string,
    checked : string
}

export default function WorkTodoCon () {
    const {Memberid} = UserDataState(state=>state)
    const {URL} = URLstate(state=>state)
    const {todoList,setTodoList} = TodoState(state=>state)
    const {workId,workList,setWorkList} = WorkState(state=>state)

    const [inputTodo,setInputTodo]= useState<string>("")

    const [titleIs, setTitleIs] =useState<boolean>(true)
    const [title,setTitle] = useState<string>()

    const AddTodo = async () => {
        const addTodoRes = await axios.post(`${URL}/work/content/create`,{memberid : Memberid ,contents : inputTodo, workid:workId})
        const addTodo : Contentinterface = addTodoRes.data.data
        console.log(addTodo)
        setTodoList([addTodo,...todoList])
        setInputTodo("");
    }

    const handleKeyDown = (event : React.KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault();
                console.log("Before setInputTodo:", inputTodo);
                AddTodo();
               
                console.log("After setInputTodo:", inputTodo);
            }
    };

    const deleteWork = async() => {
        const deletedWork = await axios.delete(`${URL}/work/board/delete/${workId}`)
        console.log(deletedWork)
        const deletedList = workList.filter((works)=>works.workid !== workId)
        setWorkList(deletedList)
    }
    const EditTitleIs = () => {
        setTitleIs(!titleIs)
    }
    const EditTitle = async () => {
        const EditedTitleRes = await axios.patch(`${URL}/work/board/update`,{workid : workId, title})
        console.log(EditedTitleRes)
        const EditedTitle = EditedTitleRes.data.data.title
        setTitle(EditedTitle)
    }
    const EditKeyDown = (event : React.KeyboardEvent) => {
        event.preventDefault()
        if (event.key === "Enter") {
            EditTitle();
            setTitleIs(true)
        }
    };


    useEffect(()=>{
        const loadTodo = async () => {
            try {
                const loadRes = await axios.get(`${URL}/work/boards/detail/${workId}`);
                const WorkTitle = loadRes.data.data.title
                setTitle(WorkTitle)
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
        <div className="WorkCon">
            <div className="TopCon">
                {titleIs ? <div className="title"> 제목 : {title}</div> : <input type="text" onChange={e=>setTitle(e.target.value)} onKeyUp={EditKeyDown}/> }
                <div>
                    <button type="button" onClick={EditTitleIs} className="edit"></button>
                    <button type="button" onClick={deleteWork} className="delete"></button>
                </div>
            </div>
                <input type="text" value={inputTodo} onChange={e=>setInputTodo(e.target.value)} onKeyPress={e=>handleKeyDown(e)} placeholder="업무를 추가해주세요" className="todoinput"/> 

            <div className="todolistCon">
                {todoList && todoList.map((value : Contentinterface)=>{
                    return <WorkTodo key={value.contentsid?.toString()} contentsid={value.contentsid} contents={value.contents} checked={value.checked}></WorkTodo>
                })}
            </div>

        </div>
    )
}