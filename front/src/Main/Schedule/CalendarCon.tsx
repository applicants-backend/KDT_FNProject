import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CalendarMo from "./CalendarMo";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import UserTypeState, {
  CalendarData,
  UserDataState,
  URLstate,
} from "../../Store/Store";
import axios from "axios";
import Calendar from "./Calendar";
import { CalendarImpl } from "@fullcalendar/core/internal";
import { error } from "console";

interface CalendarConProps {
  // 다른 필요한 props가 있다면 추가
}

function CalendarCon(props: CalendarConProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // 시간 데이터 갖고오기
  const [nowDate, setNowDate] = useState<string | null>("");
  const [month, setMonth] = useState<string | null>("");

  const [worker, setWorker] = useState<string>("");
  const [startwork, setStartWork] = useState<string>("");
  const [leavework, setLeaveWork] = useState<string>("");

  const { UserType } = UserTypeState((state) => state);
  const { URL } = URLstate((state) => state);
  const { Storeid, Memberid, Name } = UserDataState((state) => state);

  const memberid = Memberid;
  const storeid = Storeid;

  const data = {
    memberid,
    storeid,
  };

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
  function dateClick(info: any) {
    console.log(info);
    console.log(info.view);
  }

  // month 값.
  // 해당 달 정보 보내기
  // 달 변경 확인하기

  const handleDatesSet = (arg: any) => {
    const startDate = new Date(arg.startStr);

    // arg.startStr이 유효한 날짜 형식인지 확인
    if (isNaN(startDate.getTime())) {
      console.error("Invalid start date:", arg.startStr);
      return;
    }

    // 한 달을 더함
    startDate.setMonth(startDate.getMonth() + 1);

    // 12월에서 1월로 갈 때 연도를 늘림
    if (startDate.getMonth() === 0) {
      startDate.setFullYear(startDate.getFullYear() + 1);
    }
    const formattedDate = `${startDate.toISOString().slice(0, 16)}:00`;

    setMonth(formattedDate);
  };
  const handleDidMount = () => {};

  useEffect(() => {
    const loadCalendarData = async () => {
      const currentDate = new Date();
      const formmatDate = `${currentDate.toISOString().slice(0, 16)}:00`;

      try {
        const calendarData =
          UserType === "admin"
            ? await axios.get<{ data: CalendarData[] }>(
                `${URL}/admin/schedule/${memberid}/${storeid}/${formmatDate}`
              )
            : await axios.get<{ data: CalendarData[] }>(
                `${URL}/user/schedule/${memberid}/${storeid}/${formmatDate}`
              );

        const eventsArray = calendarData.data.data.map((item: CalendarData) => {
          const start: Date =
            UserType === "admin"
              ? new Date(item.start as string)
              : new Date(item.startwork as string);
          const end: Date =
            UserType === "admin"
              ? new Date(item.end as string)
              : new Date(item.leavework as string);

          return {
            title: item.worker,
            start: start,
            end: end,
          };
        });

        setEvents(eventsArray);
        console.log(calendarData.data.data);
      } catch (error) {
        console.log("에러", error);
      }
    };

    // 페이지가 처음으로 마운트될 때만 실행
    loadCalendarData();
  }, []); // 두 번째 인자에 빈 배열을 전달하여 페이지가 처음으로 마운트될 때만 실행

  useEffect(() => {
    const loadMonthData = async () => {
      try {
        const calendarData =
          UserType === "admin"
            ? await axios.get<{ data: CalendarData[] }>(
                `${URL}/admin/schedule/${memberid}/${storeid}/${month}`
              )
            : await axios.get<{ data: CalendarData[] }>(
                `${URL}/user/schedule/${memberid}/${storeid}/${month}`
              );

        const eventsArray = calendarData.data.data.map((item: CalendarData) => {
          const start: Date =
            UserType === "admin"
              ? new Date(item.start as string)
              : new Date(item.startwork as string);
          const end: Date =
            UserType === "admin"
              ? new Date(item.end as string)
              : new Date(item.leavework as string);
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
        console.log("에러", error);
      }
    };

    // loadMonthData 함수를 실행
    loadMonthData();
  }, [month]);

  function sendDataFromModal(data: any) {
    console.log("Data received in CalendarCon:", data);

    // 근무자 이름을 이벤트 제목으로 사용
    const title = data.worker;

    // 출근 시간을 이벤트 시작 시간으로 사용
    const start =
      UserType === "admin" ? new Date(data.start) : new Date(data.startwork);

    // 퇴근 시간을 이벤트 종료 시간으로 사용
    const end =
      UserType === "admin" ? new Date(data.end) : new Date(data.leavework);

    const newEvent = {
      title: title,
      start: start,
      end: end,
    };

    setEvents([...events, newEvent]);
  }

  function handleEventClick(arg: any) {
    const clickedEvent = arg.event.extendedProps;
    const attendid = clickedEvent.attendid; // attendid 가져오기

    if (UserType === "admin") {
      setEventModalOpen(true);
      setDateModalOpen(false); // 모달이 열릴 때 다른 모달은 닫아줍니다.)
      console.log(events);
      const clickedEvent = arg.event.extendedProps;
      console.log(clickedEvent);
      setSelectedEvent({
        title: arg.event.title,
        start: arg.event.start,
        end: arg.event.end,
        attendid: attendid, // attendid 추가
        // 이벤트에서 가져와야 하는 다른 속성들을 추가할 수 있습니다.
      });
      const extendedProps = arg.event.extendedProps;

      if (Object.keys(extendedProps).length > 0) {
        console.log("Click Event Extended Props:", extendedProps);
        console.log("Extended Props:", extendedProps);
      } else {
        console.log("Extended Props is an empty object.");
      }
    } else {
      setEventModalOpen(true);
      setDateModalOpen(false); // 모달이 열릴 때 다른 모달은 닫아줍니다.)
      console.log(events);
      const clickedEvent = arg.event.extendedProps;
      console.log(clickedEvent);

      const getCurrentTimeStart = () => {
        const now = new Date();
        const formattedTime = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
        setStartWork(formattedTime);
        const dataSet = {
          attendid: attendid,
          memberid: Memberid,
          storeid: Storeid,
          startwork: setStartWork,
          worker: Memberid,
        };
        try {
          axios.patch(`${URL}/user/attendance/gowork`, dataSet);
        } catch (error) {
          console.log(error);
        }
      };
      const getCurrentTimeEnd = () => {
        const now = new Date();
        const formattedTime = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
        setLeaveWork(formattedTime);
        const dataSet = {
          attendid: attendid,
          memberid: Memberid,
          storeid: Storeid,
          leavework: setLeaveWork,
          worker: Memberid,
        };
        try {
          axios.patch(`${URL}/user/attendance/leavework`, dataSet);
        } catch (error) {
          console.log(error);
        }
      };

      const UserDataSet = () => {
        <>
          <label htmlFor="worker">근무자 : {Name}</label>
          <label htmlFor="startwork">출근 시간 : {startwork}</label>
          <button type="button" onClick={getCurrentTimeStart}>
            출근 시간 저장하기
          </button>
          <label htmlFor="leavework">퇴근 시간 : {leavework}</label>
          <button type="button" onClick={getCurrentTimeEnd}>
            퇴근 시간 저장하기
          </button>
        </>;
      };

      setSelectedEvent({
        title: arg.event.title,
        start: arg.event.start,
        end: arg.event.end,
        attendid: arg.event.attendid,
        // 이벤트에서 가져와야 하는 다른 속성들을 추가할 수 있습니다.
        // UserDataSet,
      });
      console.log("Click Event Extended Props:", arg.event.extendedProps);
    }
  }

  /// return 시작
  return (
      <div className="">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
            right: "dayGridMonth,timeGridWeek",
          }}
          events={events}
          eventChange={() => {
            console.log("dkssud");
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
  
  );
}

export default CalendarCon;
