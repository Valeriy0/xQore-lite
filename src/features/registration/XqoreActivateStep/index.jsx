import React, { useEffect } from 'react';
import { XqoreRegistration } from './XqoreRegistration';
import { useBnbPriceByAmount } from 'helpers/hooks/useBnbPriceByAmount';
import { useWeb3React } from '@web3-react/core';
import { PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/format';
import { StateRegistrationStep } from 'features/registration/XqoreActivateStep/StateRegistrationStep';
import { useCallTransaction } from 'helpers/hooks/useCallTransaction';
import { useRegistration } from 'helpers/hooks/useRegistration';

export const XqoreActivateStep = ({ XXXStatisticsInfo, XqoreStatisticsInfo, onNextStep }) => {
  const { account } = useWeb3React();
  const { registration } = useRegistration();

  const { transactionInfo, onCallTransaction } = useCallTransaction();

  const onActivate = async () => {
    try {
      const result = await registration(PROGRAM_NAMES.XQORE);

      onCallTransaction(result);
    } catch (e) {
      callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
    }
  };

  if (transactionInfo.isWaiting || transactionInfo.isError || transactionInfo.isSuccess) {
    return (
      <StateRegistrationStep
        onTryAgain={onActivate}
        handleNextStep={onNextStep}
        statInfo={{ ...XXXStatisticsInfo }}
        {...transactionInfo}
      />
    );
  }

  return <XqoreRegistration statInfo={{ ...XqoreStatisticsInfo }} onActivate={onActivate} />;
};
