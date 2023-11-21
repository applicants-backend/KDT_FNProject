import { useState } from "react"
import CommentCompo from "./CommentCompo"
import UserTypeState, { CommentState, URLstate, UserDataState } from "../Store/Store"
import axios from "axios"


interface Commentinterface {
    commentid : BigInt,
    name : string,
    comment : string
}

export default function CommentCon () {

    const {commentList,setCommentList} = CommentState(state=>state)

    const {Name} = UserDataState(state=>state)
    const [inpustComment, setInputComment] = useState<string>()

    const ADDComment =  async() => {
        const AddComRes = await axios.post(`${URLstate}/comment/add`,{Name,comment : inpustComment})
        const Addcomment = AddComRes.data
        setCommentList([...commentList,Addcomment])
    }
    const handleKeyDown = (event : React.KeyboardEvent) => {
        if (event.key === "Enter") {
            ADDComment();
        }
    };

    return (
        <div>
            {commentList.map((value : Commentinterface)=>{
                return <CommentCompo key={value.commentid.toString()} name={value.name} comment={value.comment} commentid={value.commentid}></CommentCompo>
            })}

            <input type="text" onChange={e=>setInputComment(e.target.value)} onKeyDown={handleKeyDown}/>
            <button type="button" onClick={ADDComment}>댓글달기</button>
        </div>
    )
}