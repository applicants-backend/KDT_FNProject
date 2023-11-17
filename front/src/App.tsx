import Scheduler from './Main/Schedule/Scheduler';
import NaviCon from './Navi/NaviBar/NaviCon';
import Profile from './Navi/Profile/Profile';
import ProfileModal from './Navi/Profile/ProfileModal';
import RegiInformation from './Register/RegiInformation/RegiInformation';
import RegiContainer from './Register/RegiSelect/RegiContainer';
import RegiSelectBox from './Register/RegiSelect/RegiSelectBox';


function App() {
  return (
      <>
      <RegiContainer></RegiContainer>
      <RegiInformation></RegiInformation>
      </>
  );
}

export default App;
