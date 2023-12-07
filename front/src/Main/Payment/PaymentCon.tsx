import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState, WorkerListState } from "../../Store/Store"
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
    const {WorkerList}= WorkerListState(state=>state)

    const [PaymentData, setPaymentData] = useState<Datainterface>()
    const [PercentData, setPercentData] = useState<number>()

    const [adminMonth, setAdminMonth] = useState<number>()
    const [adminEach, setAdminEach] = useState<[string,string]>()

    const [IncomeRate,setIncomeRate] = useState<number>()
    
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
                setIncomeRate(IncomeTaxRate(PaymentData.month))
                console.log(CompareData)
                setPaymentData(PaymentData)
                setPercentData(CompareData)
                if(CompareData < 0) {
                    setColor(false)
                }
            } else if (UserType === 'admin') {
                const month1 =  new Date().getMonth()+1;
                const month2 =  new Date().getMonth();
                const month3 =  new Date().getMonth()-1;
                const month4 =  new Date().getMonth()-2;
                const month5 =  new Date().getMonth()-3;

                const adminMonthDataRes = await axios.get(`${URL}/admin/findall/${Memberid}/0`)
                setLabel(adminMonthDataRes.data.data.content.slice(-5).map((value:valueinterface)=> value.month))
                setData(adminMonthDataRes.data.data.content.slice(-5).map((value:valueinterface)=> value.sum))

                const adminMonthPostRes1 = await axios.post(`${URL}/admin/allpayment`,{memberid: Memberid,month:month1})
                const adminMonthPostRes2 = await axios.post(`${URL}/admin/allpayment`,{memberid: Memberid,month:month2})
                const adminMonthPostRes3 = await axios.post(`${URL}/admin/allpayment`,{memberid: Memberid,month:month3})
                const adminMonthPostRes4 = await axios.post(`${URL}/admin/allpayment`,{memberid: Memberid,month:month4})
                const adminMonthPostRes5 = await axios.post(`${URL}/admin/allpayment`,{memberid: Memberid,month:month5})

                const adminMonthRes = await axios.get(`${URL}/admin/allpayment/${Memberid}/${month1}`)
                const adminEachRes = await axios.get(`${URL}/admin/each/${Memberid}/${month1}`)
                const CompareDataRes = await axios.post(`${URL}/admin/percent`, {memberid: Memberid,month:month1})

                setAdminEach(adminEachRes.data.data)
                setAdminMonth(adminMonthRes.data.data)
                setPercentData(CompareDataRes.data.data)
                setIncomeRate(IncomeTaxRate(adminMonthRes.data.data))
                if(CompareDataRes.data.data < 0) {
                  setColor(false)
              }
            }
        
        }
        loadData()
    },[])

    const IncomeTaxRate = (MonthPayment : number) => {
      if(MonthPayment < 1000000){
        return 0.06;
      } else if (MonthPayment < 3830000) {
        return 0.15;
      } else if (MonthPayment < 7330000) {
        return 0.24;
      }
    }


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
      UserType === "user" ? (
        <div className="PaymentConWrapUser">

              <div>
                <div className="category">
                  <div className="material-symbols-outlined icon">schedule</div>
                  <div className="categoryName">이번주 예상 급여</div>
                </div>
                <div className="data">{formatCurrency(PaymentData?.week as number)} 원</div>
              </div>

              <div>
                <div className="category">
                    <div className="material-symbols-outlined icon">calendar_clock</div>
                    <div className="categoryName">이번달 예상 급여</div>
                </div>
                <div className="data">{formatCurrency(PaymentData?.month as number)} 원</div>
              </div> 

              <div className="realPaymentCon">
                  <div className="material-symbols-outlined icon">calendar_clock</div>
                  <div className="categoryName">이번달 예상 실수령액</div>
                  <div className="data">
                  {PaymentData?.month && IncomeRate !== undefined
                  ? `${formatCurrency(Math.floor(PaymentData.month * (1- 0.045 - 0.03545 - 0.03545 * 0.1281 - 0.09 - IncomeRate - IncomeRate * 0.1)))}원`
                  : '금액을 계산할 수 없습니다'}
                  </div>
              </div>

              <div className="texboxCon">

                <div className="category" style={{display:"flex",flexDirection:"column"}}>
                  <div className="material-symbols-outlined icon">price_check</div>
                  <div className="categoryName">이번달 내야할</div>
                  <div className="datatext">세금은?</div>
                  <div className="data" style={{color:"rgb(219, 112, 147)"}}>
                  {PaymentData?.month && IncomeRate !== undefined
                  ? `${formatCurrency(Math.floor(PaymentData.month * ( 0.045 + 0.03545 + 0.03545 * 0.1281 + 0.09 + IncomeRate + IncomeRate * 0.1)))}원`
                  : '금액을 계산할 수 없습니다'}
                  </div>                
                </div>

                <div className="texbox">
                        <div className="texcategory">국민연금<div> 4.5%</div></div>
                        <div className="texcategory">건강보험<div> 3.545%</div></div>
                        <div className="texcategory">장기요양보험<div> 건강보험의 12.81%</div></div>
                        <div className="texcategory">고용보험<div> 0.9%</div></div>
                        <div className="texcategory">소득세<div> 구간별상이</div></div>
                        <div className="texcategory">지방소득세<div> 소득세의 10%</div></div>
                      </div>

                      <div className="tex">
                        <div>{formatCurrency(PaymentData?.month ? (PaymentData.month * 0.045): 0)}원</div>
                        <div>{formatCurrency(PaymentData?.month ? (PaymentData.month * 0.03545): 0)}원</div>
                        <div>{formatCurrency(PaymentData?.month ? (PaymentData.month * 0.03545 * 0.1281 ): 0)}원</div>
                        <div>{formatCurrency(PaymentData?.month ? (PaymentData.month * 0.09) : 0)}원</div>
                        <div>{formatCurrency(PaymentData?.month && IncomeRate ? (PaymentData.month * IncomeRate) : 0)}원</div>
                        <div>{formatCurrency(PaymentData?.month && IncomeRate ? (PaymentData.month * IncomeRate * 0.1) :0)}원</div>
                      </div>
              </div>

              <div className="category">
                <div className="material-symbols-outlined icon">more_time</div>
                <div className="categoryName">지난 달에 비해 </div>
                <div className="datatext">얼마나 더 벌었지?</div>
              </div>

              {Color ? (
            <div className="category">
                <div className="material-symbols-outlined icon" style={{color : "#45a049"}}>trending_up</div>
                <div className="data percent" style={{color : "#45a049"}}>{PercentData?.toFixed(0)}%</div>
                <div className="data percent" style={{color : "#45a049" }}>늘었어요!</div>
            </div>
            ): 
            (<div>
                <div className="material-symbols-outlined icon" style={{color : "rgb(219, 112, 147)"}}>trending_down</div>
                <div className="data percent" style={{color : "rgb(219, 112, 147)"}}>{PercentData?.toFixed(0)}%</div>
                <div className="data percent" style={{color : "rgb(219, 112, 147)" }}>줄었어요!</div>
            </div>)}
              
            </div>
          )
          :(
            <div className="PaymentConWrapAdmin">

              <div className="category">
              <div className="material-symbols-outlined icon">work</div>
                  알바별 이번달 급여
                  <div>
                  {adminEach &&
                  Object.entries(adminEach).map(([paykey, value]: [string, string]) => {
                    return (
                      <div key={paykey} className="Eachdata">
                    {Object.keys(WorkerList).map((key)=>{
                    if(key === paykey) {
                        return <div key={key} className="name">{WorkerList[key]} </div>
                    }})}
                        <div>{formatCurrency(value as unknown as number)}원</div>
                      </div>
                    );
                  })}
                  </div>
              </div>

              <div>
                <div className="category">
                  <div className="material-symbols-outlined icon">schedule</div>
                  <div className="categoryName">이번달 총 급여</div>
                </div>
                <div className="data">{formatCurrency(adminMonth as number)} 원</div>
              </div>


              <div className="category">
                <div className="material-symbols-outlined icon">more_time</div>
                <div className="categoryName">지난 달에 비해 </div>
                <div className="datatext">얼마나 더 늘었지?</div>
              </div>


              {Color ? (
            <div className="category">
                <div className="material-symbols-outlined icon" style={{color : "#45a049"}}>trending_up</div>
                <div className="data percent" style={{color : "#45a049"}}>{PercentData?.toFixed(0)}%</div>
                <div className="data percent" style={{color : "#45a049" }}>늘었어요!</div>
            </div>
            ): 
            (<div>
                <div className="material-symbols-outlined icon" style={{color : "rgb(219, 112, 147)"}}>trending_down</div>
                <div className="data percent" style={{color : "rgb(219, 112, 147)"}}>{PercentData?.toFixed(0)}%</div>
                <div className="data percent" style={{color : "rgb(219, 112, 147)" }}>줄었어요!</div>
            </div>)}

            <div className="texboxCon">

            <div className="category" style={{display:"flex",flexDirection:"column"}}>
              <div className="material-symbols-outlined icon">price_check</div>
              <div className="categoryName">이번달 내야할</div>
              <div className="datatext">세금은?</div>
              <div className="data" style={{color:"rgb(219, 112, 147)"}}>
                  {adminMonth && IncomeRate !== undefined
                  ? `${formatCurrency(Math.floor(adminMonth * ( 0.045 + 0.03545 + 0.03545 * 0.1281 + 0.09 + IncomeRate + IncomeRate * 0.1)))}원`
                  : '금액을 계산할 수 없습니다'}
              </div>    
            </div>

            <div className="texbox">
                    <div className="texcategory">국민연금<div> 4.5%</div></div>
                    <div className="texcategory">건강보험<div> 3.545%</div></div>
                    <div className="texcategory">장기요양보험<div> 건강보험의 12.81%</div></div>
                    <div className="texcategory">고용보험<div> 0.9%</div></div>
                    <div className="texcategory">소득세<div> 구간별상이</div></div>
                    <div className="texcategory">지방소득세<div> 소득세의 10%</div></div>
            </div>

              <div className="tex">
                  <div>{formatCurrency(adminMonth ? (adminMonth * 0.045): 0)}원</div>
                  <div>{formatCurrency(adminMonth ? (adminMonth * 0.03545): 0)}원</div>
                  <div>{formatCurrency(adminMonth ? (adminMonth * 0.03545 * 0.1281 ): 0)}원</div>
                  <div>{formatCurrency(adminMonth ? (adminMonth * 0.09) : 0)}원</div>
                  <div>{formatCurrency(adminMonth && IncomeRate? (adminMonth * IncomeRate) : 0)}원</div>
                  <div>{formatCurrency(adminMonth && IncomeRate ? (adminMonth * IncomeRate * 0.1) :0)}원</div>
              </div>
            </div>


              <div>
                <Chartex data={Admindata}/>
              </div>
            </div>
          )
    )
}