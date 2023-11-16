interface props {
    name :string;
    root :string;
}


export default function NaviCompo ({name,root}:props) {
    return(
        <div>
           {name} 
        </div>
    )
}