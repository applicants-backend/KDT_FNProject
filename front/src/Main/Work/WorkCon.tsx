import { Key, useEffect, useState } from "react"
import { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"
import WorkCompo from "./WorkCompo"

interface Workdata {
    workid : Key ;
    title : String ; 
    date : String ;
}

export default function WorkCon () {

    const {Storeid} = UserDataState(state=>state)
    
    const [work, setWork] = useState([])

    useEffect(()=>{
        const loadWorks = async () => {
            const workRes = await axios.get(`${URLstate}/work/${Storeid}`)
            const works  = workRes.data
            setWork(works)

        }
        loadWorks()
    },[])



    return (
        <div>
            {work.map((value : Workdata)=>{
                return <WorkCompo key={value.workid} title={value.title} date={value.date}></WorkCompo>
            })}
        </div>
    )
}