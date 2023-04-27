import React, { useRef, useState } from 'react';
import { useClickOutside } from '../../../helpers/hooks/useClickOutside';

export const DropdownSelect = ({ children, options, onChange, value, disableDropdown }) => {
  const [opened, setOpened] = useState(false);
  const refContainer = useRef(null);
  const styleBgGrad = {
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), #18191A',
  };

  useClickOutside(refContainer, () => {
    setOpened(false);
  });

  return (
    <div className="flex relative" ref={refContainer}>
      <div className="flex" onClick={() => setOpened(!opened)}>
        {children}
      </div>
      {opened && !disableDropdown && (
        <div className="flex absolute top-full -left-1/2 h-auto">
          <div style={styleBgGrad} className="flex z-10 w-180px w-full flex-col rounded mt-4 p-5">
            {options.map((item) => {
              const isActive = item.value === value;

              return (
                <span
                  className={`p-2.5 cursor-pointer text-base leading-5 rounded-mini hover:bg-main-bg-200 ${
                    isActive ? 'text-white font-bold' : 'text-white-500'
                  }`}
                  onClick={() => {
                    setOpened(false);
                    onChange(item.value);
                  }}
                  key={item.value}
                >
                  {item.title}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
