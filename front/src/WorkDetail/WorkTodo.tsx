import axios from "axios"
import { TodoState, URLstate, UserDataState } from "../Store/Store"
import React, { useState } from "react"
interface Contentinterface {
  contentId : BigInt,
  contents : string,
  checked : string
}

export default function WorkTodo (props : Contentinterface) {

  const {todoList,setTodoList} = TodoState(state=>state)
  const {Name} = UserDataState(state=>state)

  const [checked,setChecked] = useState<boolean>(props.checked.trim() ? false : true )
  const [CheckMsg,setCheckMsg] = useState(props.checked)
  const [readOnly, setReadOnly] =useState<boolean>(true)
  const [content, setContent] =useState<string>("")

  const TodoReadOnly = () => {
    setContent(props.contents)
    setReadOnly(!readOnly)
  }

  const editTodo = async() => {
    const editTodo = await axios.patch(`${URLstate}/todo/edit/content/${props.contentId}`,{contentId : props.contentId ,contents : content})
  }

  const handleKeyDown = (event : React.KeyboardEvent) => {
    if (event.key === "Enter") {
      editTodo();
  }}

  const editChecked = async () => {
    const editcheck = checked ? "" : Name
    setCheckMsg(checked ? "" : Name)
    const editchecked = await axios.patch(`${URLstate}/todo/edit/check/${props.contentId}`,{contentId : props.contentId ,checked : editcheck })
  }

  const DeleteTodo = async () => {
    const deleteRes = await axios.delete(`/${URLstate}/todo/delete/${props.contentId}`)
    const deletedList : Contentinterface[] = todoList.filter((todo : Contentinterface) => todo.contentId !== props.contentId)
    setTodoList(deletedList)
  }


  return (
    <div>
    <input type = "checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)} onClick={editChecked}/>
    <div>{CheckMsg}</div>
    <input readOnly={readOnly} value={readOnly ? props.contents : content} 
    onClick={TodoReadOnly} onChange={e=>setContent(e.target.value)} onKeyDown={handleKeyDown} />
    <button onClick={DeleteTodo}>delete</button>
</div>
  )
}