import React from 'react';

export const NewUsersChart = ({ data }) => {
  let totalCount = 0;
  return (
    <div className="w-full bg-black-light rounded-[20px] p-2.5">
      <div className="flex items-center justify-between w-full border-b border-white-500 p-2.5 mb-2.5">
        <div className="flex flex-1">Date</div>
        <div className="flex flex-1">Users count</div>
      </div>
      {!!data &&
        data.map((item, itemIndex) => {
          totalCount = totalCount + item.registrations;
          return (
            <div className="flex items-center justify-between w-full p-2.5" key={itemIndex}>
              <div className="flex flex-1">{item.date}</div>
              <div className="flex flex-1">{item.registrations}</div>
            </div>
          );
        })}
      <div className="font-bold flex items-center justify-between w-full border-t border-white-500 p-2.5 mt-2.5">
        <div className="flex flex-1">Total</div>
        <div className="flex flex-1">{totalCount}</div>
      </div>
    </div>
  );
};
