import React from 'react';
import { EventCardComp } from '../EventCardComp';

export const UserEvents = ({ events, onFetchUserEvents, onFetchEvents }) => {
  return (
    <div className="w-full flex flex-col space-y-10 flex-1 sm:px-5 sm:space-y-5">
      <span className="text-4xl font-medium text-white sm:text-3xl">Your events</span>
      <div className="flex flex-col flex-1 space-y-10 sm:space-x-5 sm:flex-row sm:space-y-0 sm:overflow-auto sm:pb-5">
        {events?.map((event) => (
          <EventCardComp
            key={event.id}
            {...event}
            isAuthCard
            onFetchUserEvents={onFetchUserEvents}
            onFetchEvents={onFetchEvents}
            className="sm:flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};
