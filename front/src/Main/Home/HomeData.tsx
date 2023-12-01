import axios from "axios"
import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState, WorkerListState } from "../../Store/Store"

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

            const PaymentMonthRes = await axios.post(UserType === 'admin' ? `${URL}/admin/allpayment`: `${URL}/allpayment`, UserType === 'admin' ? {memberid: Memberid,month} :{memberid: Memberid} )

            const FirstWorkRes = await axios.get(`${URL}/work/boards/${Storeid}/0`)

            if (FirstWorkRes && FirstWorkRes.data.data.content[0]?.workid) {
                const WorkListRes = await axios.get(`${URL}/work/boards/detail/${FirstWorkRes.data.data.content[0].workid}`);
                // 여기에 WorkListRes를 사용하는 코드 추가
                console.log(WorkListRes.data.data.contents)
                setChecked(WorkListRes.data.data.contents.filter((value : any) => value.checked !== null && value.checked.trim() !=='').length)
                setUnchecked(WorkListRes.data.data.contents.length)
              } 
            
            setAttend(AttendMonthRes.data.data)
            setPayment(PaymentMonthRes.data.data.month)
            

        }
        loadData()
    },[])



    return (
        UserType === 'user' ? (
        <div>
            <div>이번달 일한 시간은 ? {attend}</div>
            <div>이번달 예상 월급은 ? {payment}</div>
            <div>오늘 업무 일지 {checked} / {unchecked}</div>
        </div>
        ) : (
        <div>
            알바생 별 한달 출근 현황
            {attend &&
            Object.entries(attend).map(([key, value]: [string, string]) => {
            return (
                <div key={key}>
                <div>{key}</div>
                <div>{value}</div>
                </div>
            );
            })}
            <div>이번달 예상 월급은 ? {payment}</div>
           {unchecked && <div>오늘 업무 일지 {checked} / {unchecked}</div>}
        </div>
        )
  
    )
}