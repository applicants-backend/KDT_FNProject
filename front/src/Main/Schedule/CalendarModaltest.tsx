import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import create from 'zustand'
import UserTypeState, { UserDataState } from "../../Store/Store";
import axios from "axios";

interface CalendarModaltestProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedDate: Date | null;
}

interface CalenderData {
    memberid : String,
    registerTime : String,
    start? : String | null,
    end? : String | null,
    startwork? : String | null,
    leavework? : String | null,
    registertime? : String,
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

export default function CalendarModaltest({
  isOpen,
  closeModal,
  selectedDate,
}: CalendarModaltestProps) {

    const {UserType} = UserTypeState(state=>state)
    const {Memberid} = UserDataState(state=>state)
    const[registerTime, setRegisterTime] = useState<string>();

    const[start, setStart] = useState<string>();
    const[end, setEnd] = useState<string>();

    const[startwork, setStartWork] = useState<string>();
    const[leavework, setLeaveWork] = useState<string>();
    
    // form 만들기
    const [calenderForm, setCalendarForm] = useState<CalenderData>({
        memberid : "",
        registerTime : "",
        start : "",
        end : "",
        startwork : "",
        leavework : "",
        registertime : "",
    })

    const InputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target
        setCalendarForm((prevForm) => ({...prevForm, [Memberid]:value}))
    }

    const Register = async () => {
        const res = await axios.post(`${UserType}/calendar/`, calenderForm)
        console.log(res.data)
    }



  return (
    isOpen ? (
      <ModalContainer>
        <ModalHeader>모달</ModalHeader>
        <ModalContent>선택된 날짜: {selectedDate?.toString()}</ModalContent>
        <CloseButton onClick={closeModal}>Close Modal</CloseButton>
      </ModalContainer>
    ) : null
  );
}
