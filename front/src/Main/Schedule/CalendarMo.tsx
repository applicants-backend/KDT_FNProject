import React, { useState } from 'react';
import styled from 'styled-components';
import UserTypeState, { CalendarData, URLstate } from '../../Store/Store';
import axios from 'axios';

interface CalendarMoProps {
  isOpen: boolean;
  closeModal: () => void;
  sendData: (data: any) => void;
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

function CalendarMo({ isOpen, closeModal, sendData, selectedEvent, selectedDate }: CalendarMoProps) {
  const [worker, setWorker] = useState<string>('');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [startwork, setStartWork] = useState<string>('');
  const [leavework, setLeaveWork] = useState<string>('');
  const [wage, setWage] = useState<string>('');
  const [additionalContent, setAdditionalContent] = useState<string>('');

  const {UserType} = UserTypeState(state=>state)

  const {URL} = URLstate(state=>state)

  function adminAdditonalPost() {
    // axios.post(`${URL}/admin/attendance`)
    console.log('Data sent from CalendarMo:', {
      worker: worker,
      startwork: startwork,
      leavework: leavework,
      start : start,
      end : end,
      wage : wage,
    });
    sendData({
      worker: worker,
      start: start,
      end: end,
      startwork: startwork,
      leavework: leavework,
      wage:wage,
    });
    setAdditionalContent('추가 작업이 수행되었습니다.');
  }

  function userAdditonalPost() {
    // axios.post(`${URL}/admin/attendance`)
    console.log('Data sent from CalendarMo:', {
      worker: worker,
      startwork: startwork,
      leavework: leavework,
      start : start,
      end : end,
      wage : wage,
    });
    sendData({
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
  const renderAdminForm = () => (
    <>
      <label htmlFor="worker">근무자 : </label>
      <input type="text" id="worker" onChange={(e) => setWorker(e.target.value)} />
      <label htmlFor="start">출근 시간 : </label>
      <input type="datetime-local" id="start" onChange={(e) => setStart(e.target.value)} />
      <label htmlFor="end">퇴근 시간 : </label>
      <input type="datetime-local" id="end" onChange={(e) => setEnd(e.target.value)} />
      <label htmlFor="wage">급여 : </label>
      <input type="text" id="wage" onChange={(e) => setWage(e.target.value)} />
      <button type="button" onClick={adminAdditonalPost}>저장하기</button>
    </>
  );
  const renderUserForm = () => (
    <>
      <label htmlFor="worker">근무자 : </label>
      <input type="text" id="worker" onChange={(e) => setWorker(e.target.value)} />
      <label htmlFor="startwork">출근 시간 : </label>
      <input type="datetime-local" id="startwork" onChange={(e) => setStartWork(e.target.value)} />
      <label htmlFor="leavework">퇴근 시간 : </label>
      <input type="datetime-local" id="leavework" onChange={(e) => setLeaveWork(e.target.value)} />
      <button type="button" onClick={userAdditonalPost}>저장하기</button>
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
