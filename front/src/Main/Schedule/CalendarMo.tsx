import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserTypeState, {
  UserDataState,
  CalendarData,
  URLstate,
  WorkerListState,
} from "../../Store/Store";
import axios from "axios";

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
  // const [worker, setWorker] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [startwork, setStartWork] = useState<string>("");
  const [leavework, setLeaveWork] = useState<string>("");
  const [wage, setWage] = useState<string>("");
  const [additionalContent, setAdditionalContent] = useState<string>("");

  const { UserType } = UserTypeState((state) => state);
  const { Storeid, Memberid, Name } = UserDataState((state) => state);

  const { WorkerList } = WorkerListState((state) => state);
  // const [worker, setWorker] = useState<string>(Object.keys(WorkerList)[0]);
  const [worker, setWorker] = useState<string>("");
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
      console.log("데이터 전송 요청");
      const res = await axios.post(
        `${URL}/admin/attendance/create`,
        sendAdminData
      );
      console.log("sendAdminData : ", sendAdminData);
      console.log("res : ", res);
      // window.location.reload();
    } catch (error) {
      console.log("에러 발생");
    }
    setAdditionalContent("추가 작업이 수행되었습니다.");
  }

  async function userAdditonalPost() {
    console.log("유저 additional post 입니다");

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

    // try {
    //   const patchData = await axios.patch(
    //     `${URL}/user/attendance/update`,
    //     sendUserData
    //   );
    //   console.log(patchData.data);
    // } catch (error) {
    //   console.log("에러 발생");
    // }
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
    </>
  ) : null;

  function handleUpdate() {
    // 수정 로직 추가
  }

  async function handleDelete(arg: any) {
    console.log("selectedEvent", selectedEvent);
    if (selectedEvent && selectedEvent.attendid) {
      const attendid = selectedEvent.attendid;
      const worker = selectedEvent.worker;
      const start = selectedEvent.start;
      const end = selectedEvent.end;
      console.log("worker : ", worker);

      // 서버로 삭제 요청 보내기
      const sendDeleteData = {
        memberid: Memberid,
        storeid: Storeid,
        worker: worker,
        start: start,
        end: end,
        startwork: startwork,
        leavework: leavework,
        attendid: attendid,
        wage: wage,
      };
      try {
        console.log("삭제요청중");
        // UserType에 따라 다른 엔드포인트를 사용할 수 있습니다.
        const res = await axios.patch(
          `${URL}/admin/attendance/delete`,
          sendDeleteData
        );
        console.log("res : ", res);
      } catch (error) {
        console.error("삭제 요청 중 오류 발생:", error);
      }
    } else {
      // 선택된 이벤트가 없을 경우 에러 메시지를 설정합니다.
      setAdditionalContent("삭제할 이벤트가 선택되지 않았습니다.");
    }
  }

  const defaultDate = selectedDate
    ? new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16)
    : ""; // 선택된 날짜가 있을 때는 하루를 더한 값을, 없을 때는 빈 문자열을 기본값으로 설정

  const renderAdminForm = () => (
    <>
      <label htmlFor="worker">근무자 : {worker}</label>
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
        value={start || defaultDate}
        onChange={(e) => setStart(e.target.value)}
      />
      <label htmlFor="end">퇴근 시간 : </label>
      <input
        type="datetime-local"
        id="end"
        value={end || defaultDate}
        onChange={(e) => setEnd(e.target.value)}
      />
      <label htmlFor="wage">급여 : </label>
      <input type="text" id="wage" onChange={(e) => setWage(e.target.value)} />
      <button type="button" onClick={adminAdditonalPost}>
        저장하기
      </button>
    </>
  );

  // async function getCurrentTimeStart(arg: any) {
  //   const now = new Date();
  //   const formattedTime = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
  //   setStartWork(formattedTime);
  //   if (selectedEvent && selectedEvent.attendid) {
  //     const attendid = selectedEvent.attendid;
  //   }
  //   const sendUserData = {
  //     memberid: Memberid,
  //     storeid: Storeid,
  //     worker: worker,
  //     start: start,
  //     end: end,
  //     startwork: startwork,
  //     leavework: leavework,
  //     wage: wage,
  //     attendid: selectedEvent?.attendid,
  //   };
  //   console.log("setStawrkWork : ", sendUserData);
  //   try {
  //     await axios.patch(`${URL}/user/attendance/gowork`, sendUserData);
  //   } catch (error) {
  //     console.error("gowork 도중에 오류발생 :", error);
  //   }
  // }

  async function getCurrentTimeStart(arg: any) {
    console.log("selectedEvent", selectedEvent);
    if (selectedEvent && selectedEvent.attendid) {
      const attendid = selectedEvent.attendid;
      // 서버로 삭제 요청 보내기
      const now = new Date();
      const formattedTime = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
      setStartWork(formattedTime);
      const sendUserData = {
        memberid: Memberid,
        storeid: Storeid,
        worker: worker,
        start: start,
        end: end,
        startwork: startwork,
        leavework: leavework,
        attendid: attendid,
        wage: wage,
      };
      try {
        console.log("gowork 요청중");
        // UserType에 따라 다른 엔드포인트를 사용할 수 있습니다.
        const res = await axios.patch(
          `${URL}/user/attendance/gowork`,
          sendUserData
        );
        console.log("res : ", res);
      } catch (error) {
        console.error("gowork 요청 중 오류 발생:", error);
      }
    } else {
      // 선택된 이벤트가 없을 경우 에러 메시지를 설정합니다.
      setAdditionalContent("이벤트가 선택되지 않았습니다.");
    }
  }

  async function getCurrentTimeEnd() {
    const now = new Date();
    const formattedTime = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
    setLeaveWork(formattedTime);
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
    console.log("setLeaveWork : ", sendUserData);
    try {
      await axios.patch(`${URL}/user/attendance/leavework`, sendUserData);
    } catch (error) {
      console.error("leave work 도중 오류 발생 : ", error);
    }
  }

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
      <label htmlFor="wage">시급 : {wage}</label>
    </>
  );

  ///

  ///

  const adminEventForm = () => (
    <>
      <label htmlFor="worker">근무자 : {worker}</label>
      <label htmlFor="startwork">근무자가 입력한 출근 시간 : {startwork}</label>
      <label htmlFor="leavework">퇴근 시간 : {leavework}</label>
    </>
  );

  const userEventForm = () => (
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
      <label htmlFor="wage">시급 : {wage}</label>
    </>
  );

  // useEffect(() => {
  //   if (selectedEvent) {
  //     const { wage, worker, start, end, startwork, leavework } = selectedEvent;

  //     getCurrentTimeStart({ wage, worker, start, end, startwork, leavework });
  //   }
  // }, [selectedEvent]);

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
          <form name="EventForm">
            {UserType === "admin" ? adminEventForm() : userEventForm()}
          </form>
          {eventDetails}
          <ModalContent>{additionalContent}</ModalContent>
          <button onClick={handleDelete}>삭제하기</button>
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </ModalContainer>
      )}
    </>
  );
}

export default CalendarMo;
