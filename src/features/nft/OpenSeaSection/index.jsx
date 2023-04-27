import React, { useMemo } from 'react';
import { CustomLink, Button } from 'components';

export const OpenSeaSection = () => {
  const renderTitle = useMemo(() => {
    return (
      <>
        <img className="w-[246px] sm:w-[220px]" src={'/open-sea.png'} alt="" />
        <div className="w-full mt-[10px] sm:text-center">
          {/* <span className="text-white-500 text-[20px] sm:text-[14px] leading-[130%]">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          </span> */}
        </div>
        <CustomLink
          href="https://opensea.io/collection/puma-labs"
          targetBlank
          className="mt-[40px] sm:mt-[20px] sm:flex sm:justify-center"
        >
          <Button type="sky-blue" className="!p-0.5 group">
            <div className="flex items-center space-x-2.5 group-hover:bg-darkPurple rounded-[100px] px-10 py-3">
              <span>OpenSea</span>
            </div>
          </Button>
        </CustomLink>
      </>
    );
  }, []);

  return (
    <>
      <div className="mt-[60px] sm:hidden">
        <span className="text-white font-bold text-[40px]">Buy/Sell NFT</span>
      </div>
      <div className="open-sea-gradient p-10 mt-[40px] w-full flex min-h-[268px] sm:min-h-[366px] rounded bg-nightBlue space-x-10 sm:space-x-0 sm:space-y-5 sm:flex-col sm:rounded-[20px] sm:p-5 overflow-hidden">
        <div className="flex flex-col justify-center max-w-[360px] sm:max-w-full w-full rounded text-white">
          <div className="flex relative sm:flex-col sm:items-center">
            <div className="flex flex-col sm:items-center">{renderTitle}</div>
            <img
              className="absolute min-w-[528px] min-h-[250px] left-[460px] top-[0px] sm:left-0 sm:top-[220px] sm:min-w-[250px] sm:min-h-[130px]"
              src={'/open-sea-screen.png'}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
