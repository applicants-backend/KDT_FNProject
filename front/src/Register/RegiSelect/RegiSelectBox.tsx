import UserTypeState from "../../Store/Store";

interface props {
    type : String;
    img : string;
}

export default function RegiSelectBox ({type,img} : props) {

    const {UserType,setUserTypeAdmin, setUserTypeUser} = UserTypeState(state => state)
  

    return (
        <div onClick={type ===  "사업자"? setUserTypeAdmin : setUserTypeUser}>
            <div>{type}</div>
            <img src={img} alt={`${type} 이미지`}/>
            <button >{type}</button>
            <div>{UserType}</div>
        </div>
  
    )
}