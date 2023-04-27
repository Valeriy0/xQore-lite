import React, { useMemo, useState } from 'react';
import { Item } from './Item';
import { CustomLink, Button } from 'components';
import { NFT_SITE } from 'helpers/nft';
import { useEffect } from 'react';

export const UserNftSection = ({ data, isLoading }) => {
  const renderContent = useMemo(() => {
    if (!isLoading) {
      if (!!data?.length) {
        return data?.map((item, itemIndex) => {
          return (
            <div className="p-5">
              <Item result={item} key={itemIndex} />
            </div>
          );
        });
      } else {
        return (
          <div className="flex flex-col space-y-2.5 p-5 rounded items-center justify-center mt-10">
            <span className="text-white text-xl font-semibold">You don't have a PUMA NFT yet.</span>
            <CustomLink className="w-full" href={'https://opensea.io/collection/puma-labs'} targetBlank>
              <Button type="nft-gradient" className="py-3.5 group w-full ">
                Buy NFT
              </Button>
            </CustomLink>
          </div>
        );
      }
    }
  }, [data, isLoading]);

  return (
    <div className="flex flex-col mt-[60px]">
      <span className="text-two-half text-white font-medium mr-2 sm:text-2xl whitespace-nowrap mb-[40px]">
        Your NFT {!!data?.length && <span>({data?.length})</span>}
      </span>
      <div className="flex flex-wrap sm:flex-col items-center justify-center sm:space-y-5">{renderContent}</div>
    </div>
  );
};
