import React, { useState } from 'react';
import axios from 'axios';
import { UserDataState } from '../../Store/Store';

interface SchedulerModalProps {
  onClose: () => void;
  onSubmit: (startTime: string, endTime: string, registerTime: string) => void;
}

export default function SchedulerModal({ onClose, onSubmit }: SchedulerModalProps): React.ReactElement {
  const MemberId = UserDataState();
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const handleSubmit = async () => {
    const registerTime = new Date().toISOString();
    console.log({startTime,endTime,registerTime,MemberId})
    
    try {
      await axios.post('/Worktime/data', {
        startTime,
        endTime,
        registerTime,
        MemberId
      });
      onSubmit(startTime, endTime, registerTime);
      onClose();
    } catch (error) {
      console.error('등록할수 없습니다.', error);
    }
  };

  return (
    <div>
      <label>시작 시간:</label>
      <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <br />
      <label>끝나는 시간:</label>
      <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <br />
      <button onClick={handleSubmit}>일 시작</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
}
