import { Link } from "react-router-dom";
import "./scss/Error.scss"

export default function Error(){
    return (
        <>
            <div className="ErrorContainer">
                <h1>404</h1>
                <h2>죄송합니다,요청하신 페이지를 찾을 수 없습니다.</h2>
                <Link to="/" className="Link">홈으로 가기</Link>
            </div>
        </>
    )
    
}