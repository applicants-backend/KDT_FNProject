import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserTypeState, {
  UserDataState,
  CalendarData,
  URLstate,
  WorkerListState,
} from "../../Store/Store";
import axios from "axios";
import { useStore } from "zustand";

interface CalendarMoProps {
  isOpen: boolean;
  closeModal: () => void;
  sendDataToCon: (data: any) => void;
  selectedEvent: CalendarData | null;
  selectedDate: Date | null;
}

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  width: 50vh;
  height: 50vh;
  z-index: 1000;
`;

const ModalHeader = styled.h2`
  margin-bottom: 10px;
`;

const ModalContent = styled.p`
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

function CalendarMo({
  isOpen,
  closeModal,
  sendDataToCon,
  selectedEvent,
  selectedDate,
}: CalendarMoProps) {
  const [worker, setWorker] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [startwork, setStartWork] = useState<string>("");
  const [leavework, setLeaveWork] = useState<string>("");
  const [wage, setWage] = useState<string>("");
  const [additionalContent, setAdditionalContent] = useState<string>("");

  const { UserType } = UserTypeState((state) => state);
  const { Storeid, Memberid, Name } = UserDataState((state) => state);

  const { WorkerList } = WorkerListState((state) => state);

  const { URL } = URLstate((state) => state);

  useEffect(() => {});

  async function adminAdditonalPost() {
    console.log("Worker in adminAdditonalPost:", worker); // 디버깅용 콘솔 로그
    console.log("WorkerList : ", WorkerList);
    console.log("안녕하세요");

    // axios.post(`${URL}/admin/attendance`)
    console.log("Data sent from CalendarMo:", {
      member: Memberid,
      storeid: Storeid,
      worker: worker,
      startwork: startwork,
      leavework: leavework,
      start: start,
      end: end,
      wage: wage,
    });
    const sendAdminData = {
      memberid: Memberid,
      storeid: Storeid,
      worker: worker,
      start: start,
      end: end,
      startwork: startwork,
      leavework: leavework,
      wage: wage,
    };
    sendDataToCon({
      member: Memberid,
      storeid: Storeid,
      worker: worker,
      start: start,
      end: end,
      startwork: startwork,
      leavework: leavework,
      wage: wage,
    });
    try {
      const res = await axios.post(
        `${URL}/admin/attendance/create`,
        sendAdminData
      );
      console.log("sendAdminData : ", sendAdminData);
      console.log("res : ", res);
    } catch (error) {
      console.log("에러 발생");
    }
    setAdditionalContent("추가 작업이 수행되었습니다.");
  }

  async function userAdditonalPost() {
    const sendUserData = {
      memberid: Memberid,
      storeid: Storeid,
      worker: worker,
      start: start,
      end: end,
      startwork: startwork,
      leavework: leavework,
      wage: wage,
    };
    // const response = axios.post(`${URL}/admin/attendance/create`, sendData)
    // const responseRes = response
    // console.log(responseRes)
    try {
      const postData = await axios.post(
        `${URL}/user/attendance/create`,
        sendUserData
      );
      console.log(postData.data);
    } catch (error) {
      console.log("에러 발생");
    }
    // axios.post(`${URL}/admin/attendance`)
    console.log("Data sent from CalendarMo:", {
      member: Memberid,
      storeid: Storeid,
      worker: worker,
      startwork: startwork,
      leavework: leavework,
      start: start,
      end: end,
      wage: wage,
    });
    sendDataToCon({
      member: Memberid,
      storeid: Storeid,
      worker: worker,
      start: start,
      end: end,
      startwork: startwork,
      leavework: leavework,
      wage: wage,
    });

    setAdditionalContent("추가 작업이 수행되었습니다.");
  }

  const eventDetails = selectedEvent ? (
    <>
      <p>Title: {selectedEvent.title}</p>
      <p>Start: {selectedEvent.start?.toLocaleString()}</p>
      <p>End: {selectedEvent.end?.toLocaleString()}</p>
      {/* <p>"selectedEvent.attendid" {selectedEvent.attendid}</p> */}
    </>
  ) : null;

  function handleUpdate() {
    // 수정 로직 추가
  }
  function handleDelete(arg: any) {
    // if (selectedEvent && selectedEvent.attendid) {
    //   const attendid = selectedEvent.attendid;
    //   // 서버로 삭제 요청 보내기
    //   try {
    //     // UserType에 따라 다른 엔드포인트를 사용할 수 있습니다.
    //     const endpoint =
    //       UserType === "admin"
    //         ? `${URL}/admin/attendance/delete/${attendid}`
    //         : `${URL}/user/attendance/delete/${attendid}`;
    //     // 서버로 삭제 요청을 보냅니다.
    //     axios.patch(endpoint).then(() => {
    //       // 삭제가 성공하면 additionalContent 상태를 업데이트합니다.
    //       setAdditionalContent("이벤트가 성공적으로 삭제되었습니다.");
    //     });
    //   } catch (error) {
    //     console.error("삭제 요청 중 오류 발생:", error);
    //   }
    // } else {
    //   // 선택된 이벤트가 없을 경우 에러 메시지를 설정합니다.
    //   setAdditionalContent("삭제할 이벤트가 선택되지 않았습니다.");
    // }
  }

  const handleWorker = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // 선택된 값을 사용하여 WorkerList를 업데이트
    const selectedValue = event.target.value;
    setWorker(selectedValue);
    // 위 주석 처리한 부분은 이제 필요하지 않습니다.
    console.log("selectedValue : ", selectedValue);
  };

  const renderAdminForm = () => (
    <>
      <label htmlFor="worker">근무자 : </label>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setWorker(e.target.value)
        }
      >
        {WorkerList &&
          Object.entries(WorkerList).map(([key, value]: [string, string]) => {
            return (
              <option key={key} value={key}>
                {value}
              </option>
            );
          })}
      </select>

      <label htmlFor="start">출근 시간 : </label>
      <input
        type="datetime-local"
        id="start"
        onChange={(e) => setStart(e.target.value)}
      />
      <label htmlFor="end">퇴근 시간 : </label>
      <input
        type="datetime-local"
        id="end"
        onChange={(e) => setEnd(e.target.value)}
      />
      <label htmlFor="wage">급여 : </label>
      <input type="text" id="wage" onChange={(e) => setWage(e.target.value)} />
      <button type="button" onClick={adminAdditonalPost}>
        저장하기
      </button>
    </>
  );

  ///
  const getCurrentTimeStart = () => {
    const now = new Date();
    const formattedTime = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
    setStartWork(formattedTime);
  };
  const getCurrentTimeEnd = () => {
    const now = new Date();
    const formattedTime = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
    setLeaveWork(formattedTime);
  };

  ///

  const renderUserForm = () => (
    <>
      <label htmlFor="worker">근무자 : {worker}</label>
      <label htmlFor="startwork">출근 시간 : {startwork}</label>
      <button type="button" onClick={getCurrentTimeStart}>
        출근 시간 저장하기
      </button>
      <label htmlFor="leavework">퇴근 시간 : {leavework}</label>
      <button type="button" onClick={getCurrentTimeEnd}>
        퇴근 시간 저장하기
      </button>
      <button type="button" onClick={userAdditonalPost}>
        저장하기
      </button>
    </>
  );

  return (
    <>
      {isOpen && selectedDate && (
        <ModalContainer>
          <ModalHeader>선택된 날짜</ModalHeader>
          <form name="RegisterForm">
            {UserType === "admin" ? renderAdminForm() : renderUserForm()}
          </form>
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </ModalContainer>
      )}
      {isOpen && selectedEvent && (
        <ModalContainer>
          <ModalHeader>선택된 날짜</ModalHeader>
          {eventDetails}
          <button onClick={handleUpdate}>수정하기</button>
          <button onClick={handleDelete}>삭제하기</button>
          <ModalContent>{additionalContent}</ModalContent>
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </ModalContainer>
      )}
    </>
  );
}

export default CalendarMo;
