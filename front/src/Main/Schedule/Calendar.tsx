import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"
import CalendarModal from "./CalendarModal"; // Import your custom ModalContainer
import styled from 'styled-components';
import CalendarModaltest from "./CalendarModaltest";
import axios from "axios";
import UserTypeState, { UserDataState, useEventsStore } from "../../Store/Store";

interface CalendarData {
  worker : String,
  start? : String | null,
  end? : String | null,
}

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

  const {events, setEvents} = useEventsStore(state=>state)

  const CalendarEvents = async() => {
    const addCalendarRes = await axios.post(`calendar/data`)
    const addCalendarData = addCalendarRes.data
    setEvents([...events, addCalendarData])

    useEventsStore.getState().setEvents([...useEventsStore.getState().events, ...addCalendarData]);
  }


  const data = [
    
    { title: 'Meeting1', start: new Date('2023-11-29') },
    { title: 'Meeting2', start: new Date('2023-11-30') }
    
  ]

  // function CalendarEvents () {
  //   EventSource : [
  //     {
  //       events : {
  //         title : {username},
  //         start : {start}
  //         end : {end}
  //       }
  //     }
  //   ]
  // }



  useEffect(()=> {
    const loadCalenderData = async () => {
        // const UserRes = await axios.post(`/${UserType}/calendar/${Memberid}`)
        const eventsRes = await axios.get(``)
        const events = eventsRes.data;  
    };
    loadCalenderData();
}, [Memberid, UserType])

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
          events={data}
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
