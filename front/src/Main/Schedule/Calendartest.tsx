// Import necessary dependencies
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Define your component
const MyCalendar: React.FC = () => {
    const handleDateClick = (arg: any) => {
        alert('Date Clicked: ' + arg.dateStr);
      };
    
      const handleEventClick = (arg: any) => {
        alert('Event Clicked: ' + arg.event.title);
      };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth" // Set the initial view
      events={[
        { title: 'Event 1', date: '2023-01-01' },
        { title: 'Event 2', date: '2023-01-10' },
      ]}
      height={"800px"}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
    />
  );
};

export default MyCalendar;
