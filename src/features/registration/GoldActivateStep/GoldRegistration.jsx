import React, { useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { checkApprove, checkBalance, checkNetwork } from 'helpers/checks';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { BNB_COMMISSIONS, PROGRAM_NAMES, PROGRAM_PRICES, EVENT_NAMES } from 'helpers/constants';
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
import { useSwapBnbToBusd } from 'helpers/hooks/useSwapBnbToBusd';
import { sendEvent } from 'helpers/sendEvent';

const getChecksCallbacks = (web3Props, getContract) => {
  const contractType = PROGRAM_NAMES.XGOLD;
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
          name: PROGRAM_NAMES.XGOLD,
          ...funcProps,
          busdMinPrice: PROGRAM_PRICES[contractType]['1'],
          bnbMinPrice: BNB_COMMISSIONS[PROGRAM_NAMES.XGOLD],
        },
      },
      {
        func: checkApprove,
        key: 'checkApprove',
        funcProps: { ...funcProps, name: contractType, price: PROGRAM_PRICES[PROGRAM_NAMES.XGOLD][1] },
      },
    ],
  };
};

const GoldRegistration = ({ statInfo, bnbPrice, onActivate }) => {
  const web3Props = useWeb3React();
  const { active, account, chainId } = web3Props;
  const { getContract } = useGetContract();
  const { statuses, callChecks, statusMeta, approveInfo, callApprove } = useApproveWithChecks(
    getChecksCallbacks(web3Props, getContract),
  );

  const { onSwapBnbToBusd, isLoadingSwap, isWaitingSwap } = useSwapBnbToBusd();

  const { fetchBalance, balanceBusd, balanceBnb } = useBalance();
  const { openSupport } = useOpenSupport();

  const isSuccessAll = Object.values(statuses).every((status) => status === STATUSES_ENUM.SUCCESS);
  const isLoadingAny = Object.values(statuses).some((status) => status === STATUSES_ENUM.WAIT);
  const isAnyToSwap =
    (isSuccessAll || statuses.checkApprove === STATUSES_ENUM.ERROR || approveInfo.isCallApprove) &&
    balanceBusd < PROGRAM_PRICES[PROGRAM_NAMES.XGOLD][1];

  useEffect(() => {
    approveInfo.isApproved && fetchBalance();
  }, [approveInfo.isApproved]);

  const checkTitles = {
    checkNetwork: {
      title: 'Network',
      success: 'Smart chain',
      error: 'wrong network',
    },
    checkBalance: {
      title: 'Balance',
      success: `${PROGRAM_PRICES[PROGRAM_NAMES.XGOLD][1]} BUSD or ${bnbPrice} BNB`,
      error: `${PROGRAM_PRICES[PROGRAM_NAMES.XGOLD][1]} BUSD or ${bnbPrice} BNB`,
    },
    checkApprove: {
      title: 'Approve BUSD',
      success: 'done',
      error: 'required',
    },
  };

  const onClickSwapBnbToBusd = async () => {
    await onSwapBnbToBusd(PROGRAM_PRICES[PROGRAM_NAMES.XGOLD][1]);
    await callChecks();
  };

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
              program={PROGRAM_NAMES.XGOLD}
              statusMeta={statusMeta}
            />
          ) : (
            Object.keys(statuses).map((key) => (
              <CheckInfo
                key={key}
                status={statuses[key]}
                infoKey={key}
                program={PROGRAM_NAMES.XGOLD}
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
  }, [statuses, isSuccessAll, statInfo]);

  useEffect(() => {
    callChecks();
  }, [active, account, chainId]);

  return (
    <>
      <div className="max-w-desktop-reg-gold-status flex flex-1 flex-col items-start justify-center pr-10 sm:justify-start sm:p-5 sm:pb-5 sm:order-2 sm:items-stretch sm:max-w-full">
        <>
          <div className="flex text-two-half text-white leading-48px font-medium sm:text-2xl">
            <div className="relative text-two-half leading-48px text-white sm:text-2xl">
              <span className="flex items-center notranslate">
                Forsage <span className="inline-flex text-gold notranslate">&thinsp; xGold</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-stretch sm:flex-1">
            <CheckStatuses
              className="flex-1 mt-10"
              statuses={statuses}
              checkTitles={checkTitles}
              program={PROGRAM_NAMES.XGOLD}
              statusMeta={statusMeta}
            />
            <div className="flex space-x-2.5">
              {statuses.checkApprove === STATUSES_ENUM.ERROR || approveInfo.isCallApprove ? (
                <Button
                  type="primary"
                  className="p-0 font-bold !px-10 mt-10 py-5 mb-4 sm:py-3"
                  onClick={() => {
                    sendEvent({ type: EVENT_NAMES.APPROVE_BUSD_XGOLD, value: '<10>', currency: '<USD>' });
                    callApprove();
                  }}
                  disabled={isLoadingAny || approveInfo.isCallApprove}
                >
                  {approveInfo.isCallApprove ? 'Approving BUSD...' : 'Approve BUSD'}
                </Button>
              ) : (
                <Button
                  onClick={onClickButton}
                  type={isSuccessAll ? 'orange' : 'black'}
                  className="p-0 font-bold !px-10 mt-10 py-5 mb-4 sm:py-3"
                  disabled={isLoadingAny}
                >
                  {isLoadingAny ? 'Checking...' : isSuccessAll ? 'Activate xGold' : 'Check again'}
                </Button>
              )}
              {isAnyToSwap && (
                <Button
                  type="orange"
                  className="p-0 font-bold !px-5 mt-10 py-2.5 mb-4 sm:py-3"
                  onClick={onClickSwapBnbToBusd}
                  disabled={isLoadingSwap || isWaitingSwap}
                >
                  {isLoadingSwap || isWaitingSwap
                    ? 'Swapping...'
                    : `Swap ${bnbPrice} BNB to ${PROGRAM_PRICES[PROGRAM_NAMES.XGOLD][1]} BUSD`}
                </Button>
              )}
            </div>
            <Button type="light-white" className="hidden sm:flex">
              <InformationIcon className="w-4 h-4 mr-2.5" /> Information
            </Button>
          </div>
        </>
      </div>
      {renderBodyRight}
    </>
  );
};

export { GoldRegistration };
