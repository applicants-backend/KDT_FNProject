import AttendanceCon from "./AttendanceCon";
import AttendanceData from "./AttendanceData";
import AttendanceHistory from "./AttendanceHistory";
import "./scss/Attendance.scss"
export default function Attendance() {
    return (
        <div>

        <AttendanceCon/>
        <div className="attend_container">
            <div className="attend_history">
                <div className="attend_history_wrap"><AttendanceHistory/></div>
                </div>
            <div className="attend_data">
                <div className="attend_data_wrap"><AttendanceData/></div>
                </div>
        </div>
           
        </div>
    )
}