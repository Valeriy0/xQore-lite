import React, { useState } from 'react';
import { Button } from 'components';
import PartnersIcon from 'assets/icons/people.svg';
import RecycleIcon from 'assets/icons/exchange.svg';
import ArrowCircle from 'assets/icons/rounded_arrow_top.svg';
import Question from 'assets/icons/question.svg';
import { PartnersHistoryModal } from 'components/modals/PartnersHistoryModal';

export const PartnersHistory = ({ program }) => {
  const [isOpened, setIsOpened] = useState(false);

  const OpenLegendModal = (e) => {
    e.preventDefault();

    setIsOpened(true);
  };

  const infoItems = [
    {
      title: 'Direct partner',
      text: 'direct partner who took place in your level ',
      iconColor: 'bg-white',
      style: 'sm:order-2',
    },
    {
      title: 'Spillover from above',
      text: 'a partner of your upline took place in your level',
      iconColor: 'bg-yellow',
      limitation: 'x3',
      style: 'sm:order-4',
    },
    {
      title: 'Spillover from below',
      text: 'a partner of your downline took place in your level',
      iconColor: 'bg-orange',
      limitation: 'x3',
      style: 'sm:order-6',
    },
    {
      title: 'Gift',
      text: 'a partner of your downline who made upgrade earlier than your downline, so he took place in your level instead',
      iconColor: 'bg-light-blue',
      style: 'sm:order-7',
    },
    {
      title: 'Partners on level',
      text: 'total amount of partners who took places in the level',
      icon: PartnersIcon,
      iconColor: 'stroke-current text-white',
      style: 'sm:order-1',
    },
    {
      title: 'Level Cycle',
      text: 'amount of times the level got fully filled with partners and was automatically restarted',
      icon: RecycleIcon,
      iconColor: 'stroke-current text-white',
      style: 'sm:order-3',
    },
    {
      title: 'Send to upline',
      text: 'a partner took place in a level at the position on the 1st line so the reward is sent to upline according to marketing.',
      icon: ArrowCircle,
      iconColor: 'stroke-current text-white',
      limitation: 'x3',
      style: 'sm:order-5',
    },
  ];

  return (
    <>
      <div className="flex items-center flex-wrap z-10">
        {infoItems.map((item, index) => {
          const Icon = item?.icon;

          if (item?.limitation === program || (item?.title === 'Send to upline' && program === 'xQore')) return null;

          return (
            <div
              className={`flex items-center text-white-500 mb-5 mr-7.5 sm:items-start sm:mb-2.5 sm:pr-2.5 sm:mr-0 sm:w-1/2 ${item?.style}`}
              key={index}
            >
              {Icon ? (
                <Icon className={`w-5 h-5 mr-2.5 ${item?.iconColor}`} />
              ) : (
                <div className={`w-5 h-5 flex-shrink-0 mr-2.5 rounded-full ${item?.iconColor}`} />
              )}
              <span className="text-base sm:text-sm">{item?.title}</span>
            </div>
          );
        })}
        <Button
          onClick={OpenLegendModal}
          type="light-blue-rounded"
          className="font-normal mb-5 mr-7.5 sm:items-start sm:mb-2.5 sm:pr-2.5 sm:mr-0 sm:items-center py-1 !order-8 sm:!order-8"
        >
          <Question className="w-5 h-5 mr-1.5" />
          <span className="text-base sm:text-sm"> Marketing legend </span>
        </Button>
      </div>
      {isOpened && <PartnersHistoryModal program={program} data={infoItems} onClose={() => setIsOpened(false)} />}
    </>
  );
};
