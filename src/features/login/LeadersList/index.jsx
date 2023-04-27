import React, { useMemo } from 'react';
import Carousel, { consts } from 'react-elastic-carousel';
import { CustomLink } from 'components';
import BscIcon from 'assets/tokens/BUSD.svg';
import LeftArrow from 'assets/icons/arrow_left.svg';
import RightArrow from 'assets/icons/arrow_right.svg';
import InclineArrowIcon from 'assets/icons/full_arrow_incline.svg';
import { linkWithQuery } from 'helpers/links';
import BusdIconNoBg from 'assets/tokens/BUSD_withoutBG.svg';
import { splitNumber } from 'helpers/format';

export const LeadersList = ({ data }) => {
  const renderCustomPagination = ({ pages, activePage }) => {
    return (
      <div className="flex w-full justify-center items-center mt-5 px-2">
        <div className="flex space-x-2.5 sm:space-x-1">
          {pages?.map((page) => (
            <div
              key={page}
              className={`w-2 h-2 rounded-full ${activePage === page ? 'bg-white' : 'bg-white-100'} sm:w-1.5 sm:h-1.5`}
            />
          ))}
        </div>
      </div>
    );
  };

  const list = useMemo(() => {
    return data?.map((item) => {
      return {
        id: item?.id,
        partners: item?.count_partners,
        revenue: item?.revenue,
      };
    });
  }, [data]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 675, itemsToShow: 2, itemsToScroll: 2 },
    { width: 1000, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const myArrow = ({ type, onClick }) => {
    const Pointer = type === consts.PREV ? LeftArrow : RightArrow;
    const currentClass = type === consts.PREV ? '-left-5 sm:left-2.5' : '-right-5 sm:right-2.5';
    return (
      <button
        onClick={onClick}
        className={`flex justify-center items-center absolute w-10 h-10 top-110px ${currentClass}`}
      >
        <Pointer className="fill-current text-white-500 " />
      </button>
    );
  };

  return (
    <div className="flex flex-col mb-15">
      <div className="flex flex-col">
        <span className="text-white text-3xl font-bold mb-7.5 sm:px-5">Forsage Leaders</span>
        <div className="carousel-wrapper leaders-carousel space-x-7.5 relative -mr-7.5 -ml-7.5 sm:-mr-2.5 sm:-ml-2.5 sm:px-5">
          <Carousel
            isRTL={false}
            itemPadding={[0, 20]}
            breakPoints={breakPoints}
            renderArrow={myArrow}
            renderPagination={renderCustomPagination}
          >
            {list?.map((item) => (
              <CustomLink
                className="flex flex-col bg-main-blue-200 rounded p-5 w-full relative cursor-pointer border border-transparent hover:border-main-blue"
                key={item?.id}
                href={linkWithQuery('/dashboard', { user: item?.id })}
              >
                <InclineArrowIcon className="absolute top-2 right-2  stroke-current text-white w-5 h-5" />
                <div className="flex items-center mb-7">
                  <BscIcon className="w-6 h-6 mr-2.5" />
                  <span className="bg-main-blue-200 text-main-blue text-xs rounded px-2.5 leading-8">
                    ID {item?.id}
                  </span>
                </div>
                <div className="flex flex-col items-start mb-7">
                  <span className="mb-2.5">Partners</span>
                  <span className="text-white text-2xl font-bold">{item.partners}</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="flex items-center mb-2.5">
                    Revenue
                    <BusdIconNoBg className="w-5 h-5 fill-current text-white-500 ml-1.5" />
                  </span>
                  <span className="text-white text-2xl font-bold">{splitNumber(item.revenue)} BUSD</span>
                </div>
              </CustomLink>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
