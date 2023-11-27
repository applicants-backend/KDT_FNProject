import axios from "axios"
import { CommentState, URLstate, UserDataState } from "../Store/Store"
import { useState } from "react"

interface Commentinterface {
    commentid : number,
    name : string,
    comment : string
}


export default function CommentCompo (props : Commentinterface) {
    const {URL} = URLstate(state=>state)
    const {commentList, setCommentList} = CommentState(state=>state)
    const {Memberid,Name} = UserDataState(state=>state)

    const [editIs,setEditIs] = useState<boolean>(true)
    const [Comment, setComment] =useState(props.comment)
    
    const DeleteComment = () => {
        const DelRes = axios.delete(`${URL}/work/comment/delete/${props.commentid}`)
        const DeletedList = commentList.filter((comments : Commentinterface) => comments.commentid !== props.commentid)
        setCommentList(DeletedList)
    }

    const EditCommentIs = () => {
        setEditIs(false)
    }
    const EditComment = async() => {
        const EditRes = await axios.patch(`${URL}/work/comment/update`,{memberid : Memberid,commentid : props.commentid, comment : Comment, name : Name})
        console.log(EditRes)
        const EditedComment = EditRes.data.data.comment
        setComment(EditedComment)
        setEditIs(true)
    }
    const handleKeyDown = (event : React.KeyboardEvent) => {
        if (event.key === "Enter") {
            EditComment();
        }
    };
    
    return (
        <div key={props.commentid}>
            <div>{props.name}</div>
            {editIs ? <div>{Comment}</div> : <input type="text" value={Comment} onChange={e=>setComment(e.target.value)} onKeyDown={handleKeyDown}/> }
            <button type="button" onClick={EditCommentIs}>수정하기</button>
            <button type="button" onClick={DeleteComment}>삭제하기</button>
        </div>
    )
}