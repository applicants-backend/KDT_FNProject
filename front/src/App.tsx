import Loginpage from './Login/Loginpage';
import RegiInformation from './Register/RegiInformation/RegiInformation';
import RegiContainer from './Register/RegiSelect/RegiContainer';

function App() {
  return (

      <>
      <Loginpage/>
        <RegiContainer></RegiContainer>
        <RegiInformation></RegiInformation>
      </>
  );
}

export default App;
