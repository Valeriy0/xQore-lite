import React, { memo, useMemo } from 'react';
import PeopleIcon from 'assets/icons/people.svg';
import ExchangeIcon from 'assets/icons/exchange.svg';
import InfinityIcon from 'assets/icons/infinity.svg';
import { ModalProgramLevel } from 'components/modals/BuyProgramModal/BuyProgramStep/ModalProgramLevel';
import {
  DEFAULT_LEVEL_MOCKS,
  PARTNERS_CYCLES,
  POTENTIAL_PERCENTS,
  PROGRAM_PRICES,
  PROGRAM_NAMES,
  XQORE_FIXED_NUM,
} from 'helpers/constants';

export const MainInformation = memo(({ title, level, name }) => {
  const isXqore = name === PROGRAM_NAMES.XQORE;
  const programInfo = useMemo(() => {
    const potentialBusd = (PROGRAM_PRICES[name][level] * POTENTIAL_PERCENTS[name]) / 100;
    const result = [
      {
        title: 'Number of places for re-cycle',
        value: PARTNERS_CYCLES[name],
        icon: PeopleIcon,
      },
      {
        title: 'Net rewards for every cycle',
        value: `${potentialBusd.toFixed(XQORE_FIXED_NUM)} ${isXqore ? 'BNB' : 'BUSD'}`,
      },
      {
        title: 'Level cycle profit',
        value: `${POTENTIAL_PERCENTS[name]} %`,
        icon: ExchangeIcon,
      },
    ];

    return [
      ...result,
      {
        title: 'Max automatic re-cycles',
        icon: InfinityIcon,
      },
    ];
  }, [name]);

  return (
    <>
      <div className="flex z-10 justify-between items-center px-10 pb-0 w-full sm:items-start sm:px-5 sm:pb-0 sm:mt-16">
        <div className="flex flex-col items-start justify-start text-3xl text-white font-medium text-left sm:text-2xl">
          <span> {title} </span>
          <span> {name} </span>
        </div>
        <ModalProgramLevel {...DEFAULT_LEVEL_MOCKS[name]} level={level} programName={name} />
      </div>

      <div className="flex w-full flex-col px-10 py-5 !pt-0 sm:p-5 ">
        {programInfo?.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index} className="flex mt-2 justify-between items-center">
              <span className="text-white-500 text-base leading-4 sm:text-sm">{item.title}</span>
              <div className="flex items-center">
                {item.value && (
                  <span className="text-white text-base whitespace-nowrap notranslate sm:text-sm">{item.value}</span>
                )}
                {Icon && <Icon className="ml-2.5 w-5 h-5 sm:w-4 sm:h-4" />}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
});
