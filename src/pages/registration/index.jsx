import React, { useEffect, useMemo, useState } from 'react';
import { Header } from 'components';
import { Helmet } from 'react-helmet';
import { RegistrationStep } from 'features/registration/RegistrationStep';
import { GoldActivateStep } from 'features/registration/GoldActivateStep';
import { XXXActivateStep } from 'features/registration/XXXActivateStep';
import { XqoreActivateStep } from 'features/registration/XqoreActivateStep';
import { useBalance } from 'helpers/hooks/useBalance';
import { useRequest } from 'helpers/hooks/useRequest';
import { TotalStatisticsRepository } from 'connectors/repositories/total-statistics';
import { useTimerOver } from 'helpers/hooks/useTimerOver';
import { parseISO } from 'date-fns';
import { XQORE_DATE_START } from 'helpers/constants';

const Registration = () => {
  const { call: callXXX, data: XXXData, isLoading: XXXIsLoading } = useRequest(TotalStatisticsRepository.getXXX);
  const { isCompleted } = useTimerOver(parseISO(XQORE_DATE_START));

  const stepsBgUrls = isCompleted
    ? [
        '/blurs/registration/blue-blur.png',
        '/blurs/registration/xqore-blur.png',
        '/blurs/registration/pink-blur.png',
        '/blurs/registration/gold-blur.png',
      ]
    : ['/blurs/registration/blue-blur.png', '/blurs/registration/pink-blur.png', '/blurs/registration/gold-blur.png'];

  const {
    call: callXGold,
    data: XGoldData,
    isLoading: XGoldIsLoading,
  } = useRequest(TotalStatisticsRepository.getXGold);

  const {
    call: callXQore,
    data: XQoreData,
    isLoading: XQoreIsLoading,
  } = useRequest(TotalStatisticsRepository.getXQore);

  useEffect(() => {
    callXXX();
    callXGold();
    callXQore();
  }, []);

  const { fetchBalance } = useBalance();
  const [step, setStep] = useState(0);

  console.log(step);

  const styleBg = {
    backgroundImage: `url('${stepsBgUrls[step]}')`,
    backgroundRepeat: 'round',
    backgroundSize: 'cover',
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleRegistered = () => {
    fetchBalance();
    handleNextStep();
  };

  const renderStep = useMemo(() => {
    if (!isCompleted) {
      switch (step) {
        case 0:
          return (
            <RegistrationStep
              onNextStep={handleRegistered}
              isCompletedXqore={isCompleted}
              XqoreStatisticsInfo={{ ...XQoreData, isLoading: XQoreIsLoading }}
              XXXStatisticsInfo={{ ...XXXData, isLoading: XXXIsLoading }}
            />
          );
        case 1:
          return (
            <XXXActivateStep
              onNextStep={handleRegistered}
              XXXStatisticsInfo={{ ...XXXData, isLoading: XXXIsLoading }}
              XGoldStatisticsInfo={{ ...XGoldData, isLoading: XGoldIsLoading }}
            />
          );
        case 3:
          return <GoldActivateStep XGoldStatisticsInfo={{ ...XGoldData, isLoading: XGoldIsLoading }} />;
        default:
          return null;
      }
    } else {
      switch (step) {
        case 0:
          return (
            <RegistrationStep
              onNextStep={handleRegistered}
              isCompletedXqore={isCompleted}
              XqoreStatisticsInfo={{ ...XQoreData, isLoading: XQoreIsLoading }}
              XXXStatisticsInfo={{ ...XXXData, isLoading: XXXIsLoading }}
            />
          );
        case 1:
          return (
            <XqoreActivateStep
              onNextStep={handleRegistered}
              XqoreStatisticsInfo={{ ...XQoreData, isLoading: XQoreIsLoading }}
              XXXStatisticsInfo={{ ...XXXData, isLoading: XXXIsLoading }}
            />
          );
        case 2:
          return (
            <XXXActivateStep
              onNextStep={handleRegistered}
              XXXStatisticsInfo={{ ...XXXData, isLoading: XXXIsLoading }}
              XGoldStatisticsInfo={{ ...XGoldData, isLoading: XGoldIsLoading }}
            />
          );
        case 3:
          return <GoldActivateStep XGoldStatisticsInfo={{ ...XGoldData, isLoading: XGoldIsLoading }} />;
        default:
          return null;
      }
    }
  }, [step, XXXData, XXXIsLoading, XGoldData, XGoldIsLoading, XQoreData, XQoreIsLoading, isCompleted]);

  return (
    <div
      style={styleBg}
      className="flex relative overflow-hidden flex-col items-center justify-center w-screen min-h-screen text-white-500 pt-15"
    >
      <Helmet>
        <title>Registration | Forsage</title>
        <meta
          name="description"
          content="Registration of new partners on a decentralized matrix platform based on an honest marketing plan using smart contracts"
        />
      </Helmet>
      <Header withRing={false} withBurger={false} withExit withExitMobile loginWidth={false} />
      <div className="w-full max-w-desktop-login flex-1 flex items-center justify-center z-10 px-10 sm:px-0 sm:flex-col">
        <div className="flex flex-1 items-stretch justify-between w-full sm:flex-col">{renderStep}</div>
      </div>
    </div>
  );
};

Registration.Layout = ({ children }) => {
  return children;
};

export default Registration;
