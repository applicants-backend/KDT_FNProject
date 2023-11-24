import { useNavigate } from "react-router";
import UserTypeState from "../../Store/Store";

interface props {
    type : String;
    img : string;
}

export default function RegiSelectBox ({type,img} : props) {

    const {UserType,setUserTypeAdmin, setUserTypeUser} = UserTypeState(state => state)
    const navigate = useNavigate();
    const handleClick = () => {
        if (type === "사업자") {
            setUserTypeAdmin();
        } else {
            setUserTypeUser();
        }
        navigate('/register/information')
    };

    return (
        <div onClick={handleClick}>
            <div>{type}</div>
            <img src={img} alt={`${type} 이미지`}/>
            <button >{type}</button>
            <div>{UserType}</div>
        </div>
  
    )
}