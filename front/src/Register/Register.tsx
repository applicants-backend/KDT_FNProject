
import { FC } from "react";
import RegiInformation from "./RegiInformation/RegiInformation";
import "./scss/Register.scss"
import { useNavigate } from "react-router"

export default function Register () : ReturnType<FC> {
    const navigate = useNavigate();
    return (

        <div className="register-wrap">
            <div className="register_contents-box">
                <h2 className="register-title">회원가입</h2>
                <div className="register-back material-symbols-outlined" onClick={() =>navigate('/')}>close</div>
                <RegiInformation/>
            </div>
        </div>
    )

}