interface props {
    Usertype : String;
    img : string;
}

export default function RegiSelectBox ({Usertype,img} : props) {

    function UsertypeSession(){
        
    }

    return (
        <div>
            <div>{Usertype}</div>
            <img src={img} alt={`${Usertype} 이미지`}/>
            <button>{Usertype}</button>
        </div>
    )
}