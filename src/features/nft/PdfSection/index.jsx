import React from 'react';
import { CustomLink, Button, SocialButtons } from 'components';
import DownLoadIcon from 'assets/icons/download-pdf.svg';
import { NFT_PDF_LINK } from 'helpers/nft';

export const PdfSection = () => {
  return (
    <div className="nft-section-3 z-[10] p-10 w-full flex sm:justify-center sm:items-center min-h-[164px] rounded bg-nightBlue space-x-10 sm:space-x-0 sm:space-y-5 sm:flex-col sm:rounded-[20px] sm:p-5">
      <div className="flex flex-col flex-1 space-y-1.5 sm:text-center">
        <span className="text-2xl font-bold text-white sm:text-[24px]">NFT COLLECTION PDF</span>
        <span className="max-w-[300px] text-white-500 sm:text-[14px]">
          Every NFT has utility features and can be used in future Forsage products.
        </span>
      </div>
      <div className="flex flex-col items-center justify-center sm:order-0">
        <img src="/nft/pumaLabs-logo.png" className="w-[133px]" alt="" />
      </div>
      <div className="flex flex-col flex-1 items-center justify-center sm:order-2">
        <CustomLink href={NFT_PDF_LINK} targetBlank>
          <Button type="nft-gradient" className="!p-0.5 group">
            <div className="flex items-center space-x-2.5 group-hover:bg-darkPurple rounded-[100px] px-10 py-3">
              <span>Download PDF</span>
              <DownLoadIcon className="w-6 h-6" />
            </div>
          </Button>
        </CustomLink>
        <div className="space-x-2.5 mt-[18px]">
          <SocialButtons />
        </div>
      </div>
    </div>
  );
};
