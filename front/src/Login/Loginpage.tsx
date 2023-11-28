import { FC } from "react";
import Login from "./Login";
import UserTypeState from '../Store/Store';
import { useNavigate } from "react-router";

export default function Loginpage (): ReturnType<FC> {
  const {UserType,setUserTypeAdmin, setUserTypeUser} = UserTypeState(state => state)

  const navigate = useNavigate();
  const LoginSuccess = () => {
    navigate('/main')
  }
  const handleRegister = () => {
    // 회원가입 버튼 클릭 시에 '/register' 페이지로 이동
    navigate('/register');
  };

  return (
    <>
      <button type="button" onClick={() => setUserTypeUser()}>근로자 로그인</button>
      <button type="button" onClick={() => setUserTypeAdmin()}>사업자 로그인</button>

      {UserType && (
        <Login type={UserType} img={UserType=== "user" ? "/Img/WorkerImg.jpeg" : "/Img/CompanyImg.jpeg"} onLoginSuccess={LoginSuccess} />
      )}
      <button type="button" onClick={handleRegister}>회원가입</button>
    </>
  );
}
