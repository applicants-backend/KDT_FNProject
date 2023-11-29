import { useEffect, useState } from "react";
import NaviCon from "../../Navi/NaviBar/NaviCon";
import Profile from "../../Navi/Profile/Profile";
import MainPage from "./MainPage";

export default function LeftPage() {
  const [hambergericon, setHambergericon] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const onClickHambeger = () => {
    setHambergericon(!hambergericon);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Profile />
      <div className="container">
      {windowWidth <= 768 && (
        <div className="hamberger" onClick={onClickHambeger}>
          icon
        </div>
      )}
      {hambergericon && windowWidth <= 768 && <NaviCon />}
      {windowWidth > 768 && <NaviCon />}
      </div>
    </>
  );
}
