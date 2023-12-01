import { FC } from "react";
import Login from "./Login";
import UserTypeState from '../Store/Store';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./scss/LoginPage.scss"

export default function Loginpage (): ReturnType<FC> {

  const { UserType, setUserTypeAdmin, setUserTypeUser } = UserTypeState(state => state)

  const navigate = useNavigate();
  const LoginSuccess = () => {
    navigate('/')
    window.location.reload();
  }
  const handleRegister = () => {
    // 회원가입 버튼 클릭 시에 '/register' 페이지로 이동
    navigate('/register');
  };

  return (
    <div className="login-wrap">
      <div className="login-contents-box">
            <h2 className="login-logo">
                <Link to={"/"}> 
                  <img src="https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/logo_black_small.png" alt="logo"/>
                </Link>
            </h2>
            <div className='login-type-image'>
                {UserType === "user"? 
                    <img src="https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/worker_512.png" alt={`${UserType} 이미지`}/>
                    :   
                    <img src={"https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/company_512.png"} alt={`${UserType} 이미지`}/>
                }
            </div>
            <div className="login-type-tab">
                <div className={UserType=== "user" ? "on" : ""} onClick={() => setUserTypeUser()}> 근로자 </div>
                <div className={UserType=== "admin" ? "on" : ""} onClick={() => setUserTypeAdmin()}> 시업자 </div>
            </div>
            {UserType && (
                <Login type={UserType} img={UserType=== "user" ? "/Img/WorkerImg.jpeg" : "/Img/CompanyImg.jpeg"} 
                onLoginSuccess={LoginSuccess} />
            )}
            <button className="join-button" type="button" onClick={handleRegister}>회원가입</button>
      </div>
    </div>
  );
}
