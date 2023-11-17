import { useState } from 'react';
import axios from 'axios';
import UserTypeState from "../Store/Store";
import {UserDataState} from "../Store/Store";

interface props {
  type : String;
  img : string;
}

export default function Login({type, img} : props) {
  const [memberId, setMemberId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {UserType,setUserTypeAdmin, setUserTypeWorker} = UserTypeState(state => state)
  const { setMemberid, setStoreid, setToken } = UserDataState(state => state); 


  const handleLogin = async () => {
    try {
      if (type === "사업자") {
        setUserTypeAdmin();
      } else {
        setUserTypeWorker();
      }
      const response = await axios.post(`/${UserType}/login`, { memberId, password });
      console.log('로그인', response.data);
      if(response.data.result){
        setMemberid(response.data.member.memberid);
        setStoreid(response.data.member.storeid);
        setToken(response.data.token);
      }
    } catch (error) {
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
    }
  };


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
        <input type="text" value={memberId} onChange={(e) => setMemberId(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      <button>회원가입</button>
    </div>
    </>
  );
}

