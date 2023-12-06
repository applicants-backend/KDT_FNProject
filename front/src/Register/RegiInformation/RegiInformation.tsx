import axios from "axios"
import UserTypeState, { URLstate } from "../../Store/Store"
import React, { FC, useCallback, useState, useRef, FocusEvent } from "react"
import { useNavigate } from "react-router"

import "../scss/RegiInformation.scss"

interface UserData {
    memberid : String,
    password : String,
    name : String,
    phonenumber : String,
    companyname? : String | null,
    ceo? : String | null,
    companynumber? : String | null,
    // companyAddress? : String | null,
    companyToken? : String | null
    invitecode? : String | null
    email? :  String | null
}



export default function RegiInformation (): ReturnType<FC> {
    const navigate = useNavigate();
    const {URL} = URLstate(state=>state)

    const [usertype, setUsertype] = useState<String>("user");
    const [nextstage, setNextStage] = useState<boolean>(false);

    ///// sever로 전송 될 데이터들
    const [userForm, setuserForm] = useState<UserData>({
        memberid : "",
        password : "",
        name : "",
        phonenumber : "",
        companyname : "",
        ceo : "",
        email:"",
        companynumber : "",
        // companyAddress : "",
        invitecode : ""
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


    const checkDuplicatedId = async () => {

       const duplicate = await axios.post(`${URL}/doublecheck`,{memberid : userForm.memberid})
       const mes = duplicate.data.message
       if(mes === "사용가능한 아이디입니다."){
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
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const companyNameInputRef = useRef<HTMLInputElement | null>(null);
    const CEOInputRef = useRef<HTMLInputElement | null>(null);
    const companyNumberInputRef = useRef<HTMLInputElement | null>(null);
    const companyAddressInputRef = useRef<HTMLInputElement | null>(null);
    const companyTokenInputRef = useRef<HTMLInputElement | null>(null);



    const nextStageFunc = () => {

        if (!userForm.memberid) {
            idInputRef.current && idInputRef.current.focus();
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

        if (duplicate)  setNextStage(true)
     
    }

    const Register = async () => {
        /////// 빈값에 focus 
        ////// 공통
        if (!userForm.email) {
            emailInputRef.current && emailInputRef.current.focus();
            return;
        }

        if (usertype === "user") {
            ///// 근로자일때
            if (!userForm.invitecode) {
                companyTokenInputRef.current && companyTokenInputRef.current.focus();
                return;
            }
        } else if (usertype === "admin") {
            ////// 사업자일때
            if (!userForm.companyname) {
                companyNameInputRef.current && companyNameInputRef.current.focus();
                return;
            }
            if (!userForm.ceo) {
                CEOInputRef.current && CEOInputRef.current.focus();
                return;
            }
            if (!userForm.companynumber) {
                companyNumberInputRef.current && companyNumberInputRef.current.focus();
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
        if(usertype === "admin") {
            if(!companyNumIs){
                companyNumberInputRef.current && companyNumberInputRef.current.focus();
                return;
            }
        }
        console.log(userForm)
        const res = await axios.post(`${URL}/${usertype}/join`,userForm)
        console.log(res.data)
        navigate('/')
    }


    const chooseUserType = (type:string) => {

        if (usertype !== type) return setUsertype(type);
    }


    const onfocusBluer = (e:FocusEvent<HTMLInputElement>, type:string) => {

        if (type === "focus" && e.target.parentElement) {
            e.target.parentElement.style.borderColor = "rgb(94, 53, 177)";
        }
        if (type === "blur" && e.target.parentElement) {
            e.target.parentElement.style.borderColor = "#ccc";
        }
      }


    return (
        <form className="register_form-box" name="RegisterForm">
                <div className="register_stage_1" style={nextstage === false ? { display:"block"} : { display:"none"}}>
                    <div className="input-label">
                        <label htmlFor="id"> 아이디 : </label>
                        <input  className="button-input" 
                                onFocus={(e) => onfocusBluer(e,"focus")}
                                onBlur={(e) => onfocusBluer(e,"blur")}
                                name="memberid" id="id" placeholder="아이디" ref={idInputRef} onChange={InputHandle}/>
                        <button type="button" onClick={(e)=>checkDuplicatedId()}>중복확인</button>
                        <span className="warning_text-span" style={{ color: duplicate ? 'green' : 'red' }}>{duplimessage}</span>
                    </div>
                    <div className="input-label">
                        <label htmlFor="pw"> 비밀번호 : </label>
                        <input name="password" type="password" id="pw" placeholder="비밀번호" 
                                onFocus={(e) => onfocusBluer(e,"focus")}
                                onBlur={(e) => onfocusBluer(e,"blur")}
                                ref={pwInputRef} onChange={e=>handlePassWordVail(e)}/>
                        <span className="warning_text-span" style={{ color: pwIs ? 'green' : 'red' }}>{pwMes}</span>

                    </div>

                    <div className="input-label">
                        <label htmlFor="PWre"> 비밀번호 확인 : </label>
                        <input name="pwre" type="password" id="PWre" placeholder="비밀번호 확인" 
                                onFocus={(e) => onfocusBluer(e,"focus")}
                                onBlur={(e) => onfocusBluer(e,"blur")}
                                ref={repwInputRef} onChange={e=> handlePassWordConfirm(e)}/>
                        <span className="warning_text-span" style={{ color: repwIs ? 'green' : 'red'}}>{repwMes}</span>

                    </div>      

                    <div className="input-label">
                        <label htmlFor="name"> 이름 : </label>
                        <input name="name" id="name" placeholder="이름" 
                                onFocus={(e) => onfocusBluer(e,"focus")}
                                onBlur={(e) => onfocusBluer(e,"blur")}
                                ref={nameInputRef} onChange={InputHandle}/>
                    </div>

                    <div className="input-label">
                        <label htmlFor="phoneNumber"> 휴대전화 번호 : </label>
                        <input name="phonenumber" id="phoneNumber" placeholder="휴대전화 번호" 
                                onFocus={(e) => onfocusBluer(e,"focus")}
                                onBlur={(e) => onfocusBluer(e,"blur")}
                                ref={phoneNumberInputRef} onChange={InputHandle}/>
                    </div>

                    <div className="input-label">
                        <label htmlFor="phoneNumber"> 타입 : </label>
                        <div className="type-choose-box">   
                            <div onClick={() => chooseUserType("admin")} className={usertype === "admin" ? "on" : ""}>
                                <img src={"https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/company_512.png"} alt={`${usertype} 이미지`}/>
                                <p>사업자</p>
                            </div>
                            <div onClick={() => chooseUserType("user")} className={usertype === "user" ? "on" : ""}>
                                <img src="https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/worker_512.png" alt={`${usertype} 이미지`}/>
                                <p>근로자</p>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="join-button"  onClick= {() => nextStageFunc()}> 다음 단계 </button>
                </div>
               
               <div className="register_stage_2" style={nextstage === false ? { display:"none"} : { display:"block"}}>

                    <div className="input-label">
                        <label htmlFor="email"> 이메일 : </label>
                        <input name="email" id="email" placeholder="이메일" 
                                onFocus={(e) => onfocusBluer(e,"focus")}
                                onBlur={(e) => onfocusBluer(e,"blur")}
                                ref={emailInputRef} onChange={InputHandle}
                                />
                    </div>
                    {usertype === "admin" ? (
                    /////// 유저타입이 사업자 일때 추가되는 input
                        <>

                            <div className="input-label">
                                <label htmlFor="companyName"> 사업자 상호명 : </label>
                                <input name="companyname" id="companyName" placeholder="사업자 상호명" 
                                        onFocus={(e) => onfocusBluer(e,"focus")}
                                        onBlur={(e) => onfocusBluer(e,"blur")}
                                        ref={companyNameInputRef} onChange={InputHandle}/>
                            </div>

                            <div className="input-label">
                                <label htmlFor="CEO"> 대표자 : </label>
                                <input name="ceo" id="CEO" placeholder="대표자" 
                                        onFocus={(e) => onfocusBluer(e,"focus")}
                                        onBlur={(e) => onfocusBluer(e,"blur")}
                                        ref={CEOInputRef} onChange={InputHandle}/>
                            </div>

                            <div className="input-label">
                                <label htmlFor="companyNumber"> 사업자 번호 : </label>
                                <input name="companynumber" id="companyNumber" placeholder="000-00-00000 형식으로 입력하세요" 
                                        onFocus={(e) => onfocusBluer(e,"focus")}
                                        onBlur={(e) => onfocusBluer(e,"blur")}
                                        ref={companyNumberInputRef} onChange={e=>handleCompanyNumber(e)}/>
                                <span className="warning_text-span" style={{ color: companyNumIs ? 'green' : 'red' }}>{companyNum}</span>
                            </div>

                        </> 
                        )
                        :
                    /////// 유저타입이 근로자 일때 추가되는 input
                        (

                        <div className="input-label">
                            <label htmlFor="companyToken"> 사업장 인증번호 </label>
                            <input name="invitecode" id="companyToken" placeholder="사업장 인증번호" 
                                onFocus={(e) =>onfocusBluer(e,"focus")}
                                onBlur={(e) =>onfocusBluer(e,"blur")}
                                ref={companyTokenInputRef} onChange={InputHandle}/>
                        </div>
                    )}

                    <div className="register_agree-box">
                        <input id="registerAgree" type="checkbox"/>
                        <label className="register-agree-label" htmlFor="registerAgree" >이용 약관에 동의하십니까?</label>
                    </div>
                    <button className="join-button_stage" type="button" onClick= {() => setNextStage(false)}> 이전 단계 </button>
                    <button className="join-button" type="button" onClick={(e)=>{Register()}}>회원가입</button>
                
            </div>
    </form>
        
    )
}