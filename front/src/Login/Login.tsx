import { useState } from 'react';
import axios from 'axios';
import UserTypeState, { URLstate } from "../Store/Store";
import {UserDataState} from "../Store/Store";

interface props {
  type : String;
  img : string;
}

export default function Login({type, img} : props) {
  const [memberid, setMemberId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {URL} =URLstate(state=>state)
  const {UserType,setUserTypeAdmin, setUserTypeUser} = UserTypeState(state => state)
  const { setMemberid, setStoreid, setToken } = UserDataState(state => state); 


  const handleLogin = async () => {
    try {
      if (type === "사업자") {
        setUserTypeAdmin();
      } else {
        setUserTypeUser();
      }
      const response = await axios.post(`${URL}/login`, { memberid, password });
      console.log('로그인', response);
      if(response.data){
        setMemberid(response.data.data.memberid);
        setStoreid(response.data.data.storeid);
        setToken(response.data.data.token);
      }   
    } catch (error) {
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
    }
  };


  return (
    <>
    <div onClick={type ===  "사업자"? setUserTypeAdmin : setUserTypeUser}>
            <div>{type}</div>
            <img src={img} alt={`${type} 이미지`}/>
            <button >{type}</button>
            <div>{UserType}</div>
        </div>
    <form>
      <label>
        Username:
        <input type="text" value={memberid} onChange={(e) => setMemberId(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type='button' onClick={handleLogin}>Login</button>
      <button>회원가입</button>
    </form>
    </>
  );
}

