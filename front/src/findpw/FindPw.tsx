
import { FC ,FocusEvent, ChangeEvent } from 'react';
import { useNavigate } from "react-router";
import "./scss/FindPw.scss";

export default function FindPw () : ReturnType<FC> {

    const navigate = useNavigate();

    const findPw =  async () => {


    }

    const changeInput = (e:ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target


    }

    const onfocusBluer = (e:FocusEvent<HTMLInputElement>, type:string) => {

        if (type === "focus" && e.target.parentElement) {
            e.target.parentElement.style.borderColor = "rgb(94, 53, 177)";
        }
        if (type === "blur" && e.target.parentElement) {
            e.target.parentElement.style.borderColor = "#ccc";
        }
    }

    const backFunc = () => {
        navigate('/')

    }

    return (
        <div className="findPw-wrap">
            <div className='findPw-contents-box'>
                <h2>비밀번호 찾기</h2>
                <div>
                    <label>Username :</label>
                    <input type="text" 
                        onFocus={(e) => onfocusBluer(e,"focus")}
                        onBlur={(e) => onfocusBluer(e,"blur")}
                        onChange={(e) => changeInput(e)} />
                </div>

                <button className='back-button' type='button' onClick={backFunc}>뒤로 가기</button>
                <button className='find-button' type='button' onClick={findPw}>비밀번호 찾기</button>
            </div>
        </div>
    )
}