import React from 'react';
import { CustomLink } from 'components';
import FullArrowUp from 'assets/icons/full_arrow_up.svg';
import ArrowLeft from 'assets/icons/arrow_left.svg';
import ArrowRight from 'assets/icons/arrow_right.svg';
import ExchangeIcon from 'assets/icons/exchange.svg';
import ArrowUpIcon from 'assets/icons/arrow_up.svg';
import ArrowDownIcon from 'assets/icons/arrow_down.svg';
import ForsageCommunity from 'public/svg/forsage_community.svg';
import PrizeIcon from 'assets/icons/prize.svg';

const LevelInfo = () => {
  return (
    <div className="flex flex-col w-full flex-col bg-black-light rounded-3xl">
      <div className="flex flex-col">
        <div className="p-10">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex justify-end border-2 w-72 border-line-gray p-4 rounded-lg">
              <FullArrowUp />
              <span className="ml-2.5 text-white font-bold text-base">id 2</span>
            </div>
            <div className="flex justify-between w-full mt-8 items-center">
              <div className="flex w-20 items-center py-3 px-5 border-2 border-line-gray rounded-lg hover:border-white hover:cursor-pointer">
                <ArrowLeft />
                <span className="ml-2.5 text-white font-bold text-base">1</span>
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <div className="flex items-center">
                    <ExchangeIcon />
                    <div className="flex flex-col items-center ml-3">
                      <ArrowUpIcon />
                      <span className="text-base text-white font-bold my-5">818</span>
                      <ArrowDownIcon />
                    </div>
                  </div>
                  <div className="mx-20">
                    <div className="bg-light-blue rounded-lg w-72 py-4 px-5 relative">
                      <div className="flex items-center justify-center text-white font-bold text-base absolute border-2 rounded-full bg-black -left-2 -top-2 border-light-blue w-7.5 h-7.5">
                        3
                      </div>
                      <div className="flex flex-col items-end w-full flex-col justify-end">
                        <span className="text-xl text-black font-bold">id 323483</span>
                        <span className="text-white text-4xl font-bold mt-5">800 TRX</span>
                        <span className="text-xl text-white-700 font-bold">$42</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center">
                      <ForsageCommunity className="flex-shrink-0 stroke-current w-6 h-6 text-green-light" />
                      <span className="ml-2.5 text-base text-white font-bold">3525</span>
                    </div>
                    <div className="flex mt-5 items-center">
                      <PrizeIcon className="flex-shrink-0 w-6 h-6" />
                      <span className="ml-2.5 text-base text-white font-bold">3525</span>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  {new Array(1)
                    .fill([
                      [{ active: true }, { active: true }],
                      [{ active: false }, { active: true }, { active: false }, { active: true }],
                    ])
                    .map((line) =>
                      line.map((point, pointIndex) => (
                        <div className={`flex overflow-y-hidden z-${50 - (pointIndex + 1) * 10}`}>
                          <div className="flex w-full justify-around mt-16">
                            {point.map((lvl, lvlIndex) => {
                              const style = lvl.active ? 'bg-light-blue' : 'border-line-gray border-2';
                              const rotate = lvlIndex % 2 === 0 ? '-rotate-60 left-1/3' : 'rotate-60 right-1/3';
                              return (
                                <div className="relative">
                                  <CustomLink href={'/page'} as={'/page'} passHref>
                                    <div className={`rounded-full w-20 h-20 ${style}`} />
                                  </CustomLink>
                                  <div
                                    className={`border-line-gray border-0 border-b-2 w-20 -z-1 absolute -top-9 ${rotate}`}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )),
                    )}
                </div>
              </div>
              <div className="flex w-20 items-center justify-end py-3 px-5 border-2 border-line-gray rounded-lg hover:border-white hover:cursor-pointer">
                <span className="mr-2.5 text-white font-bold text-base">2</span>
                <ArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-10 border border-l-0 border-r-0 border-b-0 border-white-100 py-5">
        <div className="flex items-center">
          <div className="rounded-full w-2.5 h-2.5 bg-light-blue" />
          <span className="ml-2.5 text-sm text-white-500 ">Личный партнер</span>
        </div>
        <div className="flex items-center ml-10">
          <div className="rounded-full w-2.5 h-2.5 bg-purple" />
          <span className="ml-2.5 text-sm text-white-500 ">Партнер, обогнавший своего вышестоящего</span>
        </div>
      </div>
    </div>
  );
};

export default LevelInfo;
