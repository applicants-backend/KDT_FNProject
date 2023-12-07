import { useEffect, useState, SyntheticEvent, FC } from "react";
import NaviCon from "../../Navi/NaviBar/NaviCon";
import Profile from "../../Navi/Profile/Profile";

import "./scss/LeftPage.scss";
import UserTypeState, { ProfileState } from "../../Store/Store";

import { Link, useLocation } from "react-router-dom";


import ReactModal from "react-modal"
import ProfileModal from "../../Navi/Profile/ProfileModal"
import customModalStyles from "../../Navi/Profile/scss/Modal"

import {Cookies} from 'react-cookie';


export default function LeftPage (): ReturnType<FC>  {

    const {UserType} = UserTypeState(state=>state)
    const {userImg, companyImg } = ProfileState(state=>state)
    const [hambergericon, setHambergericon] = useState(false);

    
    const [modalOpenis, setmodalOpenis] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    let location = useLocation();


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

    useEffect(() => {
        
        setHambergericon(false);
    },[location])

    const defalutImg = (e:SyntheticEvent<HTMLImageElement, Event> | any) => {
        e.currentTarget.src = "https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/defalut_image.png";
    }

    const logout = () => {
        
        if (!window.confirm("로그 아웃 하시겠습니까?")) return;
        const cookies = new Cookies();
        cookies.remove("token");
        window.location.reload();
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


                    <Profile logout={() => logout()} setmodalOpenis={(pros) => setmodalOpenis(pros)}/>

                    <NaviCon location = {location}/>
                    
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
                            <div className="main-header-icon">
                        
                                <div className="logout-icon" onClick={() => {if (logout) logout()}}>
                                    <div className="material-symbols-outlined" style={{margin:"auto"}}>
                                        logout
                                    </div>
                                </div>
                                
                                <div className="profile-img" onClick={() => setmodalOpenis(true)}>
                                    <img src={UserType ==="admin" ? companyImg === null ? "" : companyImg : userImg === null ? "" : userImg } 
                                            alt='profile-image' 
                                            onError={defalutImg}/>
                                </div>
                              
                                <div className="hamberger" onClick={onClickHambeger}>
                                    <img src={"https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/hanberger_icon.png"} alt="icon"/>
                                </div>
                            </div>
                        </div>
                        {hambergericon && <NaviCon location = {location}/>}
                    </>
                )
            }

            <ReactModal
                    ///// modal 설정
                    isOpen={modalOpenis}
                    onRequestClose={()=> setmodalOpenis(false)}
                    overlayClassName= "profile-modal"
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={true}
                    style={customModalStyles}
                >
                <div className="profile-back material-symbols-outlined" onClick={() =>setmodalOpenis(false)}>close</div>

                 <ProfileModal></ProfileModal>
            </ReactModal>  

        </div>
  );
}