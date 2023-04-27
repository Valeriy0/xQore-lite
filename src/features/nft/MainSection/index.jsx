import React, { useMemo } from 'react';
import { VideoComp } from './VideoComp';
import { CustomLink, Button } from 'components';

export const MainSection = () => {
  const renderTitle = useMemo(() => {
    return (
      <>
        <span className="text-white font-bold text-[40px] sm:text-[24px] leading-[120%]">PUMA LABS NFT</span>
        <div className="w-full mt-[10px]">
          <span className="text-white-500 text-[20px] sm:text-[14px] leading-[130%]">
            Puma Labs NFT Collection is a vibrant and offbeat selection of unique NFT.
          </span>
        </div>
        <CustomLink href="https://puma.social/" targetBlank className="mt-[40px] sm:mt-[20px] flex sm:justify-center">
          <Button type="puma-gradient" className="!p-0.5 group">
            <div className="flex items-center space-x-2.5 group-hover:bg-darkPurple rounded-[100px] px-10 py-3">
              <span>Puma Labs</span>
            </div>
          </Button>
        </CustomLink>
      </>
    );
  }, []);

  return (
    <div className="nft-section-1 z-[10] p-10 mt-[40px] w-full flex min-h-[400px] rounded bg-nightBlue space-x-10 sm:space-x-0 sm:space-y-5 sm:flex-col sm:rounded-none sm:p-5 sm:rounded-[20px] sm:max-w-full sm:w-full">
      <div className="flex flex-col justify-center sm:text-center max-w-[360px] sm:max-w-full w-full rounded text-white">
        <div className="flex flex-col">
          <div className="flex flex-col">{renderTitle}</div>
        </div>
      </div>
      <VideoComp />
    </div>
  );
};
