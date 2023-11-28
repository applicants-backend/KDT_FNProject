import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"

interface UserPaypentinterface {
    payid : number,
    register : string,
    pay : string
}

interface AdminPaypentinterface {
    month : number,
    sum : number
}

export default function PaymentHistory () {
    const {URL} = URLstate(state=>state)
    const {Memberid} = UserDataState(state=>state)
    const {UserType} = UserTypeState(state=>state)

    const [paymentList, setPaymentList]= useState([])

    const [totalPage,setTotalPage] =useState<number>()
    const [page,setPage] = useState<number>(0)
    const [pageList,setpageList] =useState<number[]>()

    useEffect(()=>{
        const loadData = async () => {
            const Paymentres = await axios.get(UserType === "admin" ? `${URL}/admin/findall/${Memberid}/${page}` : `${URL}/user/findall/${Memberid}/${page}` )
            const RoadedPayment = Paymentres.data.data.content
            setPaymentList(RoadedPayment)
            setpageList(createArray(Paymentres.data.data.totalPages as number))
            setTotalPage(Paymentres.data.data.totalPages)
            console.log(RoadedPayment)
        }
        loadData()
    },[page])

    const renderPaginationButtons = () => {
        if (!pageList) return null;

        const BUTTONS_AROUND_CURRENT = 2;

        return pageList.map((pageNumber) => {
          const isCurrentPage = pageNumber === page +1;
          const shouldRenderButton =
            pageNumber  <= page +1 + BUTTONS_AROUND_CURRENT &&
            pageNumber  >= page +1 - BUTTONS_AROUND_CURRENT;
    
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
            (pageNumber === page + BUTTONS_AROUND_CURRENT + 2 && page + BUTTONS_AROUND_CURRENT + 2 !== totalPage) ||
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
      UserType === "user" ? (
        <div>
         {Array.isArray(paymentList) &&
        paymentList.map((value: UserPaypentinterface, index) => (
            <div key={value.payid}>
                <div>{value.pay}</div>
                <div>{value.register}</div>
            </div>
        ))}
            {renderPaginationButtons()}
        </div>
      ) : (
        <div>
        {Array.isArray(paymentList) &&
       paymentList.map((value: AdminPaypentinterface,index) => (
           <div key={index}>
               <div>{value.month}</div>
               <div>{value.sum}</div>
           </div>
       ))}
           {renderPaginationButtons()}
        </div>
      )

    )
}