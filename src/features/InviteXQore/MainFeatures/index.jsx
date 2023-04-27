import React from 'react';

export const MainFeatures = () => {
  const baseLink = '/xQore/invite/mainFeatures/';
  const keysList = [
    {
      renderText: () => (
        <span>
          {' '}
          <span className="text-[#28cbd7]  font-medium">Cycle</span> is a level with all 12 places completed.
        </span>
      ),
      icon: baseLink + '1.svg',
    },
    {
      renderText: () => (
        <span>
          {' '}
          <span className="text-[#fdc637] font-medium">Recycle</span> occurs automatically after each cycle.
        </span>
      ),
      icon: baseLink + '2.svg',
    },
    {
      renderText: () => (
        <span>
          <span className="text-[#43e329]  font-medium">Upgrade</span> is the activation of a next more expensive level.
        </span>
      ),
      icon: baseLink + '3.svg',
    },
    {
      renderText: () => (
        <span>
          {' '}
          <span className="text-[#13aafe]  font-medium">Level freeze</span> occurs when a level is complete, but the
          next level is not activated.
        </span>
      ),
      icon: baseLink + '4.svg',
    },
    {
      renderText: () => (
        <span>
          <span className="text-[#d11839]  font-medium">Overtaking</span> occurs when your downline partner has
          activated more levels than you.
        </span>
      ),
      icon: baseLink + '5.svg',
    },
    {
      renderText: () => (
        <span>
          <span className="text-[#32f196] font-medium"> Spillover </span> means that a place in your level is occupied
          by a partner invited by other members.
        </span>
      ),
      icon: baseLink + '6.svg',
    },
  ];

  const partnerType = [
    {
      color: 'bg-white',
      renderText: () => (
        <span>
          {' '}
          <span className="text-white font-medium">Direct partner</span> - a partner took a place in your level
        </span>
      ),
    },
    {
      color: 'bg-yellow',
      renderText: () => (
        <span>
          {' '}
          <span className="text-yellow  font-medium">Spillover from above</span>- a partner of your upline took a place
          in your level
        </span>
      ),
    },
    {
      color: 'bg-orange',
      renderText: () => (
        <span>
          {' '}
          <span className="text-orange  font-medium">Spillover from below</span> - a partner of your downline took a
          place in your level
        </span>
      ),
    },
    {
      color: 'bg-light-blue',
      renderText: () => (
        <span>
          <span className="text-light-blue" font-medium>
            Gift
          </span>{' '}
          - a partner of your downline made an upgrade earlier than them, so he took a place in your cycle
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col max-w-[1168px] w-full z-10 sm:p-3">
      <span className="text-5xl text-white-700 font-medium mb-[50px] uppercase text-center sm:text-4xl sm:mb-[30px]">
        Key Marketing Features
      </span>
      <div className="flex w-full justify-between space-x-5 sm:flex-col">
        <div className="flex flex-col space-y-5 flex-1 max-w-[600px]">
          {keysList.map((item, itemIndex) => {
            return (
              <div
                className="flex w-full p-2.5 items-center bg-black-500 space-x-2.5 rounded border border-1 border-[#285355]"
                key={itemIndex}
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-[12px] bg-[#141414]">
                  <img className="w-6 h-6 flex-shrink-0" src={item?.icon} alt="" />
                </div>
                <span className="text-xl sm:text-lg font-light">{item?.renderText()}</span>
              </div>
            );
          })}
        </div>
        <div className="max-w-[370px] w-full flex flex-col items-center flex-1">
          <img className="max-w-[290px] w-full mb-5 " src="/xQore/invite/mainFeatures/structure.png" alt="" />
          <div className="flex flex-col space-y-2.5">
            {partnerType.map((item, itemIndex) => {
              return (
                <div className="flex items-center space-x-2.5">
                  <div className={`w-5 h-5 flex-shrink-0 rounded-full ${item?.color}`} />
                  <span className="text-sm font-light text-white-700">{item?.renderText()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
