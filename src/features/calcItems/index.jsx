import React, { useEffect, useLayoutEffect, useState } from 'react';
import { PROGRAM_NAMES, PROGRAM_PRICES, POTENTIAL_MULTIPLIER, PROGRAM_MAX_LEVELS } from 'helpers/constants';
import { getCalcItemsDecrement, getCalcItemsIncrement } from 'helpers/getCalcItems';
import { isMobile } from 'react-device-detect';

const CalcItems = ({ programIcon, subTitle, chosenBgColor, blockName, setTotalStatsState }) => {
  const [chosenItems, setChosenItems] = useState([]);
  const [actualCost, setActualCost] = useState(0);
  const buttonsWidth = blockName === PROGRAM_NAMES.XGOLD ? 'max-w-[380px]' : 'max-w-[300px]';

  useLayoutEffect(() => {
    if (![PROGRAM_NAMES.XGOLD, PROGRAM_NAMES.XXX].includes(blockName)) {
      setChosenItems([1]);
      setActualCost(PROGRAM_PRICES[blockName][1]);
    }
  }, []);

  useEffect(() => {
    const newActualCost = chosenItems.reduce((result, item) => {
      return result + PROGRAM_PRICES[blockName][item];
    }, 0);
    setActualCost(newActualCost);
    setTotalStatsState((prev) => ({
      ...prev,
      [blockName]: { actualCost: newActualCost, result: newActualCost * POTENTIAL_MULTIPLIER[blockName] },
    }));
  }, [chosenItems]);

  const calcHandler = (event) => {
    const value = Number(event.target.innerText);

    if (isNaN(value)) return;
    if (chosenItems.includes(value)) {
      const result = getCalcItemsDecrement(value, chosenItems, blockName);
      setChosenItems(result);
    } else {
      const result = getCalcItemsIncrement(value);
      setChosenItems(result);
    }
  };

  return (
    <div className="w-full pb-[50px] sm:pb-2.5 bg-[#242526] rounded-[30px] mt-[40px] ml-auto mr-auto">
      <div className="flex justify-start sm:items-start w-full sm:flex-col">
        {programIcon}
        <div className="p-5 flex items-center justify-center sm:pt-0">
          <span className="text-white-700 text-[14px] max-w-[360px] leading-[22px]">{subTitle}</span>
        </div>
      </div>
      <div className="flex items-start justify-between pl-12 pt-2.5 pr-10 sm:pr-5  sm:flex-col sm:pl-5 space-x-20 sm:space-x-0 sm:space-y-0">
        <div
          className={`${buttonsWidth} flex-1 flex justify-start flex-wrap gap-[20px] sm:gap-[18px]`}
          onClick={calcHandler}
        >
          {new Array(PROGRAM_MAX_LEVELS[blockName]).fill({}).map((item, index) => (
            <div
              key={index}
              className={`w-[60px] h-[60px] rounded-[10px] cursor-pointer flex items-center justify-center ${
                chosenItems.includes(index + 1) ? `bg-${chosenBgColor}` : 'bg-white-100'
              } sm:w-[44px] sm:h-[44px]`}
            >
              <span className="notranslate text-white text-[20px] sm:text-[15px]">{index + 1}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 flex items-center justify-start">
          <div className="flex flex-col relative">
            <div className="mt-[30px] flex flex-col sm:mt-5">
              <span className="text-white-700 text-[16px] sm:text-[14px] whitespace-nowrap">
                Cost of all selected slots
              </span>
              <span className="notranslate text-white text-[18px] font-semibold mt-[10px] sm:text-[14px]">
                {actualCost} BUSD
              </span>
            </div>
            {isMobile && (
              <div className="rounded-[10px] border-solid border-[1px] border-white-200 w-[0px] h-[295px] rotate-90 absolute bottom-[-52px] left-[142px]" />
            )}
            <div className="mt-[32px] flex flex-col sm:mt-5">
              <span className="text-white-700 text-[16px] sm:text-[14px] whitespace-nowrap">Results in 1 cycle</span>
              <span className="notranslate text-white text-[32px] font-semibold mt-[6px]">
                {(actualCost * POTENTIAL_MULTIPLIER[blockName]).toFixed(0) || 0} BUSD
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalcItems;
