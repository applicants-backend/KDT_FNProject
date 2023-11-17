import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calender () {
    return <>
    <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents={true}
        events={'일정'}
        height={'800px'}
        editable={true}
      />
    </>
}