import React from 'react';
import { TargetItem } from './TargetItem';
import Carousel, { consts } from 'react-elastic-carousel';

export const TargetItems = ({ targetList }) => {
  const renderCustomPagination = ({ pages, activePage }) => {
    return (
      <div className="w-full justify-center items-center mt-5 px-2 hidden sm:flex">
        <div className="flex space-x-2.5">
          {pages?.map((page) => (
            <div key={page} className={`w-2 h-2 rounded-full ${activePage === page ? 'bg-white' : 'bg-white-100'}`} />
          ))}
        </div>
      </div>
    );
  };

  const targetsLength = targetList?.length;

  return (
    <div className="flex flex-col w-full sm:px-5">
      <div className="flex mb-7.5">
        <span className="text-3xl text-white sm:text-2xl font-medium whitespace-nowrap">
          My targets
          <span className="text-white-500 ml-2.5">{targetsLength}</span>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-7.5 w-full sm:hidden">
        {targetList?.map((item, index) => (
          <TargetItem index={index} {...item} />
        ))}
      </div>
      <div className="hidden sm:flex -mx-7.5">
        <Carousel showArrows={false} isRTL={false} itemPadding={[0, 20]} renderPagination={renderCustomPagination}>
          {targetList?.map((item, index) => (
            <TargetItem index={index} {...item} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};
