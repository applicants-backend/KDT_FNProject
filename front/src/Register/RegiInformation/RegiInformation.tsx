import axios from "axios"
import UserTypeState from "../../Store/Store"
import { useCallback, useRef, useState } from "react"

interface UserData {
    id : String,
    pw : String,
    name : String,
    phoneNumber : String,
    companyName : String,
    CEO : String,
    companyNumber : String,
    companyAddress : String,
    companyToken : String
}

export default function RegiInformation () {
    const {UserType} = UserTypeState(state => state)

    ///// sever로 전송 될 데이터들
    const [Userid,setUserid] = useState<String>()
    const [Userpw,setUserpw] = useState<String>()
    const [Userpwre,setUserpwre] = useState<String>()
    const [Username,setUsername] = useState<String>()
    const [PhoneNumber,setPhoneNumber] = useState<String>()
    const [CompanyName,setCompanyName] = useState<String>()
    const [CEO,setCEO] = useState<String>()
    const [CompanyNumber,setCompanyNumber] = useState<String>()
    const [CompanyAddress,setCompanyAddress] = useState<String>()
    const [CompanyToken,setCompanyToken] = useState<String>()

    ///// 유효성 검사 메세지들
    const [pwMes,setpwMes] = useState<String>()
    const [pwIs, setpwIS] = useState<Boolean>()

    const [repwMes,setrepwMes] = useState<String>()
    const [repwIs, setrepwIS] = useState<Boolean>()
    

    const Register = async () => {

        const data = {
            Userid,
            Userpw,
            Username,
            PhoneNumber,
            CompanyName,
            CEO,
            CompanyNumber,
            CompanyAddress,
            CompanyToken
        }

        console.log(data)

        // const res = await axios({
        //     method :"POST",
        //     url : "/register",
        //     data : data
        // })
    }


    const handlePassWordVail = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{

        const {value} = e.target
        setUserpw(value);

        // 비밀번호 포맷
        // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
        const passwordRegex =/^(?=.[A-Za-z])(?=.\d)(?=.[@!%#?&])[A-Za-z\d@!%*#?&]{8,16}$/;

        if(!passwordRegex.test(value)){
            setpwMes("숫자, 영문, 특수문자를 포함하여 최소 8자를 입력해주세요")
            setpwIS(false)
        } else {
            setpwMes("올바른 비밀번호입니다")
            setpwIS(true)
        }

    },[])


    return (
        <form name="RegisterForm">
            <label htmlFor="ID"> 아이디 : </label>
            <input id="ID" placeholder="아이디" onChange={e=>setUserid(e.target.value)}/>

            <label htmlFor="PW"> 비밀번호 : </label>
            <input id="Pw" placeholder="비밀번호" onChange={e=>handlePassWordVail(e)}/>
            <div>{pwMes}</div>

            <label htmlFor="PWre"> 비밀번호 확인 : </label>
            <input id="PWre" placeholder="비밀번호 확인" onChange={e=>setUserpwre(e.target.value)}/>

            <label htmlFor="Name"> 이름 : </label>
            <input id="Name" placeholder="이름" onChange={e=>setUsername(e.target.value)}/>

            <label htmlFor="PhoneNumber"> 휴대전화 번호 : </label>
            <input id="PhoneNumber" placeholder="휴대전화 번호" onChange={e=>setPhoneNumber(e.target.value)}/>

            {UserType === "Admin" ? 
            /////// 유저타입이 사업자 일때 추가되는 input
                <>
            <label htmlFor="CompanyName"> 사업자 상호명 : </label>
            <input id="CompanyName" placeholder="사업자 상호명" onChange={e=>setCompanyName(e.target.value)}/>

            <label htmlFor="CEO"> 대표자 : </label>
            <input id="CEO" placeholder="대표자" onChange={e=>setCEO(e.target.value)}/>

            <label htmlFor="CompanyNumber"> 사업자 번호 : </label>
            <input id="CompanyNumber" placeholder="사업자 번호" onChange={e=>setCompanyNumber(e.target.value)}/>

            <label htmlFor="CompanyAddress"> 사업자 주소 : </label>
            <input id="CompanyAddress" placeholder="사업자 주소" onChange={e=>setCompanyAddress(e.target.value)}/>
                </> 
                :
            /////// 유저타입이 근로자 일때 추가되는 input
                <>
            <label htmlFor="CompanyToken"> 사업장 인증번호 </label>
            <input id="CompanyToken" placeholder="사업자 인증번호" onChange={e=>setCompanyToken(e.target.value)}/>
                </>
            }
            <input type="checkbox"/>
            <button type="button" onClick={(e)=>{Register()}}>회원가입</button>
        </form>
    )
}