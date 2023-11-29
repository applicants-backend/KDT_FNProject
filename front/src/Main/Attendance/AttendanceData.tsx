import { useEffect, useState } from "react"
import UserTypeState, { URLstate, UserDataState } from "../../Store/Store"
import axios from "axios"
import { ChartPolar } from "./ChartPoloar"

export default function AttendanceData () {

    const {URL} = URLstate(state=>state)
    const {UserType}=UserTypeState(state=>state)
    const {Memberid, Storeid} = UserDataState(state=>state)

    const [Data,setData] = useState<number[]>()
    const [Label,setLabel] = useState<string[]>()


    useEffect(()=>{
        const loadData = async () =>{
            const AttenddataRes = await axios.get( UserType === "admin" ? `${URL}/admin/attendance/data/${Memberid}/${Storeid}` : `${URL}/attendance/data/${Memberid}/${Storeid}`)
            console.log(AttenddataRes.data.data)
            setLabel(Object.keys(AttenddataRes.data.data))
            setData(Object.values(AttenddataRes.data.data))
        }
        loadData()
    },[])

    const AdminEachData = {
        labels: Label,
        datasets: [
          {
            label: '알바별 출결',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
    return(
        UserType === 'admin' ? (
        <div>
          <ChartPolar data={AdminEachData}/>
        </div> ) : (
         <div>
            
         </div>
        )
     )
}