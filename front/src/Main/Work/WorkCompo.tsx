import { WorkState } from "../../Store/Store";
import { useNavigate } from "react-router";

interface Workdata {
    workid : BigInt ;
    title : string ; 
    date : string ;
}

export default function WorkCompo (props : Workdata) {
   const {setWorkId} = WorkState(state=>state)
    
   const navigate = useNavigate();
    const enterTodo = () => {
        setWorkId(props.workid)
        navigate('/workdetail')
        console.log(props.workid)
    }

    return (
        <div onClick={(e)=>{enterTodo()}}>
            <div>{props.date}</div>
            <div>{props.title}</div>
        </div>
    )
}