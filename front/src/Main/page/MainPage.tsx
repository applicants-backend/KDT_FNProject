import { Navigate, useNavigate } from "react-router"
import Scheduler from "../Schedule/Scheduler"
import NaviCon from "../../Navi/NaviBar/NaviCon";

export default function MainPage () {

    return (
        <>
            <div>메인페이지입니다.</div>
            <NaviCon />
        </>
    )
}