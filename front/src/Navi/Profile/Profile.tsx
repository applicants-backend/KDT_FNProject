import { useEffect, useState } from "react"
import UserTypeState, { UserDataState } from "../../Store/Store"
import axios from "axios"
import ReactModal from "react-modal"
import ProfileModal from "./ProfileModal"
import NaviCon from "../NaviBar/NaviCon"


export default function Profile () {

    const {UserType} = UserTypeState(state=>state)
    const {Memberid, Storeid, Token } = UserDataState(state=>state)

    const[userImg, setuserImg] =useState<string>()
    const[companyImg, setcompanyImg] =useState<string>()

    const[userName, setuserName] = useState<string>()
    const[phoneNumber, setphoneNumber] =useState<string>()
    const[companyName, setcompanyName] =useState<string>()
    const[companyNumber, setcompanyNumber] =useState<string>()

    useEffect(()=> {

        const loadUserData = async () => {

            const UserRes = await axios.post(`/${UserType}/profile`,Memberid)
            const StoreRes = await axios.post(`/Store/profile`,Storeid)

            const Userprofile = UserRes.data
            const Storeprofile = StoreRes.data

            setuserImg(Userprofile.memberimg)
            setuserName(Userprofile.name)
            setphoneNumber(Userprofile.phonenumber)

            setcompanyName(Storeprofile.companyName)
            setcompanyNumber(Storeprofile.companyNumber)
            setcompanyImg(Storeprofile.companyImg)
           
        }

        loadUserData()
    },[])

    const [modalOpenis, setmodalOpenis] = useState(false)

    const editProfle = () => {
        setmodalOpenis(true)
    }

    return (
        <div>
            <img src={UserType === "admin" ? companyImg : userImg} alt='Img'/>
            <div>{userName}</div>
            <div>{phoneNumber}</div>
            <div>{companyName}</div>

            {UserType === "admin" ?
            <div>{companyNumber}</div>
                :
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