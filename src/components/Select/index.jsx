import React, { useCallback, useMemo, useRef, useState } from 'react';
import TriangleIcon from 'assets/icons/triangle.svg';
import { useOnClickOutside } from 'helpers/hooks/useOnClickOutside';

const Select = ({ className, value, onChange, data }) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef();

  const onOptionClicked = useCallback(
    (value) => () => {
      onChange(value);
      setOpened(false);
    },
    [onChange, value],
  );

  const toggling = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  useOnClickOutside(ref, () => {
    setOpened(false);
  });

  const activeOption = useMemo(() => {
    return data?.find((item) => item.key === String(value));
  }, [value, data]);

  return (
    <div className="relative w-full" ref={ref}>
      <div
        className={`relative w-full min-h-50px bg-line-gray border border-transparent rounded-mini py-3 px-5 text-white outline-none hover:cursor-pointer hover:bg-gray-500 
              ${opened && 'rounded-b-none border-b-white-200'} 
              ${className}
            `}
        onClick={toggling}
      >
        {activeOption?.title}
        <TriangleIcon
          className={`absolute w-2.5 h-2.5 right-3 top-1/2 -translate-y-1/2 transition duration-300 ease-in-out ${
            opened && 'rotate-180'
          } `}
        />
      </div>
      {opened && (
        <div className="absolute top-full z-20 max-h-250px w-full bg-line-gray rounded-mini rounded-t-none overflow-auto drop-shadow-xl">
          <ul className="w-full bg-line-gray drop-shadow-md rounded-mini rounded-t-none text-white outline-none">
            {data?.map((option, index) => {
              return (
                <li
                  className="min-h-50px py-3 px-5 border-b border-white-200 last:border-none hover:cursor-pointer hover:bg-gray-500"
                  onClick={onOptionClicked(option?.key)}
                  key={index}
                >
                  {option?.title}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Select };
