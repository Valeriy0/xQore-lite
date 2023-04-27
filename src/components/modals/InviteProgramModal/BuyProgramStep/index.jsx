import React, { useEffect, useMemo, useState } from 'react';
import { PROGRAMS_STYLES } from 'helpers/program';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import { Button } from 'components';
import { useWeb3React } from '@web3-react/core';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { checkBalanceInvitexQore, checkNetwork } from 'helpers/checks';
import { PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';
import { useApproveWithChecks } from 'helpers/hooks/useApproveWithChecks';
import { useBalance } from 'helpers/hooks/useBalance';
import { useComponentDidUpdate } from 'helpers/hooks/useComponentDidUpdate';
import { useBnbPriceByAmount } from 'helpers/hooks/useBnbPriceByAmount';
import { Checkers } from 'components/modals/InviteProgramModal/BuyProgramStep/Checkers';

const getChecksCallbacks = (web3Props, getContract, name, level, price) => {
  const contractType = name;
  const funcProps = { getContract, ...web3Props, contractType };

  const balanceProps = {
    func: checkBalanceInvitexQore,
    funcProps: {
      ...funcProps,
      price,
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
  //
  // if (name !== PROGRAM_NAMES.XQORE) {
  //   callbacks.push({
  //     func: checkApprove,
  //     key: 'checkApprove',
  //     funcProps: { ...funcProps, name: name, price },
  //   });
  // }

  return {
    name: name,
    getContract,
    callbacks,
  };
};

export const BuyProgramStep = ({ name, level = 1, onActivate }) => {
  const { balanceBnb, fetchBalance } = useBalance();
  const [price, setPrice] = useState(0);
  const web3Props = useWeb3React();
  const { account, active, chainId } = web3Props;
  const { getContract } = useGetContract();
  const { getBnbPriceByAmount } = useBnbPriceByAmount();

  const getPriceForX3X4Xqore = async () => {
    const priceReg = await getBnbPriceByAmount(
      PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1],
    );

    return parseFloat(Number(priceReg) + PROGRAM_PRICES[PROGRAM_NAMES.XQORE][1]);
  };

  const isXqore = name === PROGRAM_NAMES.XQORE;

  useEffect(async () => {
    if (isXqore) return setPrice(PROGRAM_PRICES[name][level]);
    const result = await getPriceForX3X4Xqore();
    setPrice(result);
  }, [name, level]);

  const { statuses, callChecks } = useApproveWithChecks(getChecksCallbacks(web3Props, getContract, name, level, price));

  const isSuccessAll = Object.values(statuses).every((status) => status === STATUSES_ENUM.SUCCESS);
  const isLoadingAny = Object.values(statuses).some((status) => status === STATUSES_ENUM.WAIT);
  const isAnyError = Object.values(statuses).some((status) => status === STATUSES_ENUM.ERROR);

  useEffect(() => {
    callChecks();
  }, [active, account, chainId, price]);

  const onClickActivate = () => {
    if (isSuccessAll) {
      onActivate();
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

  const renderActionButton = useMemo(() => {
    const isAllowPrice = parseFloat(balanceBnb) < parseFloat(price);
    return (
      <>
        <Button
          type="primary"
          className={`sm:max-w-full rounded-mini w-full max-h-42px text-15px px-8px leading-[18px] ${
            isLoadingAny ? 'ml-auto mr-auto' : ''
          }`}
          onClick={onClickActivate}
          disabled={isLoadingAny || (isSuccessAll && isAllowPrice)}
        >
          {isLoadingAny ? (
            'Checking...'
          ) : isSuccessAll ? (
            <div className="flex justify-center items-center flex-wrap">
              <span>Activate for </span>&nbsp;
              <span>
                {price}&nbsp;{'BNB'}
              </span>
            </div>
          ) : (
            'Check again'
          )}
        </Button>
      </>
    );
  }, [isLoadingAny, isSuccessAll, balanceBnb]);

  return (
    <div className="flex z-10 relative flex-col justify-center w-full bg-black-light rounded sm:rounded-none sm:w-full sm:h-full ">
      <div className={`absolute top-0 rigth-0 w-full h-full overflow-hidden rounded sm:rounded-none z-0`}>
        <div
          className={`absolute right-0 -top-36 w-80 h-80 blur-3xl ${
            PROGRAMS_STYLES[PROGRAM_NAMES.XQORE]?.blurBgColor
          } sm:left-1/2 sm:-translate-x-1/2 sm:w-64 sm:h-64`}
        />
      </div>
      <div className="overflow-visible z-10 flex-1 sm:overflow-auto">
        <div className="pt-10 sm:pt-0 flex z-10 justify-between items-center px-10 pb-0 w-full sm:items-start sm:px-5 pb-2.5 sm:mt-10">
          <div className="flex flex-col ml-auto mr-auto items-start justify-start text-3xl text-white font-medium text-left sm:text-2xl">
            <span>Registration {isXqore ? 'xQore' : ''}</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <img
            className={`py-5 ${isXqore ? 'h-[200px]' : 'w-[85%]'}`}
            src={isXqore ? '/xQore.png' : '/xBase+xQore.png'}
            alt=""
          />
        </div>
        <div className="w-full flex flex-col items-center border border-l-0 border-r-0 border-white-100  px-10 py-5 sm:px-5 space-y-1">
          <div className="w-full flex items-center justify-between">
            <span className="text-cyan-100 font-medium text-base sm:text-sm">Activation amount</span>
            <span className="text-cyan-100 font-bold text-base flex notranslate sm:text-sm">
              {price} {'BNB'} {/*todo NEED FIX PRICES*/}
            </span>
          </div>
        </div>
        <Checkers statuses={statuses} price={price} />
      </div>
      <div className="w-full flex p-10 pt-5 z-10 sm:p-5 sm:flex-col sm:space-y-2.5 sm:space-x-0 justify-between space-x-2.5">
        {renderActionButton}
      </div>
    </div>
  );
};
