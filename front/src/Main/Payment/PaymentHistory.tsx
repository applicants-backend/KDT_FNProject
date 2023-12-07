import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"
import './scss/PaymentHistory.scss'

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

    const [totalPage,setTotalPage] =useState<number>(0)
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
            <div>
              <span key="prev">...</span>
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
            <div>
              <button
                onClick={() => pageHandle(pageNumber - 1)}
                style={{ fontWeight: isCurrentPage ? "bold" : "normal" }}
                className="pagination-button"
              >
                {pageNumber}
              </button>
              <span key="next">...</span>
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
    function formatCurrency(amount : number) {
      const formatter = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        currencyDisplay: 'code'
      });
    
      const formattedAmount = formatter.format(amount);
      return formattedAmount.slice(3); 
    }

    function formatDateString(inputDateString : string) {
      const date = new Date(inputDateString);
      
      const year = String(date.getFullYear()).substring(2);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
  
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }


    return (
      UserType === "user" ? (
        <div className="PaymentHistory">

        <div className="top">
          <div>날짜</div>
          <div>합계</div>
        </div>
         {Array.isArray(paymentList) &&
        paymentList.map((value: UserPaypentinterface, index) => (
            <div key={value.payid} className="contents">
                <div>{formatDateString(value.register)}</div>
                <div>{formatCurrency(value.pay as unknown as number)}원</div>
            </div>
        ))}
          <div className="bottom">
          {renderPaginationButtons()}
          </div>
           
        </div>
      ) : (
        <div className="PaymentHistory">

          <div className="top">
            <div>월</div>
            <div>합계</div>
          </div>

          {Array.isArray(paymentList) &&
            paymentList.map((value: AdminPaypentinterface,index) => (
                <div key={index} className="contents">
                    <div>{value.month}</div>
                    <div>{formatCurrency(value.sum)}원</div>
                </div>
          ))}

          <div className="bottom">
            {renderPaginationButtons()}
          </div>
      
        </div>
      )

    )
}