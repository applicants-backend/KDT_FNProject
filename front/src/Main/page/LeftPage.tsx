import { useEffect, useState, SyntheticEvent, FC } from "react";
import NaviCon from "../../Navi/NaviBar/NaviCon";
import Profile from "../../Navi/Profile/Profile";
import MainPage from "./MainPage";

import "./scss/LeftPage.scss";
import UserTypeState, { ProfileState } from "../../Store/Store";
import { Link } from "react-router-dom";

export default function LeftPage (): ReturnType<FC>  {

    const {UserType} = UserTypeState(state=>state)
    const {userImg, companyImg } = ProfileState(state=>state)
    const [hambergericon, setHambergericon] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const onClickHambeger = () => {
         setHambergericon(!hambergericon);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (windowWidth > 768) {
            if (hambergericon === true) setHambergericon(false);
        }
    },[windowWidth])

    const defalutImg = (e:SyntheticEvent<HTMLImageElement, Event> | any) => {
        e.currentTarget.src = "https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/defalut_image.png";
    }

  return (

        <div className="left-page-contents">
            {windowWidth > 768 ?
                <div className="container">
                     <h2 className="main-logo">
                        <Link to={"/"}> 
                            <img src="https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/logo_white_small.png" alt="logo"/>
                        </Link>
                    </h2>
                    <Profile />
                    <NaviCon />
                </div>
                :
                windowWidth <= 768 && (
                    <>
                        <div className="container">

                            <h2 className="main-logo">
                                <Link to={"/"}> 
                                    <img src="https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/logo_white_small.png" alt="logo"/>
                                </Link>
                            </h2>
                            <div className="main-icon">
                                <div className="profile-img">
                                    <img src={UserType ==="admin" ? companyImg === null ? "" : companyImg : userImg === null ? "" : userImg } 
                                            alt='profile-image' 
                                            onError={defalutImg}/>
                                </div>
                                <div className="hamberger" onClick={onClickHambeger}>
                                    <img src={"https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/hanberger_icon.png"} alt="icon"/>
                                </div>
                            </div>
                        </div>
                        {hambergericon && <NaviCon />}
                    </>
                )
            }
        </div>
  );
}