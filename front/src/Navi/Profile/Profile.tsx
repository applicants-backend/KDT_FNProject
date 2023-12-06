import { useEffect, useState, SyntheticEvent,FC } from "react"
import UserTypeState, { ProfileState, URLstate, UserDataState, WorkerListState } from "../../Store/Store"
import axios from "axios"
import "./scss/Profile.scss"

import ReactModal from "react-modal"
import inviteModalStyles from './scss/InviteModal';

interface profileProps {
    setmodalOpenis?:React.Dispatch<React.SetStateAction<boolean>>;
    logout? : Function
}

export default function Profile ({setmodalOpenis, logout}:profileProps):ReturnType<FC> {

    const {URL} = URLstate(state=>state)
    const {UserType} = UserTypeState(state=>state)
    const {Memberid, Token, Storeid, setToken, setName} = UserDataState(state=>state)
    const {userImg,companyImg,name,phonenumber,companyNumber,companyName, setuserImg, setcompanyImg, setname, setphonenumber, setcompanyName, setcompanyNumber} = ProfileState(state=>state)
    const {setWorkList,WorkerList} = WorkerListState(state=>state)

    const [inviteModal, setInviteModal] = useState<boolean>(false);

    useEffect(()=> {
        const loadUserData = async () => {
            const UserRes = await axios.post(`${URL}/detail`,{memberid :Memberid})
            const Userprofile = UserRes.data.data.member
            const Storeprofile = UserRes.data.data.store

            setuserImg(Userprofile.memberimg)
            setname(Userprofile.name)
            setName(Userprofile.name)
            setphonenumber(Userprofile.phonenumber)

            setcompanyName(Storeprofile.companyname)
            setcompanyNumber(Storeprofile.companynumber)
            setcompanyImg(Storeprofile.companyimg)
            setToken(Storeprofile.invitecode)
            console.log(UserRes)
            if(UserType === 'admin'){
                const WorkerListRes = await axios.get(`${URL}/admin/attendance/workerlist/${Memberid}/${Storeid}`)
                setWorkList(WorkerListRes.data.data)
                console.log(WorkerList)
            }     
        }
        loadUserData()
    },[Memberid,URL,companyImg])

  

    const editProfle = () => {

        if (setmodalOpenis) setmodalOpenis(true)
    }

    const CodeGenerater = async () => {
        const CodeRes = await axios.post(`${URL}/generate`,{companynumber : companyNumber})
        const Code = CodeRes.data
        setToken(Code)
        console.log(Code)
    }


    const defalutImg = (e:SyntheticEvent<HTMLImageElement, Event> | any) => {
        e.currentTarget.src = "https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/defalut_image.png";
    }

    return (
        
        <div className="profile">
            <div className="profile-line"></div>
            <div className="profile-img">
                
                <img src={UserType ==="admin" ? companyImg === null ? "" : companyImg : userImg === null ? "" : userImg } 
                        alt='profile-image' 
                        onError={defalutImg}/>
            </div>
            
            <div className="profile-info">
                <p className="profile-name"> {name}</p>
                {/* <p> {phonenumber}</p> */}
                <p className="profile-companyName"> {companyName}</p>
                {UserType === "admin" ?  <p> Number : {companyNumber}</p> : <></>}
            </div>
            <div className="profile-line"></div>
            <div className="profile-icon-box" >
                { UserType === "admin" ? 
                    <div className="invite-icon" onClick={(e)=>{setInviteModal(true)}}>
                      <span className="material-symbols-outlined">vpn_key</span>
                        {/* <img src={"https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/invitation_icon.png"} alt="icon" /> */}
                    </div>
                    :
                    <></>
                }
                <div className="profile-icon" onClick={(e)=>{editProfle()}}>
                    <span className="material-symbols-outlined">settings</span>
                    {/* <img src={"https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/edit_icon.png"} alt="edit_icon" /> */}
                </div>
                <div className="logout-icon" onClick={() => {if (logout) logout()}}>
                <span className="material-symbols-outlined">logout</span>
                    {/* <img src={"https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/shutdown_icon.png"} alt="shutdown_icon" /> */}
                </div>
            </div>
          
            <ReactModal
                    ///// modal 설정
                    isOpen={inviteModal}
                    onRequestClose={()=> setInviteModal(false)}
                    overlayClassName= "invite-modal"
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={true}
                    style={inviteModalStyles}
                >
                <div style={{
                    width : "100%",
                    height: "100%",
                    display : "flex", alignItems:"center",
                    textAlign:"center"
                }}>
                <div style={{
                    width:"80%",
                    margin:"auto"
                }}>
                    <div style={{
                            width: "100%",
                            height: "50px",

                    }}>
                        {Token}
                    </div>
                    <button  
                        style={{backgroundColor:"rgb(94, 53, 177)", color:"#fff", padding:"0.3em", borderColor:"#eee"}}
                     onClick={(e)=>CodeGenerater()}>초대코드 발급</button>
                </div>
        
                </div>
            </ReactModal>

        </div>
    )
}