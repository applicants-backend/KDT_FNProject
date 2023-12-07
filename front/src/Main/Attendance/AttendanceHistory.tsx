import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"
import HistoryCompo from "./HistoryCompo"
import './scss/History.scss'

interface Attendinterface {
   attendid : number,
   worker : string,
   gowork : string,
   leavework : string,
   wage : string,
   confirm : number
}

export default function AttendanceHistory () {
    const {URL} = URLstate(state=>state)
    const {UserType} = UserTypeState(state=>state)
    const {Memberid, Storeid} = UserDataState(state=>state)

    const [AttendList, setAttendList]= useState<Attendinterface[]>([])

    const [totalPage,setTotalPage] =useState<number>(0)
    const [page,setPage] = useState<number>(0)
    const [pageList,setpageList] =useState<number[]>()


    useEffect(()=>{
        const loadData = async () => {
            const Attendres = await axios.get(UserType === "admin"? `${URL}/admin/attendance/${Memberid}/${Storeid}/${page}` :`${URL}/user/attendance/${Memberid}/${Storeid}/${page}` )
            console.log(Attendres.data.data)
            const RoadedAttend = Attendres.data.data.content
            console.log(Attendres.data.data.content)
            const totalPage = Attendres.data.data.totalPages
            setTotalPage(totalPage)
            setpageList(createArray(totalPage))
            if(RoadedAttend && Array.isArray(RoadedAttend)){
                setAttendList(RoadedAttend)
            }
        }
        loadData()
    },[page])

    const renderPaginationButtons = () => {
      if (!pageList) return null;
    
      const BUTTONS_AROUND_CURRENT = 2;
    
      let startPage = page + 1 - BUTTONS_AROUND_CURRENT;
      let endPage = page + 1 + BUTTONS_AROUND_CURRENT;
    
      // 최소 5개의 페이지가 보이도록 보정
      if (endPage - startPage < 4) {
        endPage += 4 - (endPage - startPage);
      }
    
      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(totalPage as number, startPage + BUTTONS_AROUND_CURRENT * 2);
      }
    
      if (endPage > totalPage) {
        endPage = totalPage;
        startPage = Math.max(1, endPage - BUTTONS_AROUND_CURRENT * 2);
      }
    
      return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => {
        const isCurrentPage = pageNumber === page + 1;
    
        if (pageNumber === startPage && pageNumber !== 1) {
          return (
            <div style={{display:"flex", alignItems:"center"}}>
              <button
                onClick={() => pageHandle(pageNumber - 1)}
                style={{ fontWeight: isCurrentPage ? "bold" : "normal" }}
                className="pagination-button"
              >
                {pageNumber}
              </button>
            </div>
          );
        } else if (pageNumber === endPage && pageNumber !== totalPage) {
          return (
            <div style={{display:"flex", alignItems:"center"}}>
              <button
                onClick={() => pageHandle(pageNumber - 1)}
                style={{ fontWeight: isCurrentPage ? "bold" : "normal" }}
                className="pagination-button"
              >
                {pageNumber}
              </button>
            </div>
          );
        } else {
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
        }
      });
    };

      const pageHandle =(respage : number) => {
        setPage(respage)
    }

    function createArray(length : number) {
        return Array.from({ length }, (_,index : number) => index + 1);
    }


    return (
      <div className="History">

        <div className="top">
          <div>이름</div>
          <div>출근시간</div>
          <div>퇴근시간</div>
          <div>시급</div>
          <div className="unConfirm">승인현황</div>
        </div>

        {AttendList.map((value: Attendinterface) => {
            return (
              <HistoryCompo key={value.attendid} attendid={value.attendid} worker={value.worker} gowork={value.gowork} 
                            leavework={value.leavework} wage={value.wage} confirm={value.confirm}
              ></HistoryCompo>
            );
        })}

        
        <div className="bottom">
          {renderPaginationButtons()}
        </div>
 
    </div>
    )
}