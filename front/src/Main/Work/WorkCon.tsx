import { useEffect, useState } from "react"
import { URLstate, UserDataState, WorkState } from "../../Store/Store"
import axios from "axios"
import WorkCompo from "./WorkCompo"
import WorkSearch from "./WorkSearch";
import WorkAddModal from "./WorkAddModal";
import ReactModal from "react-modal";

interface workinterface {
    workid : BigInt,
    memberid : string,
    storeid : BigInt,
    title : string,
    date : string
}

export default function WorkCon () {
    const {URL} = URLstate(state=>state)
    const {Storeid,Memberid} = UserDataState(state=>state)
    const {workList, setWorkList} = WorkState(state=>state)

    const [modalOpenis, setmodalOpenis] = useState(false)

    useEffect(()=>{
        const loadWorks = async () => {
            const workRes = await axios.get(`${URL}/work/boards/${Storeid}/0`)
            const works  = workRes.data.data.content
            console.log(works)
            setWorkList(works)
        }
        loadWorks()
    },[Memberid])

    const WriteAdd =() => {
        setmodalOpenis(true)
    }

    return (
        <div>
            <WorkSearch></WorkSearch>

            <button type="button" onClick={(e)=>{WriteAdd()}}>작성</button>

            <ReactModal
            ///// modal 설정
             isOpen={modalOpenis}
             onRequestClose={()=>setmodalOpenis(false)}
             ariaHideApp={false}
             shouldCloseOnOverlayClick={true}
            >
            <WorkAddModal></WorkAddModal>
            </ReactModal>  
  
            {workList && workList.map((value : workinterface)=>{
            return <WorkCompo key={value.workid?.toString()} title={value.title} date={value.date} workid={value.workid}></WorkCompo>
        })}
        </div>
    )
}