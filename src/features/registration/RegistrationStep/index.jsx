import React, { useEffect, useState } from 'react';
import { PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';
import { useBnbPriceByAmount } from 'helpers/hooks/useBnbPriceByAmount';
import { useWeb3React } from '@web3-react/core';
import { useRegistration } from 'helpers/hooks/useRegistration';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/format';
import { parseCookies } from 'nookies';
import { ActivationStep } from './ActivationStep';
import { StateRegistrationStep } from './StateRegistrationStep';
import { useCallTransaction } from 'helpers/hooks/useCallTransaction';

export const TRANSACTIONS_TYPES = {
  BUSD: 'busd',
  BNB: 'bnb',
};

export const RegistrationStep = ({ onNextStep, XqoreStatisticsInfo, isCompletedXqore, XXXStatisticsInfo }) => {
  const { account } = useWeb3React();
  const { registration, registrationBNB } = useRegistration();

  const [uplineInfo, setUplineInfo] = useState({
    value: parseCookies()?.upline_binance || '1',
    error: false,
  });

  const { onCallTransaction, transactionInfo } = useCallTransaction();

  const [currentTransactionType, setCurrentTransactionType] = useState(null);

  const regPrice = PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1];

  const { getBnbPriceByAmount, bnbPrice } = useBnbPriceByAmount();

  const onClickActivate = async () => {
    try {
      const result = await registration(PROGRAM_NAMES.X3, parseInt(uplineInfo.value));

      onCallTransaction(result);
    } catch (e) {
      callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
    }
  };

  const onClickActivateBnb = async () => {
    try {
      const result = await registrationBNB(parseInt(uplineInfo.value));

      onCallTransaction(result);
    } catch (e) {
      callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
    }
  };

  const onActivate = (type = TRANSACTIONS_TYPES.BUSD) => {
    setCurrentTransactionType(type);

    if (type === TRANSACTIONS_TYPES.BNB) {
      return onClickActivateBnb();
    }

    return onClickActivate();
  };

  useEffect(() => {
    if (account) {
      getBnbPriceByAmount(regPrice);
    }
  }, [account]);

  if (transactionInfo.isWaiting || transactionInfo.isSuccess || transactionInfo.isError) {
    return (
      <StateRegistrationStep
        onTryAgain={() => onActivate(currentTransactionType)}
        handleNextStep={onNextStep}
        isCompletedXqore={isCompletedXqore}
        statInfo={isCompletedXqore ? XqoreStatisticsInfo : XXXStatisticsInfo}
        {...transactionInfo}
      />
    );
  }

  return (
    <ActivationStep
      uplineInfo={uplineInfo}
      setUplineInfo={setUplineInfo}
      bnbPrice={bnbPrice}
      onRefreshPrice={() => getBnbPriceByAmount(regPrice)}
      onActivate={onActivate}
    />
  );
};
