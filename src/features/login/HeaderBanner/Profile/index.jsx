import React, { useMemo, useState } from 'react';
import { CustomLink } from 'components/CustomLink';
import { Button } from 'components/Button';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserProfile } from 'store/userSlice/selectors';
import { shortenAddress } from 'helpers/format';
import { ActivateModal } from 'components/Header/ActivateModal';
import { useAuth } from 'helpers/hooks/useAuth';
import { getAuthUser } from 'store/userSlice/selectors';
import { useRouter } from 'next/router';
import ReactPlaceholder from 'react-placeholder';
import { RoundShape, TextRow } from 'react-placeholder/lib/placeholders';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { EVENT_NAMES } from 'helpers/constants';
import { sendEvent } from 'helpers/sendEvent';

const customPlaceHolderProfile = (
  <div className="flex w-full h-full justify-between overflow-hidden h-170px sm:h-auto">
    <div className="flex flex-col w-full w-full justify-between">
      <div className="flex sm:!mb-5 sm:items-center">
        <RoundShape
          color={'#ffffff'}
          className="relative !w-15 !h-15 rounded-full rounded-full mr-2.5 hidden sm:block"
        />
        <TextRow rows={1} color={'#ffffff'} className="!w-40 !rounded-mini !m-0 !h-15 sm:!h-5" />
      </div>
      <TextRow
        rows={2}
        color={'#ffffff'}
        className="hidden !w-300px sm:!mb-1.5 !rounded-mini !m-0 !h-6 sm:!h-4 sm:!block"
      />
      <TextRow rows={2} color={'#ffffff'} className="!w-300px sm:!mb-6 !rounded-mini !m-0 !h-6 sm:!h-4" />
      <TextRow rows={1} color={'#ffffff'} className="!w-180px !rounded-mini !m-0 !h-12 sm:!h-10 sm:!w-full" />
    </div>
    <div className="flex sm:hidden w-full justify-end items-end">
      <RoundShape color={'#ffffff'} className="!w-32 !m-0 !h-32 !mb-5" />
    </div>
  </div>
);

export const Profile = ({ userContractId }) => {
  const { authAccount } = useAuth();
  const { push } = useRouter();
  const [openedWalletModal, setOpenedWalletModal] = useState(false);
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const currentUser = useSelector(getCurrentUserProfile);
  const authUser = useSelector(getAuthUser);
  const stylesProps = currentUser?.photo
    ? { backgroundImage: `url(${currentUser?.photo})`, backgroundSize: 'cover' }
    : {};

  const contentInfo = useMemo(() => {
    if (!account) {
      return {
        title: 'Forsage BUSD main page',
        description: 'Connect wallet to Register or Login',
        firstBtn: {
          title: 'Connect now',
          onClick: () => {
            sendEvent({ type: EVENT_NAMES.CONNECT_WALLET });
            setOpenedWalletModal(true);
          },
        },
        secondBtn: {
          title: 'Help me',
          onClick: () => {
            sendEvent({ type: EVENT_NAMES.HELP_ME_BUTTON });
          },
          href: 'https://support.forsage.io/article/wallet',
        },
      };
    }

    if (!currentUser.id && userContractId) {
      return {
        title: `ID ${userContractId}`,
        description: `${shortenAddress(account)} is a member of Forsage BUSD`,
        firstBtn: {
          title: (
            <div className="flex items-center">
              Syncing <PuffLoadingIcon className="w-6 h-6 ml-2.5" />
            </div>
          ),
          onClick: () => {},
          disabled: true,
        },
      };
    }

    if (currentUser.isLoading) {
      return {};
    }

    if (!currentUser.id) {
      return {
        title: 'Register in Forsage BUSD',
        description: `Wallet ${shortenAddress(
          account,
        )} is not a member of Forsage BUSD. You can use this wallet to register as a new member.`,
        firstBtn: {
          renderTitle: () => (
            <span>
              Join <span className="notranslate ml-1.5">Forsage</span>
            </span>
          ),
          href: '/registration',
        },
        secondBtn: {
          title: 'Help me',
          onClick: () => {
            sendEvent({ type: EVENT_NAMES.HELP_ME_BUTTON });
          },
          href: 'https://support.forsage.io/article/guides/registration-forsage-busd',
        },
      };
    }

    if (currentUser.id === authUser.id) {
      return {
        title: currentUser.nickname ? currentUser.nickname : `ID ${currentUser.id}`,
        additionalTitle: currentUser.nickname && `ID ${currentUser.id}`,
        description: `${shortenAddress(account)} is a member of Forsage BUSD`,
        firstBtn: {
          title: 'Return to your account',
          onClick: () => push('/dashboard'),
        },
      };
    }

    if (currentUser.id) {
      return {
        title: currentUser.nickname ? currentUser.nickname : `ID ${currentUser.id}`,
        additionalTitle: currentUser.nickname && `ID ${currentUser.id}`,
        description: `${shortenAddress(account)} is a member of Forsage BUSD`,
        firstBtn: {
          title: 'Login to your account',
          onClick: authAccount,
        },
      };
    }
  }, [currentUser, account, dispatch, authUser, userContractId]);

  return (
    <>
      <div className="w-full overflow-hidden relative flex items-center justify-between bg-main-blue rounded overflow-hidden sm:rounded-none p-7.5 sm:p-5 mb-15">
        <ReactPlaceholder
          showLoadingAnimation
          ready={!currentUser.isLoading || (!currentUser.id && userContractId)}
          customPlaceholder={customPlaceHolderProfile}
        >
          <div className={`flex flex-col sm:w-full z-10 ${!account && 'flex-shrink-0'}`}>
            <div className="flex items-start sm:items-center mb-5 sm:mb-2.5">
              {account && (
                <div
                  className="relative w-15 h-15 rounded-full rounded-full mr-2.5 hidden sm:block"
                  style={stylesProps}
                >
                  {!currentUser?.photo && <img className="w-full h-full" src={'/UnknownUser.png'} />}
                </div>
              )}
              <div className="flex items-center">
                <span className="text-white font-medium text-two-half leading-48px sm:text-xl">
                  {contentInfo.title}
                </span>
                {contentInfo.additionalTitle && (
                  <div className="flex bg-white-200 rounded px-2.5 text-white leading-8 ml-2.5 sm:mr-2.5 sm:ml-">
                    {contentInfo.additionalTitle}
                  </div>
                )}
              </div>
            </div>
            <span className="mb-7.5 text-base sm:text-sm sm:mb-5 ">{contentInfo.description}</span>
            {!account && (
              <div className="w-full h-full relative flex justify-center items-center sm:mb-5">
                <img className="hidden max-w-full h-full max-h-56 sm:flex" src={'/preview_cards/wallet_mini_min.png'} />
                <div className="absolute bottom-0 left-0 right-0 -rotate-180 wallet-gradient-main h-11 hidden sm:block" />
              </div>
            )}
            <div className="flex space-x-5 sm:space-x-0 sm:space-y-3.5 sm:flex-col">
              <CustomLink href={contentInfo.firstBtn?.href} withLink={!!contentInfo.firstBtn?.href} className={''}>
                <Button
                  onClick={contentInfo.firstBtn?.onClick}
                  disabled={contentInfo.firstBtn?.disabled}
                  type="black"
                  className="sm:w-full"
                >
                  {!!contentInfo.firstBtn?.title ? contentInfo.firstBtn?.title : contentInfo.firstBtn?.renderTitle()}
                </Button>
              </CustomLink>
              {contentInfo?.secondBtn && (
                <CustomLink href={contentInfo.secondBtn?.href} targetBlank>
                  <Button
                    type="light-white"
                    className="rounded-mini sm:w-full"
                    onClick={contentInfo?.secondBtn?.onClick}
                  >
                    {contentInfo.secondBtn?.title}
                  </Button>
                </CustomLink>
              )}
            </div>
          </div>

          {account ? (
            <div className="relative flex-shrink-0 w-40 h-40 rounded-full rounded-full sm:hidden" style={stylesProps}>
              {!currentUser?.photo && <img className="w-full h-full" src={'/UnknownUser.png'} />}
            </div>
          ) : (
            <div
              className="flex relative w-540px flex-shrink-0 h-full -m-7.5 ml-0 sm:hidden"
              style={{ height: '230px' }}
            >
              <div
                className="absolute  top-0 bottom-0 right-0 w-full sm:hidden h-330px"
                style={{
                  backgroundImage: "url('/preview_cards/wallet_big_min.png')",
                  backgroundSize: 'cover',
                  backgroundRepeat: 'round',
                }}
              />
            </div>
          )}
        </ReactPlaceholder>
      </div>
      <ActivateModal handleCloseModal={() => setOpenedWalletModal(false)} openedModal={openedWalletModal} />
    </>
  );
};
