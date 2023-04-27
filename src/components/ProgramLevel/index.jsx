import React, { useMemo, useState } from 'react';
import { PROGRAMS_STYLES, PARTNERS_STYLES } from 'helpers/program';
import People from 'assets/icons/people.svg';
import Exchange from 'assets/icons/exchange.svg';
import BusdIcon from 'assets/tokens/BUSD.svg';
import BnbIcon from 'assets/tokens/BNB.svg';
import { CustomLink } from 'components';
import { useRouter } from 'next/router';
import { linkWithQuery } from 'helpers/links';
import { PROGRAM_PRICES, DEFAULT_LEVEL_MOCKS, XQORE_DATE_START } from 'helpers/constants';
import { Button } from '../Button';
import { BuyProgramModal } from 'components/modals';
import {
  MAX_DEEP_ITERATION_PROGRAMS,
  DEFAULT_LEVEL,
  NESTED_FIRST_COUNT,
  PROGRAM_NAMES,
  NESTED_DEEP_COUNT,
  EVENT_NAMES,
} from 'helpers/constants';
import SnowFlakeIcon from 'assets/icons/snowflake.svg';
import SnowBG from 'public/svg/bg_snow.svg';
import { splitNumber } from 'helpers/format';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import PumaLogo from 'assets/forsage/puma_full_to_right.svg';
import { sendEvent } from 'helpers/sendEvent';
import { getPubSub } from 'helpers/pubsub';
import { PUBSUB_EVENTS } from 'helpers/pubsub/constants';
import { isBefore } from 'date-fns';
import Countdown from 'react-countdown';
import AlarmWatchIcon from 'assets/icons/alarm_watch.svg';

const nestSizes = [
  {
    hexagon: 'w-9 h-12',
    circle: 'w-7.5 h-7.5',
  },
  {
    circle: 'w-5 h-5',
  },
  {
    circle: 'w-2.5 h-2.5',
  },
  {
    circle: 'w-1 h-1',
  },
];

const nestSizesXQore = [
  {
    circle: 'w-[22px] h-[22px]',
  },
  {
    circle: 'w-4 h-4',
  },
];

export const ProgramLevel = ({
  recycles,
  isLastUnactive,
  isFirstUnactive,
  missed_revenue,
  descendants,
  elements,
  active,
  freeze,
  programName,
  level,
  missed_partners,
}) => {
  const isXQore = programName === PROGRAM_NAMES.XQORE;
  const [isCompletedCountdownXQore, setIsCompletedCountdownXQore] = useState(
    !isXQore || (isXQore && !isBefore(new Date(), new Date(XQORE_DATE_START))),
  );
  const bgClass = useMemo(() => {
    if ((!!missed_revenue || !!missed_partners) && !active) {
      return PROGRAMS_STYLES['missed'];
    }

    if (isLastUnactive || !active || !isCompletedCountdownXQore) {
      return PROGRAMS_STYLES['noActive'];
    }

    return PROGRAMS_STYLES[programName]?.bgColorClass || 'bg-main-blue';
  }, [isLastUnactive, programName, active, missed_partners, isCompletedCountdownXQore]);

  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const { query } = useRouter();
  const isPreviewMode = !!query.user;

  const ElemHeight = {
    [PROGRAM_NAMES.X3]: 'min-h-158px',
    [PROGRAM_NAMES.X4]: 'min-h-180px',
    [PROGRAM_NAMES.XXX]: 'min-h-180px',
    [PROGRAM_NAMES.XGOLD]: 'min-h-180px',
    [PROGRAM_NAMES.XQORE]: 'min-h-200px',
  };
  const CurrencyIcon = isXQore ? BnbIcon : BusdIcon;
  const partnerBorder = isXQore ? 'border border-main-blue' : '';

  const handleCloseModal = async () => {
    getPubSub().emit(PUBSUB_EVENTS.CLOSE_MODAL_PROGRAM_LEVEL);

    setIsOpenedModal(false);
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null;
    } else if (days > 0) {
      return (
        <span>
          {days} days <br /> {hours} hours
        </span>
      );
    } else if (days === 0 && hours > 1) {
      return (
        <span>
          {hours} hours <br /> {minutes} minutes
        </span>
      );
    } else if (days === 0 && hours === 0 && minutes > 1) {
      return (
        <span>
          {minutes} minutes <br /> {seconds} seconds
        </span>
      );
    } else if (days === 0 && hours === 0 && minutes === 0) {
      return <span>{seconds} seconds</span>;
    }
  };

  const renderElements = (elements, nestingLvl) => {
    const currentElements = Array.from(
      Array(nestingLvl === 0 ? NESTED_FIRST_COUNT[programName] : NESTED_DEEP_COUNT[programName]),
      (el, index) => {
        return elements?.[index]
          ? elements[index]
          : isXQore
          ? DEFAULT_LEVEL_MOCKS[programName]?.elements[index]
          : DEFAULT_LEVEL;
      },
    );
    const size = isXQore ? nestSizesXQore[nestingLvl] : nestSizes[nestingLvl];
    const nextNestingLvl = nestingLvl + 1;

    return (
      <div className="flex w-full justify-center items-center">
        <div
          className={`relative flex w-full justify-evenly items-start ${
            isXQore && (nestingLvl === 0 ? 'xQore-wrapper' : `xQore-second-wrapper`)
          }`}
        >
          {currentElements?.map((lvl, lvlIndex) => {
            const style = lvl?.active
              ? PARTNERS_STYLES?.[lvl?.overflow || 'private']?.bg || 'bg-red'
              : 'bg-hover-main-blue';
            return (
              <div className={`flex ${isXQore ? `w-[50px] place-${lvl?.place}` : 'w-full'}`}>
                <div key={lvlIndex} className="flex flex-col w-full justify-evenly items-center space-y-1.5">
                  <div className="relative" key={lvlIndex}>
                    {!lvl.isLoading && (
                      <div
                        className={`${lvl?.sync ? 'bg-white-700' : style} ${partnerBorder} rounded-full ${
                          size?.circle
                        } `}
                      />
                    )}
                    {lvl.isLoading && (
                      <div className="flex justify-center items-center mb-5 sm:flex-col pt-5">
                        <PuffLoadingIcon className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  {(!!lvl?.elements?.length || MAX_DEEP_ITERATION_PROGRAMS[programName] > nextNestingLvl) &&
                    renderElements(lvl.elements, nextNestingLvl)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
    // }
  };

  const renderLevelBody = useMemo(() => {
    if (!isCompletedCountdownXQore) {
      return (
        <div className="text-center text-white flex flex-col items-center justify-center space-y-1 items-start pb-5">
          <AlarmWatchIcon className="w-10 h-10 " />
          <Countdown
            onComplete={() => setIsCompletedCountdownXQore(true)}
            date={XQORE_DATE_START}
            renderer={renderer}
          />
        </div>
      );
    }
    if ((!!missed_revenue || !!missed_partners) && !active) {
      if (isPreviewMode) {
        return (
          <>
            {!!missed_revenue ? (
              <span className="text-base leading-6 text-white sm:text-sm">
                Missed profits <br /> <span className="inline-block font-bold notranslate">{missed_revenue} BUSD</span>
              </span>
            ) : (
              <span className="text-base leading-6 text-white sm:text-sm">
                Missed <br /> partners <span className="inline-block font-bold">{missed_partners}</span>
              </span>
            )}
          </>
        );
      }

      return (
        <>
          {!isLastUnactive && <div className="h-11 mt-4" />}
          <span className="flex flex-col text-base leading-6 text-white sm:text-sm">
            Missed &nbsp;
            {!!missed_partners && <span>partners</span>}
            <span className="whitespace-nowrap notranslate">
              {!!missed_revenue ? `${missed_revenue} BNB` : `${missed_partners}`}
            </span>
          </span>
        </>
      );
    }

    if (isFirstUnactive && !active && !isPreviewMode) {
      return <span className="text-base leading-6 text-white sm:text-sm">Activate {programName}</span>;
    }

    if (isLastUnactive && !isPreviewMode) {
      return (
        <span className="text-base leading-6 text-white sm:text-sm">
          Upgrade your <br /> results x2
        </span>
      );
    }

    if (active) {
      return (
        <>
          {isXQore && (
            <>
              <div className="bg-black-verylight-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[87px] h-[87px] rounded-full" />
              <div className="bg-black-verylight-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] rounded-full" />
              <div className="bg-main-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[29px] h-[29px] rounded-full" />
              <div className="bg-sky-blue-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full text-[5px] text-white flex items-center justify-center">
                {' '}
                YOU{' '}
              </div>
            </>
          )}
          {renderElements(elements, 0)}
        </>
      );
    }

    if (!active) {
      return (
        <div className="flex justify-center items-center w-full h-full ">
          <PumaLogo className="fill-current text-white-50 w-24 h-24 mb-1.5 sm:h-20 sm:w-20" />
        </div>
      );
    }

    return null;
  }, [active, elements, isPreviewMode, isLastUnactive, isFirstUnactive, isXQore, isCompletedCountdownXQore]);

  const renderLevelBottom = useMemo(() => {
    const onActivateClick = (e) => {
      sendEvent({ type: EVENT_NAMES.LEVEL_UPGRADE_OR_ACTIVATE[programName] });
      e.preventDefault();
      setIsOpenedModal(true);
    };

    if (!isCompletedCountdownXQore) return null;

    if (!isPreviewMode && (isLastUnactive || (isLastUnactive && missed_revenue))) {
      return (
        <Button onClick={onActivateClick} className="animate-pulse z-10" type={missed_revenue ? 'white-2' : 'primary'}>
          Activate
        </Button>
      );
    }

    if (active) {
      return (
        <div className="flex flex-wrap space-x-2">
          <div className="flex space-x-2 items-center">
            <People className="w-5 h-5 stroke-current text-white-500" />
            <span className="text-sm text-white font-normal sm:text-sm">{descendants}</span>
          </div>
          <div className="flex space-x-2 items-center">
            <Exchange className="w-5 h-5 stroke-current text-white-500" />
            <span className="text-sm text-white font-normal sm:text-sm">{recycles}</span>
          </div>
        </div>
      );
    }
  }, [
    active,
    elements,
    isPreviewMode,
    isLastUnactive,
    isFirstUnactive,
    missed_revenue,
    recycles,
    descendants,
    isCompletedCountdownXQore,
  ]);

  return (
    <>
      <CustomLink href={linkWithQuery(`/dashboard/${programName}/${level}`, { user: query.user, cycle: recycles + 1 })}>
        <div
          className={`relative overflow-hidden flex flex-col w-180px ${
            ElemHeight[programName]
          } sm:w-158px rounded-small p-5 m-2 justify-between ${bgClass} ${
            active && isCompletedCountdownXQore && 'hover:bg-hover-main-blue'
          } sm:space-y-1.5`}
        >
          <div className="flex w-full justify-between !mb-2.5">
            <div className="flex space-x-1.5 items-center">
              <span className="text-white-500 text-base sm:text-sm">Lvl {level}</span>
              {freeze && <SnowFlakeIcon className="h-5 w-5 stroke-current text-white-500" />}
            </div>
            <span className="flex items-center text-white text-base sm:text-sm">
              <CurrencyIcon className="w-3 h-3 mr-1.5" />
              {splitNumber(PROGRAM_PRICES[programName]?.[level])}
            </span>
          </div>
          <div className={`relative flex flex-col ${active && isCompletedCountdownXQore && '-ml-2.5 -mr-2.5 !mb-3'} `}>
            {renderLevelBody}
          </div>
          {renderLevelBottom}
          {freeze && <SnowBG className="absolute top-0 left-0 !mt-0" />}
        </div>
      </CustomLink>
      {isOpenedModal && (
        <BuyProgramModal name={programName} level={level} openedModal={isOpenedModal} onClose={handleCloseModal} />
      )}
    </>
  );
};
