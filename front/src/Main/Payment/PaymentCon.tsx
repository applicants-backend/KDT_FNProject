import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"
import { ListFormat } from "typescript"

interface Datainterface {
    week : number,
    month : number
}

interface adminDatainterface {
  key : string,
  value : string
}

export default function PaymentCon () {
    const {URL} = URLstate(state=>state)
    const {Memberid} = UserDataState(state=>state)
    const {UserType} =UserTypeState(state=>state)

    const [PaymentData, setPaymentData] = useState<Datainterface>()
    const [PercentData, setPercentData] = useState()

    const [adminMonth, setAdminMonth] = useState()
    const [adminEach, setAdminEach] = useState<[string,string]>()
    
    const [Color,setColor] = useState(true)

    useEffect(()=>{
        const loadData = async () =>{
            if(UserType === 'user') {
                const PaymentdataRes = await axios.post(`${URL}/allpayment`, {memberid: Memberid})
                const month =  new Date().getMonth()+1;
                const CompareDataRes = await axios.post(`${URL}/percent`, {memberid: Memberid,month})
                const PaymentData = PaymentdataRes.data.data
                const CompareData = CompareDataRes.data.data
                console.log(CompareData)
                setPaymentData(PaymentData)
                setPercentData(CompareData)
                if(CompareData < 0) {
                    setColor(false)
                }
            } else if (UserType === 'admin') {
                const month =  new Date().getMonth()+1;
                const adminMonthRes = await axios.post(`${URL}/admin/allpayment`,{memberid: Memberid,month})
                const adminEachRes = await axios.get(`${URL}/admin/each/${Memberid}/${month}`)
                console.log(adminEachRes.data.data)
                setAdminEach(adminEachRes.data.data)
                setAdminMonth(adminMonthRes.data.data)
            }
        
        }
        loadData()
    },[])

    return (
        UserType === "user" ? (
            <div>
              <div>
                이번주 급여
                <div>{PaymentData?.week}</div>
              </div>          
              <div>
                이번달 총 급여
                <div>{PaymentData?.month}</div>
              </div> 
              <div>
                지난 달에 비해 얼마나 더 벌었지?
                <div>
                  <div>{PercentData} %</div>
                  <div style={{ color: Color ? "green" : "red" }}>
                    {Color ? "늘었어요!" : "줄었어요!"}
                  </div>
                </div>
              </div>
            </div>
          )
          :(
            <div>
              <div>
                  알바별 이번달 급여
                  {adminEach &&
                  Object.entries(adminEach).map(([key, value]: [string, string]) => {
                    return (
                      <div key={key}>
                        <div>{key}</div>
                        <div>{value}</div>
                      </div>
                    );
                  })}
              </div>          
              <div>
                이번달 총 인건비 지출
                <div>{adminMonth}</div>
              </div> 
              <div>
                지난 달에 비해 얼마나 더 지출했지?
                <div>
                  <div>{PercentData}</div>
                  <div style={{ color: Color ? "green" : "red" }}>
                    {Color ? "늘었어요!" : "줄었어요!"}
                  </div>
                </div>
              </div>
            </div>
          )
    )
}