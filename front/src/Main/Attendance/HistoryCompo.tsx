import axios from "axios"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import { useState } from "react"

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
    const {Memberid, Storeid} = UserDataState(state=>state)
    const {UserType}= UserTypeState(state=>state)

    const [comfirm, setComfirm] = useState<number>(props.confirm)

    const AttendanceComfirm = async (attendid:number) => {
        const ComfirmRes = axios.patch(`${URL}/admin/attendance/confirm`,{attendid,memberid :Memberid, storeid : Storeid,})
        setComfirm(1)
    }

    return (
      <div key={props.attendid}>
        <div>{props.attendid}</div>
        <div>{props.worker}</div>
        <div>{props.gowork}</div>
        <div>{props.leavework}</div>
        <div>{props.wage}</div>
        { UserType === "admin" ? comfirm === 0 ? <button onClick={()=>AttendanceComfirm(props.attendid)}>승인</button> : <div> 승인완료 </div> : <div></div>}
      </div>
    )
}