import React from 'react';

export const TotalItemsSection = () => {
  return (
    <div className="nft-section-2 p-10 ml-auto mr-auto w-full flex min-h-[180px] max-w-[90%] items-center sm:justify-center bg-nightBlue sm:bg-transparent sm:space-y-1.5 sm:flex-col sm:rounded-none sm:p-5 sm:py-10 sm:text-center">
      <span className="text-white font-bold text-[24px] sm:text-[18px]">Total items</span>
      <span className="text-white font-bold text-[64px] sm:text-[45px] ml-[98px] sm:ml-0 sm:leading-[50px]">
        243 645 NFT
      </span>
    </div>
  );
};
