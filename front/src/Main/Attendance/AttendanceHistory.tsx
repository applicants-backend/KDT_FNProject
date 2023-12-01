import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"
import HistoryCompo from "./HistoryCompo"

interface Attendinterface {
   attendid : number,
   worker : string,
   gowork : string,
   leavework : string,
   wage : string,
   comfirm : number
}

export default function AttendanceHistory () {
    const {URL} = URLstate(state=>state)
    const {UserType} = UserTypeState(state=>state)
    const {Memberid, Storeid} = UserDataState(state=>state)

    const [AttendList, setAttendList]= useState<Attendinterface[]>([])

    const [totalPage,setTotalPage] =useState<number>()
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

      const pageHandle =(respage : number) => {
        setPage(respage)
    }

    function createArray(length : number) {
        return Array.from({ length }, (_,index : number) => index + 1);
    }



    return (
      <div>
      {AttendList.map((value: Attendinterface) => {
        if (value.gowork && value.leavework) {
          return (
            <HistoryCompo attendid={value.attendid} worker={value.worker} gowork={value.worker} 
                          leavework={value.leavework} wage={value.wage} comfirm={value.comfirm}
            ></HistoryCompo>
          );
        }
        return null; // 조건을 만족하지 않으면 null 반환
      })}
      {renderPaginationButtons()}
    </div>
    )
}