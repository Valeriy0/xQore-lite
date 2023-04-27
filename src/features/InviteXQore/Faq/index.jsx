import React from 'react';

export const Faq = () => {
  const list = [
    'To start working in the xQore program, you have to have a personal ID on the Forsage BUSD platform',
    'Personal ID = activation Forsage x3/x4 programs',
    'To activate the xQore program you have to activate at least one level in BNB coin, or BUSD stablecoin',
    'After you get your Forsage ID, you can start working in xQore. To activate the 1st level of the xQore program, you need $5 in BNB coin + some BNB for paying the fee in BNBchain network',
    'Then your personal partners will occupy activated levels. xQore program rewards are distributed in BNB coin',
    'Plan to activate levels in the xQore program in advance so that your team and personal partners do not overtake you. This happens when they activate levels before you do (overtaking)',
  ];

  return (
    <div className="relative w-full flex items-center justify-center sm:p-3">
      <img className="absolute left-0 top-1/2 -translate-y-1/2" src="/xQore/invite/faq/back.png" alt="" />
      <div className="flex flex-col max-w-[765px] w-full z-10 ">
        <span className="text-5xl text-white-700 font-medium mb-[50px] uppercase text-center sm:text-4xl sm:mb-[30px] ">
          What you need <br className="hidden sm:flex" />
          to know about <br className="hidden sm:flex" />
          xQore activation
        </span>
        <div className="flex flex-col w-full justify-between space-y-5 ">
          {list.map((item, itemIndex) => {
            return (
              <div className="flex flex-col space-y-7.5 p-7.5 rounded-[40px] bg-black-500 border border-1 border-[#285355]">
                <div className="flex items-center justify-between w-full">
                  <div className="rounded-full bg-white-100 text-white-900 text-lg font-medium w-[60px] h-[60px] flex items-center justify-center">
                    {itemIndex + 1}
                  </div>
                  <img className="w-[32px] h-[32px]" src="/xQore/invite/faq/round.png" alt="" />
                </div>
                <span className="text-xl font-light sm:text-base">{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
