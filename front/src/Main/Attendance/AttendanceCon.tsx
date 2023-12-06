import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState, WorkerListState } from "../../Store/Store"
import axios from "axios"


export default function AttendanceCon () {
    const {URL} = URLstate(state=>state)
    const {Memberid,Storeid} = UserDataState(state=>state)
    const {UserType} = UserTypeState(state=>state)

    const [AttendWeek, setAttendWeek] = useState<number>()
    const [AttendMonth, setAttendMonth] = useState<number>(0)
    const [AttendPercent, setAttendPercent] = useState<number>()

    const [Color,setColor] = useState(true)

    const {WorkerList}=WorkerListState(state=>state)
    const [workerid, setWorkerid]= useState(Object.keys(WorkerList)[0])

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
            console.log(workerid)
        }
        loadData()
    },[workerid])


    return (
      UserType === 'user' ? (
        <div className="AttendanceConUser">
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
                <div style={{color : Color ? "#45a049" : "rgb(219, 112, 147)"}}>{AttendPercent}%</div>
                <div style={{color : Color ? "#45a049" : "rgb(219, 112, 147)"}}> {Color ? "늘었어요!" : "줄었어요!"}</div>
            </div> 
        </div>
      ) : (
        <div>
            <div className="select-wrapper">
                <select className="custom-select" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWorkerid(e.target.value)}>
                {Object.entries(WorkerList).map(([key, value]: [string, string]) => (
                    <option key={key} value={key}>
                    {value}
                    </option>
                ))}
                </select>
                <div className="custom-select-arrow">▼</div>
            </div>
           <div className="AttendanceConAdmin">
            <div>
                이번주 총 출근시간
                <div>{AttendWeek}</div>
            </div>          
            <div>
                이번달 총 출근시간
                <div>{AttendMonth}</div>
            </div> 
            
                <div>지난 달에 비해 얼마나 더 일했지?
                <div>
                <div style={{color : Color ? "#45a049" : "rgb(219, 112, 147)"}}>{AttendPercent}%</div>
                <div style={{color : Color ? "green" : "red"}}> {Color ? "늘었어요!" : "줄었어요!"}</div>
                </div> 
            </div>
            </div>
        </div>
      )
    )
}