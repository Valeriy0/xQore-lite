import React, { useMemo, useState, useEffect, Fragment } from 'react';
import { ActivateModal } from './ActivateModal';
import { WalletModal } from './WalletModal';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import { destroyCookie } from 'nookies';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useBalance } from 'helpers/hooks/useBalance';
import ExitIcon from 'assets/icons/exit.svg';
import MagnifierIcon from 'assets/icons/magnifier.svg';
import BNBIcon from 'assets/tokens/BNB.svg';
import BUSDIcon from 'assets/tokens/BUSD.svg';
import BSCIcon from 'assets/networks/BSC.svg';
import LogoIcon from 'assets/logo.svg';
import ErrorCheckIcon from 'assets/icons/error_check.svg';
import MobileLogoIcon from 'assets/mobile_logo.svg';
import { shortenAddress } from 'helpers/format';
import { BurgerMenu, CustomLink, Button } from 'components';
import { NETWORK_NAMES, EVENT_NAMES } from 'helpers/constants';
import { clearAuthUser } from 'store/userSlice';
import { AuthRepository } from 'connectors/repositories/auth';
import { TextRow } from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from 'react-placeholder';
import { NotificationsButton } from './NotificationsButton';
import config from 'helpers/config';
import WalletIcon from 'assets/icons/wallet.svg';
import { sendEvent } from 'helpers/sendEvent';

const BalancePlaceHolder = (
  <div className="flex w-20 h-2 mb-2 ml-2.5">
    <TextRow color="rgba(0,0,0, 0.4)" className="!m-0 rounded-mini" />
  </div>
);

export const Header = ({
  withRing,
  withBurger,
  onClickSearch,
  withExit,
  withExitMobile,
  withMagnifier,
  className,
  withButtons = true,
}) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [openedModal, setOpenedModal] = useState(false);
  const [openedWalletModal, setOpenedWalletModal] = useState(false);
  const [headerColor, setHeaderColor] = useState('bg-transparent');
  const { account, chainId } = useWeb3React();
  const { balanceBnb, balanceBusd, isFirstLoaded } = useBalance();
  const isAllowedChainId = config.allowedChainId === chainId;

  const [burgerActive, setBurgerActive] = useState(false);

  const toggleBurgerActive = () => {
    setBurgerActive((prevActive) => !prevActive);
  };

  const onLogout = async () => {
    try {
      await AuthRepository.logout();
    } catch (e) {
      console.log(e);
    }

    destroyCookie(null, 'apiToken', {
      path: '/',
    });
    dispatch(clearAuthUser());
    push('/');
  };

  const listenScrollEvent = () => {
    window.pageYOffset > 5 ? setHeaderColor('bg-main-bg') : setHeaderColor('bg-transparent');
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  const HeaderStyle = useMemo(() => {
    return headerColor;
  }, [headerColor]);

  const info = useMemo(() => {
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
      {
        icon: WalletIcon,
        title: account ? shortenAddress(account, 2) : 'Не подключен',
        color: 'text-white-500',
      },
    ]?.filter((item) => !!item);
  }, [account, balanceBusd, balanceBnb, isFirstLoaded, isAllowedChainId]);

  const onConnectWalletClick = () => {
    sendEvent({ type: EVENT_NAMES.CONNECT_WALLET });
    setOpenedModal(true);
  };

  return (
    <header
      className={clsx(
        className,
        `fixed top-0 w-full pb-2.5 pt-2.5 px-10 z-30 ${HeaderStyle} sm:px-5 lg:border-b lg:border-white-100`,
      )}
    >
      <nav className="z-10 w-full max-w-desktop-preview-bar m-auto header-border-b">
        <div className={`flex items-center ${withButtons ? 'justify-between' : 'justify-between sm:justify-center'}`}>
          {withButtons ? (
            <>
              <CustomLink href="/">
                <MobileLogoIcon className="hidden lg:block" />
                <LogoIcon className="block lg:hidden" />
              </CustomLink>
              <div className="flex justify-end items-center ml-auto">
                {account && !isAllowedChainId && (
                  <div className="sm:flex lg:flex lg:mr-0 justify-start space-x-1.5 hidden sm:mr-2.5 rounded-mini">
                    <ErrorCheckIcon className="w-6 h-6" />
                  </div>
                )}
                {account ? (
                  <div className="flex justify-end">
                    {chainId && (
                      <div
                        className={`flex py-2 px-2.5 ${
                          !!NETWORK_NAMES[chainId] && 'pr-5'
                        } rounded items-center bg-black-light notranslate lg:hidden`}
                      >
                        {isAllowedChainId ? <BSCIcon className="w-6 h-6" /> : <ErrorCheckIcon className="w-6 h-6" />}
                        {!!NETWORK_NAMES[chainId] && (
                          <span className="text-base ml-2.5 text-white-500">{NETWORK_NAMES[chainId]}</span>
                        )}
                      </div>
                    )}
                    <Button
                      type="black-light"
                      className="px-2.5 p-2 rounded ml-5 font-normal pl-0 pr-2.5 notranslate sm:pl-2.5 sm:ml-2.5"
                      onClick={() => setOpenedWalletModal(true)}
                    >
                      {info?.map((item, index) => {
                        const Icon = item.icon;

                        return (
                          <Fragment key={index}>
                            <div
                              className={`flex items-center  border-r border-white-100 px-2.5 last:border-r-0 ${
                                item.mobile
                              } ${item.onClick && 'cursor-pointer'} lg:px-0 lg:pl-2.5 sm:pl-0`}
                              onClick={item.onClick}
                            >
                              <Icon className="w-6 h-6 mr-2.5 sm:hidden" />
                              <ReactPlaceholder
                                ready={!item.isLoading}
                                showLoadingAnimation
                                customPlaceholder={BalancePlaceHolder}
                              >
                                <span className={`text-base  ${item.color}`}>{item.title}</span>
                              </ReactPlaceholder>
                            </div>
                          </Fragment>
                        );
                      })}
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="black-light"
                    className="text-white font-normal rounded items-center "
                    onClick={onConnectWalletClick}
                  >
                    Connect wallet
                  </Button>
                )}
                {withMagnifier && account && (
                  <Button type="black-light-circle" className="ml-5 lg:hidden" onClick={onClickSearch}>
                    <MagnifierIcon className="w-5 h-5" />
                  </Button>
                )}
                {withRing && account && <NotificationsButton />}
                {(withExit || withExitMobile) && (
                  <Button
                    type="black-light-circle"
                    className={`ml-5 px-0 py-0 ${!withExitMobile && 'lg:hidden'} sm:ml-2.5`}
                    onClick={onLogout}
                  >
                    <ExitIcon className="ml-1" />
                  </Button>
                )}
                {withBurger && (
                  <Button
                    type="black-light-circle"
                    className="hidden lg:flex flex-col items-center justify-center ml-5 sm:ml-2.5"
                    onClick={toggleBurgerActive}
                  >
                    <span className="w-4 border-t border-white mb-2" />
                    <span className="w-4 border-t border-white" />
                  </Button>
                )}
              </div>
            </>
          ) : (
            <CustomLink href="/">
              <LogoIcon className="block" />
            </CustomLink>
          )}
        </div>
      </nav>
      <BurgerMenu active={burgerActive} setActive={setBurgerActive} openSearch={onClickSearch} />
      <ActivateModal handleCloseModal={() => setOpenedModal(false)} openedModal={openedModal} />
      <WalletModal handleCloseModal={() => setOpenedWalletModal(false)} openedModal={openedWalletModal} />
      {/*<NotificationModal handleCloseModal={() => setOpenedNotificationModal(false)} openedModal={openedNotificationModal} />*/}
    </header>
  );
};
