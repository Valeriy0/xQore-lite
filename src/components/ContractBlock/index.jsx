import React, { useState } from 'react';
import { CustomLink } from 'components';
import CopyIcon from 'assets/icons/copy_white.svg';
import LinkIcon from 'assets/icons/link.svg';
import ArrowUp from 'assets/icons/triangle_up.svg';
import ArrowDown from 'assets/icons/triangle_down.svg';
import { shortenAddress } from 'helpers/format';
import config from 'helpers/config';
import { copy } from 'helpers/text';

export const ContractBlock = ({ titleBlock = '', contractInfo, contractStat }) => {
  const [openContracts, setOpenContracts] = useState(false);
  const toggleOpenContracts = () => {
    setOpenContracts((prevActive) => !prevActive);
  };

  return (
    <div className="bg-gray rounded p-5 flex flex-col flex-1 max-w-full">
      <div className="flex justify-between items-center text-base text-white-500 sm:text-sm">
        <span>{titleBlock}</span>
        <button
          className={`rounded-full h-5 w-5 justify-center items-center ${
            openContracts ? 'bg-white' : 'bg-main-blue'
          } hidden lg:flex`}
          onClick={() => {
            toggleOpenContracts();
          }}
        >
          {openContracts ? (
            <ArrowUp className="stroke-current text-main-bg mb-0.5" />
          ) : (
            <ArrowDown className="stroke-current text-white" />
          )}
        </button>
      </div>
      <div className={`flex flex-col flex-1 justify-between ${!openContracts && 'lg:hidden'}`}>
        <div className="flex flex-col border-t border-b border-white-100 pb-2.5 mt-2.5">
          {contractInfo?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center py-2.5 border-b border-white-100 space-y-1.5 last:border-0 last:pb-0"
              >
                <span className="text-base text-white-500 notranslate sm:text-sm">{item?.name}</span>
                <div className="flex justify-end items-center space-x-2.5">
                  <span className="text-base text-white notranslate sm:text-sm">
                    {shortenAddress(item?.address, 3)}
                  </span>
                  <button
                    onClick={() => {
                      copy(item?.address);
                    }}
                  >
                    <CopyIcon className="h-18px w-18px" />
                  </button>
                  <CustomLink targetBlank href={`${config.scanNetworkAddress}${item?.address}`}>
                    <LinkIcon className="h-18px w-18px" />
                  </CustomLink>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col pt-2.5 mt-auto">
          {contractStat?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col py-2.5 border-b border-white-100 space-y-1.5 last:border-0 last:pb-0"
            >
              <span className="text-base text-white-500 sm:text-sm">
                {!!item?.title ? item?.title : item?.renderTitle()}
              </span>
              <span className="text-2xl text-white font-bold sm:text-xl">{item?.total}</span>
              <span className="text-green-light text-base items-baseline sm:text-sm">+ {item?.new}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
