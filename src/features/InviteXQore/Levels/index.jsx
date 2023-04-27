import React from 'react';
import { XQORE_PROGRAM_PRICES } from 'helpers/constants';
import BNBIcon from 'assets/tokens/BNB.svg';

export const Levels = () => {
  const baseLink = '/xQore/invite/mechanic/';
  const steps = [
    {
      text: 'Order of filling in the lines: Internal line is filled in first, external line is filled in second.',
      img: baseLink + '1.png',
      wrapperStyle: 'max-w-[300px]',
    },
    {
      text: 'Places in the internal and external lines are taken by personal partners invited through a referral link, and/or partners of your team, as well as other participants via spillovers',
      img: baseLink + '2.png',
      wrapperStyle: 'max-w-[330px]',
    },
    {
      text: 'As soon as all 12 places are taken, an automatic recycle occurs. This level is reactivated, and you automatically start it again.',
      img: baseLink + '3.png',
      wrapperStyle: 'max-w-[401px]',
    },
  ];

  return (
    <div className="relative w-full flex items-center justify-center sm:p-3">
      <img className="absolute -top-1/2 right-0" src="/xQore/invite/levels/back.png" alt="" />
      <div className="z-10 flex flex-col max-w-[1168px] w-full py-[80px] bg-black-500 rounded-[40px] sm:py-[40px] border border-1 border-[#285355]">
        <span className="text-5xl text-white-700 font-medium mb-[50px] uppercase text-center sm:text-4xl sm:mb-[30px]">
          xQore Levels
        </span>
        <div className="flex items-center w-full sm:flex-col-reverse">
          <div className="flex flex-1 items-center flex-col sm:px-5">
            <div className="max-w-[440px] w-full flex flex-col text-xl">
              <div className="flex w-full justify-between items-center border-b border-white-200 pb-1.5">
                <span>Lvl</span>
                <div className="flex justify-end items-center">
                  Value(BNB) <BNBIcon className="ml-3 w-6 h-6" />
                </div>
              </div>
              {Object.values(XQORE_PROGRAM_PRICES)?.map((item, itemIndex) => {
                return (
                  <div className="flex w-full justify-between items-center py-1.5 border-b border-white-200 last:border-0">
                    <span>{itemIndex + 1}</span>
                    <span className="text-[#F0B90B]">{item}</span>
                  </div>
                );
              })}
            </div>
            <div className="max-w-[410px] w-full flex items-center text-center">
              <span className="font-light">
                xQore levels are activated sequentially. Each level requires activation of the previous one
              </span>
            </div>
          </div>
          <div className="flex flex-1 items-center flex-col">
            <div className="max-w-[500px] flex flex-col items-center w-full">
              <span className="text-xl text-center  font-light mb-7.5 sm:mb-0 sm:text-">
                The xQore program is a team
                <br className="hidden sm:flex" />
                marketing tool designed to facilitate <br className="hidden sm:flex" />
                team building and increase overall
                <br className="hidden sm:flex" />
                Forsage participant engagement.
              </span>
              <img className="max-w-[390px] sm:mb-[20px]" src="/xQore/invite/levels/structure.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
