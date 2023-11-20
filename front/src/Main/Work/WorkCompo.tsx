
interface Workdata {
    title : String ; 
    date : String ;
}

export default function WorkCompo (props : Workdata) {


    return (
        <div>
            <div>{props.date}</div>
            <div>{props.title}</div>
        </div>
    )
}