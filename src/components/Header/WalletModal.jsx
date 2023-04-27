import React, { useMemo } from 'react';
import { Modal } from '../Modal';
import { CustomLink } from 'components';
import { Button } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserProfile } from 'store/userSlice/selectors';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from 'helpers/format';
import { copy } from 'helpers/text';
import { useAuth } from 'helpers/hooks/useAuth';
import { getAuthUser } from 'store/userSlice/selectors';
import { useRouter } from 'next/router';
import { useBalance } from 'helpers/hooks/useBalance';
import BNBIcon from 'assets/tokens/BNB.svg';
import BUSDIcon from 'assets/tokens/BUSD.svg';
import { useDeactivationWallet } from 'helpers/hooks/useDeactivationWallet';
import WalletIcon from 'assets/icons/wallet.svg';
import config from 'helpers/config';
import { NETWORK_NAMES } from 'helpers/constants';
import BSCIcon from 'assets/networks/BSC.svg';
import ErrorCheckIcon from 'assets/icons/error_check.svg';
import { TextRow } from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from 'react-placeholder';

const BalancePlaceHolder = (
  <div className="flex w-20 h-2 mb-2">
    <TextRow color="rgba(0,0,0, 0.4)" className="!m-0 rounded-mini" />
  </div>
);

export const WalletModal = ({ openedModal, handleCloseModal }) => {
  const { authAccount } = useAuth();
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const { account, chainId } = useWeb3React();
  const currentUser = useSelector(getCurrentUserProfile);
  const authUser = useSelector(getAuthUser);
  const stylesProps = { backgroundImage: `url(${currentUser?.photo || '/UnknownUser.png'})`, backgroundSize: 'cover' };
  const { balanceBnb, balanceBusd, isFirstLoaded } = useBalance();
  const isAllowedChainId = config.allowedChainId === chainId;

  const { deactivationWallet } = useDeactivationWallet();

  const onDisconnectClick = async () => {
    deactivationWallet();
    handleCloseModal();
  };

  const contentInfo = useMemo(() => {
    if (currentUser.isLoading) {
      return null;
    }

    if (!currentUser.id) {
      return {
        title: 'Register in Forsage',
        description: 'Create a new account to become a member.',
        firstBtn: {
          title: 'Create account',
          href: '/registration',
        },
        secondBtn: {
          title: 'Help me',
          href: 'https://support.forsage.io/article/guides/registration-forsage-busd',
        },
      };
    }

    if (authUser.id) {
      return {
        title: currentUser?.nickname ? `${currentUser.nickname}` : `ID ${currentUser.id}`,
        subtitleWithRounded: currentUser?.nickname ? `ID ${currentUser.id}` : '',
        description: currentUser?.nickname ? '' : 'Forsage BUSD member',
        firstBtn: {
          title: 'Return to dashboard',
          onClick: () => {
            replace('/dashboard');
            handleCloseModal();
          },
        },
      };
    }

    if (currentUser.id) {
      return {
        title: `ID ${currentUser.id}`,
        description: `${shortenAddress(account)} is a member of Forsage BUSD`,
        firstBtn: {
          title: 'Login to your account',
          onClick: authAccount,
        },
      };
    }
  }, [currentUser, authUser, account, dispatch]);

  const infoBalance = useMemo(() => {
    return [
      chainId && {
        icon: BUSDIcon,
        title: `${balanceBusd} BUSD`,
        isLoading: !isFirstLoaded || !isAllowedChainId,
        color: 'text-white',
        mobile: 'lg:hidden',
      },
      chainId && {
        icon: BNBIcon,
        title: `${balanceBnb} BNB`,
        isLoading: !isFirstLoaded || !isAllowedChainId,
        color: 'text-white-500',
        mobile: 'lg:hidden',
      },
    ]?.filter((item) => !!item);
  }, [account, balanceBusd, balanceBnb, isFirstLoaded, isAllowedChainId]);

  return (
    <Modal isOpened={openedModal} onClose={handleCloseModal}>
      <div className="flex flex-col w-full bg-black-light rounded p-10 sm:bg-main-bg sm:h-screen sm:w-screen sm:rounded-none sm:px-0 sm:pt-20 sm:pb-0">
        <div className="flex items-center justify-between mb-7.5 sm:px-5">
          <span className="text-3xl text-white font-medium sm:text-2xl">Wallet</span>
          <Button type="transparent" className="text-main-blue font-normal !text-base" onClick={onDisconnectClick}>
            Disconnect
          </Button>
        </div>
        <div className="flex flex-col flex-1 justify-start overflow-auto">
          <div className="flex flex-col p-5 bg-white-100 rounded mb-5 sm:rounded-none sm:mb-0 sm:overflow-auto">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center">
                <div className="w-7.5 h-7.5 flex justify-center items-center mr-5">
                  <WalletIcon className="stroke-current fill-current text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-white sm:text-xl">
                  {account && shortenAddress(account, 4)}
                </span>
              </div>
              <Button
                type="light-blue-rounded"
                className="px-2.5 "
                onClick={() => {
                  copy(account);
                }}
              >
                Copy
              </Button>
            </div>
            <div className="flex justify-between items-center mb-5">
              {chainId && (
                <div className="flex items-center">
                  {isAllowedChainId ? <BSCIcon className="w-7.5 h-7.5" /> : <ErrorCheckIcon className="w-6 h-6" />}
                  {!!NETWORK_NAMES[chainId] && (
                    <span className="text-base ml-5 text-white">{NETWORK_NAMES[chainId]}</span>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-white-500 text-base mb-3.5 sm:text-sm">Current wallet balance</span>
              <div className="flex flex-col space-y-3.5 notranslate">
                {infoBalance?.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center justify-start">
                      <Icon className="h-7.5 h-7.5 mr-5" />

                      <ReactPlaceholder
                        ready={!item.isLoading}
                        showLoadingAnimation
                        customPlaceholder={BalancePlaceHolder}
                      >
                        <span className="text-white text-base sm:text-sm">{item?.title}</span>
                      </ReactPlaceholder>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start bg-main-blue rounded p-5 sm:rounded-none">
            <div className="flex items-start justify-start mb-5">
              <div style={stylesProps} className="rounded-full w-10 h-10 mr-5 flex-shrink-0" />

              <div className="flex flex-col">
                <span className="text-white font-medium text-2xl mb-2.5">{contentInfo?.title}</span>
                {contentInfo?.description && <span className="text-white-500">{contentInfo?.description}</span>}
                {contentInfo?.subtitleWithRounded && (
                  <div className="flex bg-white-200 rounded px-2.5 text-white leading-6 w-max">
                    {contentInfo.subtitleWithRounded}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full space-y-4">
              <CustomLink href={contentInfo?.firstBtn?.href} withLink={!!contentInfo?.firstBtn?.href} className={''}>
                <Button onClick={contentInfo?.firstBtn?.onClick} type="black" className="w-full">
                  {contentInfo?.firstBtn?.title}
                </Button>
              </CustomLink>
              {contentInfo?.secondBtn && (
                <CustomLink href={contentInfo.secondBtn?.href} targetBlank>
                  <Button type="light-white" className="rounded-mini w-full">
                    {contentInfo.secondBtn?.title}
                  </Button>
                </CustomLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
