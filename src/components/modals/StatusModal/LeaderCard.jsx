import React, { useMemo } from 'react';
import LockIcon from 'assets/icons/lock.svg';
import PumaBlackIcon from 'assets/icons/puma_black.svg';

export const LeaderCard = ({ type = '', isActive = true }) => {
  const cardStyles = useMemo(() => {
    if (type === 'basic') {
      return {
        bg: 'bg-white',
        border: 'border-white',
        textColor: 'text-white',
        textFirst: 'All major features are available immediately',
        textSecond: '',
      };
    }

    if (type === 'bronze') {
      return {
        bg: 'bg_bronze_gradient',
        border: 'border_bronze_gradient',
        textColor: 'text_bronze_gradient',
        textFirst: 'Join Priority Leaders Community',
        textSecond: 'Create additional custom links',
      };
    }

    if (type === 'silver') {
      return {
        bg: 'bg_silver_gradient',
        border: 'border_silver_gradient',
        textColor: 'text_silver_gradient',
        textFirst: 'Join Priority Leaders Community',
        textSecond: 'Add names to custom links',
      };
    }

    if (type === 'gold') {
      return {
        bg: 'bg_gold_gradient',
        border: 'border_gold_gradient',
        textColor: 'text_gold_gradient',
        textFirst: 'Join Priority Leaders Community',
        textSecond: 'A personal support agent for you',
      };
    }
  }, [type]);

  return (
    <div
      className={`flex relative h-[300px] flex-shrink-0 w-[226px] rounded bg-transparent border-[4px] ${cardStyles.border}`}
    >
      <div className="flex w-full items-center flex-col pt-6">
        <div className="flex flex-col items-center justify-center">
          <div className={`flex items-center justify-center ${cardStyles.bg} rounded-full w-[128px] h-[128px]`}>
            {isActive ? <PumaBlackIcon /> : <LockIcon className="h-[50px]" />}
          </div>
          <span className={`${cardStyles.textColor} text-[25px] leading-[30px] font-semibold mt-2.5 fill-transparent`}>
            {type?.toUpperCase()}
          </span>
          <div className="flex flex-col mt-[26px] text-center items-center">
            <span className={`${cardStyles.textColor} text-xs`}>{cardStyles.textFirst}</span>
            {cardStyles.textSecond && (
              <span className={`${cardStyles.textColor} text-xs mt-1.5`}>{cardStyles.textSecond}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
