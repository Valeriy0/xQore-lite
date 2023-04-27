import React, { useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { checkBalance, checkNetwork } from 'helpers/checks';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { BNB_COMMISSIONS, PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';
import { Button } from 'components';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import { CheckInfo } from 'features/registration/CheckInfo';
import ChatIcon from 'assets/icons/chat.svg';
import InformationIcon from 'assets/icons/information_circle.svg';
import { useApproveWithChecks } from 'helpers/hooks/useApproveWithChecks';
import { useBalance } from 'helpers/hooks/useBalance';
import { checkBalanceWithBnbLevel } from 'helpers/checks';
import { useComponentDidUpdate } from 'helpers/hooks/useComponentDidUpdate';
import { useOpenSupport } from 'helpers/hooks/useOpenSupport';
import { CheckStatuses } from 'features/registration/CheckStatuses';
import { XqoreInfoCard } from '../XqoreInfoCard';

const getChecksCallbacks = (web3Props, getContract) => {
  const contractType = PROGRAM_NAMES.XQORE;
  const funcProps = { getContract, ...web3Props, contractType };

  return {
    name: contractType,
    getContract,
    callbacks: [
      {
        func: checkNetwork,
        key: 'checkNetwork',
        funcProps,
      },
      {
        func: checkBalanceWithBnbLevel,
        key: 'checkBalance',
        funcProps: {
          level: 1,
          name: PROGRAM_NAMES.XQORE,
          ...funcProps,
          bnbMinPrice: PROGRAM_PRICES[PROGRAM_NAMES.XQORE]['1'],
        },
      },
    ],
  };
};

const XqoreRegistration = ({ statInfo, onActivate }) => {
  const web3Props = useWeb3React();
  const { active, account, chainId } = web3Props;
  const { getContract } = useGetContract();
  const { statuses, callChecks, statusMeta, callApprove } = useApproveWithChecks(
    getChecksCallbacks(web3Props, getContract),
  );

  const { fetchBalance, balanceBnb } = useBalance();
  const { openSupport } = useOpenSupport();

  const isSuccessAll = Object.values(statuses).every((status) => status === STATUSES_ENUM.SUCCESS);
  const isLoadingAny = Object.values(statuses).some((status) => status === STATUSES_ENUM.WAIT);

  useEffect(() => {
    fetchBalance();
  }, []);

  const checkTitles = {
    checkNetwork: {
      title: 'Network',
      success: 'Smart chain',
      error: 'wrong network',
    },
    checkBalance: {
      title: 'Balance',
      success: `min ${PROGRAM_PRICES[PROGRAM_NAMES.XQORE][1] + BNB_COMMISSIONS[PROGRAM_NAMES.XQORE]} BNB`,
      error: `min ${PROGRAM_PRICES[PROGRAM_NAMES.XQORE][1] + BNB_COMMISSIONS[PROGRAM_NAMES.XQORE]} BNB`,
    },
  };

  console.log(PROGRAM_PRICES[PROGRAM_NAMES.XQORE][1], BNB_COMMISSIONS[PROGRAM_NAMES.XQORE]);

  useComponentDidUpdate(
    (prev) => {
      if (prev.balanceBnb && prev.balanceBnb !== balanceBnb) {
        callChecks();
      }
    },
    {
      balanceBnb,
    },
  );

  const onClickButton = async () => {
    if (!isSuccessAll) {
      return callChecks();
    }

    return onActivate();
  };

  const renderBodyRight = useMemo(() => {
    return (
      <div className="bg-white-100 rounded p-10 max-w-desktop-reg-info-card w-full flex-shrink h-auto flex flex-col min-h-550px sm:min-h-auto sm:mb-10 sm:max-w-full sm:hidden">
        <div className="flex flex-1 items-start w-full">
          {isSuccessAll ? (
            <CheckInfo
              key="checkApprove"
              status="pending"
              infoKey="checkApprove"
              program={PROGRAM_NAMES.XQORE}
              statusMeta={statusMeta}
            />
          ) : (
            Object.keys(statuses).map((key) => (
              <CheckInfo
                key={key}
                status={statuses[key]}
                infoKey={key}
                program={PROGRAM_NAMES.XQORE}
                statusMeta={statusMeta}
              />
            ))
          )}
        </div>
        <div className="mt-3.5">
          <iframe
            className="bg-black w-full mb-7.5 h-180px"
            src="https://www.youtube.com/embed/T6JO-HlcNpE"
            srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/T6JO-HlcNpE?autoplay=1><img src=https://img.youtube.com/vi/T6JO-HlcNpE/hqdefault.jpg><span>▶</span></a>"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button onClick={openSupport} className="flex items-start">
            <ChatIcon className="w-6 h-6 mr-4" />
            <span className="text-white text-left">
              Need help with registration? <br /> Talk to experts in the <b>support chat</b>
            </span>
          </button>
        </div>
      </div>
    );
  }, [statuses, isSuccessAll]);

  useEffect(() => {
    callChecks();
  }, [active, account, chainId]);

  console.log(statInfo);

  return (
    <>
      <div className="max-w-desktop-reg-gold-status flex flex-1 flex-col items-start justify-center pr-10 sm:justify-start sm:p-5 sm:pb-5 sm:order-2 sm:items-stretch sm:max-w-full">
        <>
          <div className="flex text-two-half text-white leading-48px font-medium sm:text-2xl">
            <div className="relative text-two-half leading-48px text-white sm:text-2xl">
              <span className="flex items-center notranslate">
                Forsage <span className="inline-flex text-cyan notranslate">&thinsp; xQore</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-stretch sm:flex-1">
            <CheckStatuses
              className="flex-1 mt-10"
              statuses={statuses}
              checkTitles={checkTitles}
              program={PROGRAM_NAMES.XQORE}
              statusMeta={statusMeta}
            />
            <div className="flex space-x-2.5">
              <Button
                onClick={onClickButton}
                type={isSuccessAll ? 'primary' : 'black'}
                className="p-0 font-bold !px-10 mt-10 py-5 mb-4 sm:py-3 sm:w-full"
                disabled={isLoadingAny}
              >
                {isLoadingAny ? 'Checking...' : isSuccessAll ? 'Activate xQore' : 'Check again'}
              </Button>
            </div>
          </div>
        </>
      </div>
      <XqoreInfoCard statInfo={statInfo} />
    </>
  );
};

export { XqoreRegistration };
