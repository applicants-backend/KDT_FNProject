import { useLayoutEffect, useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import Loginpage from './Login/Loginpage'
import Register from './Register/Register'

import MainPage from './Main/page/MainPage'
import FindPw from './findpw/FindPw'

import {Cookies} from 'react-cookie';
import "./App.css"

import axios from 'axios'


export default function AppRouter() {

    const [isLogin, setIslogin] = useState<boolean>(false);
    const cookies = new Cookies();

    useLayoutEffect(() => {
        islogin();
    },[])

    const islogin = () => {
       const token = cookies.get("token");
       if (token !== undefined) {
            // TOKEN 검증 API 필요
            //axios.post("/tokenValidToken",)
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
                            <Route path='/findPassword' element={<FindPw/>}/>
                            <Route path='*'  element={<Loginpage/>} />
                        </Routes>
                        :   
                        <Routes>
                            <Route path='/'  element={<MainPage/>} />
                            <Route path='*'  element={<MainPage/>} />
                        </Routes>
                    }   
                </div>
            </BrowserRouter>
        </>

    )
}