
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
                    <div style={location.pathname === "/calendar" ? activeStyle : {}}>캘린더</div>
                </Link>
                <Link to='/work'>
                    <div style={location.pathname === "/work" ? activeStyle: {}}>업무 관리</div>
                </Link>
                <Link to='/payment'>
                    <div style={location.pathname === "/payment" ? activeStyle: {}}>급여 관리</div>
                </Link>
                <Link to='/attendance'>
                    <div style={location.pathname === "/attendance" ? activeStyle : {}}>근태 관리</div>
                </Link>
            </div>
        </>
    )
}