// import React, { useEffect, useState } from "react";
// import styled from 'styled-components';
// import create from 'zustand'
// import UserTypeState, { UserDataState, useEventsStore } from "../../Store/Store";
// import axios from "axios";

// interface CalendarModaltestProps {
//   isOpen: boolean;
//   closeModal: () => void;
//   selectedDate: Date | null;
// }

// interface CalendarDataModal {
//     memberid : String, 
//     registerTime : String,
//     worker : String,
//     start? : String | null,
//     end? : String | null,
//     startwork? : String | null,
//     leavework? : String | null,
//     registertime? : String,
// }

// const ModalContainer = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: rgba(0, 0, 0, 0.8);
//   color: white;
//   padding: 20px;
//   width: 50vh;
//   height: 50vh;
//   z-index: 1000;
// `;

// const ModalHeader = styled.h2`
//   margin-bottom: 10px;
// `;

// const ModalContent = styled.p`
//   margin-bottom: 20px;
// `;

// const CloseButton = styled.button`
//   background-color: #3498db;
//   color: white;
//   padding: 10px;
//   cursor: pointer;
// `;

// export default function CalendarModaltest({
//   isOpen,
//   closeModal,
//   selectedDate,
// }: CalendarModaltestProps) {

//     const {UserType} = UserTypeState(state=>state)
//     const {Memberid} = UserDataState(state=>state)

//     const[registerTime, setRegisterTime] = useState<string>();
//     const[worker, setworker] = useState<string>();

//     const[start, setStart] = useState<string>();
//     const[end, setEnd] = useState<string>();

//     const[startwork, setStartWork] = useState<string>();
//     const[leavework, setLeaveWork] = useState<string>();
    
//     // form 만들기
    // const [calendarForm, setCalendarForm] = useState<CalendarDataModal>({
    //     memberid : "",
    //     worker: "",
    //     registerTime : "",
    //     start : "",
    //     end : "",
    //     startwork : "",
    //     leavework : "",
    // })

    // const InputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    //     const {id,value} = e.target
    //     setCalendarForm((prevForm) => ({...prevForm, [id]:value}))
    //     // console.log(InputHandler)
    // }

//     const {events, setEvents} = useEventsStore(state=>state)

//     const Register = async () => {
//         // const res = await axios.post(`${UserType}/calendar/`, CalendarForm)
//         console.log(calendarForm)
//         useEventsStore.getState().setEvents([...useEventsStore.getState().events, calendarForm]);

//         // console.log(res.data)
//         // const addCalendarRes = await axios.post(`calendar/data`)
//         // const addCalendarData = add/CalendarRes.data
//         // const newDataArray: CalendarData[] = [addCalendarData];

//         // console.log(setCalendarForm)
//         // useEventsStore.getState().setEvents([...useEventsStore.getState().events, ...addCalendarData]);
//     }



//   return (
//     isOpen ? (
//       <ModalContainer>
//         <ModalHeader>모달</ModalHeader>
//         <ModalContent>
//             선택된 날짜: {selectedDate?.toString()}
//             <form name="RegisterForm">
//               <label htmlFor="worker">근무자 : </label>
//               <input type="text" id="worker" onChange={InputHandler}/>
//                 {UserType === "admin" ? 
//                 <>
//                     <label htmlFor="start">출근 시간 : </label>
//                     <input type="datetime-local" id="start" onChange={InputHandler} value={start}/>
//                     <label htmlFor="end">퇴근 시간 : </label>
//                     <input type="datetime-local" id="end" onChange={InputHandler} value={end}/>
//                 </>
//                 :
//                 <>
//                     <label htmlFor="startwork">출근 시간 : </label>
//                     <input type="datetime-local" id="startwork" onChange={InputHandler} value={startwork}/>
//                     <label htmlFor="leavework">퇴근 시간 : </label>
//                     <input type="datetime-local" id="leavework" onChange={InputHandler} value={leavework}/>
//                 </>
//                 }
//                 <button type="button" onClick={(e)=> {Register()}}>저장하기</button>
//             </form>
//             </ModalContent>
//         <CloseButton onClick={closeModal}>Close Modal</CloseButton>
//       </ModalContainer>
//     ) : null
//   );
// }

export default function CalendarModaltest() {
  return <></>
}