import React, { useEffect } from 'react';
import { BreadCrumbs } from 'components';
import {
  MainSection,
  PdfSection,
  UserNftSection,
  TotalItemsSection,
  BinanceMarketplaceSection,
  OpenSeaSection,
} from 'features/nft';
import { useRouter } from 'next/router';
import { getPreviewAccount } from 'store/userSlice/selectors';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { useRequest } from 'helpers/hooks/useRequest';
import { PumalabsRepository } from 'connectors/repositories/pumalabs';

const Nft = () => {
  const breadCrumbsProps = {
    title: `NFT Collection`,
  };
  const { query } = useRouter();
  const previewAccount = useSelector(getPreviewAccount);
  const authProfile = useSelector(getAuthUser);
  const isPreviewMode = !!query.user;
  const userAddress = isPreviewMode ? previewAccount?.address : authProfile?.address;

  const { call, data, isLoading } = useRequest(PumalabsRepository.getUserNft, [{ owner_address: userAddress }]);

  useEffect(() => {
    if (userAddress) {
      call();
    }
  }, [userAddress]);

  return (
    <>
      <div className="w-full flex flex-1 flex-col sm:px-[20px] nft-wrapper">
        <BreadCrumbs {...breadCrumbsProps} />
        <MainSection />
        <TotalItemsSection />
        <PdfSection />
        <OpenSeaSection />
        <BinanceMarketplaceSection />
        <UserNftSection data={data?.nfts} isLoading={isLoading} />
      </div>
    </>
  );
};

export default Nft;
