import React, { useEffect, useMemo } from 'react';
import { PROGRAMS_STYLES } from 'helpers/program';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import { Button } from 'components';
import { useWeb3React } from '@web3-react/core';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { checkApprove, checkBalanceWithBnbLevel, checkNetwork } from 'helpers/checks';
import {
  BNB_COMMISSIONS,
  SERVICE_FEE,
  BASE_BNB_EXCHANGE_PERCENT,
  PROGRAM_PRICES,
  PROGRAM_NAMES,
  EVENT_NAMES,
  SERVICE_FEE_XQORE,
} from 'helpers/constants';
import { useApproveWithChecks } from 'helpers/hooks/useApproveWithChecks';
import { useBalance } from 'helpers/hooks/useBalance';
import { useComponentDidUpdate } from 'helpers/hooks/useComponentDidUpdate';
import { useBnbPriceByAmount } from 'helpers/hooks/useBnbPriceByAmount';
import { useSwapBnbToBusd } from 'helpers/hooks/useSwapBnbToBusd';
import { TRANSACTIONS_TYPES } from 'features/registration/RegistrationStep';
import { sendEvent } from 'helpers/sendEvent';
import { Checkers } from 'components/modals/BuyProgramModal/BuyProgramStep/Checkers';
import { PriceWithFees } from 'components/modals/BuyProgramModal/BuyProgramStep/PriceWithFees';
import { MainInformation } from 'components/modals/BuyProgramModal/BuyProgramStep/MainInformation';

const getChecksCallbacks = (web3Props, getContract, name, level, price) => {
  const contractType = name;
  const isFirstLevel = Number(level) === 1;
  const funcProps = { getContract, ...web3Props, contractType };

  const balanceProps = {
    func: checkBalanceWithBnbLevel,
    funcProps: {
      ...funcProps,
      level,
      name,
      busdMinPrice: isFirstLevel ? PROGRAM_PRICES[name][level] : PROGRAM_PRICES[name][level] + SERVICE_FEE,
      bnbMinPrice: BNB_COMMISSIONS[name],
    },
  };

  const callbacks = [
    {
      func: checkNetwork,
      key: 'checkNetwork',
      funcProps,
    },
    {
      key: 'checkBalance',
      ...balanceProps,
    },
  ];

  if (name !== PROGRAM_NAMES.XQORE) {
    callbacks.push({
      func: checkApprove,
      key: 'checkApprove',
      funcProps: { ...funcProps, name: isFirstLevel ? name : 'router', price },
    });
  }

  return {
    name: isFirstLevel ? name : 'router',
    getContract,
    callbacks,
  };
};

export const BuyProgramStep = ({ name, level, onClickActivate }) => {
  const { balanceBnb, balanceBusd, fetchBalance } = useBalance();
  const web3Props = useWeb3React();
  const { account, active, chainId } = web3Props;
  const { getContract } = useGetContract();
  const { onSwapBnbToBusd, isLoadingAnySwap } = useSwapBnbToBusd();
  const { getBnbPriceByAmount, bnbPrice, bnbPriceBase } = useBnbPriceByAmount();

  const isXqore = name === PROGRAM_NAMES.XQORE;
  const currency = isXqore ? 'BNB' : 'BUSD';
  const isFirstLevel = Number(level) === 1;
  const activateTitle = isFirstLevel ? 'Activate' : 'Upgrade';
  const isFirstXxxOrXGold = (name === PROGRAM_NAMES.XXX || name === PROGRAM_NAMES.XGOLD) && isFirstLevel;
  const bgBlurClass = PROGRAMS_STYLES[name]?.blurBgColor;

  const priceWithServiceFee = useMemo(() => {
    if (isFirstLevel) {
      return PROGRAM_PRICES[name][level];
    } else {
      return PROGRAM_PRICES[name][level] + isXqore ? SERVICE_FEE_XQORE : SERVICE_FEE;
    }
  }, [isFirstLevel, SERVICE_FEE, level, name]);

  const { statuses, callChecks, approveInfo, callApprove } = useApproveWithChecks(
    getChecksCallbacks(web3Props, getContract, name, level, priceWithServiceFee),
  );

  const isSuccessAll = Object.values(statuses).every((status) => status === STATUSES_ENUM.SUCCESS);
  const isLoadingAny = Object.values(statuses).some((status) => status === STATUSES_ENUM.WAIT);
  const isAnyError = Object.values(statuses).some((status) => status === STATUSES_ENUM.ERROR);
  const swapBnbAllow = isFirstXxxOrXGold && balanceBusd < priceWithServiceFee;
  const isErrorApproveOrIsCalling = statuses.checkApprove === STATUSES_ENUM.ERROR || approveInfo.isCallApprove;

  useEffect(() => {
    callChecks();
  }, [active, account, chainId, priceWithServiceFee]);

  useEffect(() => {
    getBnbPriceByAmount(priceWithServiceFee, BASE_BNB_EXCHANGE_PERCENT, PROGRAM_PRICES[name][level]);
  }, [priceWithServiceFee]);

  const onClickSwapBnbToBusd = async () => {
    await onSwapBnbToBusd(priceWithServiceFee);
    await callChecks();
  };

  const onClickApproveBusd = () => {
    sendEvent({ type: EVENT_NAMES.BUY_PROGRAM_STEP_APPROVE_BUSD[name] });
    callApprove();
  };

  const onUpgrade = (type) => () => {
    sendEvent({ type: EVENT_NAMES.BUY_PROGRAM_STEP_UPGRADE_EVENT[name] });

    if (isSuccessAll || (type === TRANSACTIONS_TYPES.BNB && !isFirstXxxOrXGold)) {
      onClickActivate(type);
    } else if (isAnyError) {
      callChecks();
    }
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

  useEffect(() => {
    fetchBalance();
  }, []);

  const renderApproveActions = useMemo(() => {
    return (
      <>
        <Button
          type="primary"
          className={`rounded-mini ${
            swapBnbAllow || !isFirstXxxOrXGold ? 'max-w-190px min-w-190px sm:max-w-full' : 'w-full'
          } max-h-42px text-15px px-8px`}
          onClick={onClickApproveBusd}
          disabled={isLoadingAny || approveInfo.isCallApprove}
        >
          {approveInfo.isCallApprove ? 'Approving BUSD...' : 'Approve BUSD'}
        </Button>
        {swapBnbAllow ? (
          <Button
            type="orange"
            className="sm:max-w-full rounded-mini max-w-190px min-w-190px max-h-42px text-15px px-8px leading-4"
            onClick={onClickSwapBnbToBusd}
            disabled={isLoadingAnySwap}
          >
            {isLoadingAnySwap ? 'Swapping...' : `swap ${bnbPrice} BNB to ${priceWithServiceFee} BUSD`}
          </Button>
        ) : (
          !isFirstXxxOrXGold && (
            <Button
              type="orange"
              className="sm:max-w-full rounded-mini max-w-190px min-w-190px max-h-42px text-15px px-8px leading-4"
              onClick={onUpgrade(TRANSACTIONS_TYPES.BNB)}
              disabled={isLoadingAny || !bnbPrice}
            >
              {bnbPrice ? activateTitle + ' ' + bnbPrice + ' ' + 'BNB' : 'Loading...'}
            </Button>
          )
        )}
      </>
    );
  }, [swapBnbAllow, isLoadingAny, isLoadingAnySwap, bnbPrice, priceWithServiceFee, approveInfo]);

  const renderActionButton = useMemo(() => {
    const isAllowPrice = isXqore
      ? parseFloat(balanceBnb) < parseFloat(priceWithServiceFee)
      : parseFloat(balanceBusd) < parseFloat(priceWithServiceFee);
    return (
      <>
        <Button
          type="primary"
          className={`sm:max-w-full rounded-mini w-full max-h-42px text-15px px-8px leading-[18px] ${
            isLoadingAny ? 'ml-auto mr-auto' : ''
          }`}
          onClick={onUpgrade(isXqore ? TRANSACTIONS_TYPES.BNB : TRANSACTIONS_TYPES.BUSD)}
          disabled={isLoadingAny || (isSuccessAll && isAllowPrice)}
        >
          {isLoadingAny ? (
            'Checking...'
          ) : isSuccessAll ? (
            <div className="flex justify-center items-center flex-wrap">
              <span>{activateTitle} for </span>&nbsp;
              <span>
                {priceWithServiceFee}&nbsp;{currency}
              </span>
            </div>
          ) : (
            'Check again'
          )}
        </Button>
        {isSuccessAll &&
          (swapBnbAllow ? (
            <Button
              type="orange"
              className="sm:max-w-full rounded-mini max-w-190px min-w-190px max-h-42px text-15px px-8px leading-[18px]"
              onClick={onClickSwapBnbToBusd}
              disabled={isLoadingAnySwap}
            >
              {isLoadingAnySwap ? 'Swapping...' : `swap ${bnbPrice} BNB to ${priceWithServiceFee} BUSD`}
            </Button>
          ) : (
            !isFirstXxxOrXGold &&
            !isXqore && (
              <Button
                type="orange"
                className="sm:max-w-full rounded-mini max-w-190px min-w-190px max-h-42px text-15px px-8px leading-4"
                onClick={onUpgrade(TRANSACTIONS_TYPES.BNB)}
                disabled={isLoadingAny || !bnbPrice}
              >
                {bnbPrice ? activateTitle + ' ' + bnbPrice + ' ' + 'BNB' : 'Loading...'}
              </Button>
            )
          ))}
      </>
    );
  }, [isLoadingAny, isSuccessAll, activateTitle, approveInfo, isLoadingAnySwap, balanceBusd, balanceBnb]);

  return (
    <div className="flex z-10 relative flex-col justify-center w-full bg-black-light rounded sm:rounded-none sm:w-full sm:h-full ">
      <div className={`absolute top-0 rigth-0 w-full h-full overflow-hidden rounded sm:rounded-none z-0`}>
        <div
          className={`absolute right-0 -top-36 w-80 h-80 blur-3xl ${bgBlurClass} sm:left-1/2 sm:-translate-x-1/2 sm:w-64 sm:h-64`}
        />
      </div>
      <div className="overflow-visible z-10 flex-1 sm:overflow-auto">
        <MainInformation level={level} name={name} title={activateTitle} />
        <PriceWithFees
          currency={currency}
          title={activateTitle}
          basePrice={bnbPriceBase}
          isFirstLevel={isFirstLevel}
          price={PROGRAM_PRICES[name][level]}
          isFirstXxxOrXGold={isFirstXxxOrXGold}
          name={name}
        />
        <Checkers
          statuses={statuses}
          bnbPrice={bnbPrice}
          price={priceWithServiceFee}
          isFirstXxxOrXGold={isFirstXxxOrXGold}
          name={name}
        />
      </div>
      <div className="w-full flex p-10 pt-5 z-10 sm:p-5 sm:flex-col sm:space-y-2.5 sm:space-x-0 justify-between space-x-2.5">
        {isErrorApproveOrIsCalling && !isXqore ? renderApproveActions : renderActionButton}
      </div>
    </div>
  );
};
