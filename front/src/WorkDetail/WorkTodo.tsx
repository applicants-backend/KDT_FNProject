import axios from "axios"
import { TodoState, URLstate, UserDataState } from "../Store/Store"
import React, { useState } from "react"
import './scss/WorkTodo.scss'
interface Contentinterface {
  contentsid : number,
  contents : string,
  checked : string
}

export default function WorkTodo (props : Contentinterface) {
  const {URL} = URLstate(state=>state)
  const {todoList,setTodoList} = TodoState(state=>state)
  const {Name,Memberid} = UserDataState(state=>state)

  const [checked, setChecked] = useState<boolean>(props.checked && props.checked.trim() !== '' ?  true : false);
  const [CheckMsg,setCheckMsg] = useState(props.checked)
  const [readOnly, setReadOnly] =useState<boolean>(true)
  const [content, setContent] =useState<string>("")

  const TodoReadOnly = () => {
    setContent(props.contents)
    setReadOnly(!readOnly)
  }

  const editTodo = async() => {
    const editTodo = await axios.patch(`${URL}/work/content/update`,{contentsid : props.contentsid ,contents : content})
    console.log(editTodo)
  }

  const handleKeyDown = (event : React.KeyboardEvent) => {
    if (event.key === "Enter") {
      editTodo();
  }}

  const editChecked = async () => {
    const editcheck = checked ? "" : Name
    setCheckMsg(checked ? "" : Name)
    const editchecked = await axios.patch(`${URL}/work/content/checked`,{memberid : Memberid, contentsid : props.contentsid ,checked : editcheck })
    console.log(editchecked)
  }

  const DeleteTodo = async () => {
    const deleteRes = await axios.delete(`${URL}/work/content/delete/${props.contentsid}`)
    const deletedList : Contentinterface[] = todoList.filter((todo : Contentinterface) => todo.contentsid !== props.contentsid)
    setTodoList(deletedList)
  }


  return (
    <div className="WorkTodoCon">
      <input type = "checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)} onClick={editChecked} className="checkbox"/>
      <div className="inputCon">
        <input readOnly={readOnly} value={readOnly ? props.contents : content} 
        onClick={TodoReadOnly} onChange={e=>setContent(e.target.value)} onKeyDown={handleKeyDown} className="content" style={checked ? {textDecoration :"line-through"} : {textDecoration:"none"}} />
        {CheckMsg? <div className="CheckName">{CheckMsg}님이 체크하셨습니다.</div> : <div></div>}
      </div>
      <button onClick={DeleteTodo} className="delete"></button>
  </div>
  )
}