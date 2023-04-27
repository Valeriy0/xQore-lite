import React, { useMemo } from 'react';
import { PROGRAMS_STYLES } from 'helpers/program';

export const LvlsActivationStats = ({ data }) => {
  let comsa = 0;
  return (
    <div className="w-full bg-black-light rounded-[20px] p-2.5">
      <div className="flex items-center justify-between w-full border-b border-white-500 p-2.5 mb-2.5">
        <div className="flex flex-1">Program</div>
        <div className="flex flex-1">Lvl</div>
        <div className="flex flex-1">Activations</div>
      </div>
      {!!data &&
        data.map((item, itemIndex) => {
          comsa = comsa + item?.activations * 0.9;
          return (
            <div className="flex items-center justify-between w-full p-2.5" key={itemIndex}>
              <div className={`flex flex-1 ${PROGRAMS_STYLES[item.matrix].textColor}`}>Forsage {item.matrix}</div>
              <div className="flex flex-1">{item.level}</div>
              <div className="flex flex-1">{item?.activations}</div>
            </div>
          );
        })}
      <div className="font-bold flex items-center justify-between w-full border-t border-white-500 p-2.5 mt-2.5">
        <div className="flex flex-1">Service fee</div>
        <div className="flex flex-1"></div>
        <div className="flex flex-1">{comsa.toFixed(2)}</div>
      </div>
    </div>
  );
};
