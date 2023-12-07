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
            console.log(AttendweekRes)
            
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
        <div className="AttendanceCon">
            <div>
                <div className="category">
                <div className="material-symbols-outlined icon">schedule</div>
                <div className="categoryName">이번주 일한 시간</div>
                </div>
                <div className="data">{AttendWeek} h</div>
            </div>

            <div>
                <div className="category">
                    <div className="material-symbols-outlined icon">calendar_clock</div>
                    <div className="categoryName">이번달 일한 시간</div>
                </div>
                <div className="data">{AttendMonth} h</div>
            </div> 
           
            <div className="category">
                <div className="material-symbols-outlined icon">more_time</div>
                <div className="categoryName">지난 달에 비해 </div>
                <div className="datatext">얼마나 더 일했지?</div>
            </div>

            {Color ? (
            <div className="category">
                <div className="material-symbols-outlined icon" style={{color : "#45a049"}}>trending_up</div>
                <div className="data" style={{color : "#45a049"}}>{AttendPercent} %</div>
                <div className="data" style={{color : "#45a049" }}>늘었어요!</div>
            </div>
            ): 
            (<div>
                <div className="material-symbols-outlined icon" style={{color : "rgb(219, 112, 147)"}}>trending_down</div>
                <div className="data" style={{color : "rgb(219, 112, 147)"}}>{AttendPercent} %</div>
                <div className="data" style={{color : "rgb(219, 112, 147)" }}>줄었어요!</div>
            </div>)}

            <div className="RowBox">
                <div className="row">
                    <div className="category">
                        <div className="material-symbols-outlined icon">gavel</div>
                        <div className="categoryName">법정근로시간</div>
                    </div>
                    <div className="data">{AttendWeek} h / 52 h</div>
                </div> 

                <div className="row">
                    <div className="category">
                        <div className="categoryName info">  
                            <div>①연장+휴일근로 포함 월~일요일 1주 총 근로시간 최대 52시간 초과 금지</div>
                            <div>②하루 8시간을 초과하는 근로시간 설정 불가(법정근로: 1주 40시간)</div>
                            <div>③사업장-근로자 간 합의된 경우에만 1주 근로시간을 12시간 한도로 연장 가능</div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="RowBox">
                <div className="row">
                    <div className="category">
                        <div className="material-symbols-outlined icon">local_cafe</div>
                        <div className="categoryName">법정휴게시간</div>
                    </div>
                    <div className="data">{AttendWeek} h</div>
                </div> 

                <div className="row">
                    <div className="category">
                        <div className="categoryName info">  
                            <div>①연장+휴일근로 포함 월~일요일 1주 총 근로시간 최대 52시간 초과 금지</div>
                            <div>②하루 8시간을 초과하는 근로시간 설정 불가(법정근로: 1주 40시간)</div>
                            <div>③사업장-근로자 간 합의된 경우에만 1주 근로시간을 12시간 한도로 연장 가능</div>
                        </div>
                    </div>
                </div> 
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

           <div className="AttendanceCon">
           <div>
                <div className="category">
                <div className="material-symbols-outlined icon">schedule</div>
                <div className="categoryName">이번주 일한 시간</div>
                </div>
                <div className="data">{AttendWeek} h</div>
            </div>

            <div>
                <div className="category">
                    <div className="material-symbols-outlined icon">calendar_clock</div>
                    <div className="categoryName">이번달 일한 시간</div>
                </div>
                <div className="data">{AttendMonth} h</div>
            </div> 
           
            <div className="category">
                <div className="material-symbols-outlined icon">more_time</div>
                <div className="categoryName">지난 달에 비해 </div>
                <div className="datatext">얼마나 더 일했지?</div>
            </div>

                {Color ? (
                <div className="category">
                    <div className="material-symbols-outlined icon" style={{color : "#45a049"}}>trending_up</div>
                    <div className="data" style={{color : "#45a049"}}>{AttendPercent} %</div>
                    <div className="data" style={{color : "#45a049" }}>늘었어요!</div>
                </div>
                ): 
                (<div>
                    <div className="material-symbols-outlined icon" style={{color : "rgb(219, 112, 147)"}}>trending_down</div>
                    <div className="data" style={{color : "rgb(219, 112, 147)"}}>{AttendPercent} %</div>
                    <div className="data" style={{color : "rgb(219, 112, 147)" }}>줄었어요!</div>
                </div>)}

                <div className="RowBox">
                    <div className="row">
                        <div className="category">
                            <div className="material-symbols-outlined icon">gavel</div>
                            <div className="categoryName">법정근로시간</div>
                        </div>
                        <div className="data">{AttendWeek} h / 52 h</div>
                    </div> 

                    <div className="row">
                        <div className="category">
                            <div className="categoryName info">  
                                <div>①연장+휴일근로 포함 월~일요일 1주 총 근로시간 최대 52시간 초과 금지</div>
                                <div>②하루 8시간을 초과하는 근로시간 설정 불가(법정근로: 1주 40시간)</div>
                                <div>③사업장-근로자 간 합의된 경우에만 1주 근로시간을 12시간 한도로 연장 가능</div>
                            </div>
                        </div>
                    </div> 
                </div>

                <div className="RowBox">
                <div className="row">
                    <div className="category">
                        <div className="material-symbols-outlined icon">local_cafe</div>
                        <div className="categoryName">법정휴게시간</div>
                    </div>
                    <div className="data">{AttendWeek && AttendWeek/8} h</div>
                </div> 

                <div className="row">
                    <div className="category">
                        <div className="categoryName info">  
                            <div>①사용자는 근로시간이 4시간인 경우에는 30분 이상, 8시간인 경우에는 1시간 이상의 휴게시간을 근로시간 도중에 주어야 한다. </div>
                            <div>②휴게시간은 근로자가 자유롭게 이용할 수 있다.</div>
                        </div>
                    </div>
                </div> 
            </div>
            </div>

        </div>
      )
    )
}