import { useEffect, useState } from "react"
import CommentCompo from "./CommentCompo"
import { CommentState, URLstate, UserDataState, WorkState } from "../Store/Store"
import axios from "axios"
import './scss/CommentCon.scss'


interface Commentinterface {
    commentid : number,
    name : string,
    comment : string
}

export default function CommentCon () {
    const {URL} = URLstate(state=>state)
    const {commentList,setCommentList} = CommentState(state=>state)

    const {Name} = UserDataState(state=>state)
    const [inpustComment, setInputComment] = useState<string>("")

    const {workId} = WorkState(state=>state)
    const {Memberid} =UserDataState(state=>state)

    const ADDComment =  async() => {
            const AddComRes = await axios.post(`${URL}/work/comment/create`,{workid : workId, memberid : Memberid, comment : inpustComment, name :Name})
            const Addcomment : Commentinterface = AddComRes.data.data
            console.log(AddComRes)
            setCommentList([Addcomment,...commentList]);
    }
    
    const handleKeyDown = (event : React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault()
            ADDComment();
            setInputComment("")
        }
    };

    useEffect(()=>{
        const loadComment = async () => {
        try{
            const loadedCommentRes = await axios.get(`${URL}/work/boards/detail/${workId}`)
                const loadedComment = loadedCommentRes.data.data.comment
                setCommentList(loadedComment);
        } catch (error) {
            // 오류 처리
            console.error("Error loading contents:", error);
        }}
        loadComment()
    },[])

    return (
        <div className="CommentContaniner">
            <div className="CommentCon">
                {commentList.map((value : Commentinterface)=>{
                    return <CommentCompo key={value.commentid?.toString()} name={value.name} comment={value.comment} commentid={value.commentid}></CommentCompo>
                })}
            </div>
            
            <div className="Bottom">
                <div className="name">{Name}</div>
                <input type="text" value={inpustComment} onChange={e=>setInputComment(e.target.value)} onKeyDown={e=>handleKeyDown(e)}/>
                <button type="button" onClick={ADDComment}>댓글달기</button>
            </div>
        </div>
    )
}