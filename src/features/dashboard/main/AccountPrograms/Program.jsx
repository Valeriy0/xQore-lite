import React, { useMemo, useState } from 'react';
import Countdown from 'react-countdown';
import { isBefore } from 'date-fns';
import { CustomLink, Button } from 'components';
import { PROGRAMS_STYLES } from 'helpers/program';
import { BuyProgramModal } from 'components/modals';
import { useRouter } from 'next/router';
import { linkWithQuery } from 'helpers/links';
import { PROGRAM_PRICES, PROGRAM_NAMES, XGOLD_DATE_START } from 'helpers/constants';
import RoundedArrowRightTopIcon from 'assets/icons/rounded_arrow_right_top.svg';
import KeyIcon from 'assets/icons/key.svg';
import config from 'helpers/config';
import SnowFlakeIcon from 'assets/icons/snowflake.svg';
import WarningIcon from 'assets/icons/warning.svg';
import InclineArrowIcon from 'assets/icons/full_arrow_incline.svg';
import AlarmWatchIcon from 'assets/icons/alarm_watch.svg';
import { splitNumber } from 'helpers/format';
import PuffLoadingIcon from 'assets/animations/puff.svg';

export const Program = ({ name, slots, revenue, missed_partners, isLoading = false }) => {
  const { query, asPath, replace } = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const isXGOLD = name === PROGRAM_NAMES.XGOLD;
  const [isCompletedCountdownXGOLD, setIsCompletedCountdownXGOLD] = useState(
    isXGOLD && !isBefore(new Date(), new Date(XGOLD_DATE_START)),
  );
  const textColorClass = PROGRAMS_STYLES[name]?.textColor;
  const lastNextLevel = Object.keys(slots)?.reduce((total, current, index, arr) => {
    if (index === 0 && !slots[current].active) {
      return current;
    }

    if (!slots[current].active && slots[arr[index - 1]] && slots[arr[index - 1]].active) {
      return current;
    }

    return total;
  }, -1);
  const isFirstNextLevel = Number(lastNextLevel) === 1;
  const nextPriceBusd = PROGRAM_PRICES[name]?.[lastNextLevel];
  const isPreviewMode = !!query.user;

  const isProduction = !!(config?.stand && config?.stand === 'prod');

  const isAllActive = Object.values(slots)?.every((slot) => slot.active);
  const missedSlots = Object.values(slots)?.reduce((total, current, index) => {
    if ((!!current.missed_revenue || !!current.missed_partners) && !current.active) {
      return [...total, { ...current, level: index + 1 }];
    }

    return total;
  }, []);

  const missedLevelsStrings =
    !missedSlots.length && missed_partners && isFirstNextLevel ? [{ missed_partners }] : missedSlots;

  const programBlurs = {
    [PROGRAM_NAMES.X3]: '/blurs/dashboard/blue-blur.png',
    [PROGRAM_NAMES.X4]: '/blurs/dashboard/purple-blur.png',
    [PROGRAM_NAMES.XXX]: '/blurs/dashboard/pink-blur.png',
    [PROGRAM_NAMES.XGOLD]: '/blurs/dashboard/gold-blur.png',
  };

  const bgBlur = !!missedLevelsStrings?.length ? '/blurs/dashboard/red-blur.png' : programBlurs?.[name];

  const styleBg = { backgroundImage: `url('${bgBlur}')`, backgroundRepeat: 'round', backgroundSize: 'cover' };

  const upgradeBtnStyle = useMemo(() => {
    if (isProduction && isXGOLD ? !isCompletedCountdownXGOLD : false) {
      return 'disabled';
    }

    if (!!missedLevelsStrings.length) {
      return 'red';
    }

    return PROGRAMS_STYLES[name]?.upgradeBtnStyle;
  }, [missedLevelsStrings, PROGRAMS_STYLES, name, isPreviewMode, isCompletedCountdownXGOLD, isXGOLD, isProduction]);

  const handleCloseModal = async () => {
    await replace(asPath);
    setIsOpened(false);
  };

  const onUpgradeClick = (e) => {
    if (isPreviewMode) return;

    e.preventDefault();

    setIsOpened(true);
  };

  const renderMissedStrings = useMemo(() => {
    if (!missedLevelsStrings.length) return null;

    const { missedRevenue, missedPartners } = missedLevelsStrings.reduce(
      (total, current) => {
        return {
          missedRevenue:
            current.missed_revenue && !current.active
              ? total.missedRevenue + current.missed_revenue
              : total.missedRevenue,
          missedPartners:
            current.missed_partners && !current.active
              ? total.missedPartners + current.missed_partners
              : total.missedPartners,
        };
      },
      {
        missedRevenue: 0,
        missedPartners: 0,
      },
    );

    return (
      <>
        {!!missedRevenue && (
          <span className="text-base leading-6 text-red text-right">
            Missed profits{' '}
            <span className="inline-block font-bold notranslate">
              {missedRevenue} {'BUSD'}
            </span>
          </span>
        )}
        {!!missedPartners && (
          <span className="text-base leading-6 text-red text-right">
            Missed partners <span className="inline-block font-bold notranslate">{missedPartners}</span>
          </span>
        )}
      </>
    );
  }, [missedLevelsStrings, isPreviewMode]);

  const activateTitle = (ProgramName) => {
    if (!!missedLevelsStrings?.length && isFirstNextLevel) {
      return renderMissedStrings;
    }

    switch (ProgramName) {
      case PROGRAM_NAMES.XXX:
        return <span>3 lines, 14 partners, 580% per cycle</span>;
      case PROGRAM_NAMES.XGOLD:
        return <span>4 lines, 30 partners, 1020% per cycle</span>;
      case PROGRAM_NAMES.XQORE:
        return <span>2 lines, 12 partners, 500% per cycle</span>;
    }
  };

  const buttonContent = useMemo(() => {
    if (isProduction && isXGOLD ? !isCompletedCountdownXGOLD : false) {
      return (
        <div className="flex flex-col space-y-1 items-start">
          <div className="flex items-center">
            <AlarmWatchIcon className="w-5 h-5 mr-2.5" />
            <Countdown onComplete={() => setIsCompletedCountdownXGOLD(true)} date={XGOLD_DATE_START} />
          </div>
        </div>
      );
    }

    if (isPreviewMode) {
      return (
        <div className="flex flex-col space-y-1 items-start">
          <div className="flex items-center">
            Preview
            <RoundedArrowRightTopIcon className="ml-3" />
          </div>
        </div>
      );
    }

    if (isFirstNextLevel) {
      return (
        <div className="flex flex-col space-y-1 items-start">
          <div className="flex flex-col flex-wrap sm:items-center justify-center sm:flex-row">
            <div className="flex items-center sm:mr-1.5">
              Activate
              <KeyIcon className="ml-2.5 stroke-current sm:hidden" />
              <span className="hidden ml-1.5 sm:block"> for </span>
            </div>
            <div className="flex text-mini text-white leading-3 font-normal notranslate sm:items-center sm:font-bold sm:text-sm">
              <span className="sm:hidden">
                {' '}
                {nextPriceBusd} {'BUSD'}{' '}
              </span>
              <span className="hidden sm:inline">
                {' '}
                {nextPriceBusd} {'BUSD'}{' '}
              </span>
              <KeyIcon className="ml-2.5 stroke-current hidden sm:block" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`flex flex-col space-y-1 items-start text-white`}>
          <div className="flex flex-col flex-wrap items-start sm:justify-center sm:flex-row">
            <div className="flex items-center sm:mr-1.5">
              Upgrade
              <RoundedArrowRightTopIcon className="ml-2.5 sm:hidden" />
              <span className="hidden ml-1.5 sm:block"> for </span>
            </div>
            <div className="flex text-mini text-white leading-3 font-normal notranslate sm:font-bold sm:text-sm">
              {nextPriceBusd} {'BUSD'}
              <RoundedArrowRightTopIcon className="ml-2.5 hidden sm:block" />
            </div>
          </div>
        </div>
      );
    }
  }, [nextPriceBusd, name, isPreviewMode, isCompletedCountdownXGOLD, isXGOLD, isProduction]);

  const mainContent = useMemo(() => {
    if (isFirstNextLevel) {
      return (
        <div className="flex h-full flex-col items-start justify-between sm:w-full flex-wrap mb-7.5">
          <span className="text-white-500 text-base notranslate sm:text-sm sm:w-1/2">{activateTitle(name)}</span>
        </div>
      );
    } else {
      return (
        <div className="flex w-5/12 h-full flex-col items-start justify-end sm:w-full flex-wrap sm:mb-7.5">
          {!isFirstNextLevel && (
            <div className="flex flex-wrap -m-1">
              {Object.values(slots)?.map(({ active, freeze, missed_revenue, missed_partners }, index) => {
                const bgClass = freeze
                  ? 'bg-white-100'
                  : (!!missed_revenue || !!missed_partners) && !active
                  ? 'bg-red'
                  : active
                  ? 'bg-main-blue'
                  : 'bg-white-100';

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-center m-1 w-7.5 h-7.5 rounded-md ${bgClass} ${
                      freeze ? 'shadow-freeze-program' : ''
                    }`}
                  >
                    {(!!missed_revenue || !!missed_partners) && !active && (
                      <WarningIcon className="fill-current text-white" />
                    )}

                    {!!freeze && <SnowFlakeIcon className="h-5 w-5" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }
  }, [nextPriceBusd, isPreviewMode, slots]);

  return (
    <>
      <CustomLink
        href={linkWithQuery(`/dashboard/${name}`, { user: query.user })}
        passHref
        withLink={isProduction && isXGOLD ? isCompletedCountdownXGOLD : true}
        className={
          'relative flex flex-col p-7.5 w-full bg-gray rounded relative z-10 overflow-hidden justify-between min-h-programDashboard sm:p-5 sm:min-h-programDashboardMobile'
        }
      >
        {isLoading ? (
          <div className="flex absolute justify-center w-full h-full bg-gray opacity-75 z-999999 top-0 bottom-0 left-0 right-0">
            <div className="flex items-center justify-center">
              <PuffLoadingIcon className="!w-80px h-80px" />
            </div>
          </div>
        ) : (
          <>
            <InclineArrowIcon className="absolute top-2 right-2 sm:top-1 sm:right-1 " />
            <div className="flex justify-between w-full z-10">
              <div className="flex items-center">
                <span
                  className={`text-white text-2xl font-bold notranslate justify-start sm:text-xl ${
                    isFirstNextLevel && textColorClass
                  }`}
                >
                  {name}
                </span>
              </div>
              {!isFirstNextLevel && (
                <span className="text-white text-2xl font-bold justify-end notranslate text-right sm:text-xl">
                  {splitNumber(revenue)} {'BUSD'}
                </span>
              )}
            </div>
            <div className="flex justify-between h-full w-full">
              <div
                className={`flex justify-between w-full z-10 sm:flex-col mt-5 ${
                  isFirstNextLevel ? 'flex-col items-start mt-2.5 w-2/3 sm:w-full' : 'items-end'
                }`}
              >
                {mainContent}
                <div className="flex flex-col h-full relative justify-end sm:w-full sm:items-center">
                  {!!missedLevelsStrings?.length && !isFirstNextLevel && (
                    <div className="flex flex-col justify-end absolute sm:relative -top-2.5 right-0 notranslate sm:items-center">
                      {renderMissedStrings}
                    </div>
                  )}
                  {(!isAllActive || isPreviewMode) && (
                    <Button
                      className={`z-0 sm:w-full ${isPreviewMode && 'pointer-events-none'}`}
                      type={upgradeBtnStyle}
                      onClick={onUpgradeClick}
                      disabled={isProduction && isXGOLD ? !isCompletedCountdownXGOLD : false}
                    >
                      {buttonContent}
                    </Button>
                  )}
                </div>
              </div>
              {isFirstNextLevel && (
                <div className="flex justify-end  w-full max-w-180px max-h-180px sm:max-w-100px sm:max-h-100px z-3 absolute right-0 top-1/2 -translate-y-1/2 sm:top-5 sm:right-5 sm:translate-y-0">
                  <img className="" src={`/preview_cards/${name}_preview.png`} alt="preview_card" />
                </div>
              )}
            </div>
          </>
        )}
        <div className="absolute w-full h-full inset-0" style={styleBg} />
      </CustomLink>
      {isOpened && <BuyProgramModal level={lastNextLevel} name={name} onClose={handleCloseModal} />}
    </>
  );
};
