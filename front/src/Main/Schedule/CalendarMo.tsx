import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserTypeState, {
  UserDataState,
  CalendarData,
  URLstate,
  WorkerListState,
} from "../../Store/Store";
import axios from "axios";
import "./scss/calendarMoStyle.scss";

interface CalendarMoProps {
  isOpen: boolean;
  closeModal: () => void;
  sendDataToCon: (data: any) => void;
  selectedEvent: CalendarData | null;
  selectedDate: Date | null;
}

const DateTimeLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const DateTimeInput = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function CalendarMo({
  isOpen,
  closeModal,
  sendDataToCon,
  selectedEvent,
  selectedDate,
}: CalendarMoProps) {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [gowork, setGowork] = useState<string>("");
  // const [gowork, setgowork] = useState<string>("");
  const [leavework, setLeaveWork] = useState<string>("");
  const [wage, setWage] = useState<string>("");
  const [additionalContent, setAdditionalContent] = useState<string>("");

  const { UserType } = UserTypeState((state) => state);
  const { Storeid, Memberid, Name } = UserDataState((state) => state);

  const { WorkerList } = WorkerListState((state) => state);
  const [worker, setWorker] = useState<string>(Object.keys(WorkerList)[0]);
  // const [worker, setWorker] = useState<string>("");
  const { URL } = URLstate((state) => state);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {});

  async function adminAdditonalPost() {
    console.log("Worker in adminAdditonalPost:", worker); // 디버깅용 콘솔 로그
    console.log("WorkerList : ", WorkerList);

    // axios.post(`${URL}/admin/attendance`)
    console.log("Data sent from CalendarMo:", {
      member: Memberid,
      storeid: Storeid,
      worker: worker,
      gowork: gowork,
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
      gowork: gowork,
      leavework: leavework,
      wage: wage,
    };
    sendDataToCon({
      member: Memberid,
      storeid: Storeid,
      worker: worker,
      start: start,
      end: end,
      gowork: gowork,
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
      // console.log("res : ", res);
      // window.location.reload();
    } catch (error) {
      console.log("에러 발생");
    }
    setAdditionalContent("추가 작업이 수행되었습니다.");
    closeModal();
  }

  const eventDetails = selectedEvent ? (
    <>
      <p>근무자 : {selectedEvent.title}</p>
      <p>사장님이 등록한 출근시간 : {selectedEvent.start?.toLocaleString()}</p>
      <p>사장님이 등록한 퇴근시간 : {selectedEvent.end?.toLocaleString()}</p>
      <p>근무자가 입력한 출근시간 : {selectedEvent.gowork?.toLocaleString()}</p>
      <p>
        근무자가 입력한 퇴근시간 : {selectedEvent.leavework?.toLocaleString()}
      </p>
      <p>시급 : {selectedEvent.wage}</p>
      {UserType === "admin" && <button onClick={handleDelete}>삭제하기</button>}
    </>
  ) : null;

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
        gowork: gowork,
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
    closeModal();
  }

  const defaultDate = selectedDate
    ? new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16)
    : ""; // 선택된 날짜가 있을 때는 하루를 더한 값을, 없을 때는 빈 문자열을 기본값으로 설정

  const newDefaultDate = selectedDate
    ? (() => {
        const nextDay = new Date(selectedDate.getTime());
        const year = nextDay.getFullYear();
        const month = String(nextDay.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자리로 패딩
        const day = String(nextDay.getDate()).padStart(2, "0"); // 날짜를 두 자리로 패딩
        return `${year}년 ${month}월 ${day}일`;
      })()
    : "";

  const newSelectedDate = selectedEvent
    ? (() => {
        if (typeof selectedEvent.start === "string") {
          // start가 string인 경우 처리
          return selectedEvent.start;
        } else {
          // start가 Date인 경우 처리
          const startDate = selectedEvent.start as Date;
          const year = startDate.getFullYear();
          const month = String(startDate.getMonth() + 1).padStart(2, "0");
          const day = String(startDate.getDate()).padStart(2, "0");
          return `${year}년 ${month}월 ${day}일`;
        }
      })()
    : "";

  const newEventDefaultDateStart = selectedEvent
    ? (() => {
        if (typeof selectedEvent.start === "string") {
          return selectedEvent.start;
        } else {
          const startDate = selectedEvent.start as Date | null;
          if (startDate) {
            const year = startDate.getFullYear();
            const month = String(startDate.getMonth() + 1).padStart(2, "0");
            const day = String(startDate.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}T${startDate
              .toTimeString()
              .slice(0, 5)}`;
          } else {
            return "";
          }
        }
      })()
    : "";

  const newEventDefaultDateEnd = selectedEvent
    ? (() => {
        if (typeof selectedEvent.end === "string") {
          return selectedEvent.end;
        } else {
          const endDate = selectedEvent.end as Date | null;
          if (endDate) {
            const year = endDate.getFullYear();
            const month = String(endDate.getMonth() + 1).padStart(2, "0");
            const day = String(endDate.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}T${endDate
              .toTimeString()
              .slice(0, 5)}`;
          } else {
            return "";
          }
        }
      })()
    : "";

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

      <DateTimeLabel htmlFor="start">출근 시간 : </DateTimeLabel>
      <DateTimeInput
        type="datetime-local"
        id="start"
        value={start || defaultDate}
        onChange={(e) => setStart(e.target.value)}
      />
      <DateTimeLabel htmlFor="end">퇴근 시간 : </DateTimeLabel>
      <DateTimeInput
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

  async function getCurrentTimeStart(arg: any) {
    console.log("selectedEvent", selectedEvent);

    if (selectedEvent && selectedEvent.attendid) {
      const attendid = selectedEvent.attendid;
      console.log("selectedEvent 2", selectedEvent);
      const worker = selectedEvent.worker; // worker 정보 추가

      // 시간 설정하기
      const now = new Date();
      const formattedTime = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
      setGowork(formattedTime);

      const sendUserData = {
        memberid: Memberid,
        storeid: Storeid,
        worker: Memberid,
        start: start,
        end: end,
        gowork: formattedTime,
        leavework: leavework,
        attendid: attendid,
        wage: selectedEvent.wage,
      };
      sendDataToCon({
        memberid: Memberid,
        storeid: Storeid,
        worker: Memberid,
        start: start,
        end: end,
        gowork: formattedTime,
        leavework: leavework,
        attendid: attendid,
        wage: selectedEvent.wage,
      });
      console.log("Data sent to GetCurrentStart :", {
        memberid: Memberid,
        storeid: Storeid,
        worker: Memberid,
        start: start,
        end: end,
        gowork: formattedTime,
        leavework: leavework,
        attendid: attendid,
        wage: selectedEvent.wage,
      });
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
    closeModal();
  }

  async function getCurrentTimeEnd() {
    console.log("selectedEvent", selectedEvent);

    if (selectedEvent && selectedEvent.attendid) {
      const attendid = selectedEvent.attendid;
      console.log("selectedEvent 2", selectedEvent);
      const worker = selectedEvent.worker; // worker 정보 추가

      // 시간 설정하기
      const now = new Date();
      const formattedTime = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
      setLeaveWork(formattedTime);

      const sendUserData = {
        memberid: Memberid,
        storeid: Storeid,
        worker: Memberid,
        start: start,
        end: end,
        gowork: gowork,
        leavework: formattedTime,
        attendid: attendid,
        wage: selectedEvent.wage,
      };
      sendDataToCon({
        memberid: Memberid,
        storeid: Storeid,
        worker: Memberid,
        start: start,
        end: end,
        gowork: gowork,
        leavework: formattedTime,
        attendid: attendid,
        wage: selectedEvent.wage,
      });
      try {
        console.log("leavework 요청중");
        // UserType에 따라 다른 엔드포인트를 사용할 수 있습니다.
        const res = await axios.patch(
          `${URL}/user/attendance/leavework`,
          sendUserData
        );
        console.log("res : ", res);
      } catch (error) {
        console.error("leavework 요청 중 오류 발생:", error);
      }
    } else {
      // 선택된 이벤트가 없을 경우 에러 메시지를 설정합니다.
      setAdditionalContent("이벤트가 선택되지 않았습니다.");
    }
    closeModal();
  }

  const renderUserForm = () => (
    <>
      <div>등록은 사장님만 가능합니다.</div>
    </>
  );

  const adminEventForm = () => (
    <>
      {/* <label htmlFor="worker">근무자 : {worker}</label>
      <label htmlFor="gowork">근무자가 입력한 출근 시간 : {gowork}</label>
      <label htmlFor="leavework">퇴근 시간 : {leavework}</label> */}
    </>
  );

  const userEventForm = () => (
    <>
      <label htmlFor="gowork">출근 시간 : {gowork}</label>
      <button type="button" onClick={getCurrentTimeStart}>
        출근
      </button>
      <label htmlFor="leavework">퇴근 시간 : {leavework}</label>
      <button type="button" onClick={getCurrentTimeEnd}>
        퇴근
      </button>
    </>
  );

  const handleEdit = () => {
    setEditMode(true);
  };

  async function handleUpdate(arg: any) {
    if (selectedEvent && selectedEvent.attendid) {
      const attendid = selectedEvent.attendid;

      const updateData = {
        memberid: Memberid,
        storeid: Storeid,
        worker: worker,
        start: start,
        end: end,
        gowork: gowork,
        leavework: leavework,
        attendid: attendid,
        wage: wage,
      };
      console.log("Data sent by update :", {
        memberid: Memberid,
        storeid: Storeid,
        worker: Memberid,
        start: start,
        end: end,
        gowork: gowork,
        leavework: leavework,
        attendid: attendid,
        wage: wage,
      });
      sendDataToCon({
        memberid: Memberid,
        storeid: Storeid,
        worker: Memberid,
        start: start,
        end: end,
        gowork: gowork,
        leavework: leavework,
        attendid: attendid,
        wage: wage,
      });
      try {
        console.log("update 요청중");
        // UserType에 따라 다른 엔드포인트를 사용할 수 있습니다.
        const res = await axios.patch(
          `${URL}/admin/attendance/update`,
          updateData
        );
        console.log("res : ", res);
      } catch (error) {
        console.error("update 요청 중 오류 발생:", error);
      }
    }
    setEditMode(false); // 수정 완료 후 editMode를 비활성화
    closeModal();
  }

  const updateForm = () => (
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
        value={start || newEventDefaultDateStart}
        onChange={(e) => setStart(e.target.value)}
      />
      <label htmlFor="end">퇴근 시간 : </label>
      <input
        type="datetime-local"
        id="end"
        value={end || newEventDefaultDateEnd}
        onChange={(e) => setEnd(e.target.value)}
      />
      <label htmlFor="wage">급여 : </label>
      <input type="text" id="wage" onChange={(e) => setWage(e.target.value)} />
      <button type="button" onClick={handleUpdate}>
        수정하기
      </button>
    </>
  );

  return (
    <>
      {isOpen && selectedDate && (
        <div className="modal-container">
          <h2>{newDefaultDate}</h2>
          <form name="RegisterForm">
            {UserType === "admin" ? renderAdminForm() : renderUserForm()}
          </form>
          <button className="close-button" onClick={closeModal}>
            닫기
          </button>
        </div>
      )}

      {isOpen && selectedEvent && (
        <div className="modal-container">
          <h2>{newSelectedDate}</h2>
          <form name="EventForm">
            {UserType === "admin" ? adminEventForm() : userEventForm()}
          </form>
          {!editMode && eventDetails}
          <p>{additionalContent}</p>

          {UserType === "admin" && !editMode && (
            <button onClick={handleEdit}>수정하기</button>
          )}
          {editMode && updateForm()}
          <button className="close-button" onClick={closeModal}>
            닫기
          </button>
        </div>
      )}
    </>
  );
}

export default CalendarMo;
