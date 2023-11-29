import { Navigate, useNavigate } from "react-router"
import Scheduler from "../Schedule/Scheduler"
import NaviCon from "../../Navi/NaviBar/NaviCon";
import CalendarCon from "../Schedule/CalendarCon";
import WorkDetail from "../../WorkDetail/WorkDetail";
import PaymentCon from "../Payment/PaymentCon";
import AttendanceCon from "../Attendance/AttendanceCon";
import WorkCon from "../Work/WorkCon";

export default function MiddlePage () {

    return (
        <>
            <CalendarCon/>
            {/* <Payment/> */}
            {/* <AttendanceCon/> */}
        </>
    )
}