import axios from "axios"
import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState, WorkerListState } from "../../Store/Store"

export default function HomeData () {
    const {URL} = URLstate(state=>state)
    const {UserType} = UserTypeState(state=>state)
    const {Memberid, Storeid} = UserDataState(state=>state)

    const [attend,setAttend] = useState()
    const [payment,setPayment] = useState()

    useEffect(()=>{
        const loadData = async () => {
            const month =  new Date().getMonth()+1;

            const AttendMonthRes = await axios.get(UserType === 'admin' ? `${URL}/admin/attendance/month/${Memberid}/${Storeid}` : `${URL}/user/attendance/month/${Memberid}/${Storeid}` )
            setAttend(AttendMonthRes.data.data)
            const PaymentMonthRes = await axios.post(UserType === 'admin' ? `${URL}/admin/allpayment`: `${URL}/allpayment`, UserType === 'admin' ? {memberid: Memberid,month} :{memberid: Memberid} )
            setPayment(PaymentMonthRes.data.data)
        }
        loadData()
    },[])



    return (
        <div>
            <div>{attend}</div>
            <div>{payment}</div>
            <div></div>
        </div>
    )
}