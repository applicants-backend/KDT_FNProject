import axios from "axios"
import { TodoState, URLstate } from "../Store/Store"

interface Contentinterface {
  contentId : BigInt,
  contents : string,
  checked : string
}

export default function WorkTodo (props : Contentinterface) {

  const {todoList,setTodoList} = TodoState(state=>state)


  const DeleteTodo = async () => {
    const deleteRes = await axios.delete(`/${URLstate}/todo/delete/${props.contentId}`)
    const deletedList = todoList.filter((todo : Contentinterface) => todo.contentId !== props.contentId)
    setTodoList(deletedList)

  }

  return (
    <div className="todo-item">
    <input type = "checkbox" checked={props.checked.trim() ? false : true} onChange={} onClick={}/>
    <input readOnly={} value={props.contents} 
    onClick={} onChange={} onKeyDown={} />
    <button onClick={DeleteTodo}>delete</button>
</div>
  )
}