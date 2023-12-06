
import { FC } from "react";
import { Link, NavLink, Location,  } from "react-router-dom";

import "./scss/NaviCon.scss"


const activeStyle = {
    fontWeight:"bold",
    textDecoration : "underline"
}

interface NaviConProps {
    location :Location
}

export default function NaviCon ( { location } :NaviConProps):ReturnType<FC> {

   

    return (
        <>     
            <div className="navicon">
                <Link to='/calendar'>
                    <div className="navicon-1">
                    <span className="material-symbols-outlined">calendar_month</span>
                    <div style={location.pathname === "/calendar" ? activeStyle : {}}>캘린더</div>
                    </div>
                </Link>
                <Link to='/work'>
                <div className="navicon-1">
                <span className="material-symbols-outlined">event_list</span>
    
                    <div style={location.pathname === "/work" ? activeStyle: {}}>업무 관리</div>
                </div>
                </Link>
                <Link to='/payment'>
                <div className="navicon-1">
                <span className="material-symbols-outlined">database</span>
                    <div style={location.pathname === "/payment" ? activeStyle: {}}>급여 관리</div>
                </div>
                </Link>
                <Link to='/attendance'>
                <div className="navicon-1">
                <span className="material-symbols-outlined">work_history</span>
                    <div style={location.pathname === "/attendance" ? activeStyle : {}}>근태 관리</div>
                </div>
                </Link>
            </div>
        </>
    )
}