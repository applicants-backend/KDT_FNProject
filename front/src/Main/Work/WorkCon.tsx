import { useEffect, useMemo, useState } from "react"
import UserTypeState, { URLstate, UserDataState, WorkState } from "../../Store/Store"
import axios from "axios"
import WorkCompo from "./WorkCompo"
import WorkAddModal from "./WorkAddModal";
import ReactModal from "react-modal";
import './scss/WorkCon.scss'
import WorkModalStyles from "./scss/Modal";
interface workinterface {
    workid : number,
    memberid : string, 
    storeid : number,
    title : string,
    date : string
}

export default function WorkCon () {
    const {URL} = URLstate(state=>state)
    const {Storeid,Memberid} = UserDataState(state=>state)
    const {UserType} = UserTypeState(state=>state)
    const {workList, setWorkList,add} = WorkState(state=>state)

    const [modalOpenis, setmodalOpenis] = useState(false)
    const [totalPage,setTotalPage] =useState<number>()
    const [page,setPage] = useState<number>(0)
    const [pageList,setpageList] =useState<number[]>()

    const [keyword, setKeyword] = useState<String>()

    useEffect(()=>{
        const loadWorks = async () => {
            try {
              if(keyword){
                const workRes = await axios.get(`${URL}/work/boards/${Storeid}/${keyword}/${page}`)
                const works  = workRes.data.data.content
                const totalPage = workRes.data.data.totalPages
                  setTotalPage(totalPage)
                  setpageList(createArray(totalPage))
                  if(works && Array.isArray(works)){
                      console.log(works)
                      setWorkList(works)
                  }
              } else {
                const workRes = await axios.get(`${URL}/work/boards/${Storeid}/${page}`)
                const works  = workRes.data.data.content
                const totalPage = workRes.data.data.totalPages
                  setTotalPage(totalPage)
                  setpageList(createArray(totalPage))
                  if(works && Array.isArray(works)){
                      console.log(works)
                      setWorkList(works)
                  }
              }
            } catch (error) {
                console.log(error)
            }
        }
        loadWorks()
    },[Memberid,add,page,keyword])

    const WriteAdd =() => {
        setmodalOpenis(true)
    }

    const pageHandle =(respage : number) => {
        setPage(respage)
    }
    function createArray(length : number) {
        return Array.from({ length }, (_,index : number) => index + 1);
    }
      const renderPaginationButtons = () => {
        if (!pageList) return null;

        const BUTTONS_AROUND_CURRENT = 5;

        return pageList.map((pageNumber) => {
          const isCurrentPage = pageNumber === page + 1;
          const shouldRenderButton =
            pageNumber <= page +1 + BUTTONS_AROUND_CURRENT &&
            pageNumber >= page +1 - BUTTONS_AROUND_CURRENT;
    
          if (shouldRenderButton) {
            return (
              <button
                key={pageNumber}
                onClick={() => pageHandle(pageNumber - 1)}
                style={{ fontWeight: isCurrentPage ? "bold" : "normal" }}
                className="pagination-button"
              >
                {pageNumber}
              </button>
            );
          } else if (
            (pageNumber === page + BUTTONS_AROUND_CURRENT + 1 && page + BUTTONS_AROUND_CURRENT + 1 !== totalPage) ||
            (pageNumber === page - BUTTONS_AROUND_CURRENT - 1 && page - BUTTONS_AROUND_CURRENT - 1 !== 0)
          ) {
            // 현재 페이지 주위에 있는 버튼이 아닌 경우, 생략된 페이지를 나타내는 버튼을 추가
            return <span key={pageNumber}>...</span>;
          } else {
            return null; // 현재 페이지 주위에 있는 버튼이 아니고, 생략된 페이지를 나타내는 버튼도 아닌 경우, null 반환
          }
        });
      };

    return (
        <>
          <div className="searchform">
            <div>업무일지</div>
            <input onChange={(e)=>{setKeyword(e.target.value)}} placeholder="Search"/>
          </div>

          <div className="moccha">
            <div className="date">작성시간</div>
            <div className="title">제목</div>
            <div className="todo">업무 현황</div>
          </div>


            <ReactModal
            ///// modal 설정
            isOpen={modalOpenis}
            onRequestClose={()=>setmodalOpenis(false)}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={true}
            style={WorkModalStyles}
            >
            <WorkAddModal></WorkAddModal>
            </ReactModal>  
  
            {workList.length === 0 ?(
              <div>업무일지가 없습니다.</div>
              )
              : workList.map((value : workinterface)=>{
                if (!value) {
                  return null; // 또는 다른 처리를 수행하고 싶은 로직 추가
                }
                return <WorkCompo key={value.workid} title={value.title} date={value.date} workid={value.workid}></WorkCompo>
              })}
            <div className="bottom">
              <div></div>
              <div>
            {renderPaginationButtons()}
              </div>
              {UserType === 'admin' ? 
              <button type="button" onClick={(e)=>{WriteAdd()}} className="writeButton">작성</button>
              : <></>
              }
            </div>
        </>
    )
}