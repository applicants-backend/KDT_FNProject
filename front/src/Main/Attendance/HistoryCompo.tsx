import axios from "axios"
import UserTypeState, { URLstate, UserDataState, WorkerListState } from "../../Store/Store"
import { useState } from "react"
import './scss/HistoryCompo.scss'

interface HistoryInterface {
    attendid : number,
    worker : string,
    gowork : string,
    leavework : string,
    wage : string,
    confirm : number
}



export default function HistoryCompo(props : HistoryInterface) {
    const {URL} = URLstate(state=>state)
    const {Memberid,Name} = UserDataState(state=>state)
    const {UserType}= UserTypeState(state=>state)
    const {WorkerList} = WorkerListState(state=>state)

    const [comfirm, setComfirm] = useState<number>(props.confirm)

    const AttendanceComfirm = async (attendid:number) => {
        const ComfirmRes = axios.patch(`${URL}/admin/attendance/confirm`,{attendid,memberid :Memberid, worker : props.worker ,confirm : 1})
        setComfirm(1)
    }

    return (
      <div key={props.attendid} className="HistoryCompo">
        
        {UserType === "admin "?  Object.keys(WorkerList).map((key) => {
          if (key === props.worker) {
            // props.worker와 일치하는 키의 값을 렌더링합니다.
            return <div key={key} className="name">{WorkerList[key]}</div>;
          }
        }): <div className="name">{Name}</div>}
        <div className="gowork">{props.gowork}</div>
        <div className="leavework">{props.leavework}</div>
        <div className="wage">{props.wage}</div>
        { UserType === "admin" ? comfirm === 0 ? <button onClick={()=>AttendanceComfirm(props.attendid)}>승인</button> : <div className="Confirm"> 승인완료 </div> :
          comfirm === 0 ? <div className="UnConfirm">승인예정</div> : <div className="Confirm">승인완료</div>}
      </div>
    )
}