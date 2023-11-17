import axios from "axios"
import UserTypeState from "../../Store/Store"
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

export default function RegiInformation () {
    const {UserType} = UserTypeState(state => state)

    ///// sever로 전송 될 데이터들
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
    const [duplimessage,setDuplimessage] = useState<String>("아이디 중복검사를 해주세요")
    const [duplicate,setDuplicate] = useState<boolean>(false)

    const [pwMes,setpwMes] = useState<String>()
    const [pwIs, setpwIS] = useState<Boolean>(false)

    const [repwMes,setrepwMes] = useState<String>()
    const [repwIs, setrepwIS] = useState<Boolean>(false)

    const [companyNum,setcompanyNum] = useState<String>()
    const [companyNumIs, setcompanyNumIs] = useState<boolean>(false)

    const [duliComNumber, setDuliComNumber] = useState<boolean>()
    const [duliComNumberMsg, setDuliComNumberMsg] = useState<String>()

    const checkDuplicatedId = async () => {

       const duplicate = await axios.post(`/duplicate/${UserType}`,userForm.memberid)
       if(duplicate){
            setDuplicate(true)
            setDuplimessage("사용가능한 아이디입니다.")
       } else{
            setDuplicate(false)
            setDuplimessage("중복되는 아이디입니다.")
       }
    }


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

    const handleCompanyNumber = useCallback((e :React.ChangeEvent<HTMLInputElement>)=>{
        
        const {value}=e.target
        InputHandle(e)
        
        const CompanyNumberRegex = /^\d{3}-\d{2}-\d{5}$/;
        if(CompanyNumberRegex.test(value)){
            setcompanyNum("올바른 사업자 번호입니다")
            setcompanyNumIs(true)
        } else {
            setcompanyNum("000-00-00000 형식으로 입력해주세요")
            setcompanyNumIs(false)
        }
    },[])

    ///// 회원가입 시 빈값 보내지 않기위한 장치
    const idInputRef = useRef<HTMLInputElement | null>(null);
    const pwInputRef = useRef<HTMLInputElement | null>(null);
    const repwInputRef = useRef<HTMLInputElement | null>(null);
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const phoneNumberInputRef = useRef<HTMLInputElement | null>(null);
    const companyNameInputRef = useRef<HTMLInputElement | null>(null);
    const CEOInputRef = useRef<HTMLInputElement | null>(null);
    const companyNumberInputRef = useRef<HTMLInputElement | null>(null);
    const companyAddressInputRef = useRef<HTMLInputElement | null>(null);
    const companyTokenInputRef = useRef<HTMLInputElement | null>(null);



    const Register = async () => {
        /////// 빈값에 focus 
        ////// 공통
        if (!userForm.memberid) {
            idInputRef.current && idInputRef.current.focus();
            console.log("중복검사")
            return;
        }
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

        if (UserType === "Worker") {
            ///// 근로자일때
            if (!userForm.companyToken) {
                companyTokenInputRef.current && companyTokenInputRef.current.focus();
                return;
            }
        } else if (UserType === "Admin") {
            ////// 사업자일때
            if (!userForm.companyName) {
                companyNameInputRef.current && companyNameInputRef.current.focus();
                return;
            }
            if (!userForm.CEO) {
                CEOInputRef.current && CEOInputRef.current.focus();
                return;
            }
            if (!userForm.companyNumber) {
                companyNumberInputRef.current && companyNumberInputRef.current.focus();
                return;
            }
            if (!userForm.companyAddress) {
                companyAddressInputRef.current && companyAddressInputRef.current.focus();
                return;
            }
        }      
        ///// 유효성 통과검사
        if(!duplicate){
            idInputRef.current && idInputRef.current.focus();
            console.log("유효성검사")
            return;
        }
        if(!pwIs){
            pwInputRef.current && pwInputRef.current.focus();
            console.log("비밀번호검사")
            return;
        }
        if(UserType === "Admin") {
            if(!companyNumIs){
                companyNumberInputRef.current && companyNumberInputRef.current.focus();
                return;
            }
        }
        console.log(userForm)
        const dupliComNum = await axios.post(`/duplicate/campanynumber`,userForm.companyNumber)
        if(!dupliComNum){
            companyNumberInputRef.current && companyNumberInputRef.current.focus();
            setDuliComNumberMsg("중복된 사업자번호입니다.")
            return ;
        }
        // const res = await axios.post(`/register/${UserType}`,userForm)

    }


    return (
        <form name="RegisterForm">
            <label htmlFor="id"> 아이디 : </label>
            <input name="memberid" id="id" placeholder="아이디" ref={idInputRef} onChange={InputHandle}/>
            <button type="button" onClick={(e)=>checkDuplicatedId()}>중복확인</button>
            <div style={{ color: duplicate ? 'green' : 'red' }}>{duplimessage}</div>

            <label htmlFor="pw"> 비밀번호 : </label>
            <input name="password" type="password" id="pw" placeholder="비밀번호" ref={pwInputRef} onChange={e=>handlePassWordVail(e)}/>
            <div style={{ color: pwIs ? 'green' : 'red' }}>{pwMes}</div>

            <label htmlFor="PWre"> 비밀번호 확인 : </label>
            <input name="pwre" type="password" id="PWre" placeholder="비밀번호 확인" ref={repwInputRef} onChange={e=>handlePassWordConfirm(e)}/>
            <div style={{ color: repwIs ? 'green' : 'red'}}>{repwMes}</div>

            <label htmlFor="name"> 이름 : </label>
            <input name="name" id="name" placeholder="이름" ref={nameInputRef} onChange={InputHandle}/>

            <label htmlFor="phoneNumber"> 휴대전화 번호 : </label>
            <input name="phonenumber" id="phoneNumber" placeholder="휴대전화 번호" ref={phoneNumberInputRef} onChange={InputHandle}/>

            {UserType === "Admin" ? 
            /////// 유저타입이 사업자 일때 추가되는 input
                <>
            <label htmlFor="companyName"> 사업자 상호명 : </label>
            <input name="companyName" id="companyName" placeholder="사업자 상호명" ref={companyNameInputRef} onChange={InputHandle}/>

            <label htmlFor="CEO"> 대표자 : </label>
            <input name="CEO" id="CEO" placeholder="대표자" ref={CEOInputRef} onChange={InputHandle}/>

            <label htmlFor="companyNumber"> 사업자 번호 : </label>
            <input name="companyNumber" id="companyNumber" placeholder="000-00-00000 형식으로 입력하세요" ref={companyNumberInputRef} onChange={e=>handleCompanyNumber(e)}/>
            <div style={{ color: companyNumIs ? 'green' : 'red' }}>{companyNum}</div>
            <div style={{ color: duliComNumber ? 'green' : 'red' }}>{duliComNumberMsg}</div>

            <label htmlFor="companyAddress"> 사업자 주소 : </label>
            <input name="companyAddress" id="companyAddress" ref={companyAddressInputRef} onChange={InputHandle}/>
                </> 
                :
            /////// 유저타입이 근로자 일때 추가되는 input
                <>
            <label htmlFor="companyToken"> 사업장 인증번호 </label>
            <input name="companyToken" id="companyToken" placeholder="사업장 인증번호" ref={companyTokenInputRef} onChange={InputHandle}/>
                </>
            }
            <input type="checkbox"/>
            <button type="button" onClick={(e)=>{Register()}}>회원가입</button>
        </form>
    )
}