import React, { useState } from 'react';
import styled from 'styled-components';
import { CalendarData, URLstate } from '../../Store/Store';
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
  const [startwork, setStartWork] = useState<string>('');
  const [leavework, setLeaveWork] = useState<string>('');
  const [additionalContent, setAdditionalContent] = useState<string>('');

  function handleAdditionalAction() {
    // const response = axios.post(`${URLstate}/admin/attendance`)
    console.log('Data sent from CalendarMo:', {
      worker: worker,
      startwork: startwork,
      leavework: leavework,
    });
    sendData({
      worker: worker,
      startwork: startwork,
      leavework: leavework,
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

  return (
    <>
      {isOpen && selectedDate && (
        <ModalContainer>
          <ModalHeader>선택된 날짜</ModalHeader>
          <form name="RegisterForm">
            <label htmlFor="worker">근무자 : </label>
            <input type="text" id="worker" onChange={(e) => setWorker(e.target.value)} />
            <label htmlFor="startwork">출근 시간 : </label>
            <input type="datetime-local" id="startwork" onChange={(e) => setStartWork(e.target.value)} />
            <label htmlFor="leavework">퇴근 시간 : </label>
            <input type="datetime-local" id="leavework" onChange={(e) => setLeaveWork(e.target.value)} />
            <button type="button" onClick={handleAdditionalAction}>추가 작업 수행</button>
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
