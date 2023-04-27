import React from 'react';

export const Mechanic = () => {
  const baseLink = '/xQore/invite/mechanic/';
  const steps = [
    {
      text: 'Order of filling in the lines: Internal line is filled in first, external line is filled in second.',
      img: baseLink + '1.png',
      wrapperStyle: 'max-w-[300px] sm:max-w-[70vw]',
    },
    {
      text: 'Places in the internal and external lines are taken by personal partners invited through a referral link, and/or partners of your team, as well as other participants via spillovers',
      img: baseLink + '2.png',
      wrapperStyle: 'max-w-[330px] sm:max-w-[80vw]',
    },
    {
      text: 'As soon as all 12 places are taken, an automatic recycle occurs. This level is reactivated, and you automatically start it again.',
      img: baseLink + '3.png',
      wrapperStyle: 'max-w-[401px] sm:max-w-[90vw]',
    },
  ];

  return (
    <div className="flex flex-col max-w-[1168px] w-full sm:p-3">
      <span className="text-5xl text-white-700 font-medium mb-[50px] uppercase text-center sm:text-4xl sm:mb-[30px]">
        Mechanics of <br className="hidden sm:flex" />
        XQore cycle
      </span>
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-center items-end w-full sm:flex-col sm:items-center">
          {steps.map((item, itemIndex) => {
            const isLastItem = itemIndex + 1 === steps.length;
            return (
              <div className="flex items-center h-full sm:flex-col">
                <div
                  className={`flex w-full flex-col justify-end items-center text-center ${item?.wrapperStyle}`}
                  key={itemIndex}
                >
                  <span className="text-xl text-white-500 font-medium mb-5 sm:mb-2">Step {itemIndex + 1}</span>
                  <span className="mb-7.5 text-white-500 sm:mb-4 sm:text-[14px] font-light">{item?.text}</span>
                  <img className="w-full" src={item?.img} alt="" />
                </div>
                {!isLastItem && (
                  <img className="w-5 mx-7.5 sm:rotate-90 sm:my-5" src="/xQore/invite/mechanic/arrow.svg" />
                )}
              </div>
            );
          })}
        </div>
        <img className="max-w-[72.5%] w-full mr-10 mt-5 sm:hidden" src="/xQore/invite/mechanic/bigArrow.svg" alt="" />
      </div>
    </div>
  );
};
