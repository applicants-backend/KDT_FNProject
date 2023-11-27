import { useEffect, useState } from "react"
import { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"

interface Datainterface {
    week : number,
    month : number
}
interface Percentinterface {
    month : number
}

export default function PaymentCon () {
    const {URL} = URLstate(state=>state)
    const [PaymentData, setPaymentData] = useState<Datainterface>()
    const [PercentData, setPercentData] = useState<Percentinterface>()
    const {Memberid} = UserDataState(state=>state)
    const [Color,setColor] = useState(true)

    useEffect(()=>{
        const loadData = async () =>{
            const PaymentdataRes = await axios.post(`${URL}/allpayment`, {memberid: Memberid})
            const CompareDataRes = await axios.post(`${URL}/percent`, {memberid: Memberid})
            console.log({PaymentdataRes,CompareDataRes})
            const PaymentData = PaymentdataRes.data
            const CompareData = CompareDataRes.data
            setPaymentData(PaymentData)
            setPercentData(CompareData)
            if (CompareData?.percent.includes('-')){
                setColor(false)
            }
        }
        loadData()
    },[])


    return (
        <div>
            <div>
                이번주 일한 시간
                <div>{PaymentData?.week}</div>
            </div>          
            <div>
                이번달 일한 시간
                <div>{PaymentData?.month}</div>
            </div> 
            <div>지난 달에 비해 얼마나 더 일했지?</div>
            <div>
                <div>{PercentData?.month}</div>
                <div color={Color ? "green" : "red"}>{Color ? "늘었어요!" : "줄었어요!"}</div>
            </div> 
        </div>
    )
}