import { useEffect, useState } from "react"
import UserTypeState, { UserDataState } from "../../Store/Store"
import axios from "axios"

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

            // const Userprofile = await axios.post(`/${UserType}/profile`,Userid)
            // const Storeprofile = await axios.post(`/Store/profile`,Storeid)

            // setuserImg(Userprofile.userImg)
            // setuserName(Userprfile.userName)
            // setphoneNumber(Userprofile.phoneNumber)

            // setcompanyName(Storeprofile.companyName)
            // setcompanyNumber(Storeprofile.companyNumber)
            // setcompanyImg(Stroeprofile.companyImg)
           
        }

        loadUserData()
    },[])

    return (
        <div>
            <img src={UserType=="Admin" ? companyImg : userImg} alt='Img'/>
            <div>{userName}</div>
            <div>{phoneNumber}</div>
            <div>{companyName}</div>

            {UserType === "Admin" ?
            <div>{companyNumber}</div>
                :
            <></>
            }

        </div>
    )
}