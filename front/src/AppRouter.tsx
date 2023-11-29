import { useEffect, useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import Loginpage from './Login/Loginpage'
import Register from './Register/Register'

import Profile from './Navi/Profile/Profile'
import CalendarCon from './Main/Schedule/CalendarCon'
import WorkCon from './Main/Work/WorkCon'
import MainPage from './Main/page/MainPage'
import WorkDetail from './WorkDetail/WorkDetail'
import Payment from './Main/Payment/Payment'
import App from './App'

import Attendance from './Main/Attendance/Attendance'
import {Cookies} from 'react-cookie';
import "./App.css"

export default function AppRouter() {

    const [isLogin, setIslogin] = useState<boolean>(false);
    const cookies = new Cookies();

    useEffect(() => {
        islogin();
    },[])

    const islogin = () => {
       const token = cookies.get("token");
       if (token !== undefined) {
            // TOKEN 검증 API 필요
            setIslogin(true);
       }
    }
    return (
        <>
            <BrowserRouter>
                <div id='wrap'>
                    {!isLogin ? 
                        <Routes>
                            <Route path='/' element={<Loginpage/>} />
                            <Route path='/register'  element={<Register/>} />
                            <Route path='*'  element={<Loginpage/>} />
                        </Routes>
                        :   
                            
                        <Routes>
                            <Route path='/'  element={<MainPage/>} />
                            <Route path='/profile' element={<Profile/>} />
                            <Route path='/calendar' element={<CalendarCon/>} />
                            <Route path='/payment' element={<Payment/>} />
                            <Route path='/work' element={<WorkCon/>} />
                            <Route path='/workdetail' element={<WorkDetail/>} />
                            <Route path='/app' element={<App/>} />
                            <Route path='/attendance' element={<Attendance/>} />
                        </Routes>
                    }   
                </div>

            </BrowserRouter>
        </>

    )
}