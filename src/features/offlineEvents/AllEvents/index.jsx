import React from 'react';
import { OneDay } from './OneDay';
import { groupBy } from 'ramda';
import { format, parseISO } from 'date-fns';

export const AllEvents = ({ events }) => {
  const eventsByDates =
    events && events.length
      ? groupBy((event) => {
          const currentDate = event.date.slice(0, event.date.length - 6);

          return format(parseISO(currentDate), 'yyyy-MM-dd');
        })(events)
      : {};

  return (
    <div className="flex flex-col space-y-10 sm:px-5 sm:space-y-5">
      <span className="text-4xl font-medium text-white sm:text-3xl">All offline events</span>
      <div className="flex flex-col space-y-10 w-full">
        {Object.keys(eventsByDates).map((date) => (
          <OneDay key={date} date={date} events={eventsByDates[date]} />
        ))}
      </div>
    </div>
  );
};
