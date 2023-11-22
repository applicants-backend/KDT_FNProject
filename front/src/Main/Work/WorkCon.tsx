import { useEffect, useState } from "react"
import { URLstate, UserDataState, WorkState } from "../../Store/Store"
import axios from "axios"
import WorkCompo from "./WorkCompo"
import WorkSearch from "./WorkSearch";
import WorkAddModal from "./WorkAddModal";
import ReactModal from "react-modal";

interface Workdata {
    workid : BigInt ;
    title : string ; 
    date : string ;
}

export default function WorkCon () {
    const {URL} = URLstate(state=>state)
    const {Storeid} = UserDataState(state=>state)
    const {workList, setWorkList} = WorkState(state=>state)

    const [modalOpenis, setmodalOpenis] = useState(false)

    useEffect(()=>{
        const loadWorks = async () => {
            const workRes = await axios.get(`${URL}/work/${Storeid}`)
            const works  = workRes.data
            setWorkList(works)
        }
        loadWorks()
    })

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
  
            {workList.map((value : Workdata)=>{
                return <WorkCompo key={value.workid.toString()} title={value.title} date={value.date} workid={value.workid}></WorkCompo>
            })}
        </div>
    )
}