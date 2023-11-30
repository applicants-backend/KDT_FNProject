import { Link, NavLink } from "react-router-dom";

import "./scss/NaviCon.scss"

export default function NaviCon () {

    return (
        <>     
            <div className="navicon">
                <Link to='/calendar'>
                    <div>캘린더</div>
                </Link>
                <Link to='/work'>
                    <div>업무 관리</div>
                </Link>
                <Link to='/payment'>
                    <div>급여 관리</div>
                </Link>
                <Link to='/attendance'>
                    <div>근태 관리</div>
                </Link>
            </div>
        </>
    )
}