import { Link } from "react-router-dom";
import LeftPage from "./LeftPage";
import MiddlePage from "./MiddlePage";
import RightPage from "./RightPage";
import "./scss/main.scss"
import { useState } from "react";


export default function MainPage () {
    const [showSideMenu, setShowSideMenu] = useState(false);
    return (
        <>  
            <div className="MainWrap">
            <div className="LeftPage">
            <LeftPage/>
            </div>
            <div className="MiddlePage">
            <MiddlePage/>
            </div>
            </div>
        </>
    )
}