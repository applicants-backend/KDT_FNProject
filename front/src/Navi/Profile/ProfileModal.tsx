import axios from "axios"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import React, { useCallback, useState, useRef, useEffect } from "react"


interface UserData {
    memberid : String,
    password : String,
    name : String,
    phonenumber : String,
    companyName? : String | null,
    CEO? : String | null,
    companyNumber? : String | null,
    companyAddress? : String | null,
    companyToken? : String | null
}


export default function ProfileModal() {
    const {UserType} = UserTypeState(state => state)
    const {Memberid, Storeid} = UserDataState(state=>state)

    const[userImg, setuserImg] =useState<string>()
    const[companyImg, setcompanyImg] =useState<string>()

    const[userPw, setUserpw]=useState<string>()
    const[userName, setuserName] = useState<string>()
    const[phoneNumber, setphoneNumber] =useState<string>()
    
    const[companyName, setcompanyName] =useState<string>()
    const[companyNumber, setcompanyNumber] =useState<string>()
    const[companyAddress, setcompanyAddress] =useState<string>()
    const[companyToken, setcompanyToken] =useState<string>()
    const[CEO, setCEO] =useState<string>()


    useEffect(()=> {
        ///// 유저데이터 로드
        const loadUserData = async () => {

            const UserRes = await axios.post(`/${UserType}/profile`,Memberid)
            const StoreRes = await axios.post(`/Store/profile`,Storeid)

            const Userprofile = UserRes.data
            const Storeprofile = StoreRes.data

            setUserpw(Userprofile.password)

            setuserImg(Userprofile.memberimg)
            setuserName(Userprofile.name)
            setphoneNumber(Userprofile.phonenumber)

            setcompanyName(Storeprofile.companyName)
            setCEO(Storeprofile.CEO)
            setcompanyNumber(Storeprofile.companyNumber)
            setcompanyAddress(Storeprofile.companyAddress)
            setcompanyImg(Storeprofile.companyImg)
            setcompanyToken(Storeprofile.companToken)
           
        }

        loadUserData()
    })

    const [userForm, setuserForm] = useState<UserData>({
        memberid : "",
        password : "",
        name : "",
        phonenumber : "",
        companyName : "",
        CEO : "",
        companyNumber : "",
        companyAddress : "",
        companyToken : ""
    })

    ///// 인풋 통합핸들러
    const InputHandle = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        ////// 비밀번호학인은 들어가지않음
        if(name === "pwre") {
            return;
        }
        setuserForm((prevForm) => ({ ...prevForm, [name]: value }));
    }

    ///// 유효성 검사 메세지들
    const [pwMes,setpwMes] = useState<String>()
    const [pwIs, setpwIS] = useState<Boolean>(false)

    const [repwMes,setrepwMes] = useState<String>()
    const [repwIs, setrepwIS] = useState<Boolean>(false)

    const handlePassWordVail = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{

        const {value} = e.target
        InputHandle(e);

        // 비밀번호 포맷
        // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
        const passwordRegex =/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

        if(passwordRegex.test(value)){
            setpwMes("올바른 비밀번호입니다")
            setpwIS(true)
        } else {
            setpwMes("숫자, 영문, 특수문자를 포함하여 최소 8자를 입력해주세요")
            setpwIS(false)
        }

    },[])

    const handlePassWordConfirm = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{

        const {value} = e.target
        InputHandle(e);

        if(userForm.password === value){
            setrepwMes("비밀번호가 일치합니다.")
            setrepwIS(true)
        } else {
            setrepwMes("비밀번호가 일치하지않습니다.")
            setrepwIS(false)
        }

    },[userForm.password])

    ///// 업데이트 시 빈값 보내지 않기위한 장치
    const pwInputRef = useRef<HTMLInputElement | null>(null);
    const repwInputRef = useRef<HTMLInputElement | null>(null);
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const phoneNumberInputRef = useRef<HTMLInputElement | null>(null);
    const companyNameInputRef = useRef<HTMLInputElement | null>(null);
    const CEOInputRef = useRef<HTMLInputElement | null>(null);
    const companyAddressInputRef = useRef<HTMLInputElement | null>(null);



    const UpdateMemberData = async () => {
        /////// 빈값에 focus 
        ////// 공통
        if (!userForm.password) {
            pwInputRef.current && pwInputRef.current.focus();
            return;
        }
        if(!repwIs){
            repwInputRef.current && repwInputRef.current.focus();
            return;
        }
        if (!userForm.name) {
            nameInputRef.current && nameInputRef.current.focus();
            return;
        }
        if (!userForm.phonenumber) {
            phoneNumberInputRef.current && phoneNumberInputRef.current.focus();
            return;
        }

        if (UserType === "admin") {
            ////// 사업자일때
            if (!userForm.companyName) {
                companyNameInputRef.current && companyNameInputRef.current.focus();
                return;
            }
            if (!userForm.CEO) {
                CEOInputRef.current && CEOInputRef.current.focus();
                return;
            }
            if (!userForm.companyAddress) {
                companyAddressInputRef.current && companyAddressInputRef.current.focus();
                return;
            }
        }      
        ///// 유효성 통과검사
        if(!pwIs){
            pwInputRef.current && pwInputRef.current.focus();
            console.log("비밀번호검사")
            return;
        }

        const updateUserdata = await axios.post(`${URLstate}/update`,userForm)
        console.log(updateUserdata)
        console.log(userForm)

    }

    const DeleteMemberData = async () => {
        const deleteMember = axios.delete(`${URLstate}/delete/${Memberid}`)
        console.log(deleteMember)

    }

    
    return(
        <form name="RegisterForm">
            <img src={UserType ==="admin" ? companyImg : userImg} alt='Img'/>

            <label htmlFor="id"> 아이디 : </label>
            <input name="memberid" value={Memberid} id="id" placeholder="아이디" readOnly/>

            <label htmlFor="pw"> 비밀번호 : </label>
            <input name="password" type="password" id="pw" value={userPw} placeholder="비밀번호" ref={pwInputRef} onChange={e=>handlePassWordVail(e)}/>
            <div style={{ color: pwIs ? 'green' : 'red' }}>{pwMes}</div>

            <label htmlFor="PWre"> 비밀번호 확인 : </label>
            <input name="pwre" type="password" id="PWre" placeholder="비밀번호 확인" ref={repwInputRef} onChange={e=>handlePassWordConfirm(e)}/>
            <div style={{ color: repwIs ? 'green' : 'red'}}>{repwMes}</div>

            <label htmlFor="name"> 이름 : </label>
            <input name="name" id="name" placeholder="이름" value={userName} ref={nameInputRef} onChange={InputHandle}/>

            <label htmlFor="phoneNumber"> 휴대전화 번호 : </label>
            <input name="phonenumber" id="phoneNumber" value={phoneNumber} placeholder="휴대전화 번호" ref={phoneNumberInputRef} onChange={InputHandle}/>

            {UserType === "admin" ? 
            /////// 유저타입이 사업자 일때 추가되는 input
                <>
            <label htmlFor="companyName"> 사업자 상호명 : </label>
            <input name="companyName" id="companyName" value={companyName} placeholder="사업자 상호명" ref={companyNameInputRef} onChange={InputHandle}/>

            <label htmlFor="CEO"> 대표자 : </label>
            <input name="CEO" id="CEO" placeholder="대표자" value={CEO} ref={CEOInputRef} onChange={InputHandle}/>

            <label htmlFor="companyNumber"> 사업자 번호 : </label>
            <input name="companyNumber" id="companyNumber" value={companyNumber} placeholder="000-00-00000 형식으로 입력하세요" readOnly/>

            <label htmlFor="companyAddress"> 사업자 주소 : </label>
            <input name="companyAddress" id="companyAddress" value={companyAddress} ref={companyAddressInputRef} onChange={InputHandle}/>
                </> 
                :
            /////// 유저타입이 근로자 일때 추가되는 input
                <>
            <label htmlFor="companyToken"> 사업장 인증번호 </label>
            <input name="companyToken" id="companyToken" value={companyToken} placeholder="사업장 인증번호" readOnly/>
                </>
            }
            <button type="button" onClick={(e)=>{UpdateMemberData()}}>정보수정</button>
            <button type="button" onClick={(e)=>{DeleteMemberData()}}>회원탈퇴</button>
        </form>
    )
}