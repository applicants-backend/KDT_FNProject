import React, { useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CalendarMo from './CalendarMo';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import UserTypeState from '../../Store/Store';



interface CalendarConProps {
  // 다른 필요한 props가 있다면 추가
}

function CalendarCon(props: CalendarConProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]); 
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const {UserType} = UserTypeState(state=>state)

  // modal open 두개로 쪼개기
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [isEventModalOpen, setEventModalOpen] = useState(false);

  // 데이트 클릭시 발생
//   function handleDateClick(arg: any) {
//     setSelectedDate(arg.date);
//     openModal();
//     console.log('Date Clicked:', arg.date);
//   }

  function handleDateClick(arg: any) {
    setSelectedDate(arg.date);
    setDateModalOpen(true);
    setEventModalOpen(false); // 모달이 열릴 때 다른 모달은 닫아줍니다.
  }

  function openModal() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setDateModalOpen(false);
    setEventModalOpen(false);
  }

  function sendData(data: any) {
    console.log('Data received in CalendarCon:', data);
  
    // 근무자 이름을 이벤트 제목으로 사용
    const title = data.worker;
  
    // 출근 시간을 이벤트 시작 시간으로 사용
    const start = UserType === "admin" ? new Date(data.start) : new Date(data.startwork);
  
    // 퇴근 시간을 이벤트 종료 시간으로 사용
    const end = UserType === "admin" ? new Date(data.work) : new Date(data.leavework);
  
    const newEvent = {
      title: title,
      start: start,
      end: end,
    };
  
    setEvents([...events, newEvent]);
  }

function handleEventClick(arg: any) {
    setEventModalOpen(true);
    setDateModalOpen(false); // 모달이 열릴 때 다른 모달은 닫아줍니다.)
    console.log(events)
    const clickedEvent = arg.event.extendedProps;
    console.log(clickedEvent)
    setSelectedEvent({
              title: arg.event.title,
              start: arg.event.start,
              end: arg.event.end,
              // 이벤트에서 가져와야 하는 다른 속성들을 추가할 수 있습니다.
            });
    console.log('Click Event Extended Props:', arg.event.extendedProps);


  }


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
          eventClick={handleEventClick}    
          weekends={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          events={events}
        />
        {isDateModalOpen && (
        <CalendarMo
          isOpen={isDateModalOpen}
          closeModal={() => setDateModalOpen(false)}
          sendData={sendData}
          selectedDate={selectedDate}
          selectedEvent={null} // 선택된 이벤트는 null로 설정
        />
      )}
      {isEventModalOpen && (
        <CalendarMo
          isOpen={isEventModalOpen}
          closeModal={() => setEventModalOpen(false)}
          sendData={sendData}
          selectedDate={null} // 선택된 날짜는 null로 설정
          selectedEvent={selectedEvent}
        />
      )}
    </div>
    </>
  );
}

export default CalendarCon;
