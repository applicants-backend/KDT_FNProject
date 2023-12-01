import { Navigate, useNavigate } from "react-router"
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Payment from "../Payment/Payment";
import Attendance from "../Attendance/Attendance";
import CalendarCon from "../Schedule/CalendarCon";
import WorkDetail from "../../WorkDetail/WorkDetail";
import Error from '../../404/Error'
import HomeSchedule from "../Home/HomeSchedule";
import Work from "../Work/Work";

export default function MiddlePage () {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomeSchedule />} />
                <Route path='/calendar' element={<CalendarCon/>} />
                <Route path='/payment' element={<Payment/>} />
                <Route path='/work' element={<Work/>} />
                <Route path='/workdetail' element={<WorkDetail/>} />
                <Route path='/attendance' element={<Attendance/>} />
                <Route path='*'  element={<Error/>} />
            </Routes>
            {/* <Payment/> */}
            {/* <AttendanceCon/> */}
        </>
    )
}