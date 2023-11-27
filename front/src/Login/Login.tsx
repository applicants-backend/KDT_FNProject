import { useState } from 'react';
import axios from 'axios';
import UserTypeState, { URLstate } from "../Store/Store";
import {UserDataState} from "../Store/Store";

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
  const { setMemberid, setStoreid, setToken, setName } = UserDataState(state => state); 

  const handleLogin = async () => {
    try {
      if (type === "admin") {
        setUserTypeAdmin();
      } else {
        setUserTypeUser();
      }
      const response = await axios.post(`${URL}/login`, { memberid, password });
      console.log('로그인', response);
  
      // 여기서 실제 성공 여부 확인
      if (response.status === 200 && response.data && response.data.data) {
        setMemberid(response.data.data.memberid);
        setStoreid(response.data.data.storeid);
        setToken(response.data.data.token);
        setName(response.data.data.name)
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
    </form>
    </>
  );
}

