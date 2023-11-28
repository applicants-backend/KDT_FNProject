import AttendanceCon from "./AttendanceCon";
import AttendanceData from "./AttendanceData";
import AttendanceHistory from "./AttendanceHistory";

export default function Attendance() {
    return (
        <div>
           <AttendanceCon/>
           <AttendanceHistory/>
           <AttendanceData/> 
        </div>
    )
}