import { useEffect, useState } from "react"
import { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"

interface Datainterface {
   thismonth : string

}

export default function AttendanceData () {

    // const {URL} = URLstate(state=>state)
    // const [AttendData, setAttendData] = useState<Datainterface>()
    // const {Memberid} = UserDataState(state=>state)

    // useEffect(()=>{
    //     const loadData = async () =>{
    //         const AttenddataRes = await axios.get(`${URL}/attendance/chart/${Memberid}`)
    //         const AttendDatares = AttenddataRes.data
    //         setAttendData(AttendDatares)
    //     }
    //     loadData()
    // },[])

    return (
        <div>
            
        </div>
    )
}