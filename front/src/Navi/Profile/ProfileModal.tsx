import axios from "axios"
import UserTypeState, {ProfileState, URLstate, UserDataState } from "../../Store/Store"
import React, { FocusEvent, useCallback, useState, useRef, useMemo, SyntheticEvent} from "react"

import "./scss/ProfileModal.scss"

export default function ProfileModal() {
    const {userImg, companyImg, setuserImg, setcompanyImg ,setname, setphonenumber} = ProfileState(state=>state)

    const {URL} = URLstate(state=>state)
    const {UserType} = UserTypeState(state => state)
    const {Memberid, Storeid, setName} = UserDataState(state=>state)

    console.log('UserType', UserType)
    const[userPw, setUserpw]=useState<string>("")
    const[userPwre, setUserpwre]=useState<string>("")

    const[userName, setuserName] = useState<string>("")
    const[phoneNumber, setphoneNumber] =useState<string>("")
    
    const[companyName, setCompanyName] =useState<string>("")
    const[companyNumber, setCompanyNumber] =useState<string>("")
    const[companyAddress, setcompanyAddress] =useState<string>("")
    const[companyToken, setcompanyToken] =useState<string>("")
    const[CEO, setCEO] =useState<string>("")

    const [email, setEmail] = useState<string>("");

    useMemo(()=> {
        ///// 유저데이터 로드
        const loadUserData = async () => {
            const UserRes = await axios.post(`${URL}/detail`,{memberid:Memberid})
            const Userprofile = UserRes.data.data.member
            const Storeprofile = UserRes.data.data.store
            setUserpw(Userprofile.password || ""); // 여기 수정

            setuserImg(Userprofile.memberimg)
            setuserName(Userprofile.name)
            setphoneNumber(Userprofile.phonenumber)
            setEmail(Userprofile.email)
            setCompanyName(Storeprofile.companyname)
            setCEO(Storeprofile.ceo)
            setCompanyNumber(Storeprofile.companynumber)
            setcompanyAddress(Storeprofile.companyAddress)
            setcompanyImg(Storeprofile.companyimg)
            setcompanyToken(Storeprofile.companToken)
          
        }
        loadUserData()
    },[Memberid,URL])

    ///// 유효성 검사 메세지들
    const [pwMes,setpwMes] = useState<String>()
    const [pwIs, setpwIS] = useState<Boolean>(false)

    const [repwMes,setrepwMes] = useState<String>()
    const [repwIs, setrepwIS] = useState<Boolean>(false)

    const handlePassWordVail = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{

        const {value} = e.target
        setUserpw(e.target.value)

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
        setUserpwre(e.target.value)

        if(userPw === value){
            setrepwMes("비밀번호가 일치합니다.")
            setrepwIS(true)
        } else {
            setrepwMes("비밀번호가 일치하지않습니다.")
            setrepwIS(false)
        }

    },[userPw])

    ///// 업데이트 시 빈값 보내지 않기위한 장치
    const pwInputRef = useRef<HTMLInputElement | null>(null);
    const repwInputRef = useRef<HTMLInputElement | null>(null);
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const phoneNumberInputRef = useRef<HTMLInputElement | null>(null);

    const UpdateMemberData = async () => {
        /////// 빈값에 focus 
        ////// 공통

       
        if (!userPw) {
            pwInputRef.current && pwInputRef.current.focus();
            return;
        }
        if(!repwIs){
            repwInputRef.current && repwInputRef.current.focus();
            return;
        }
        if (!userName) {
            nameInputRef.current && nameInputRef.current.focus();
            return;
        }
        if (!phoneNumber) {
            phoneNumberInputRef.current && phoneNumberInputRef.current.focus();
            return;
        }   

        if (!email) {
            emailInputRef.current && emailInputRef.current.focus();
            return;
        }

        ///// 유효성 통과검사
        if(!pwIs){
            pwInputRef.current && pwInputRef.current.focus();
            console.log("비밀번호검사")
            return;
        }

        const updateUserdata = await axios.patch(`${URL}/update`,{memberid : Memberid, password : userPw, email:email, phonenumber :phoneNumber, name : userName, role : UserType, memberimg :""})
        
        if (updateUserdata.data.message === "수정 완료") {

            setname(userName)
            setName(userName)
            setphonenumber(phoneNumber)
            alert("수정 완료");
        }
      
    }
     
    const DeleteMemberData = async () => {
        const deleteMember = await axios.delete(UserType==="admin"? `${URL}/delete/${Memberid}/${Storeid}` : `${URL}/delete/${Memberid}` )
        console.log(deleteMember)
    }

    const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
    const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; 

    const uploadImg = async(e:any) =>{
        const target = e.currentTarget
        const Imgfile : any = target.files[0]
        console.log(Imgfile)

        if(Imgfile === undefined) {
            return ;
        }

        if(!fileExtensionValid(Imgfile)){
            target.value = '';
            return;
        }
        
        if(Imgfile.size > FILE_SIZE_MAX_LIMIT) {
            target.value ='';
            return
        }
            try {
                const formData = new FormData();
                formData.append('file',Imgfile as any)
                formData.append('role', UserType === 'admin' ? 'ADMIN' : 'USER')
                formData.append('memberid',Memberid)
                formData.append('storeid',Storeid as unknown as string)

                console.log(formData)
                const uploadRes = await axios.post(`${URL}/member/image/upload`,formData)

                console.log(uploadRes)
                const imgUrl = uploadRes.data.data.imageurl
                console.log(imgUrl)

                if(UserType === "admin") {
                    setcompanyImg(imgUrl)
                } else {
                    setuserImg(imgUrl)
                }
            } catch (error) {
                console.log(error)
            }
        
    }

    const fileExtensionValid = ({name} : {name : string}) => {
        const extension = removeFileName(name);
        if(!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === ''){
            return false;
        }
        return true;
    }

    const removeFileName = (originalFileName : string) => {
        const lastIndex = originalFileName.lastIndexOf(".")
        if(lastIndex < 0) {
            return "";
        }
        return originalFileName.substring(lastIndex+1).toLowerCase();
    }

    const defalutImg = (e:SyntheticEvent<HTMLImageElement, Event> | any) => {
        e.currentTarget.src = "https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/defalut_image.png";
    }

    const onfocusBluer = (e:FocusEvent<HTMLInputElement>, type:string) => {

        if (type === "focus" && e.target.parentElement) {
            e.target.parentElement.style.borderColor = "rgb(94, 53, 177)";
            e.target.parentElement.style.borderWidth = "1.5px"
        }
        if (type === "blur" && e.target.parentElement) {
            e.target.parentElement.style.borderColor = "#ccc";
            e.target.parentElement.style.borderWidth = "1px"
        }
      }

    
    return(
        <form name="RegisterForm" className="register-form">
            
            <div className="profile-img">
                <div className="image-box">
                    <img src={UserType ==="admin" ? companyImg === null ? "" : companyImg : userImg === null ? "" : userImg } 
                        alt='profile-image' 
                        onError={defalutImg}/>
                </div>
            </div>

            <div className="profile-image-input"> 
                    <input  id="profileFile" type='file' 
                            accept='image/jpg, impge/png, image/jpeg, image/gif' 
                            size={ 5 * 1024 * 1024 }
                            style={{display:'none'}}
                            name='profile_img' onChange={uploadImg}/>
                    <label htmlFor="profileFile" >이미지 변경하기</label>
            </div>

            <div className="input-label">
                <label htmlFor="id"> 아이디 : </label>
                <input name="memberid" 
                        onFocus={(e) => onfocusBluer(e,"focus")}
                        onBlur={(e) => onfocusBluer(e,"blur")}
                        value={Memberid ? Memberid : "" } 
                        id="id" placeholder="아이디" readOnly/>
            </div>

            <div className="input-label">
                <label htmlFor="pw"> 비밀번호 : </label>
                <input  name="password" type="password" id="pw"  
                        onFocus={(e) => onfocusBluer(e,"focus")}
                        onBlur={(e) => onfocusBluer(e,"blur")}
                        autoComplete="new-password" 
                        placeholder="비밀번호" ref={pwInputRef} onChange={ e=> handlePassWordVail(e)}/>
                <span style={{ color: pwIs ? 'green' : 'red' }}>{pwMes}</span>
            </div>

            <div className="input-label">
                <label htmlFor="PWre"> 비밀번호 확인 : </label>
                <input name="pwre" type="password" id="PWre" 
                        onFocus={(e) => onfocusBluer(e,"focus")}
                        onBlur={(e) => onfocusBluer(e,"blur")}
                        value={userPwre} placeholder="비밀번호 확인" 
                        autoComplete="new-password" ref={repwInputRef} 
                        onChange={e=>handlePassWordConfirm(e)}/>
                <span style={{ color: repwIs ? 'green' : 'red'}}>{repwMes}</span>
            </div>

            <div className="input-label">
                <label htmlFor="name"> 이름 : </label>
                <input name="name" id="name" placeholder="이름" 
                        onFocus={(e) => onfocusBluer(e,"focus")}
                        onBlur={(e) => onfocusBluer(e,"blur")}
                        value={userName} 
                        ref={nameInputRef} onChange={e=>setuserName(e.target.value)}/>
            </div>

            <div className="input-label">
                <label htmlFor="email"> 이메일 : </label>
                <input name="email" id="email" placeholder="이메일" 
                        onFocus={(e) => onfocusBluer(e,"focus")}
                        onBlur={(e) => onfocusBluer(e,"blur")}
                        value={email} ref={emailInputRef} onChange={e=>setEmail(e.target.value)}/>
            </div>

            <div className="input-label">
                <label htmlFor="phoneNumber"> 휴대전화 번호 : </label>
                <input name="phonenumber" id="phoneNumber" 
                        onFocus={(e) => onfocusBluer(e,"focus")}
                        onBlur={(e) => onfocusBluer(e,"blur")}
                        value={phoneNumber} 
                        placeholder="휴대전화 번호" ref={phoneNumberInputRef} 
                        onChange={e=>setphoneNumber(e.target.value)}/>
            </div>


            
            {UserType === "admin" ? 
                /////// 유저타입이 사업자 일때 추가되는 input
                    <>

                        <div className="input-label">
                            <label htmlFor="companyName"> 사업자 상호명 : </label>
                            <input name="companyName" id="companyName" 
                                    value={companyName} placeholder="사업자 상호명" 
                                    readOnly/>
                        </div>
                        <div className="input-label">
                            <label htmlFor="CEO"> 대표자 : </label>
                            <input name="CEO" id="CEO" placeholder="대표자" value={CEO} readOnly/>  
                        </div>
                   
                        <div className="input-label">
                            <label htmlFor="companyNumber"> 사업자 번호 : </label>
                            <input name="companyNumber" id="companyNumber" value={companyNumber} 
                                    placeholder="000-00-00000 형식으로 입력하세요" readOnly/>
                        </div>
                 
                    </> 
                :
                    /////// 유저타입이 근로자 일때 추가되는 input

                    <>
                    </>
                }


            <button className="update-button" type="button" onClick={(e)=>{UpdateMemberData()}}>정보수정</button>
            <button className="remove-button" type="button" onClick={(e)=>{DeleteMemberData()}}>회원탈퇴</button>
            
        </form>
    )
}