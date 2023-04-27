import React, { useEffect, useState } from 'react';
import { XXXRegistration } from './XXXRegistration';
import { useBnbPriceByAmount } from 'helpers/hooks/useBnbPriceByAmount';
import { useWeb3React } from '@web3-react/core';
import { PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/format';
import { StateRegistrationStep } from 'features/registration/XXXActivateStep/StateRegistrationStep';
import { useCallTransaction } from 'helpers/hooks/useCallTransaction';
import { useRegistration } from 'helpers/hooks/useRegistration';

export const XXXActivateStep = ({ onNextStep, XXXStatisticsInfo, XGoldStatisticsInfo }) => {
  const { account } = useWeb3React();

  const { registration } = useRegistration();
  const { getBnbPriceByAmount, bnbPrice } = useBnbPriceByAmount();
  const { transactionInfo, onCallTransaction } = useCallTransaction();

  const onActivate = async () => {
    try {
      const result = await registration(PROGRAM_NAMES.XXX);

      onCallTransaction(result);
    } catch (e) {
      callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
    }
  };

  useEffect(() => {
    if (account) {
      getBnbPriceByAmount(PROGRAM_PRICES[PROGRAM_NAMES.XXX][1]);
    }
  }, [account]);

  if (transactionInfo.isWaiting || transactionInfo.isError || transactionInfo.isSuccess) {
    return (
      <StateRegistrationStep
        onTryAgain={onActivate}
        handleNextStep={onNextStep}
        statInfo={{ ...XGoldStatisticsInfo }}
        {...transactionInfo}
      />
    );
  }

  return (
    <XXXRegistration
      statInfo={{ ...XXXStatisticsInfo }}
      onNextStep={onNextStep}
      bnbPrice={bnbPrice}
      onActivate={onActivate}
    />
  );
};
