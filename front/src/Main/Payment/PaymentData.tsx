import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"
import {Chartex} from "./Chart"
import { ChartDoughut } from "./Doughnut"

interface valueinterface {
    month : number,
    sum : number
}

export default function PaymentData () {

    const {URL} = URLstate(state=>state)
    const {UserType} = UserTypeState(state=>state)
    const {Memberid} = UserDataState(state=>state)

    const [Data, setData] = useState<number[]>()
    const [Label,setLabel] =useState<string[]>()

    const [EachData, setEachData] = useState<number[]>()
    const [EachLabel, setEachLabel] =useState<string[]>()


    useEffect(()=>{
        const loadData = async () =>{
            if(UserType === "user") {
                const month =  new Date().getMonth()+1;

                const DataRes = await axios.get(`${URL}/user/findAll/${Memberid}/${month}`)
                setLabel(Object.keys(DataRes.data.data).slice(-5).map(month => `${parseInt(month)}월`))

                const data : number[] = Object.values(DataRes.data.data).slice(-5) as number[]
                setData(data)
            } else {
                const month =  new Date().getMonth()+1;

                const adminMonthRes = await axios.get(`${URL}/admin/findall/${Memberid}/0`)
                const adminEachRes = await axios.get(`${URL}/admin/each/${Memberid}/${month}`)

                setLabel(adminMonthRes.data.data.content.slice(-5).map((value:valueinterface)=> value.month))
                setData(adminMonthRes.data.data.content.slice(-5).map((value:valueinterface)=> value.sum))

                setEachLabel(Object.keys(adminEachRes.data.data))
                setEachData(Object.values(adminEachRes.data.data))
             
            }
        }
        loadData()
    },[])

    const Userdata = {
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

      const AdminEachData = {
        labels: EachLabel,
        datasets: [
          {
            label: '# of Votes',
            data: EachData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      

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

    return(
       UserType === 'user' ? (
       <div style={{width:'300px'}}>
           <Chartex data={Userdata}/>       
       </div> ) : (
        <div style={{width:'300px'}}>
            <ChartDoughut data={AdminEachData}/>
            <Chartex data={Admindata}/>
        </div>
       )
    )
}