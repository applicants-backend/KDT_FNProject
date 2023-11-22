import { useEffect, useState } from "react"
import { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"

interface Datainterface {
    thisweek : string,
    thismonth : string,
    comparemonth : string,

}

export default function PaymentCon () {
    const {URL} = URLstate(state=>state)
    const [PaymentData, setPaymentData] = useState<Datainterface>()
    const {Memberid} = UserDataState(state=>state)
    const [Color,setColor] = useState(true)

    useEffect(()=>{
        const loadData = async () =>{
            const PaymentdataRes = await axios.get(`${URL}/paymentdata/${Memberid}`)
            const PaymentDatares = PaymentdataRes.data
            setPaymentData(PaymentDatares)
            if (PaymentDatares?.comparemonth.includes('-')){
                setColor(false)
            }
        }
        loadData()
    },[])


    return (
        <div>
            <div>
                이번주 일한 시간
                <div>{PaymentData?.thisweek}</div>
            </div>          
            <div>
                이번달 일한 시간
                <div>{PaymentData?.thismonth}</div>
            </div> 
            <div>지난 달에 비해 얼마나 더 일했지?</div>
            <div>
                <div>{PaymentData?.comparemonth}</div>
                <div color={Color ? "green" : "red"}>{Color ? "늘었어요!" : "줄었어요!"}</div>
            </div> 
        </div>
    )
}