import React, { useEffect, useState } from 'react';
import { Button } from 'components';
import { useRouter } from 'next/router';
import { InviteProgramModal } from 'components/modals';
import { CONTRACT_NAMES, FORSAGE_AND_XQORE, PROGRAM_NAMES } from 'helpers/constants';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { userExists } from 'helpers/checks';
import Countdown from 'react-countdown';
import { useTimerOver } from 'helpers/hooks/useTimerOver';
import { XQORE_DATE_START } from 'helpers/constants';
import { parseISO } from 'date-fns';
import { useWeb3React } from '@web3-react/core';
import { ActivateModal } from 'components/Header/ActivateModal';

export const Main = ({ id, count_partners, profit_xqore }) => {
  const { account } = useWeb3React();
  const { push } = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const [isOpenedConnectModal, setIsOpenedConnectModal] = useState(false);

  const [isRegisteredFromX3X4, setIsRegisteredFromX3X4] = useState(false);
  const [isAlreadyBoughtXQore, setIsAlreafyBoughtXqore] = useState(false);

  const { getContract } = useGetContract();
  const { isCompleted, onComplete } = useTimerOver(parseISO(XQORE_DATE_START));

  const checkIsRegistered = async () => {
    try {
      const contract = await getContract(CONTRACT_NAMES.BASE);
      const total = await userExists(account, contract);

      setIsRegisteredFromX3X4(total);
    } catch (e) {
      setIsRegisteredFromX3X4(false);
    }
  };

  const checkIsBoughtXQore = async () => {
    try {
      const contract = await getContract(CONTRACT_NAMES.XQORE);
      const isAlreadyBoughtLevel = await contract.usersActiveX6Levels(account, 1);

      setIsAlreafyBoughtXqore(isAlreadyBoughtLevel);
    } catch (e) {
      setIsAlreafyBoughtXqore(false);
    }
  };

  useEffect(async () => {
    if (account) {
      setIsOpened(false);
      checkIsRegistered();
      checkIsBoughtXQore();
    }
  }, [account]);

  useEffect(() => {}, []);

  const onRegisterClick = (e) => {
    e.preventDefault();
    if (!account) {
      setIsOpenedConnectModal(true);
    } else if (isRegisteredFromX3X4 && isAlreadyBoughtXQore) {
      push('/');
    } else {
      if (!isCompleted) {
        push('/registration');
      } else {
        setIsOpened(true);
      }
    }
  };

  const handleCloseModal = () => {
    setIsOpened(false);
  };

  return (
    <div className="relative w-full min-h-[70vh]  sm:h-full flex flex-col items-center justify-center sm:p-2">
      {/* bg images */}
      <img className="absolute top-0 right-0 sm:top-[35vh] " src="/xQore/invite/main-left.png" alt="" />
      <img className="absolute top-0 left-0 sm:hidden " src="/xQore/invite/main-right.png" alt="" />
      {/* content */}
      <div className="flex flex-col items-center max-w-[1168px] w-full sm:space-y-5 sm:h-full z-10">
        <div className="flex flex-col text-center items-center">
          <div className="w-[124px] h-[124px] rounded-full"></div>
          <span className="text-5xl text-white font-semibold uppercase sm:text-4xl sm:flex sm:flex-col sm:font-medium">
            <span>ID {id} </span>
            <span className="text-[#7CCDD2]">invites you</span>
          </span>
          <div className="flex items-center text-5xl sm:text-4xl sm:items-center ">
            <span className="text-white font-semibold uppercase mt-5 text-[#7CCDD2] sm:font-medium">to</span>
            <img className="h-[125px] sm:h-[90px]" src="/xQore/invite/main/logo.png" alt="" />
          </div>
        </div>
        <div className="flex space-x-5 text-white mb-7.5 sm:w-full">
          <div className="relative flex flex-col space-y-4 bg-black-500 p-5 rounded min-w-[256px] sm:min-w-[160px] sm:w-full sm:space-y-0 sm:py-3 sm:justify-center border border-1 border-[#285355]">
            <span className="text-xl z-10 sm:text-base">Team</span>
            <span className="text-4xl font-medium z-10 sm:text-2xl">{count_partners}</span>
            <img className="absolute bottom-0 right-0 h-[80%]" src="/xQore/invite/main/partners.png" alt="" />
          </div>
          <div className="relative flex flex-col space-y-4 bg-black-500 p-5 rounded min-w-[256px] sm:min-w-[160px] sm:w-full  sm:space-y-0 sm:py-3 border border-1 border-[#285355] sm:justify-center">
            <span className="text-xl z-10 sm:text-base">Rewards, BNB</span>
            <span className="text-4xl font-medium z-10 sm:text-2xl">{profit_xqore}</span>
            <img className="absolute bottom-0 right-0 h-[80%]" src="/xQore/invite/main/results.png" alt="" />
          </div>
        </div>
        <div className="flex flex-col text-center items-center space-y-[100px] sm:h-full sm:justify-between">
          <Button
            onClick={onRegisterClick}
            className="w-full max-w-[530px] sm:min-h-[60px] text sm:text-xl sm:font-medium"
            type="white"
          >
            {isAlreadyBoughtXQore && isRegisteredFromX3X4
              ? 'Login to your account'
              : account
              ? 'Register now'
              : 'Connect wallet'}
          </Button>
          <span className="text-white-700 font-light sm:h-full">
            The new Forsage xQore tool is a natural evolution of the Platform and its products,{' '}
            <br className="sm:hidden" /> based on the <br className="hidden sm:flex" />
            principles and concepts of development since 2020.
          </span>
        </div>
      </div>
      {isOpened && (
        <InviteProgramModal
          uplineId={id}
          name={isRegisteredFromX3X4 ? PROGRAM_NAMES.XQORE : FORSAGE_AND_XQORE}
          onClose={handleCloseModal}
        />
      )}
      {isOpenedConnectModal && (
        <ActivateModal openedModal={isOpenedConnectModal} handleCloseModal={() => setIsOpenedConnectModal(false)} />
      )}
      <div className="hidden">
        <Countdown date={XQORE_DATE_START} onComplete={onComplete} />
      </div>
    </div>
  );
};
