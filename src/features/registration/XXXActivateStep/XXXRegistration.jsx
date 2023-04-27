import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { checkApprove, checkBalance, checkNetwork } from 'helpers/checks';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { BNB_COMMISSIONS, EVENT_NAMES, PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';
import { Button } from 'components';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import InformationIcon from 'assets/icons/information_circle.svg';
import { XXXInfoCard } from 'features/registration/XXXInfoCard';
import { useApproveWithChecks } from 'helpers/hooks/useApproveWithChecks';
import { useBalance } from 'helpers/hooks/useBalance';
import { checkBalanceWithBnbLevel } from 'helpers/checks';
import { useComponentDidUpdate } from 'helpers/hooks/useComponentDidUpdate';
import { CheckStatuses } from 'features/registration/CheckStatuses';
import { useSwapBnbToBusd } from 'helpers/hooks/useSwapBnbToBusd';
import { sendEvent } from 'helpers/sendEvent';

const getChecksCallbacks = (web3Props, getContract) => {
  const contractType = PROGRAM_NAMES.XXX;
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
          name: PROGRAM_NAMES.XXX,
          ...funcProps,
          busdMinPrice: PROGRAM_PRICES[contractType]['1'],
          bnbMinPrice: BNB_COMMISSIONS[PROGRAM_NAMES.XXX],
        },
      },
      {
        func: checkApprove,
        key: 'checkApprove',
        funcProps: { ...funcProps, name: contractType, price: PROGRAM_PRICES[PROGRAM_NAMES.XXX][1] },
      },
    ],
  };
};

const XXXRegistration = ({ statInfo, bnbPrice, onActivate }) => {
  const web3Props = useWeb3React();
  const { active, account, chainId } = web3Props;
  const { getContract } = useGetContract();
  const { onSwapBnbToBusd, isLoadingSwap, isWaitingSwap } = useSwapBnbToBusd();

  const { statuses, callChecks, statusMeta, approveInfo, callApprove } = useApproveWithChecks(
    getChecksCallbacks(web3Props, getContract),
  );

  const { fetchBalance, balanceBusd, balanceBnb } = useBalance();

  const isSuccessAll = Object.values(statuses).every((status) => status === STATUSES_ENUM.SUCCESS);
  const isLoadingAny = Object.values(statuses).some((status) => status === STATUSES_ENUM.WAIT);
  const isAnyToShowSwap =
    (isSuccessAll || statuses.checkApprove === STATUSES_ENUM.ERROR || approveInfo.isCallApprove) &&
    balanceBusd < PROGRAM_PRICES[PROGRAM_NAMES.XXX][1];

  const onClickButton = async () => {
    if (!isSuccessAll) {
      return callChecks();
    }

    onActivate();
  };

  useEffect(() => {
    callChecks();
  }, [active, account, chainId]);

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
      success: `${PROGRAM_PRICES[PROGRAM_NAMES.XXX][1]} BUSD or ${bnbPrice} BNB`,
      error: `${PROGRAM_PRICES[PROGRAM_NAMES.XXX][1]} BUSD or ${bnbPrice} BNB`,
    },
    checkApprove: {
      title: 'Approve BUSD',
      success: 'done',
      error: 'required',
    },
  };

  const onClickSwapBnbToBusd = async () => {
    await onSwapBnbToBusd(PROGRAM_PRICES[PROGRAM_NAMES.XXX][1]);
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

  const onClickApproveBusd = () => {
    sendEvent({ type: EVENT_NAMES.APPROVE_BUSD_XXX, value: '<8>', currency: '<USD>' });
    callApprove();
  };

  return (
    <>
      <div className="max-w-desktop-reg-gold-status flex flex-1 flex-col items-start justify-center pr-10 sm:justify-start sm:p-5 sm:pb-5 sm:order-2 sm:items-stretch sm:max-w-full">
        <>
          <div className="flex text-two-half text-white leading-48px font-medium sm:text-2xl">
            <div className="flex items-center notranslate">
              Forsage <span className="inline-flex text-dark-pink ml-3">&thinsp; xXx</span>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-stretch sm:flex-1">
            <CheckStatuses
              className="flex-1 mt-10"
              statuses={statuses}
              checkTitles={checkTitles}
              statusMeta={statusMeta}
              program={PROGRAM_NAMES.XXX}
            />
            <div className="flex space-x-2.5">
              {statuses.checkApprove === STATUSES_ENUM.ERROR || approveInfo.isCallApprove ? (
                <div className="flex space-x-2.5">
                  <Button
                    type="primary"
                    className="p-0 font-bold !px-10 mt-10 py-5 mb-4 sm:py-3"
                    onClick={onClickApproveBusd}
                    disabled={isLoadingAny || approveInfo.isCallApprove}
                  >
                    {approveInfo.isCallApprove ? 'Approving BUSD...' : 'Approve BUSD'}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={onClickButton}
                  type={isSuccessAll ? 'pink' : 'black'}
                  className="p-0 font-bold !px-10 mt-10 py-5 mb-4 sm:py-3"
                  disabled={isLoadingAny || (isSuccessAll && balanceBusd < PROGRAM_PRICES[PROGRAM_NAMES.XXX][1])}
                >
                  {isLoadingAny ? 'Checking...' : isSuccessAll ? 'Activate xXx' : 'Check again'}
                </Button>
              )}
              {isAnyToShowSwap && (
                <Button
                  type="orange"
                  className="p-0 font-bold !px-5 mt-10 py-2.5 mb-4 sm:py-3"
                  onClick={onClickSwapBnbToBusd}
                  disabled={isLoadingSwap || isWaitingSwap}
                >
                  {isLoadingSwap || isWaitingSwap
                    ? 'Swapping...'
                    : `Swap ${bnbPrice} BNB to ${PROGRAM_PRICES[PROGRAM_NAMES.XXX][1]} BUSD`}
                </Button>
              )}
            </div>
            <Button type="light-white" className="hidden sm:flex">
              <InformationIcon className="w-4 h-4 mr-2.5" /> Information
            </Button>
          </div>
        </>
      </div>
      <XXXInfoCard statInfo={statInfo} />
    </>
  );
};

export { XXXRegistration };
