import { useEffect, useState } from "react"
import { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"

interface Datainterface {
    thisweek : string,
    thismonth : string,
    comparemonth : string,

}

export default function AttendanceCon () {
    const {URL} = URLstate(state=>state)
    const {Memberid} = UserDataState(state=>state)
    const [AttendData, setAttendData] = useState<Datainterface>()
    const [Color,setColor] = useState(true)

    useEffect(()=>{
        const loadData = async () =>{
            const AttenddataRes = await axios.get(`${URL}/attendance/data/${Memberid}`)
            const AttendDatares = AttenddataRes.data
            setAttendData(AttendDatares)
            if (AttendData?.comparemonth.includes('-')){
                setColor(false)
            }
        }
        loadData()
    },[])


    return (
        <div>
            <div>
                이번주 일한 시간
                <div>{AttendData?.thisweek}</div>
            </div>          
            <div>
                이번달 일한 시간
                <div>{AttendData?.thismonth}</div>
            </div> 
            <div>지난 달에 비해 얼마나 더 일했지?</div>
            <div>
                <div>{AttendData?.comparemonth}</div>
                <div color={Color ? "green" : "red"}>{Color ? "늘었어요!" : "줄었어요!"}</div>
            </div> 
        </div>
    )
}