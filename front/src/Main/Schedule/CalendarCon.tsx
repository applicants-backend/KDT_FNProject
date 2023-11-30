import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CalendarMo from './CalendarMo';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import UserTypeState, {CalendarData, UserDataState,URLstate} from '../../Store/Store';
import axios from 'axios';
import Calendar from './Calendar';
import { CalendarImpl } from '@fullcalendar/core/internal';



interface CalendarConProps {
  // 다른 필요한 props가 있다면 추가
}

function CalendarCon(props: CalendarConProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]); 
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // 시간 데이터 갖고오기
  const [nowDate, setNowDate] = useState<string | null>('');
  const [month, setMonth] = useState<string | null>('');

  const [worker, setWorker] = useState<string>('');
  const [startwork, setStartWork] = useState<string>('');
  const [leavework, setLeaveWork] = useState<string>('');

  const {UserType} = UserTypeState(state=>state)
  const {URL} = URLstate(state=>state)
  const {Storeid,Memberid,Name} = UserDataState(state=>state)

  const memberid = Memberid
  const storeid = Storeid

  const data={
    memberid,storeid
  }

  // modal open 두개로 쪼개기
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [isEventModalOpen, setEventModalOpen] = useState(false);

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
  function dateClick(info:any) {
    console.log(info)
    console.log(info.view)
  }

  // month 값.
  // 해당 달 정보 보내기
  // 달 변경 확인하기

  const handleDatesSet = (arg:any) => {
    
    const startDate = new Date(arg.startStr);

    // arg.startStr이 유효한 날짜 형식인지 확인
    if (isNaN(startDate.getTime())) {
      console.error('Invalid start date:', arg.startStr);
      return;
    }

    // 한 달을 더함
    startDate.setMonth(startDate.getMonth() + 1);

    // 12월에서 1월로 갈 때 연도를 늘림
    if (startDate.getMonth() === 0) {
      startDate.setFullYear(startDate.getFullYear() + 1);
    }
    const formattedDate = `${startDate.toISOString().slice(0, 16)}:00`;

    // month 업데이트
    // console.log('백엔드에 보낼 날짜:', formattedDate);
    setMonth(formattedDate);
    // console.log('Month Data:', month);
  };
  const handleDidMount = () => {

  }

  useEffect(() => {
    const loadCalendarData = async () => {
      const currentDate = new Date();
      console.log("CurrentDate : " , currentDate)
      const formmatDate = `${currentDate.toISOString().slice(0, 16)}:00`;
      console.log("formmatDate : " , formmatDate)
      console.log("month / first date : " ,month)
      if (month !== null) {
        try {
          const calendarData = UserType === "admin" ?
          // await axios.post<{ data: CalendarData[] }>(`${URL}/admin/attendance/findAll`, data)
          await axios.get<{ data: CalendarData[] }>(`${URL}/admin/schedule/${memberid}/${storeid}/${formmatDate}`)
          : await axios.get<{ data: CalendarData[] }>(`${URL}/user/schedule/${memberid}/${storeid}/${formmatDate}`)
            
          // map 으로 돌려서 배열 데이터 풀어내기
          const eventsArray = calendarData.data.data.map((item: CalendarData) => {
  
            // admin 과 user 에 따라서 값을 다르게 나눠주기
            const start: Date = UserType === "admin" ? new Date(item.start as string) : new Date(item.startwork as string);
            const end: Date = UserType === "admin" ? new Date(item.end as string) : new Date(item.leavework as string);
    
            return {
              title: item.worker,
              start: start,
              end: end,
            };
            
          });
    
          // Set the events array
          setEvents(eventsArray);
          console.log(calendarData.data.data);
        } catch (error) {
          console.log('에러', error);
        }
      } else {
        try {
          const calendarData = UserType === "admin" ?
          // await axios.post<{ data: CalendarData[] }>(`${URL}/admin/attendance/findAll`, data)
          await axios.get<{ data: CalendarData[] }>(`${URL}/admin/schedule/${memberid}/${storeid}/${formmatDate}`)
          : await axios.get<{ data: CalendarData[] }>(`${URL}/user/schedule/${memberid}/${storeid}/${formmatDate}`)  
          // map 으로 돌려서 배열 데이터 풀어내기
          const eventsArray = calendarData.data.data.map((item: CalendarData) => {
  
            // admin 과 user 에 따라서 값을 다르게 나눠주기
            const start: Date = UserType === "admin" ? new Date(item.start as string) : new Date(item.startwork as string);
            const end: Date = UserType === "admin" ? new Date(item.end as string) : new Date(item.leavework as string);
    
            return {
              title: item.worker,
              start: start,
              end: end,
            };
            
          });
          // Set the events array
          setEvents(eventsArray);
          console.log(calendarData.data.data);
        } catch (error) {
          console.log('에러', error);
        }
      }

      // tryCatch 미리 해놓기.
      // try {
      //   const calendarData = UserType === "admin" ?
      //   // await axios.post<{ data: CalendarData[] }>(`${URL}/admin/attendance/findAll`, data)
      //   await axios.get<{ data: CalendarData[] }>(`${URL}/admin/schedule/${memberid}/${storeid}/${month}`)
      //   : await axios.get<{ data: CalendarData[] }>(`${URL}/user/schedule/${memberid}/${storeid}/${month}`)  
      //   // map 으로 돌려서 배열 데이터 풀어내기
      //   const eventsArray = calendarData.data.data.map((item: CalendarData) => {

      //     // admin 과 user 에 따라서 값을 다르게 나눠주기
      //     const start: Date = UserType === "admin" ? new Date(item.start as string) : new Date(item.startwork as string);
      //     const end: Date = UserType === "admin" ? new Date(item.end as string) : new Date(item.leavework as string);
  
      //     return {
      //       title: item.worker,
      //       start: start,
      //       end: end,
      //     };
          
      //   });
  
      //   // Set the events array
      //   setEvents(eventsArray);
      //   console.log(calendarData.data.data);
      // } catch (error) {
      //   console.log('에러', error);
      // }
    };
  
    loadCalendarData();
  }, [month]); // Empty dependency array to run the effect only once
  
  
  

  function sendDataFromModal(data: any) {
    console.log('Data received in CalendarCon:', data);
  
    // 근무자 이름을 이벤트 제목으로 사용
    const title = data.worker;
  
    // 출근 시간을 이벤트 시작 시간으로 사용
    const start = UserType === "admin" ? new Date(data.start) : new Date(data.startwork);
  
    // 퇴근 시간을 이벤트 종료 시간으로 사용
    const end = UserType === "admin" ? new Date(data.end) : new Date(data.leavework);
  
    const newEvent = {
      title: title,
      start: start,
      end: end,
    };
  
    setEvents([...events, newEvent]);
  }

function handleEventClick(arg: any) {
    if (UserType === "admin") {
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
      console.log('Click Event Extended Props:', arg.event.esxtendedProps);
    } else {
      setEventModalOpen(true);
      setDateModalOpen(false); // 모달이 열릴 때 다른 모달은 닫아줍니다.)
      console.log(events)
      const clickedEvent = arg.event.extendedProps;
      console.log(clickedEvent)
      const getCurrentTimeStart = () => {
        const now = new Date();
        const formattedTime = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
        setStartWork(formattedTime);
        const dataSet = {
          memberid : Memberid,
          storeid : Storeid,
          startwork : setStartWork,
          worker : Name
        }
        try {
          axios.patch(`${URL}/user/attendance/gowork`, dataSet)          
        } catch (error) {
          console.log(error)
        }
      };
      const getCurrentTimeEnd = () => {
        const now = new Date();
        const formattedTime = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
        setLeaveWork(formattedTime);
        const dataSet = {
          memberid : Memberid,
          storeid : Storeid,
          leavework : setLeaveWork,
          worker : Name
        }
        try {
          axios.patch(`${URL}/user/attendance/leavework`, dataSet)
        } catch (error) {
          console.log(error)
        }
      };

      const UserDataSet = () => {
        <>
          <label htmlFor="worker">근무자 : {Name}</label>
          <label htmlFor="startwork">출근 시간 : {startwork}</label>
          <button type='button' onClick={getCurrentTimeStart}>출근 시간 저장하기</button>
          <label htmlFor="leavework">퇴근 시간 : {leavework}</label>
          <button type='button' onClick={getCurrentTimeEnd}>퇴근 시간 저장하기</button>
        </>
      }

      setSelectedEvent({
                title: arg.event.title,
                start: arg.event.start,
                end: arg.event.end,
                // 이벤트에서 가져와야 하는 다른 속성들을 추가할 수 있습니다.
                UserDataSet
              });
      console.log('Click Event Extended Props:', arg.event.extendedProps);
    }
    
  }

  
  


  /// return 시작
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
            right: "dayGridMonth,timeGridWeek"
          }}
          events={events}
          eventChange={() => {
            console.log("dkssud")
          }}
          // customButtons={CustomButtons}
          datesSet={handleDatesSet}
          viewDidMount={handleDidMount}
        />
        {isDateModalOpen && (
        <CalendarMo
          isOpen={isDateModalOpen}
          closeModal={() => setDateModalOpen(false)}
          sendDataToCon={sendDataFromModal}
          selectedDate={selectedDate}
          selectedEvent={null} // 선택된 이벤트는 null로 설정
        />
      )}
      {isEventModalOpen && (
        <CalendarMo
          isOpen={isEventModalOpen}
          closeModal={() => setEventModalOpen(false)}
          sendDataToCon={sendDataFromModal}
          selectedDate={null} // 선택된 날짜는 null로 설정
          selectedEvent={selectedEvent}
        />
      )}
    </div>
    </>
  );
}

export default CalendarCon;
