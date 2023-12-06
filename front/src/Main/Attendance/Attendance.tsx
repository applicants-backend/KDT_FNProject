import AttendanceCon from "./AttendanceCon";
import AttendanceData from "./AttendanceData";
import AttendanceHistory from "./AttendanceHistory";
import "./scss/Attendance.scss"
export default function Attendance() {
    return (
        <div className="Attendance">
            <AttendanceCon/>
            <div className="AttendanceListAndData">
            <AttendanceHistory/>
            <AttendanceData/>
            </div>
        </div>
    )
}