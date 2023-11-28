import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"
import UserTypeState from "../../Store/Store"

export default function AttendanceCon () {
    const {UserType} = UserTypeState(state=>state)
    const {URL} = URLstate(state=>state)
    
    const {Memberid,Storeid} = UserDataState(state=>state)
    const {UserType} = UserTypeState(state=>state)

    const [AttendWeek, setAttendWeek] = useState()
    const [AttendMonth, setAttendMonth] = useState()
    const [AttendPercent, setAttendPercent] = useState()
    const [Color,setColor] = useState(true)

    useEffect(()=>{
        const loadData = async () =>{
            const AttendweekRes = await axios.get(UserType === 'admin' ? `${URL}/user/attendance/week/${Memberid}/${Storeid}` : `${URL}/user/attendance/week/${Memberid}/${Storeid}` )
            setAttendWeek(AttendweekRes.data.data)
            
            const AttendMonthRes = await axios.get(UserType === 'admin' ? `${URL}/user/attendance/month/${Memberid}/${Storeid}` : `${URL}/user/attendance/month/${Memberid}/${Storeid}` )
            setAttendMonth(AttendMonthRes.data.data)

            const AttendPercentRes = await axios.get(UserType === 'admin' ? `${URL}/user/attendance/percent/${Memberid}/${Storeid}` : `${URL}/user/attendance/percent/${Memberid}/${Storeid}` )
            setAttendPercent(AttendPercentRes.data.data)

            if (AttendPercentRes.data.data< 0){
                setColor(false)
            }
            adminLoadData()
        } else {
            const userLoadData = async () =>{
                const AttenddataRes = await axios.get(`${URL}/attendance/data/${Memberid}`)
                const AttendDatares = AttenddataRes.data
                setAttendData(AttendDatares)
                if (AttendData?.comparemonth.includes('-')){
                    setColor(false)
                }
            }
            userLoadData()
        }
        loadData()
    })

    return (
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
    )
}