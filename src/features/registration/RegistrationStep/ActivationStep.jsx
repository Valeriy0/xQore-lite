import React, { useEffect, useMemo } from 'react';
import { checkRegistered, checkBalance, checkApprove, checkWallet, checkNetwork } from 'helpers/checks';
import { useWeb3React } from '@web3-react/core';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import { Button } from 'components';
import { CheckInfo } from 'features/registration/CheckInfo';
import ChatIcon from 'assets/icons/chat.svg';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { BNB_COMMISSIONS, CONTRACT_NAMES, EVENT_NAMES, PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';
import { useRouter } from 'next/router';
import { useApproveWithChecks } from 'helpers/hooks/useApproveWithChecks';
import { useBalance } from 'helpers/hooks/useBalance';
import { checkBalanceWithBnbLevel } from 'helpers/checks';
import { useOpenSupport } from 'helpers/hooks/useOpenSupport';
import { CheckStatuses } from 'features/registration';
import { RegistrationInput } from './RegistrationInput';
import { TRANSACTIONS_TYPES } from 'features/registration/RegistrationStep';
import { sendEvent } from 'helpers/sendEvent';

const getChecksCallbacks = (web3Props, getContract) => {
  const contractType = CONTRACT_NAMES.BASE;
  const funcProps = { getContract, ...web3Props, contractType };

  return {
    name: 'router',
    getContract,
    callbacks: [
      {
        func: checkWallet,
        key: 'checkWallet',
        funcProps,
      },
      {
        func: checkNetwork,
        key: 'checkNetwork',
        funcProps,
      },
      {
        func: checkRegistered,
        key: 'checkRegistered',
        funcProps,
      },
      {
        func: checkBalanceWithBnbLevel,
        key: 'checkBalance',
        funcProps: {
          ...funcProps,
          busdMinPrice: PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1],
          bnbMinPrice: BNB_COMMISSIONS[PROGRAM_NAMES.X3],
          isRegistration: true,
        },
      },
      {
        func: checkApprove,
        key: 'checkApprove',
        funcProps: {
          ...funcProps,
          name: 'router',
          price: PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1],
        },
      },
    ],
  };
};

export const ActivationStep = ({ bnbPrice, onRefreshPrice, uplineInfo, onActivate, setUplineInfo }) => {
  const { push } = useRouter();
  const web3Props = useWeb3React();

  const { account, active, chainId } = web3Props;
  const { getContract } = useGetContract();
  const { fetchBalance } = useBalance();
  const { openSupport } = useOpenSupport();

  const { statuses, callChecks, statusMeta, callApprove, approveInfo } = useApproveWithChecks(
    getChecksCallbacks(web3Props, getContract),
  );

  const { isSuccessAll, isLoadingAny, isAnyError } = useMemo(() => {
    return {
      isSuccessAll: Object.values(statuses).every((status) => status === STATUSES_ENUM.SUCCESS),
      isLoadingAny: Object.values(statuses).some((status) => status === STATUSES_ENUM.WAIT),
      isAnyError: Object.values(statuses).some((status) => status === STATUSES_ENUM.ERROR),
    };
  }, [statuses]);

  const stylesLoading = isLoadingAny || uplineInfo.error ? 'bg-gray text-white-300 hover:bg-gray' : '';

  const checkTitles = {
    checkWallet: {
      title: 'Wallet',
      success: 'connected',
      error: 'not detected',
    },
    checkNetwork: {
      title: 'Network',
      success: 'Smart chain',
      error: 'wrong network',
    },
    checkRegistered: {
      title: 'Registration',
      success: 'available',
      error: 'already registered',
    },
    checkBalance: {
      title: 'Balance',
      success: `min ${
        PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1]
      } BUSD or ${bnbPrice} BNB`,
      error: `min ${PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1]} BUSD or ${bnbPrice} BNB`,
    },
    checkApprove: {
      title: 'Approve BUSD',
      success: 'done',
      error: 'required',
    },
  };

  useEffect(async () => {
    await callChecks();
  }, [active, account, chainId]);

  useEffect(() => {
    approveInfo.isApproved && fetchBalance();
  }, [approveInfo.isApproved]);

  const onClickActivate = async () => {
    try {
      if (isSuccessAll) {
        onActivate();
      } else if (isAnyError) {
        fetchBalance();
        callChecks();
        onRefreshPrice();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onLoginAccClick = () => {
    sendEvent({ type: EVENT_NAMES.LOGIN_TO_ACCOUNT });

    push('/');
  };

  const renderActionButton = useMemo(() => {
    if (statuses.checkRegistered === STATUSES_ENUM.ERROR) {
      return (
        <Button
          type="primary"
          className={`mt-10 py-5 !px-10 sm:py-3 ${stylesLoading} sm:mt-7.5`}
          onClick={onLoginAccClick}
        >
          Login to your account
        </Button>
      );
    }

    if (statuses.checkApprove === STATUSES_ENUM.ERROR || approveInfo.isCallApprove) {
      return (
        <div className="flex space-x-2.5">
          <Button
            type="primary"
            className={`mt-10 py-5 !px-10 sm:py-3 ${stylesLoading} sm:mt-7.5`}
            onClick={() => {
              sendEvent({ type: EVENT_NAMES.APPROVE_BUSD_REGISTRATION_STEP });
              callApprove();
            }}
            disabled={isLoadingAny || uplineInfo.error || approveInfo.isCallApprove}
          >
            {approveInfo.isCallApprove ? 'Approving BUSD...' : 'Approve BUSD'}
          </Button>
          <Button
            onClick={() => onActivate(TRANSACTIONS_TYPES.BNB)}
            type="orange"
            className={`mt-10 py-5 !px-10 sm:py-3 ${stylesLoading} sm:mt-7.5`}
          >
            {`Register ${bnbPrice} BNB`}
          </Button>
        </div>
      );
    }

    return (
      <div className="flex space-x-2.5">
        <Button
          type="primary"
          className={`mt-10 py-5 !px-10 sm:py-3 ${stylesLoading} sm:mt-7.5`}
          onClick={() => {
            if (isSuccessAll) {
              sendEvent({
                type: EVENT_NAMES.REGISTRATION_AND_CHECK_AGAIN_REGISTRATION_STEP,
                value: '<10>',
                currency: '<USD>',
              });
            }
            onClickActivate();
          }}
          disabled={isLoadingAny || uplineInfo.error}
        >
          {isLoadingAny ? 'Checking...' : isSuccessAll ? 'Registration' : 'Check again'}
        </Button>
        {isSuccessAll && (
          <Button
            onClick={() => onActivate('bnb')}
            type="orange"
            className={`mt-10 py-5 !px-10 sm:py-3 ${stylesLoading} sm:mt-7.5`}
          >
            {`Register ${bnbPrice} BNB`}
          </Button>
        )}
      </div>
    );
  }, [uplineInfo, isLoadingAny, statuses, stylesLoading, isSuccessAll, bnbPrice, onActivate]);

  return (
    <>
      <div className="flex flex-1 flex-col items-start mr-10 sm:mr-0 sm:items-stretch sm:max-w-full sm:p-5">
        <div className="flex flex-col sm:flex-1">
          <span className="inline-block text-two-half text-white mb-10 sm:mb-7.5 sm:text-2xl">
            {' '}
            Registration <br /> in <span className="notranslate">&thinsp;Forsage BUSD</span>
          </span>
          <RegistrationInput uplineInfo={uplineInfo} setUplineInfo={setUplineInfo} />
          <CheckStatuses
            statuses={statuses}
            checkTitles={checkTitles}
            program={PROGRAM_NAMES.X3}
            statusMeta={statusMeta}
          />
        </div>
        {renderActionButton}
      </div>
      <div className="bg-white-100 rounded p-10 max-w-desktop-reg-info-card w-full flex-shrink h-auto flex flex-col min-h-550px sm:min-h-auto sm:mb-10 sm:max-w-full sm:hidden">
        <div className="flex flex-1 items-start w-full">
          {isSuccessAll ? (
            <CheckInfo
              key="checkApprove"
              status="pending"
              infoKey="checkApprove"
              program={PROGRAM_NAMES.X3}
              statusMeta={statusMeta}
            />
          ) : (
            Object.keys(statuses).map((key) => (
              <CheckInfo
                key={key}
                status={statuses[key]}
                infoKey={key}
                program={PROGRAM_NAMES.X3}
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
              Need help with registration? <br />
              Talk to experts in the <b>support chat</b>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
