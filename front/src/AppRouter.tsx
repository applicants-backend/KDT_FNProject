import { useLayoutEffect, useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import Loginpage from './Login/Loginpage'
import Register from './Register/Register'

import MainPage from './Main/page/MainPage'
import FindPw from './findpw/FindPw'

import {Cookies} from 'react-cookie';
import "./App.css"

import axios from './common/handler/axios'


export default function AppRouter() {

    const [isLogin, setIslogin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const cookies = new Cookies();
    useLayoutEffect(() => {
        islogin();
    },[])

    const islogin = async () => {
       const token = cookies.get("token");
       if (token !== undefined) {
            const Pram = {
                URL :"/tokenValidation",
                DATA : {
                    token : token
                }
            }
            const result = await axios.post(Pram)
            if (result.data && result.data.data === true) {
            
                setIslogin(true);
               
            } else {
                cookies.remove("token");
            }
         
       }
        setTimeout(() => {
            setLoading(true);
        },1000)
    }
    
    return (
        <>
            <BrowserRouter>
                <div id='wrap'>
                    {!loading ? 
                        <div className='loading_box'>loading<span>...</span></div>
                        :

                        !isLogin ? 
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