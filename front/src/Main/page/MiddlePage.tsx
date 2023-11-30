import { Navigate, useNavigate } from "react-router"
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Payment from "../Payment/Payment";
import Attendance from "../Attendance/Attendance";
import WorkCon from "../Work/WorkCon";
import CalendarCon from "../Schedule/CalendarCon";
import WorkDetail from "../../WorkDetail/WorkDetail";

export default function MiddlePage () {

    return (
        <>
            <Routes>
                <Route path="/" element={<CalendarCon />} />
                <Route path='/calendar' element={<CalendarCon/>} />
                <Route path='/payment' element={<Payment/>} />
                <Route path='/work' element={<WorkCon/>} />
                <Route path='/workdetail' element={<WorkDetail/>} />
                <Route path='/attendance' element={<Attendance/>} />
            </Routes>
            {/* <Payment/> */}
            {/* <AttendanceCon/> */}
        </>
    )
}