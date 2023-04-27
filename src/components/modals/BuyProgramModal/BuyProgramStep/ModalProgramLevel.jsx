import React from 'react';
import People from 'assets/icons/people.svg';
import Exchange from 'assets/icons/exchange.svg';
import BusdIcon from 'assets/tokens/BUSD.svg';
import BNBIcon from 'assets/tokens/BNB.svg';
import InfinityIcon from 'assets/icons/infinity.svg';
import { PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';

const nestSizes = [
  {
    hexagon: 'w-10 h-7.5',
    circle: 'w-7.5 h-7.5',
  },
  {
    circle: 'w-5 h-5',
  },
  {
    circle: 'w-2.5 h-2.5',
  },
  {
    circle: 'w-1 h-1',
  },
];

const nestSizesXQore = [
  {
    circle: 'w-[22px] h-[22px]',
  },
  {
    circle: 'w-4 h-4',
  },
];

export const ModalProgramLevel = ({ descendants, elements, programName, level }) => {
  const isXqore = programName === PROGRAM_NAMES.XQORE;
  const renderElements = (elements, nestingLvl) => {
    const currentElements = Array.isArray(elements) ? elements : Object.values(elements);
    const size = isXqore ? nestSizesXQore[nestingLvl] : nestSizes[nestingLvl];
    const partnerBorder = isXqore ? 'border border-main-blue' : '';
    return (
      <div className="flex w-full justify-center items-center">
        <div
          className={`relative flex w-full justify-evenly items-start ${
            isXqore && (nestingLvl === 0 ? 'xQore-wrapper' : `xQore-second-wrapper`)
          }`}
        >
          {currentElements?.map((lvl, lvlIndex) => {
            return (
              <div
                key={lvlIndex}
                className={`flex flex-col ${
                  isXqore ? `w-[50px] place-${lvl?.place}` : 'w-full'
                } justify-evenly items-center space-y-2.5 `}
              >
                <div className="relative" key={lvlIndex}>
                  <div className={`flex bg-hover-main-blue rounded-full ${partnerBorder} ${size?.circle}`} />
                </div>
                {!!lvl?.elements?.length && renderElements(lvl.elements, nestingLvl + 1)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`-mt-10 sm:mt-0 flex flex-col w-180px min-h-180px sm:w-158px sm:min-h-158px rounded-small p-5 m-2 justify-between bg-main-blue scale-85`}
    >
      <div className="flex flex-col">
        <div className="flex w-full justify-between">
          <span className="text-white-500 text-base sm:text-sm">Lvl {level}</span>
          <div className="flex items-center">
            {isXqore ? <BNBIcon className="w-18px h-18px mr-2.5" /> : <BusdIcon className="w-18px h-18px mr-2.5" />}
            <span className="text-white text-base sm:text-sm">{PROGRAM_PRICES[programName]?.[level]}</span>
          </div>
        </div>
        <div className="relative flex flex-col mt-2.5 -mx-2.5">
          {isXqore && (
            <>
              <div className="bg-black-verylight-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[87px] h-[87px] rounded-full" />
              <div className="bg-black-verylight-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] rounded-full" />
              <div className="bg-main-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[29px] h-[29px] rounded-full" />
              <div className="bg-sky-blue-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full text-[5px] text-white flex items-center justify-center">
                {' '}
                YOU{' '}
              </div>
            </>
          )}
          {renderElements(elements, 0)}
        </div>
      </div>

      <div className="flex flex-wrap space-x-5 mt-2.5">
        <div className="flex space-x-2 items-center">
          <People className="w-5 h-5 stroke-current text-white-500" />
          <span className="text-sm font-normal	text-white sm:text-sm">{descendants}</span>
        </div>
        <div className="flex space-x-2 items-center">
          <Exchange className="w-5 h-5 stroke-current text-white-500" />
          <InfinityIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
