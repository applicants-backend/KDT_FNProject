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
            <div className="main-wrap">
                <div className="left-page">
                    <LeftPage/>
                </div>
                <div className="middle-page">
                    <MiddlePage/>
                </div>
            </div>
        </>
    )
}