import { useState, FocusEvent } from 'react';
import axios from 'axios';
import UserTypeState, { URLstate } from "../Store/Store";
import {UserDataState} from "../Store/Store";

import { Cookies } from 'react-cookie';

import { Link } from "react-router-dom"
import "./scss/Login.scss"
interface props {
  type : String;
  img : string;
  onLoginSuccess: () => void;
}

export default function Login({type, img, onLoginSuccess} : props) {


  const [memberid, setMemberId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {URL} =URLstate(state=>state)
  const {UserType,setUserTypeAdmin, setUserTypeUser} = UserTypeState(state => state)
  const { setMemberid, setStoreid, setName } = UserDataState(state => state); 

  const cookies = new Cookies();

  const handleLogin = async () => {
    try {
      if (type === "admin") {
        setUserTypeAdmin();
      } else {
        setUserTypeUser();
      }
      const response = await axios.post(`${URL}/login`, { memberid, password, role : UserType === 'admin'?'ADMIN': 'USER' });
  
      // 여기서 실제 성공 여부 확인
      if (response.status === 200 && response.data && response.data.data) {

        setMemberid(response.data.data.memberid);
        setStoreid(response.data.data.storeid);
        setName(response.data.data.name)
        cookies.set("token",response.data.data.token);

        onLoginSuccess();
      } else {
        // 성공하지 않았을 때 에러 콘솔 출력
        console.error('로그인 실패. 응답:', response);
        alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
      }
    } catch (error) {
      // 에러 콘솔 출력
      console.error('로그인 에러:', error);
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
    }
  };
  
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

 

  return (
    <>
        <form className='login-form-box'>
            <div>
                <label>Username :</label>
                <input type="text" 
                    onFocus={(e) => onfocusBluer(e,"focus")}
                    onBlur={(e) => onfocusBluer(e,"blur")}
                    value={memberid} onChange={(e) => setMemberId(e.target.value)} />
            </div>
            <div>   
                <label>Password :</label>
                <input type="password" 
                        onFocus={(e) => onfocusBluer(e,"focus")}
                        onBlur={(e) => onfocusBluer(e,"blur")}
                        onKeyDown={(e) => { if (e.key === "Enter") handleLogin()}}
                        value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
            </div>
        </form>
        <span className='login-findpassword'>
            비밀번호를 잊으셨나요? <b><Link to={"/findPassword"}>비밀번호 찾기</Link></b>
        </span>
        <button className='login-button' type='button' onClick={handleLogin}>로그인</button>
    </>
  );
}

