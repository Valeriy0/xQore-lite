import React from 'react';
import CloseIcon from 'assets/icons/close.svg';

export const NotificationsItem = () => {
  return (
    <div className="relative w-full flex bg-gray-500 rounded p-5 group max-w-380px w-full sm:max-w-full">
      <div className="flex flex-shrink-0" />
      <div className="flex flex-col">
        <span className="text-white-900 font-medium">New partner joined!</span>
        <span>has joined your</span>
      </div>
      <button className="group-hover:flex hidden rounded-full bg-white-900 hover:bg-gray-light flex justify-center items-center w-6 h-6 -top-1.5 -left-1.5 absolute">
        <CloseIcon className="stroke-current text-gray w-4 h-4" />
      </button>
    </div>
  );
};
