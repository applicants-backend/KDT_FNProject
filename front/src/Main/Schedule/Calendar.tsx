import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import axios from 'axios'
import Modal from "react-modal";

interface CalendarEvent {
  title: string;
  start: Date;
  allDay?: boolean;
}

export default function Calendar () {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleDateClick = (arg: any) => {
    const title = prompt("일정의 이름을 입력하세요:");
    if (title) {
      const newEvent: CalendarEvent = {
        title: title,
        start: arg.date,
        allDay: true,
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);
      console.log([newEvent])

      // axios.post("/schedule/events", [newEvent])
      // .then(response => {
      //   console.log("응답합니다." , response)
      // })
      // .catch(error => {
      //   console.error("에러 발생:", error);
      // });
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents={true}
        events={events}
        eventDisplay="list-item"
        height={"800px"}
        editable={true}
        dateClick={handleDateClick}
      />
    </>
  );
};
