import { useNavigate } from "react-router";
import NaviCompo from "./NaviCompo"

export default function NaviCon () {

    const navigate =useNavigate();
    const handleCalendar = () => {
        // 회원가입 버튼 클릭 시에 '/register' 페이지로 이동
        navigate('/calendar');
    };
    const handleWork = () => {
        // 회원가입 버튼 클릭 시에 '/register' 페이지로 이동
        navigate('/work');
    };
    const handlePayment = () => {
        // 회원가입 버튼 클릭 시에 '/register' 페이지로 이동
        navigate('/payment');
    };
    

    return (
        <>
            <div>네비게이션.</div>
            <button type="button" onClick={handleCalendar}>캘린더</button>
            <button type="button" onClick={handleWork}>근태 관리</button>
            <button type="button" onClick={handlePayment}>급여 관리</button>
        </>
    )
    // return (
    //     <div>
    //         <NaviCompo name="업무" root="work"></NaviCompo>
    //         <NaviCompo name="근태" root="attendance"></NaviCompo>
    //         <NaviCompo name="급여" root="payment"></NaviCompo>
    //     </div>
    // )
}