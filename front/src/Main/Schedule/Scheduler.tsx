import React from 'react';
import SchedulerModal from './SchedulerModal';
import { useScheduleStore } from '../../Store/Store';
import Modal from 'react-modal'
import ReactDatePicker from 'react-datepicker';
import Fullcalander from '@fullcalendar/react'

function Scheduler() {
  const scheduleStore = useScheduleStore();

  const handleScheduleSubmit = (startTime: string, endTime: string, registerTime: string) => {
    console.log('Submitted Schedule:', { startTime, endTime, registerTime });
    scheduleStore.setSchedule(startTime, endTime, registerTime);
  };

  return (
    <div>
      <h1>Your App</h1>
      <button onClick={() => scheduleStore.setSchedule('', '', '')}>Clear Schedule</button>
      <SchedulerModal onClose={() => console.log('Modal Closed')} onSubmit={handleScheduleSubmit} />
    </div>
  );
}

export default Scheduler;