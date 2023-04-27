import React from 'react';

export const Facts = () => {
  const baseLink = '/xQore/invite/facts/';
  const factsInfo = [
    {
      title: 'Level activation and rewards are in BNB (BEP-20).',
      icon: baseLink + 'bnb.svg',
    },
    {
      title: '12 places, 2 lines (external and internal).',
      icon: baseLink + '12.svg',
    },
    {
      title: '+500% reward per cycle.',
      icon: baseLink + 'percent.svg',
    },
    {
      title: 'Each occupied place in any line brings you 50% of the level cost.',
      icon: baseLink + 'percent.svg',
    },
    {
      title: 'Autorecycle occurs when the last 2 places in the external line are occupied. ',
      icon: baseLink + 'recycle.svg',
    },
    {
      title:
        'The next-to-last place is stored while waiting for the last place to be filled, and then 2 transactions together make a recycle.',
      icon: baseLink + 'time.svg',
    },
  ];

  return (
    <div className="relative w-full flex items-center justify-center sm:p-3">
      <div className="flex flex-col max-w-[1168px] w-full">
        <span className="text-5xl text-white-700 font-medium mb-[50px] uppercase text-center sm:text-4xl">
          Basic facts <br className="hidden sm:flex" /> about <br className="sm:hidden" /> xQore
        </span>
        <div className="flex justify-between items-center w-full sm:flex-col sm:space-y-5">
          <div className="flex flex-col max-w-[570px] w-full space-y-7.5 sm:space-y-2">
            {factsInfo.map((item, itemIndex) => {
              return (
                <div className="flex sm:space-x-0" key={itemIndex}>
                  <img className="w-10 h-10 mr-5 flex-shrink-0 sm:mr-2" src={item?.icon} alt="" />
                  <span className="text-xl text-white-700 sm:text-lg font-light">{item?.title}</span>
                </div>
              );
            })}
          </div>
          <img className="max-w-[500px] sm:max-w-[80vw]" src="/xQore/invite/facts/structure.png" alt="" />
        </div>
      </div>
    </div>
  );
};
