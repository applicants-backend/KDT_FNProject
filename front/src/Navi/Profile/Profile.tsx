import { useEffect, useState, SyntheticEvent, FC } from "react";
import UserTypeState, {
  ProfileState,
  URLstate,
  UserDataState,
  WorkerListState,
} from "../../Store/Store";
import axios from "axios";
import "./scss/Profile.scss";
import ReactModal from "react-modal";
import inviteModalStyles from "./scss/InviteModal";
import { hover } from "@testing-library/user-event/dist/hover";

interface profileProps {
  setmodalOpenis?: React.Dispatch<React.SetStateAction<boolean>>;
  logout?: Function;
}

export default function Profile({
  setmodalOpenis,
  logout,
}: profileProps): ReturnType<FC> {
  const { URL } = URLstate((state) => state);
  const { UserType } = UserTypeState((state) => state);
  const { Memberid, Token, Storeid, setToken, setName } = UserDataState(
    (state) => state
  );
  const {
    userImg,
    companyImg,
    name,
    phonenumber,
    companyNumber,
    companyName,
    setuserImg,
    setcompanyImg,
    setname,
    setphonenumber,
    setcompanyName,
    setcompanyNumber,
  } = ProfileState((state) => state);
  const { setWorkList, WorkerList } = WorkerListState((state) => state);
  const [isHovered, setIsHovered] = useState(false);
  const [inviteModal, setInviteModal] = useState<boolean>(false);
  const [showToken, setShowToken] = useState<boolean>(false);

  useEffect(() => {
    const loadUserData = async () => {
      const UserRes = await axios.post(`${URL}/detail`, { memberid: Memberid });
      const Userprofile = UserRes.data.data.member;
      const Storeprofile = UserRes.data.data.store;

      setuserImg(Userprofile.memberimg);
      setname(Userprofile.name);
      setName(Userprofile.name);
      setphonenumber(Userprofile.phonenumber);

      setcompanyName(Storeprofile.companyname);
      setcompanyNumber(Storeprofile.companynumber);
      setcompanyImg(Storeprofile.companyimg);
      setToken(Storeprofile.invitecode);

      if (UserType === "admin") {
        const WorkerListRes = await axios.get(
          `${URL}/admin/attendance/workerlist/${Memberid}/${Storeid}`
        );
        setWorkList(WorkerListRes.data.data);
      }
    };
    loadUserData();
  }, [Memberid, URL, companyImg]);

  const editProfle = () => {
    if (setmodalOpenis) setmodalOpenis(true);
  };

  const toggleToken = () => {
    setShowToken(!showToken);
    if (!showToken) CodeGenerater();
  };

  const CodeGenerater = async () => {
    const CodeRes = await axios.post(`${URL}/generate`, {
      companynumber: companyNumber,
    });
    const Code = CodeRes.data;
    setToken(Code);
  };

  const defalutImg = (e: SyntheticEvent<HTMLImageElement, Event> | any) => {
    e.currentTarget.src =
      "https://kdt9hotdog.s3.ap-northeast-2.amazonaws.com/alba/defalut_image.png";
  };

  return (
    <div className="profile">
      <div className="profile-line"></div>
      <div className="profile-img">
        <img
          src={
            UserType === "admin"
              ? companyImg === null
                ? ""
                : companyImg
              : userImg === null
                ? ""
                : userImg
          }
          alt="profile-image"
          onError={defalutImg}
        />
      </div>

      <div className="profile-info">
        <p className="profile-name"> {name}</p>
        <p className="profile-companyName"> {companyName}</p>
      </div>

      <div className="profile-line"></div>
      <div className="profile-icon-box">
        {UserType === "admin" ? (
          <div
            className="invite-icon"
            onClick={(e) => {
              setInviteModal(true);
            }}
          >
            <span className="material-symbols-outlined">vpn_key</span>
          </div>
        ) : (
          <></>
        )}
        <div
          className="profile-icon"
          onClick={(e) => {
            editProfle();
          }}
        >
          <span className="material-symbols-outlined">settings</span>
        </div>
        <div
          className="logout-icon"
          onClick={() => {
            if (logout) logout();
          }}
        >
          <span className="material-symbols-outlined">logout</span>
        </div>
      </div>

      <ReactModal
        isOpen={inviteModal}
        onRequestClose={() => setInviteModal(false)}
        overlayClassName="invite-modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        style={inviteModalStyles}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100px",
                fontWeight: "bold",
                fontSize: "2.5rem",
              }}
            >
              {showToken && Token}
            </div>
            <button
              className="codeGenerator"
              style={{
                width: "30%",
                padding: "3%",
                borderRadius: "10px",
                transition: 'background-color 0.3s, color 0.3s',
                border: isHovered ? '1px solid white':"1px solid rgb(85, 105, 255)",
                backgroundColor: isHovered ? 'rgb(85, 105, 255)' : 'white',
                color: isHovered ? 'white' : 'rgb(85, 105, 255)'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={toggleToken}
            >
              {showToken ? "초대코드 숨김" : "초대코드 발급"}
            </button>
            <div
              onClick={() => setInviteModal(false)}
              style={{
                position: "absolute",
                top: "3%",
                right: "3%",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              X
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}
