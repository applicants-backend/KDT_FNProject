import { useEffect, useState } from "react"
import CommentCompo from "./CommentCompo"
import { CommentState, URLstate, UserDataState, WorkState } from "../Store/Store"
import axios from "axios"


interface Commentinterface {
    commentid : BigInt,
    name : string,
    comment : string
}

export default function CommentCon () {
    const {URL} = URLstate(state=>state)
    const {commentList,setCommentList} = CommentState(state=>state)

    const {Name} = UserDataState(state=>state)
    const [inpustComment, setInputComment] = useState<string>()

    const {workId} = WorkState(state=>state)
    const {Memberid} =UserDataState(state=>state)

    const ADDComment =  async() => {
        try {
            const AddComRes = await axios.post(`${URL}/work/commnet/create`,{workid : workId, memberid : Memberid, contents : inpustComment})
            const Addcomment = AddComRes.data.data
            console.log(AddComRes)
            // setCommentList([...commentList,Addcomment])    
        } catch (error) {
            console.log(error)
        }
    }
    const handleKeyDown = (event : React.KeyboardEvent) => {
        if (event.key === "Enter") {
            ADDComment();
        }
    };

    useEffect(()=>{
        const loadComment = async () => {
        try{
            const loadedCommentRes = await axios.get(`${URL}/work/boards/detail/${workId}`)
            const loadedComment = loadedCommentRes.data.data.comment

            if (loadedComment && Array.isArray(loadedComment)) {
                setCommentList(loadedComment);
                console.log(loadComment)
            } 
        } catch (error) {
            // 오류 처리
            console.error("Error loading contents:", error);
        }
        }
    },[])

    return (
        <div>
            {commentList.map((value : Commentinterface)=>{
                return <CommentCompo key={value.commentid?.toString()} name={value.name} comment={value.comment} commentid={value.commentid}></CommentCompo>
            })}

            <input type="text" onChange={e=>setInputComment(e.target.value)} onKeyDown={handleKeyDown}/>
            <button type="button" onClick={ADDComment}>댓글달기</button>
        </div>
    )
}