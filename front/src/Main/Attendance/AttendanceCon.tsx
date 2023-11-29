import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"

interface Valueinterface{
    memberid : string,
    name : string
}

export default function AttendanceCon () {
    const {URL} = URLstate(state=>state)
    const {Memberid,Storeid} = UserDataState(state=>state)
    const {UserType} = UserTypeState(state=>state)

    const [name,setName] = useState<Valueinterface[]>([])

    const [AttendWeek, setAttendWeek] = useState<number>()
    const [AttendMonth, setAttendMonth] = useState<number>()
    const [AttendPercent, setAttendPercent] = useState<number>()
    const [workerid, setWorkerid] = useState<string>("kdt9")

    const [Color,setColor] = useState(true)

    useEffect(()=>{
        const loadData = async () =>{
            const AttendweekRes = await axios.get(UserType === 'admin' ? `${URL}/admin/attendance/week/${Memberid}/${Storeid}/${workerid}` : `${URL}/user/attendance/week/${Memberid}/${Storeid}` )
            setAttendWeek(AttendweekRes.data.data)
            
            const AttendMonthRes = await axios.get(UserType === 'admin' ? `${URL}/admin/attendance/month/${Memberid}/${Storeid}/${workerid}` : `${URL}/user/attendance/month/${Memberid}/${Storeid}` )
            setAttendMonth(AttendMonthRes.data.data)

            const AttendPercentRes = await axios.get(UserType === 'admin' ? `${URL}/admin/attendance/percent/${Memberid}/${Storeid}/${workerid}` : `${URL}/user/attendance/percent/${Memberid}/${Storeid}` )
            setAttendPercent(AttendPercentRes.data.data)

            if (AttendPercentRes.data.data < 0){
                setColor(false)
            }
        }
        loadData()
    },[name])


    return (
      UserType === 'user' ? (
        <div>
            <div>
                이번주 일한 시간
                <div>{AttendWeek}</div>
            </div>          
            <div>
                이번달 일한 시간
                <div>{AttendMonth}</div>
            </div> 
            <div>지난 달에 비해 얼마나 더 일했지?</div>
            <div>
                <div>{AttendPercent}</div>
                <div style={{color : Color ? "green" : "red"}}> {Color ? "늘었어요!" : "줄었어요!"}</div>
            </div> 
        </div>
      ) : (
        <div>
            <select>
            {name && name.map((value : Valueinterface)=>{
                return <option key={value.memberid} value={value.memberid}>{value.name}</option>
            })}
            </select>
            <div>
                이번주 일한 시간
                <div>{AttendWeek}</div>
            </div>          
            <div>
                이번달 일한 시간
                <div>{AttendMonth}</div>
            </div> 
            <div>지난 달에 비해 얼마나 더 일했지?</div>
            <div>
                <div>{AttendPercent}</div>
                <div style={{color : Color ? "green" : "red"}}> {Color ? "늘었어요!" : "줄었어요!"}</div>
            </div> 
        </div>
      )
    )
}