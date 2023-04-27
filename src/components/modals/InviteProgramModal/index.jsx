import React, { useMemo, useState } from 'react';
import { Modal } from 'components';
import { BuyProgramStep } from './BuyProgramStep';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/format';
import { useCallTransaction } from 'helpers/hooks/useCallTransaction';
import { FinalProgramStep } from 'components/modals/InviteProgramModal/FinalProgramStep';
import { useRegistration } from 'helpers/hooks/useRegistration';
import { PROGRAM_NAMES, FORSAGE_AND_XQORE } from 'helpers/constants';

export const InviteProgramModal = ({ uplineId, onClose, name, openedModal, withDisableClose = false }) => {
  const { registration } = useRegistration();
  const { onCallTransaction, transactionInfo } = useCallTransaction();
  const isXqore = name === PROGRAM_NAMES.XQORE;

  const [currentTransactionType, setCurrentTransactionType] = useState(null);

  const onRegistration = async () => {
    try {
      const result = isXqore
        ? await registration(PROGRAM_NAMES.XQORE, uplineId)
        : await registration(FORSAGE_AND_XQORE, uplineId);

      onCallTransaction(result);
    } catch (e) {
      callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
    }
  };

  const onClickActivate = (type = 'bnb') => {
    setCurrentTransactionType(type);
    return onRegistration();
  };

  const renderStep = useMemo(() => {
    if (transactionInfo.isSuccess || transactionInfo.isWaiting || transactionInfo.isError) {
      return (
        <FinalProgramStep
          name={PROGRAM_NAMES.XQORE}
          {...transactionInfo}
          closeModal={onClose}
          onTryAgain={() => onClickActivate(currentTransactionType)}
        />
      );
    }

    return <BuyProgramStep name={name} onActivate={onClickActivate} uplineId={uplineId} />;
  }, [transactionInfo, currentTransactionType]);

  return (
    <Modal isOpened={openedModal} onClose={onClose} isDisableOnClose={withDisableClose && step === 1}>
      {renderStep}
    </Modal>
  );
};
