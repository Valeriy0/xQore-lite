import React, { useState, useMemo } from 'react';
import CalcItems from 'features/calcItems';
import { PROGRAM_NAMES } from 'helpers/constants';
import X3Icon from 'public/svg/x3.svg';
import X4Icon from 'public/svg/x4.svg';
import XXXIcon from 'public/svg/xXx.svg';
import GoldIcon from 'public/svg/xGold.svg';

const RENDER_ITEMS = [
  {
    blockName: PROGRAM_NAMES.X3,
    programIcon: <X3Icon />,
    subTitle: 'Basic matrix program, which is best for those who are self-reliant and prefer independent development.',
    chosenBgColor: 'main-blue',
  },
  {
    blockName: PROGRAM_NAMES.X4,
    programIcon: <X4Icon />,
    subTitle:
      'More advanced program, designed for team work. Results are achieved here through direct partners, as well as through spillovers from other participants.',
    chosenBgColor: 'light-purple',
  },
  {
    blockName: PROGRAM_NAMES.XXX,
    programIcon: <XXXIcon />,
    subTitle: 'Program with enhanced team building and development opportunities.',
    chosenBgColor: 'dark-pink',
  },
  {
    blockName: PROGRAM_NAMES.XGOLD,
    programIcon: <GoldIcon />,
    subTitle: 'Exclusive program with ultimate opportunities for team work and development.',
    chosenBgColor: 'orange',
  },
];

const Calculator = () => {
  const [totalStatsState, setTotalStatsState] = useState({
    [PROGRAM_NAMES.X3]: { actualCost: 0, result: 0 },
    [PROGRAM_NAMES.X4]: { actualCost: 0, result: 0 },
    [PROGRAM_NAMES.XXX]: { actualCost: 0, result: 0 },
    [PROGRAM_NAMES.XGOLD]: { actualCost: 0, result: 0 },
  });

  const total = useMemo(() => {
    return Object.values(totalStatsState).reduce(
      (result, item) => {
        return {
          totalCost: result.totalCost + item.actualCost,
          totalProfit: result.totalProfit + item.result,
        };
      },
      {
        totalCost: 0,
        totalProfit: 0,
      },
    );
  }, [totalStatsState]);

  return (
    <div className="flex flex-col w-full lg:px-5">
      <span className="text-[48px] text-white font-bold w-full max-w-[485px] ml-auto mr-auto text-center sm:w-full sm:text-[30px]">
        <span className="calc_title-gradient"> Forsage Participant</span> Calculator
      </span>
      <span className="w-full flex flex-col max-w-[768px] text-white-700 text-[18px] ml-auto mr-auto mt-[30px] text-center sm:text-[14px] sm:w-full">
        <span>
          Calculate your potential result from participating in FORSAGE by selecting levels to activate below. The
          results are calculated for 1 cycle of all selected levels.
        </span>
        <span> All calculations are for informational purposes only, and are not a public offer.</span>
      </span>
      <div className="flex flex-col">
        {RENDER_ITEMS.map((item, index) => (
          <CalcItems key={index} {...item} setTotalStatsState={setTotalStatsState} />
        ))}
      </div>
      <div className="w-full h-[199px] bg-[#622AFF] rounded-[30px] ml-auto mr-auto mt-[40px] flex items-center justify-evenly sm:flex-col sm:items-baseline">
        <div className="flex flex-col sm:ml-[22px]">
          <span className="text-white-700 text-[16px]">Total cost</span>
          <span className="notranslate text-white text-[32px] font-bold sm:text-[30px]">{total.totalCost} BUSD</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white-700 text-[16px]">Total profit</span>
          <span className="notranslate text-white text-[32px] font-bold sm:text-[30px]">
            {total.totalProfit.toFixed(0) || 0} BUSD
          </span>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
