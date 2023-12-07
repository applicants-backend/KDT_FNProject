import axios from "axios"
import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState} from "../../Store/Store"
import './scss/HomeData.scss'

export default function HomeData () {
    const {URL} = URLstate(state=>state)
    const {UserType} = UserTypeState(state=>state)
    const {Memberid, Storeid} = UserDataState(state=>state)

    const [attend,setAttend] = useState<number | [string,string]>()
    const [payment,setPayment] = useState()

    const [checked, setChecked] = useState()
    const [unchecked, setUnchecked] = useState()

    useEffect(()=>{
        const loadData = async () => {
            const month =  new Date().getMonth()+1;

            const AttendMonthRes = await axios.get(UserType === 'admin' ? `${URL}/admin/attendance/data/${Memberid}/${Storeid}` : `${URL}/user/attendance/month/${Memberid}/${Storeid}` )
            const FirstWorkRes = await axios.get(`${URL}/work/boards/${Storeid}/0`)

          
            const PaymentMonthRes = UserType === 'admin'
            ? await axios.get(`${URL}/admin/allpayment/${Memberid}/${month}`)
            : await axios.post(`${URL}/allpayment`, { memberid: Memberid });
          
            if (FirstWorkRes && FirstWorkRes.data.data.content[0]?.workid) {
                const WorkListRes = await axios.get(`${URL}/work/boards/detail/${FirstWorkRes.data.data.content[0].workid}`);
                // 여기에 WorkListRes를 사용하는 코드 추가
                console.log(WorkListRes.data.data.contents)
                setChecked(WorkListRes.data.data.contents.filter((value : any) => value.checked !== null && value.checked.trim() !=='').length)
                setUnchecked(WorkListRes.data.data.contents.length)
              } 
            
            setAttend(AttendMonthRes.data.data)
            setPayment(UserType === 'admin' ? PaymentMonthRes.data.data : PaymentMonthRes.data.data.month)            

        }
        loadData()
    },[])

    function formatCurrency(amount : number) {
        const formatter = new Intl.NumberFormat('ko-KR', {
          style: 'currency',
          currency: 'KRW',
          currencyDisplay: 'code'
        });
      
        const formattedAmount = formatter.format(amount);
        return formattedAmount.slice(3); 
      }



    return (
        UserType === 'user' ? (
        <div className="HomeDataCon">
            
            <div><div className="info"><div className="material-symbols-outlined icon">work</div>이번달 일한 시간은 ? </div>
                <div>{attend}</div>
            </div>

            <div><div className="payinfo">
                <div className="material-symbols-outlined icon">payments</div>
                이번달 예상 월급은 ?
                </div> 
                <div>{formatCurrency(payment? payment : 0)}</div>
            </div>

            <div>
            <div className="workinfo">
                <div className="material-symbols-outlined icon">work_history</div>
                오늘 업무 일지
                </div>
                <div> {checked} / {unchecked}</div>
            </div>
        </div>
        ) : (
        <div className="HomeDataCon">

            <div className="attendance category">
                <div className="material-symbols-outlined icon">work</div>
                <div className="categoryName">
            알바생 별 한달 출근 현황
            </div>
                {attend &&
                Object.entries(attend).map(([key, value]: [string, string]) => {
                return (
                    <div key={key} className="Eachdata">
                        <div>{key}</div>
                        <div>{value} T</div>
                    </div>
                );
                })}
            </div>

            <div className="category">
                <div className="material-symbols-outlined icon">payments</div>
                <div className="categoryName">
                이번달 예상 월급은 ? 
                </div>
                <div className="data">{formatCurrency(payment ? payment : 0)}원</div>
            </div>

            <div className="category">
                <div className="material-symbols-outlined icon">work_history</div>
                <div className="catetgoryName">
                오늘 업무 일지 
                </div>
                <div className="data">{checked} / {unchecked}</div>
            </div>
        </div>
        )
  
    )
}