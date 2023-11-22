import { useEffect, useState } from "react"
import UserTypeState, { ProfileState, URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"
import ReactModal from "react-modal"
import ProfileModal from "./ProfileModal"
import NaviCon from "../NaviBar/NaviCon"


export default function Profile () {

    const {URL} = URLstate(state=>state)
    const {UserType} = UserTypeState(state=>state)
    const {Memberid, Storeid, Token, setToken} = UserDataState(state=>state)
    const {userImg,companyImg,name,phonenumber,companyNumber,companyName, setuserImg, setcompanyImg, setname, setphonenumber, setcompanyName, setcompanyNumber} = ProfileState(state=>state)

    useEffect(()=> {
        const loadUserData = async () => {

            const UserRes = await axios.post(`/${URL}/profile`,Memberid)
            const StoreRes = await axios.post(`/Store/profile`,Storeid)

            const Userprofile = UserRes.data
            const Storeprofile = StoreRes.data

            setuserImg(Userprofile.memberimg)
            setname(Userprofile.name)
            setphonenumber(Userprofile.phonenumber)

            setcompanyName(Storeprofile.companyName)
            setcompanyNumber(Storeprofile.companyNumber)
            setcompanyImg(Storeprofile.companyImg)
           
        }
        loadUserData()
    },[userImg,companyImg,name,phonenumber,companyName,companyNumber])

    const [modalOpenis, setmodalOpenis] = useState(false)

    const editProfle = () => {
        setmodalOpenis(true)
    }

    const CodeGenerater = async () => {
        const CodeRes = await axios.post(`${URL}/generate`,{companynumber : companyNumber})
        const Code = CodeRes.data
        setToken(Code)
    }
    return (
        <div>
            <img src={UserType === "admin" ? companyImg : userImg} alt='Img'/>
            <div>{name}</div>
            <div>{phonenumber}</div>
            <div>{companyName}</div>

            {UserType === "admin" ?
            <>
            <div>{companyNumber}</div>
            <button onClick={(e)=>CodeGenerater()}>초대코드 발급</button>
            <div>{Token}</div>
            </> :
            <></>
            }
            
            <button type="button" onClick={(e)=>{editProfle()}}>프로필수정</button>
            <ReactModal
            ///// modal 설정
             isOpen={modalOpenis}
             onRequestClose={()=>setmodalOpenis(false)}
             ariaHideApp={false}
             shouldCloseOnOverlayClick={true}
            >
            <ProfileModal></ProfileModal>
            </ReactModal>  

            <NaviCon></NaviCon>
        </div>
    )
}