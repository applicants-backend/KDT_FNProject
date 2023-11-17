// SchedulerModal.tsx

import React, { useState } from 'react';

interface SchedulerModalProps {
  onClose: () => void;
  onSubmit: (startTime: string, endTime: string, registerTime: string) => void;
}

const SchedulerModal: React.FC<SchedulerModalProps> = ({ onClose, onSubmit }) => {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const handleSubmit = () => {
    const registerTime = new Date().toISOString();
    onSubmit(startTime, endTime, registerTime);
    onClose();
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
};

export default SchedulerModal;
