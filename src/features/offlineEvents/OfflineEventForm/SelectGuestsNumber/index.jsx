import React from 'react';
import clsx from 'clsx';

export const SelectGuestsNumber = ({ options, onChange, value }) => {
  return (
    <div className="flex space-x-5">
      {options?.map((option) => (
        <div
          onClick={() => onChange(option.key)}
          className={clsx('flex py-3 w-[95px] cursor-pointer rounded-mini font-bold justify-center text-white', {
            'bg-main-blue': option.key === value,
            'bg-white-100': option.key !== value,
          })}
        >
          {option.title}
        </div>
      ))}
    </div>
  );
};
