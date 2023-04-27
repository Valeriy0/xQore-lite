import React from 'react';
import { EventCardComp } from '../EventCardComp';
import { format, parseISO } from 'date-fns';

export const OneDay = ({ date, events }) => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center justify-start space-x-1 text-white font-medium text-2xl">
        <span>Date</span>
        <span className="text-main-gradient">{format(parseISO(date), 'dd MMMM yyyy')}</span>
      </div>
      <div className="max-w-[calc(100vw-324px)] lg:max-w-full flex items-center justify-start space-x-10 overflow-auto pb-10 sm:space-x-5 sm:pb-5">
        {events.map((event) => (
          <EventCardComp key={event.id} {...event} className="!w-[500px] flex-shrink-0" />
        ))}
      </div>
    </div>
  );
};
