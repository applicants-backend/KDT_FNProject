import axios from "axios"
import { CommentState, URLstate } from "../Store/Store"

interface Commentinterface {
    commentid : BigInt,
    name : string,
    comment : string
}


export default function CommentCompo (props : Commentinterface) {
    const {commentList, setCommentList} = CommentState(state=>state)
    
    const DeleteComment = () => {
        const DelRes = axios.delete(`${URLstate}/comment/delete${props.commentid}`)
        const DeletedList = commentList.filter((comments : Commentinterface) => comments.commentid !== props.commentid)
        setCommentList(DeletedList)
    }
    
    return (
        <div>
            <div>{props.name}</div>
            <div>{props.comment}</div>
            <button type="button" onClick={DeleteComment}>삭제하기</button>
        </div>
    )
}