import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import {Chartex} from "./Chart"
import axios from "axios"

import "./scss/PaymentAdmin.scss"

interface Datainterface {
    week : number,
    month : number
}


interface valueinterface {
  month : number,
  sum : number
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


    const [Data, setData] = useState<number[]>()
    const [Label,setLabel] =useState<string[]>()

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

                const adminMonthDataRes = await axios.get(`${URL}/admin/findall/${Memberid}/0`)
                setLabel(adminMonthDataRes.data.data.content.slice(-5).map((value:valueinterface)=> value.month))
                setData(adminMonthDataRes.data.data.content.slice(-5).map((value:valueinterface)=> value.sum))

                const adminMonthPostRes = await axios.post(`${URL}/admin/allpayment`,{memberid: Memberid,month})
                const adminMonthRes = await axios.get(`${URL}/admin/allpayment/${Memberid}/${month}`)
                const adminEachRes = await axios.get(`${URL}/admin/each/${Memberid}/${month}`)
                const CompareDataRes = await axios.post(`${URL}/admin/percent`, {memberid: Memberid,month})
                console.log(adminEachRes.data.data)
                setAdminEach(adminEachRes.data.data)
                setAdminMonth(adminMonthRes.data.data)
                setPercentData(CompareDataRes.data.data)
            }
        
        }
        loadData()
    },[])


    const Admindata = {
      labels : Label,
      datasets: [
        {
          type: 'line' as const,
          label: '급여 추이',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          fill: false,
          data: Data,
        },
        {
          type: 'bar' as const,
          label: '월별 급여',
          backgroundColor: 'rgb(75, 192, 192)',
          data: Data,
          borderColor: 'white',
          borderWidth: 2,
        }
      ],
    };

    return (
      UserType === "user" ? (
        <div className="PaymentConWrapUser">

              <div>
                <div className="category">
                  <div className="material-symbols-outlined icon">schedule</div>
                  <div className="categoryName">이번주 예상 급여</div>
                </div>
                <div className="data">{PaymentData?.week} 원</div>
              </div>

              <div>
                <div className="category">
                    <div className="material-symbols-outlined icon">calendar_clock</div>
                    <div className="categoryName">이번달 예상 급여</div>
                </div>
                <div className="data">{PaymentData?.month} 원</div>
              </div> 

              <div className="category">
                <div className="material-symbols-outlined icon">more_time</div>
                <div className="categoryName">지난 달에 비해 </div>
                <div className="datatext">얼마나 더 벌었지?</div>
              </div>

              {Color ? (
            <div className="category">
                <div className="material-symbols-outlined icon" style={{color : "#45a049"}}>trending_up</div>
                <div className="data" style={{color : "#45a049"}}>{PercentData} %</div>
                <div className="data" style={{color : "#45a049" }}>늘었어요!</div>
            </div>
            ): 
            (<div>
                <div className="material-symbols-outlined icon" style={{color : "rgb(219, 112, 147)"}}>trending_down</div>
                <div className="data" style={{color : "rgb(219, 112, 147)"}}>{PercentData} %</div>
                <div className="data" style={{color : "rgb(219, 112, 147)" }}>줄었어요!</div>
            </div>)}
              
            </div>
          )
          :(
            <div className="PaymentConWrapAdmin">

              <div>
                <div className="category">
                  <div className="material-symbols-outlined icon">schedule</div>
                  <div className="categoryName">이번달 총 급여</div>
                </div>
                <div className="data">{adminMonth} 원</div>
              </div>

              <div className="category">
                <div className="material-symbols-outlined icon">more_time</div>
                <div className="categoryName">지난 달에 비해 </div>
                <div className="datatext">얼마나 더 늘었지?</div>
              </div>


              {Color ? (
            <div className="category">
                <div className="material-symbols-outlined icon" style={{color : "#45a049"}}>trending_up</div>
                <div className="data" style={{color : "#45a049"}}>{PercentData} %</div>
                <div className="data" style={{color : "#45a049" }}>늘었어요!</div>
            </div>
            ): 
            (<div>
                <div className="material-symbols-outlined icon" style={{color : "rgb(219, 112, 147)"}}>trending_down</div>
                <div className="data" style={{color : "rgb(219, 112, 147)"}}>{PercentData} %</div>
                <div className="data" style={{color : "rgb(219, 112, 147)" }}>줄었어요!</div>
            </div>)}

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
                <Chartex data={Admindata}/>
              </div>
            </div>
          )
    )
}