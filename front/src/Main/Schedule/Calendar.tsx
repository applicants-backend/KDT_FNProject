// import React, { useState, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid"
// import CalendarModal from "./CalendarModal"; // Import your custom ModalContainer
// import styled from 'styled-components';
// import CalendarModaltest from "./CalendarModaltest";
// import axios from "axios";
// import UserTypeState, { UserDataState, useEventsStore } from "../../Store/Store";

// interface CalendarDataCon {
//   worker : any | null,
//   start? : any | null,
//   end? : any | null,
// }

// export default function Calendar() {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [isModalOpen, setModalOpen] = useState(false);

//   const {UserType} = UserTypeState(state=>state)
//   const {Memberid} = UserDataState(state=>state)

  
//   const handleDateClick = (arg: any) => {
//     setSelectedDate(arg.date);
//     openModal();
//   };
  
//   const openModal = () => {
//     setModalOpen(true);
//   };
  
//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const {events, setEvents} = useEventsStore(state=>state)

//   // const CalendarEvents = async() => {
//   //   const addCalendarRes = await axios.post(`calendar/data`)
//   //   const addCalendarData = addCalendarRes.data
//   //   setEvents([...events, addCalendarData])

//   //   useEventsStore.getState().setEvents([...useEventsStore.getState().events, ...addCalendarData]);
//   // }

//   const data = [
    
//     { title: 'Meeting1', start: new Date('2023-11-29'), end : new Date('2023-11-30') },
//     { title: 'Meeting2', start: new Date('2023-11-30') }
    
//   ]

//   useEffect(()=> {
//     const loadCalendarData = async () => {
//         // const UserRes = await axios.post(`/${UserType}/calendar/${Memberid}`)
//         const response = await axios.get<CalendarDataCon>(``)
//         const data = [
//           {
//             title:response.data.worker,
//             start:response.data.start,
//             end:response.data.end,
//           }
//         ] 
//         // setEvents(response);
//     };
//     loadCalendarData();
// }, [Memberid, UserType])
//   // const UserDataModel =


//   // const resData = axios.get<CalendarData>('')
//   // const res = {
//   //   title : resData.worker
//   // }
//   // console.log(resData)



//   // const EventData = [
//   //   {
//   //     title: String(resData) ,
//   //     start : new Date(resData.start)
//   //   }
//   // ]

//   const dataModel = data



//   return (
//     <>
//     <div>
//       <FullCalendar
//           plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
//           initialView="dayGridMonth"
//           dayMaxEvents={true}
//           eventDisplay="list-item"
//           height={"80vh"}
//           editable={true}
//           dateClick={handleDateClick}
//           weekends={true}
//           headerToolbar={{
//             left: "prev,next today",
//             center: "title",
//             right: "dayGridMonth,timeGridWeek,timeGridDay"
//           }}
//           // events={EventData}
//         />
//         {isModalOpen && (
//           <CalendarModaltest
//             isOpen={isModalOpen}
//             closeModal={closeModal}
//             selectedDate={selectedDate}
//           />
//         )}
//     </div>
      
//     </>
//   );
// }


export default function Calendar() {
  return <></>
}