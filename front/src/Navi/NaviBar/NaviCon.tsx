import { Link, NavLink } from "react-router-dom";

export default function NaviCon () {

    return (
        <>
            <li>
                <Link to='/calendar'>
                    <button>캘린더</button>
                </Link>
            </li>
            <li>
                <Link to='/work'>
                    <button>근태 관리</button>
                </Link>
            </li>
            <li>
                <Link to='/payment'>
                    <button>급여 관리</button>
                </Link>
            </li>
            
        </>
    )
}