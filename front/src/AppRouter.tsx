import {BrowserRouter , Route,Routes ,Navigate} from 'react-router-dom'
import Loginpage from './Login/Loginpage'
import Profile from './Navi/Profile/Profile'
import CalendarCon from './Main/Schedule/CalendarCon'
import PaymentCon from './Main/Payment/PaymentCon'
import WorkCon from './Main/Work/WorkCon'
import RegiContainer from './Register/RegiSelect/RegiContainer'
import MainPage from './Main/page/MainPage'
import RegiInformation from './Register/RegiInformation/RegiInformation'
import WorkDetail from './WorkDetail/WorkDetail'

export default function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Loginpage/>} />
                    <Route path='/main' element={<MainPage/>} />
                    <Route path='/register' element={<RegiContainer/>} />
                    <Route path='/register/information' element={<RegiInformation/>} />
                    <Route path='/profile' element={<Profile/>} />
                    <Route path='/calendar' element={<CalendarCon/>} />
                    <Route path='/payment' element={<PaymentCon/>} />
                    <Route path='/work' element={<WorkCon/>} />
                    <Route path='/workdetail' element={<WorkDetail/>} />
                </Routes>
            </BrowserRouter>
        </>

    )
}