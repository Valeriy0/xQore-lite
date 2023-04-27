import React, { useMemo, useState } from 'react';
import { Modal } from 'components';
import { BuyProgramStep } from './BuyProgramStep';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/format';
import { useUpgradeProgram } from 'helpers/hooks/useUpgradeProgram';
import { useCallTransaction } from 'helpers/hooks/useCallTransaction';
import { FinalProgramStep } from 'components/modals/BuyProgramModal/FinalProgramStep';
import { useRegistration } from 'helpers/hooks/useRegistration';
import { PROGRAM_NAMES } from 'helpers/constants';

export const TRANSACTIONS_TYPES = {
  BUSD: 'busd',
  BNB: 'bnb',
};

export const BuyProgramModal = ({ onClose, name, openedModal, level, withDisableClose = false }) => {
  const { registration } = useRegistration();
  const { onBUSDUpgrade, onBNBUpgrade } = useUpgradeProgram();
  const { onCallTransaction, transactionInfo } = useCallTransaction();

  const [currentTransactionType, setCurrentTransactionType] = useState(null);
  const isFirstLevel = Number(level) === 1;

  const onActivateBUSD = async () => {
    try {
      const result = isFirstLevel ? await registration(name, level) : await onBUSDUpgrade(level, name);

      onCallTransaction(result);
    } catch (e) {
      callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
    }
  };

  const onActivateBNB = async () => {
    try {
      const result = isFirstLevel ? await registration(PROGRAM_NAMES.XQORE) : await onBNBUpgrade(level, name);

      onCallTransaction(result);
    } catch (e) {
      callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
    }
  };

  const onClickActivate = (type = TRANSACTIONS_TYPES.BUSD) => {
    setCurrentTransactionType(type);

    if (type === TRANSACTIONS_TYPES.BUSD) {
      return onActivateBUSD();
    }

    return onActivateBNB();
  };

  const renderStep = useMemo(() => {
    if (transactionInfo.isSuccess || transactionInfo.isWaiting || transactionInfo.isError) {
      return (
        <FinalProgramStep
          level={level}
          name={name}
          {...transactionInfo}
          closeModal={onClose}
          onTryAgain={() => onClickActivate(currentTransactionType)}
        />
      );
    }

    return <BuyProgramStep name={name} level={level} onClickActivate={onClickActivate} />;
  }, [transactionInfo, currentTransactionType]);

  return (
    <Modal isOpened={openedModal} onClose={onClose} isDisableOnClose={withDisableClose && step === 1}>
      {renderStep}
    </Modal>
  );
};
