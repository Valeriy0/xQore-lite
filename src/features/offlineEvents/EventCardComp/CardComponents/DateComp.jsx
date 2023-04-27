import React from 'react';
import ClockIcon from 'assets/icons/miniClock.svg';
import { format } from 'date-fns-tz';
import { parseISO } from 'date-fns';

export const DateComp = ({ date }) => {
  const currentDate = date.slice(0, date.length - 6);

  return (
    <div className="flex items-center space-x-2.5">
      <ClockIcon className="w-4 h-4 sm:w-3 sm:h-3" />
      <span>{format(parseISO(currentDate), 'dd MMMM, yyyy | HH:mm')}</span>
    </div>
  );
};
