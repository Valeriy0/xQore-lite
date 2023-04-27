import React from 'react';

export const LeadersList = ({ data }) => {
  return (
    <div className="w-full bg-black-light rounded-[20px] p-2.5 overflow-auto">
      <div className="flex items-center justify-between w-full mb-2.5 px-2.5">
        <div className="flex flex-1 min-w-[125px] p-2.5 px-1.5 border-b border-white-500">ID </div>
        <div className="flex flex-1 min-w-[125px] p-2.5 px-1.5 border-b border-white-500">Profit</div>
        <div className="flex flex-1 min-w-[125px] p-2.5 px-1.5 border-b border-white-500">Partners</div>
        <div className="flex flex-1 min-w-[125px] p-2.5 px-1.5 border-b border-white-500 text-right">New partners</div>
      </div>
      {!!data &&
        data.map((item, itemIndex) => (
          <div className="flex items-center justify-between w-full p-2.5" key={itemIndex}>
            <div className="flex flex-1 min-w-[125px] px-2.5 rounded-[20px]">
              <div className={`px-2 py-1 rounded-[20px] ${item?.new_partners ? 'bg-green-200' : 'bg-main-blue-200'}`}>
                ID {item?.team_user_id}
              </div>
            </div>
            <div className="flex flex-1 min-w-[125px] px-2.5">{item?.profit}</div>
            <div className="flex flex-1 min-w-[125px] px-2.5">{item?.partners}</div>
            <div className="flex flex-1 min-w-[125px] px-2.5 text-right">{item?.new_partners}</div>
          </div>
        ))}
    </div>
  );
};
