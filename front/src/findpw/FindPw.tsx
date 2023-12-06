
import { FC ,FocusEvent, ChangeEvent, useState } from 'react';
import { useNavigate } from "react-router";
import "./scss/FindPw.scss";
import axios from 'axios';
import { URLstate } from '../Store/Store';

export default function FindPw () : ReturnType<FC> {
    const {URL} =URLstate(state=>state)
    const navigate = useNavigate();

    const [username, setUsername] =useState<string>("")
    const [successIs, setsuccessIs] = useState<boolean>(false)

    const findPw =  async () => {
        const findPwRes = await axios.post(`${URL}/findPassword`,{memberid : username})
        if(findPwRes.data.data) {
            setsuccessIs(true)
        }

    }

    const changeInput = (e:ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setUsername(value)
    }

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

    const backFunc = () => {
        navigate('/')

    }

    return (
        <div className="findPw-wrap">
            <div className='findPw-contents-box'>
                <h2>비밀번호 찾기</h2>
                    {!successIs ?(       
                        <div>
                            <label>Username :</label>
                            <input type="text" 
                            onFocus={(e) => onfocusBluer(e,"focus")}
                            onBlur={(e) => onfocusBluer(e,"blur")}
                            onChange={(e) => changeInput(e)} />
                        </div>):
                             (
                            <div>
                                가입된 이메일로 임시 비밀번호가 발송되었습니다.
                            </div>)
                    }   
               

                <button className='back-button' type='button' onClick={backFunc}>뒤로 가기</button>
                <button className='find-button' type='button' onClick={findPw}>비밀번호 찾기</button>
            </div>
        </div>
    )
}