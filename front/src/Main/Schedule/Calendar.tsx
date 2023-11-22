import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"
import CalendarModal from "./CalendarModal"; // Import your custom ModalContainer
import styled from 'styled-components';
import CalendarModaltest from "./CalendarModaltest";
import axios from "axios";
import UserTypeState, { UserDataState } from "../../Store/Store";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const {UserType} = UserTypeState(state=>state)
  const {Memberid} = UserDataState(state=>state)

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.date);
    openModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(()=> {
    const loadCalenderData = async () => {
        const UserRes = await axios.post(`/${UserType}/calendar/${Memberid}`)
        
    }
})


  return (
    <>
    <div>
      <FullCalendar
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
          initialView="dayGridMonth"
          dayMaxEvents={true}
          eventDisplay="list-item"
          height={"80vh"}
          editable={true}
          dateClick={handleDateClick}
          weekends={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
        />
        
        {isModalOpen && (
          <CalendarModaltest
            isOpen={isModalOpen}
            closeModal={closeModal}
            selectedDate={selectedDate}
          />
        )}
    </div>
      
    </>
  );
}
