import Login from "./Login";
import UserTypeState from '../Store/Store';

export default function Loginpage() {

  const {UserType,setUserTypeAdmin, setUserTypeUser} = UserTypeState(state => state)

  return (
    <>
      <button onClick={() => setUserTypeUser()}>근로자 로그인</button>
      <button onClick={() => setUserTypeAdmin()}>사업자 로그인</button>

      {UserType && (
        <Login type={UserType} img={UserType=== "user" ? "/Img/WorkerImg.jpeg" : "/Img/CompanyImg.jpeg"} />
      )}
    </>
  );
}
