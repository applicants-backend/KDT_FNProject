import { WorkState } from "../../Store/Store";

interface Workdata {
    workid : BigInt ;
    title : String ; 
    date : String ;
}

export default function WorkCompo (props : Workdata) {
   const {setWorkId} = WorkState(state=>state)
    
    const enterTodo = () => { 
        setWorkId(props.workid)
    }

    return (
        <div onClick={(e)=>{enterTodo()}}>
            <div>{props.date}</div>
            <div>{props.title}</div>
        </div>
    )
}