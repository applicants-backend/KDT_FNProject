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

   const [date,setDate] = useState<string>()
   const [New, setNew] = useState<boolean>(true)



    
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

            setDate(getTimeDifference(props.date)) 
        }
        loadCheckList()
    },[])

    
    function getTimeDifference(dateString: string | null) {
        if (!dateString) {
            throw new Error('Invalid dateString. It cannot be null or undefined.');
        }
        
        const currentDate : any= new Date();
        const targetDate : any = convertStringToDate(dateString);
        
        const timeDifferenceInSeconds = Math.floor((currentDate - targetDate) / 1000);
        
        if (timeDifferenceInSeconds < 60) {
            return `${timeDifferenceInSeconds}초 전`;
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `${minutes}분 전`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `${hours}시간 전`;
        } else {
            setNew(false)
            return `${props.date}`;
        }
    }
    
    function convertStringToDate(dateString: string | null) {
        if (!dateString) {
          throw new Error('Invalid dateString. It cannot be null or undefined.');
        }
      
        const [yearStr, monthStr, dayStr, hourStr, minuteStr] = dateString
          .match(/\d+/g)
          ?.map((part) => part.padStart(2, '0')) || [];
      
        if (!yearStr || !monthStr || !dayStr || !hourStr || !minuteStr) {
          throw new Error('Invalid date format.');
        }
      
        const formattedDateString = `${yearStr}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}`;
        const dateObject = new Date(formattedDateString);
      
        return dateObject;
      }

      

    return (
        <div onClick={(e)=>{enterTodo()}} className="CompoCon">
            <div className="date">{date}</div>
            <div className="title">{props.title}{New ? <div className="New"> New</div> : '' }</div>
            <div className="todo">{checked} / {unchecked}</div>
        </div>
    )
}