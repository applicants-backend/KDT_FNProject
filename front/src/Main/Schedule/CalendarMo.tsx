import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserTypeState, { UserDataState,CalendarData, URLstate } from '../../Store/Store';
import axios from 'axios';

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

function CalendarMo({ isOpen, closeModal, sendDataToCon, selectedEvent, selectedDate }: CalendarMoProps) {
  const [worker, setWorker] = useState<string>('');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [startwork, setStartWork] = useState<string>('');
  const [leavework, setLeaveWork] = useState<string>('');
  const [wage, setWage] = useState<string>('');
  const [additionalContent, setAdditionalContent] = useState<string>('');

  const {UserType} = UserTypeState(state=>state)
  const {Storeid,Memberid,Name} = UserDataState(state=>state)

  const [myStoreUser, setMyStoreUser] = useState<string>('');

  const {URL} = URLstate(state=>state)

  async function adminAdditonalPost() {
    // axios.post(`${URL}/admin/attendance`)
    console.log('Data sent from CalendarMo:', {
      member : Memberid,
      storeid : Storeid,
      worker: worker,
      startwork: startwork,
      leavework: leavework,
      start : start,
      end : end,
      wage : wage,
    });
    const sendAdminData={
      memberid : Memberid,
      storeid : Storeid,
      worker: worker,
      start: start,
      end: end,
      startwork: startwork,
      leavework: leavework,
      wage:wage,
    };
    sendDataToCon({
      member : Memberid,
      storeid : Storeid,
      worker: worker,
      start: start,
      end: end,
      startwork: startwork,
      leavework: leavework,
      wage:wage,
    });
    try {
      const res = await axios.post(`${URL}/admin/attendance/create`, sendAdminData)
      console.log(res)
    } catch (error) {
      console.log('에러 발생')
    }
    setAdditionalContent('추가 작업이 수행되었습니다.');
  }

  async function userAdditonalPost() {
    const sendUserData={
      memberid : Memberid,
      storeid : Storeid,
      worker: worker,
      start: start,
      end: end,
      startwork: startwork,
      leavework: leavework,
      wage:wage,
    };
    // const response = axios.post(`${URL}/admin/attendance/create`, sendData)
    // const responseRes = response
    // console.log(responseRes)
    try {
      const postData = await axios.post(`${URL}/user/attendance/create`, sendUserData)
      console.log(postData.data)
    } catch (error) {
      console.log('에러 발생')
    }
    // axios.post(`${URL}/admin/attendance`)
    console.log('Data sent from CalendarMo:', {
      member : Memberid,
      storeid : Storeid,
      worker: Name,
      startwork: startwork,
      leavework: leavework,
      start : start,
      end : end,
      wage : wage,
    });
    sendDataToCon({
      member : Memberid,
      storeid : Storeid,
      worker: worker,
      start: start,
      end: end,
      startwork: startwork,
      leavework: leavework,
      wage:wage,
    });

    setAdditionalContent('추가 작업이 수행되었습니다.');
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

  function handleDelete() {
    // 삭제 로직 추가
  }
  const SelectBox = () => {
    return (
      <select id='worker'>
        <option key="banana" value="banana">바나나 </option>
        <option key="apple" value="apple">사과</option>
        <option key="orange" value="orange">오렌지</option>
      </select>
    );
  }

  const renderAdminForm = () => (
    <>
      <label htmlFor="worker">근무자 : </label>
      {/* <input type="select" id="worker" onChange={(e) => setWorker(e.target.value)}/> */}
      <SelectBox/>
      <label htmlFor="start">출근 시간 : </label>
      <input type="datetime-local" id="start" onChange={(e) => setStart(e.target.value)} />
      <label htmlFor="end">퇴근 시간 : </label>
      <input type="datetime-local" id="end" onChange={(e) => setEnd(e.target.value)} />
      <label htmlFor="wage">급여 : </label>
      <input type="text" id="wage" onChange={(e) => setWage(e.target.value)} />
      <button type="button" onClick={adminAdditonalPost}>저장하기</button>
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
      {/* <label htmlFor="worker">근무자 : {Name}</label>
      <input type="text" id="worker" onChange={(e) => setWorker(e.target.value)} />
      <label htmlFor="startwork">출근 시간 : </label>
      <input type="datetime-local" id="startwork" onChange={(e) => setStartWork(e.target.value)} />
      <label htmlFor="leavework">퇴근 시간 : </label>
      <input type="datetime-local" id="leavework" onChange={(e) => setLeaveWork(e.target.value)} />
      <button type="button" onClick={userAdditonalPost}>저장하기</button> */}

      {/* 새로운 로직 */}
      <label htmlFor="worker">근무자 : {Name}</label>
      {/* 근무자 데이터를 서버에 전송하는 로직을 추가할 수 있습니다. */}
      {/* <input type="text" id="worker" onChange={(e) => setWorker(e.target.value)} /> */}
      
      <label htmlFor="startwork">출근 시간 : {startwork}</label>
      <button type='button' onClick={getCurrentTimeStart}>출근 시간 저장하기</button>
      
      <label htmlFor="leavework">퇴근 시간 : {leavework}</label>
      {/* 퇴근 시간 데이터를 서버에 전송하는 로직을 추가할 수 있습니다. */}
      <button type='button' onClick={getCurrentTimeEnd}>퇴근 시간 저장하기</button>

      {/* <input type="datetime-local" id="leavework" onChange={(e) => setLeaveWork(e.target.value)} /> */}
      
      <button type="button" onClick={userAdditonalPost}>저장하기</button>

    </>
  );

  // select 박스 만들기.
  useEffect(() => {
    const loadUser = async() => {
      try {
        const myStoreUser  = await axios.get(`${URL}/admin/attendance/workerlist/${Memberid}/${Storeid}`)
        // const array = myStoreUser.data
        console.log(myStoreUser)
        const memberid = myStoreUser.data.data.key
        const name = myStoreUser.data.data.value
        console.log(memberid)
        console.log(name)
      } catch (error) {
        
      }

    };
    loadUser();
  })

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
