// import axios from 'axios';
// import React, { useEffect, useState, ChangeEvent } from 'react';
// import './Calendar.css';
// import UserTypeState, { UserDataState } from '../../Store/Store';
// import Modal from 'react-modal';
// import styled from 'styled-components'

// const ModalContainer = styled.div`
//   background-color: rgba(0, 0, 0, 0.8); /* Adjust the alpha value (last parameter) as needed */
//   color: white;
//   padding: 20px;
// `;

// interface ModalData {
//   MemberId: string;
//   start: string;
//   end: string;
//   gowork?: string | null;
//   leavework?: string | null;
//   registertime: string | null;
// }

// interface CalendarModalPropss {
//   selectedDate: Date | null;
//   closeModal: () => void;
// }

// export default function CalendarModal({ selectedDate, closeModal }: CalendarModalProps) {
//   const Memberid = UserDataState((state) => state);
//   const [start, setStart] = useState<string>('');
//   const [end, setEnd] = useState<string>('');
//   const [gowork, setGoWork] = useState<string | null>('');
//   const [leavework, setLeaveWork] = useState<string | null>('');
//   const [registertime, setRegistertime] = useState<string | null>('');

//   // useEffect(() => {
//   //   const louadUserData = async () => {
//   //     try {
//   //       if (selectedDate) {
//   //         // 사용자 데이터를 선택한 날짜로 로드하는 로직을 추가할 수 있습니다.
//   //         const UserRes = await axios.post(`/${Memberid}/calendar`, {
//   //           memberId: Memberid,
//   //           selectedDate: selectedDate.toISOString(), // 선택한 날짜를 서버로 전송
//   //         });
//   //         console.log(UserRes.data);
//   //       }
//   //     } catch (error) {
//   //       console.error('데이터를 불러 오지 못했습니다 :', error);
//   //     }
//   //   };
//   //   louadUserData();
//   // }, [Memberid, selectedDate]);

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     // 각 input에 대한 상태 업데이트
//     if (name === 'start') setStart(value);
//     else if (name === 'end') setEnd(value);
//     else if (name === 'gowork') setGoWork(value);
//     else if (name === 'leavework') setLeaveWork(value);
//     else if (name === 'registertime') setRegistertime(value);
//   };

//   const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     e.stopPropagation(); // Prevent click propagation to FullCalendar
//     console.log(handleModalClick)
//   };

//   const handleSave = () => {
//     // Add your logic to save the input data
//   };

//   return (
//     <Modal
//       isOpen={true}
//       onRequestClose={closeModal}
//       ariaHideApp={false}
//       shouldCloseOnOverlayClick={true}
//       portalClassName="modal-portal"
//     >
//       <ModalContainer  onClick={handleModalClick}>
//         <form name="CalendarForm">
//           <label htmlFor="dateTime"> Date & Time (YYYY-MM-DD HH:mm) : </label>
//           <input
//             name="dateTime"
//             value={start}
//             id="dateTime"
//             onChange={handleInputChange}
//             placeholder="YYYY-MM-DD HH:mm"
//           ></input>
//           <label htmlFor="gowork"> gowork : </label>
//           <input name="gowork" value={gowork || ''} id="gowork" onChange={handleInputChange}></input>
//           <label htmlFor="leavework"> leavework : </label>
//           <input
//             name="leavework"
//             value={leavework || ''}
//             id="leavework"
//             onChange={handleInputChange}
//           ></input>
//           <label htmlFor="registertime"> registertime : </label>
//           <input
//             name="registertime"
//             value={registertime || ''}
//             id="registertime"
//             onChange={handleInputChange}
//           ></input>
//         </form>
//         <button onClick={handleSave}>Save</button>
//         <button onClick={closeModal}>닫기</button>
//       </ModalContainer>
//     </Modal>
//   );
// }


export default function CalendarModal() {
  return <></>
}