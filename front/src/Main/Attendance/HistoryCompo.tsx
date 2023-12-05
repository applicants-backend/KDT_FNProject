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

    function formatDateString(inputDateString : string) {
      const date = new Date(inputDateString);
      
      const year = String(date.getFullYear()).substring(2);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
  
      return `${year}- ${month}-${day} ${hours}:${minutes}`;
    }

    return (
      <div key={props.attendid} className="HistoryCompo">
        
        {UserType === "admin "?  Object.keys(WorkerList).map((key) => {
          if (key === props.worker) {
            // props.worker와 일치하는 키의 값을 렌더링합니다.
            return <div key={key} className="name">{WorkerList[key]}</div>;
          }
        }): <div className="name">{Name}</div>}
        <div className="gowork">{formatDateString(props.gowork) }</div>
        <div className="leavework">{formatDateString(props.leavework)}</div>
        <div className="wage">{props.wage}</div>
        { UserType === "admin" ? props.gowork && props.leavework ? comfirm === 0 ? <button onClick={()=>AttendanceComfirm(props.attendid)}>승인</button> : <div className="Confirm"> 승인완료</div>:
        <div className="unAttendace"> 승인불가</div> :
          comfirm === 0 ? <div className="unConfirm">승인예정</div> : <div className="Confirm">승인완료</div>}
      </div>
    )
}