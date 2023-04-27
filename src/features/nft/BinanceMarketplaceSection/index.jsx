import React, { useMemo } from 'react';
import { Button } from 'components';
import ComingSoonIcon from 'public/svg/coming-soon.svg';
import ComingSoonMobileIcon from 'public/svg/coming-soon-mobile.svg';

export const BinanceMarketplaceSection = () => {
  const renderTitle = useMemo(() => {
    return (
      <>
        <img className="w-[277px] sm:w-[228px]" src={'/binance-marketplace.png'} alt="" />
        <div className="w-full mt-[20px]">
          {/* <span className="text-white-500 text-[16px] max-w-[296px] sm:text-[14px] leading-[130%]">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          </span> */}
        </div>
        <Button
          type="disabled"
          className="!p-0.5 group mt-[40px] sm:mt-[20px] max-w-[140px] max-h-[40px] text-[16px] text-white-500 whitespace-nowrap rounded-[100px]"
        >
          <div className="flex items-center space-x-2.5 group-hover:bg-darkPurple rounded-[100px] px-10 py-3 sm:text-white">
            <span>Coming soon</span>
          </div>
        </Button>
      </>
    );
  }, []);

  return (
    <>
      <div className="nft-binance-bg p-10 mt-[40px] items-center sm:text-center w-full flex min-h-[268px] rounded bg-nightBlue space-x-10 sm:space-x-0 sm:flex-col sm:rounded-[20px] sm:p-5">
        <div className="flex flex-col justify-center sm:items-center max-w-[360px] sm:max-w-full w-full rounded text-white">
          <div className="flex">
            <div className="flex flex-col sm:items-center">{renderTitle}</div>
          </div>
        </div>
        <div className="flex-1 items-center justify-center text-center text-5xl sm:text-4xl font-semibold text-[#F3BA2F] sm:mt-[20px] sm:mb-[20px]">
          Coming <br className="hidden sm:block" /> soon
        </div>
        {/* <ComingSoonIcon className="sm:hidden" />
        <ComingSoonMobileIcon className="hidden sm:block mt-[20px] mb-[20px]" /> */}
      </div>
    </>
  );
};
