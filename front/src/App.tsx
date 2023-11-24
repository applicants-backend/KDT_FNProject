import Loginpage from "./Login/Loginpage";
import CalendarCon from "./Main/Schedule/CalendarCon";
import Work from "./Main/Work/Work";
import Profile from "./Navi/Profile/Profile";
import WorkDetail from "./WorkDetail/WorkDetail";


function App() {
  return (
      <>
        <CalendarCon></CalendarCon>
        <Loginpage></Loginpage>
        <Profile></Profile>
        <Work></Work>
        <WorkDetail></WorkDetail>
      </>
  );
}

export default App;
