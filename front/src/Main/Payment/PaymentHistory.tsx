import { useEffect, useState } from "react"
import { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"

interface Paypentinterface {
    date : string,
    payment : string
}

export default function PaymentHistory () {
    const {URL} = URLstate(state=>state)
    const {Memberid} = UserDataState(state=>state)
    const [paymentList, setPaymentList]= useState([])

    useEffect(()=>{
        const loadData = async () => {
            const Paymentres = await axios.get(`${URL}/payment/${Memberid}`)
            const RoadedPayment = Paymentres.data
            setPaymentList(RoadedPayment)
        }
        loadData()
    },[])




    return (
        <div>
            {paymentList.map((value : Paypentinterface)=>{
                return (
                    <div>
                        <div>{value.date}</div>
                        <div>{value.payment}</div>
                    </div>
                )
            })}
        </div>
    )
}