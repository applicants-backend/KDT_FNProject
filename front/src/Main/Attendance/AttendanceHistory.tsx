import { useEffect, useState } from "react"
import { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"

interface Attendinterface {
    date : string,
    workhour : string
}

export default function AttendanceHistory () {
    
    const {Memberid} = UserDataState(state=>state)
    const [AttendList, setAttendList]= useState([])

    useEffect(()=>{
        const loadData = async () => {
            const Attendres = await axios.get(`${URLstate}/attendance/${Memberid}`)
            const RoadedAttend = Attendres.data
            setAttendList(RoadedAttend)
        }
        loadData()
    },[])




    return (
        <div>
            {AttendList.map((value : Attendinterface)=>{
                return (
                    <div>
                        <div>{value.date}</div>
                        <div>{value.workhour}</div>
                    </div>
                )
            })}
        </div>
    )
}