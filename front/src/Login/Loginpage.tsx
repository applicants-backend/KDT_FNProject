import React, { useState } from 'react';
import Login from "./Login";
import UserTypeState from '../Store/Store';

export default function Loginpage() {
//   const [selectedType, setSelectedType] = useState<string | null>(null);

//   const handleTypeSelect = (type: string) => {
//     setSelectedType(type);
//   };

  const {UserType,setUserTypeAdmin, setUserTypeWorker} = UserTypeState(state => state)

  return (
    <>
      <button onClick={() => setUserTypeWorker()}>근로자 로그인</button>
      <button onClick={() => setUserTypeAdmin()}>사업자 로그인</button>

      {UserType && (
        <Login type={UserType} img={UserType=== "Worker" ? "/Img/WorkerImg.jpeg" : "/Img/CompanyImg.jpeg"} />
      )}
      {/* <Login type={"근로자"} img={"/Img/WorkerImg.jpeg"}></Login>
        <Login type={"사업자"} img={"/Img/CompanyImg.jpeg"}></Login> */}
    </>
  );
}
