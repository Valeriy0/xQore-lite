import React, { useCallback } from 'react';
import Countdown from 'react-countdown';
import { fromUnixTime } from 'date-fns';

export const Timer = ({ time, onComplete, isCompleted, spanClass = 'text-white' }) => {
  const renderer = useCallback(
    ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        return null;
      } else {
        const totalHours = days <= 2 ? hours + days * 24 : hours;
        const customHours = totalHours < 10 ? (totalHours === 0 ? '00' : '0' + totalHours) : totalHours;
        const totalMinutes = minutes < 10 ? (minutes === 0 ? '00' : '0' + minutes) : minutes;
        const totalSeconds = seconds < 10 ? (seconds === 0 ? '00' : '0' + seconds) : seconds;

        return (
          <div className="flex items-center justify-between space-x-1">
            {days > 2 && <span className="text-center min-w-[70px] sm:min-w-[60px]">{days}d</span>}
            {days > 0 && <span>:</span>}
            <span className="text-center min-w-[70px] sm:min-w-[60px]">{customHours}h</span>
            <span>:</span>
            <span className="text-center min-w-[70px] sm:min-w-[60px]">{totalMinutes}m</span>
            <span>:</span>
            <span className="text-center min-w-[70px] sm:min-w-[60px]">{totalSeconds}s</span>
          </div>
        );
      }
    },
    [spanClass],
  );

  return (
    <div className="flex flex-col items-center justify-center max-w-[360px] sm:max-w-full w-full rounded pt-2.5 pb-5 text-white font-bold text-4xl sm:text-3xl">
      <div className="flex flex-col flex-1 justify-center items-center text-center space-y-2.5">
        <Countdown renderer={renderer} autoStart date={fromUnixTime(time)} onComplete={onComplete} overtime />
      </div>
    </div>
  );
};
