import { useState,useCallback,useRef } from 'react';
import axios from 'axios';
import UserTypeState from "../Store/Store";
import {UserDataState} from "../Store/Store";

interface props {
  type : String;
  img : string;
}

export default function Login({type, img} : props) {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {UserType,setUserTypeAdmin, setUserTypeWorker} = UserTypeState(state => state)
  const { setUserid, setStoreid, setToken } = UserDataState(state => state); 

  ///// 유효성 검사 메세지들
  const [pwMes,setpwMes] = useState<String>()
  const [pwIs, setpwIS] = useState<Boolean>()

  ///// focus
  const idInputRef = useRef<HTMLInputElement | null>(null);


  const handleLogin = async () => {
    try {
      if (type === "사업자") {
        setUserTypeAdmin();
      } else {
        setUserTypeWorker();
      }
      const response = await axios.post(`/${UserType}/login`, { userId, password });
      console.log('로그인', response.data);
      if(response.data.result){
        setUserid(response.data.member.userid);
        setStoreid(response.data.member.storeid);
        setToken(response.data.token);
      }
    } catch (error) {
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
      idInputRef.current && idInputRef.current.focus();
    }
  };

  ///// 비밀번호 유효성검사
  const handlePassWordVail = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{

    const {value} = e.target
    setPassword(value)

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

  return (
    <>
    <div onClick={type ===  "사업자"? setUserTypeAdmin : setUserTypeWorker}>
            <div>{type}</div>
            <img src={img} alt={`${type} 이미지`}/>
            <button >{type}</button>
            <div>{UserType}</div>
        </div>
    <div>
      <label>
        Username:
        <input type="text" value={userId} ref={idInputRef} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => handlePassWordVail(e)} />
        <div style={{ color: pwIs ? 'green' : 'red' }}>{pwMes}</div>
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      <button>회원가입</button>
    </div>
    </>
  );
}

