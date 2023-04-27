import React, { useEffect } from 'react';
import { GoldRegistration } from './GoldRegistration';
import { useBnbPriceByAmount } from 'helpers/hooks/useBnbPriceByAmount';
import { useWeb3React } from '@web3-react/core';
import { PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/format';
import { StateRegistrationStep } from 'features/registration/GoldActivateStep/StateRegistrationStep';
import { useCallTransaction } from 'helpers/hooks/useCallTransaction';
import { useRegistration } from 'helpers/hooks/useRegistration';

export const GoldActivateStep = ({ XGoldStatisticsInfo }) => {
  const { account } = useWeb3React();
  const { registration } = useRegistration();

  const { getBnbPriceByAmount, bnbPrice } = useBnbPriceByAmount();
  const { transactionInfo, onCallTransaction } = useCallTransaction();

  useEffect(() => {
    if (account) {
      getBnbPriceByAmount(PROGRAM_PRICES[PROGRAM_NAMES.XGOLD][1]);
    }
  }, [account]);

  const onActivate = async () => {
    try {
      const result = await registration(PROGRAM_NAMES.XGOLD);

      onCallTransaction(result);
    } catch (e) {
      callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
    }
  };

  if (transactionInfo.isWaiting || transactionInfo.isError || transactionInfo.isSuccess) {
    return <StateRegistrationStep onTryAgain={onActivate} statInfo={{ ...XGoldStatisticsInfo }} {...transactionInfo} />;
  }

  return <GoldRegistration onActivate={onActivate} bnbPrice={bnbPrice} statInfo={{ ...XGoldStatisticsInfo }} />;
};
