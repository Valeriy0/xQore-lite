import React, { useMemo, useState } from 'react';
import { PROGRAM_PRICES } from 'helpers/constants';
import BusdIcon from 'assets/tokens/BUSD.svg';
import BnbIcon from 'assets/tokens/BNB.svg';
import {
  DEFAULT_LEVEL,
  DEFAULT_LEVEL_MOCKS,
  NESTED_FIRST_COUNT,
  MAX_DEEP_ITERATION_PROGRAMS,
  PROGRAM_NAMES,
  XQORE_DATE_START,
} from 'helpers/constants';
import { PROGRAMS_STYLES, PARTNERS_STYLES } from 'helpers/program';
import ExchangeIcon from 'assets/icons/exchange.svg';
import PeopleIcon from 'assets/icons/people.svg';
import PurchaseIcon from 'assets/icons/purchase.svg';
import { useRouter } from 'next/router';
import { Button } from 'components';
import ReactPlaceholder from 'react-placeholder';
import { TextBlock, RoundShape, TextRow } from 'react-placeholder/lib/placeholders';
import { useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { CustomLink } from 'components';
import { linkWithQuery } from 'helpers/links';
import { BuyProgramModal } from 'components/modals';
import SnowFlakeIcon from 'assets/icons/snowflake.svg';
import { splitNumber } from 'helpers/format';
import PumaLogo from 'assets/forsage/puma_full_to_right.svg';
import { getPubSub } from 'helpers/pubsub';
import { PUBSUB_EVENTS } from 'helpers/pubsub/constants';
import { isBefore } from 'date-fns';
import Countdown from 'react-countdown';
import AlarmWatchIcon from 'assets/icons/alarm_watch.svg';

const ProgramInfoPlaceHolder = (
  <div className="flex-col justify-between overflow-hidden">
    <div className="flex h-20 w-full justify-between mb-7.5">
      <TextBlock rows={1} color={'#ffffff'} className={'!w-2/12'} />
      <TextBlock rows={2} color={'#ffffff'} className={'!w-2/12'} />
      <TextBlock rows={1} color={'#ffffff'} className={'!w-2/12'} />
    </div>
    <div className="flex w-full justify-evenly mb-15 sm:mb-13">
      <RoundShape color={'#ffffff'} className={'!h-15 !w-15'} />
      <RoundShape color={'#ffffff'} className={'!h-15 !w-15'} />
      <RoundShape color={'#ffffff'} className={'!h-15 !w-15'} />
    </div>
    <div className="flex justify-between w-full h-full ">
      <div className="flex space-x-14 sm:flex-col xl:space-x-8 sm:space-x-0 sm:space-y-7.5 w-2/12">
        <TextBlock rows={2} color={'#ffffff'} />
        <TextBlock rows={2} color={'#ffffff'} />
      </div>
      <div className="flex flex-col w-6/12">
        <TextBlock rows={2} color={'#ffffff'} />
      </div>
    </div>
  </div>
);

const LevelUserIdPlaceholder = (
  <div className="flex-1 flex flex-col items-center mt-[100px] relative">
    <span className="absolute top-3 text-white">Loading...</span>
    <TextRow color="rgba(0, 0, 0, 0.4)" className="!m-0 rounded-mini" style={{ width: 400, height: 50 }} />
  </div>
);

export const ProgramInfo = ({ level, programName }) => {
  const isXQore = programName === PROGRAM_NAMES.XQORE;
  const [isCompletedCountdownXQore, setIsCompletedCountdownXQore] = useState(
    !isXQore || (isXQore && !isBefore(new Date(), new Date(XQORE_DATE_START))),
  );
  const { query } = useRouter();
  const isPreviewMode = !!query.user;
  const active = level?.active;
  const missed_revenue = level?.missed_revenue;
  const missed_partners = level?.missed_partners;
  const currentCycle = Number(query.cycle || level?.cycle);
  const isFirstCycle = currentCycle === 1;
  const authUser = useSelector(getAuthUser);
  const isAuthedUserLevel = authUser?.id === level.user_id;
  const isLastUnactive = level?.max_active_level + 1 === level.level;
  const lastUnactiveLevel = isLastUnactive ? level.level : '';
  const [isOpened, setIsOpened] = useState(false);
  const programCurrency = isXQore ? 'BNB' : 'BUSD';
  const ProgramIcon = isXQore ? BnbIcon : BusdIcon;

  const handleCloseModal = async () => {
    getPubSub().emit(PUBSUB_EVENTS.CLOSE_MODAL_PROGRAM_INFO_LEVEL);

    setIsOpened(false);
  };

  const bgClass = useMemo(() => {
    if ((!!missed_revenue || !!missed_partners) && !active) {
      return PROGRAMS_STYLES['missed'];
    }

    if (!active || !isCompletedCountdownXQore) {
      return PROGRAMS_STYLES['noActive'];
    }

    return PROGRAMS_STYLES[programName]?.bgColorClass || 'bg-main-blue';
  }, [programName, active, isPreviewMode, level, isCompletedCountdownXQore]);

  const onUpgradeClick = (e) => {
    if (isPreviewMode) return;

    e.preventDefault();

    setIsOpened(true);
  };

  const nestSizes = [
    {
      hexagon: 'w-98px h-60px sm:w-13 sm:h-20',
      circle: 'w-20 h-20 sm:w-15 sm:h-15',
      icon: 'w-7 h-7',
      textSize: 'text-base sm:text-sm',
    },
    {
      circle: 'w-20 h-20 sm:w-10 sm:h-10',
      icon: 'w-7 h-7 sm:h-5 sm:w-5',
      textSize: 'text-base sm:text-mini',
    },
    {
      circle: 'w-13 h-13 sm:w-6.5 sm:h-6.5',
      icon: 'w-6 h-6 sm:h-4 sm:w-4',
      textSize: 'text-sm sm:text-5px',
    },
    {
      circle: 'w-6.5 h-6.5 sm:w-3 sm:h-3',
      icon: 'w-3.5 h-3.5 sm:h-2 sm:w-2',
      textSize: 'text-mini sm:text-5px',
    },
  ];

  const nestSizesXqore = [
    {
      circle: 'w-[80px] h-[80px] sm:w-[70px] sm:h-[70px]',
      icon: 'w-6 h-6 sm:h-4 sm:w-4',
      textSize: 'text-sm sm:text-xs',
    },
    {
      circle: 'w-[50px] h-[50px] ',
      icon: 'w-3.5 h-3.5 sm:h-2 sm:w-2',
      textSize: 'text-mini sm:text-[10px]',
    },
  ];

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
      return <span> {seconds} seconds </span>;
    }
  };

  const partnerBorder = isXQore ? 'border border-main-blue' : '';

  const renderElements = (elements, nestingLvl) => {
    const currentElements = Array.from(Array(NESTED_FIRST_COUNT[programName]), (el, index) => {
      return elements?.[index]
        ? elements[index]
        : isXQore
        ? DEFAULT_LEVEL_MOCKS[programName]?.elements[index]
        : DEFAULT_LEVEL;
    });
    const size = isXQore ? nestSizesXqore[nestingLvl] : nestSizes[nestingLvl];
    const nextNestingLvl = nestingLvl + 1;

    return (
      <div className="flex w-full items-start justify-evenly mt-7.5 sm:mt-5 first:mt-0">
        <div
          className={`relative flex w-full justify-evenly items-start ${
            isXQore && (nestingLvl === 0 ? 'xQore-big-wrapper' : '')
          }`}
        >
          {currentElements?.map((lvl, lvlIndex) => {
            const bgElement = lvl.sync
              ? 'bg-white-700'
              : lvl?.active
              ? lvl.is_reinvest
                ? PARTNERS_STYLES?.['reinvest'][lvl?.overflow || 'private']?.bg
                : lvl.is_stored_coin
                ? PARTNERS_STYLES?.['stored_coin'][lvl?.overflow || 'private']?.bg
                : PARTNERS_STYLES?.[lvl?.overflow || 'private']?.bg
              : 'bg-hover-main-blue';
            const withFull = MAX_DEEP_ITERATION_PROGRAMS[programName] > nextNestingLvl;
            const IconItem = lvl?.active
              ? +nextNestingLvl === 1 && !!PARTNERS_STYLES?.[programName]?.[nextNestingLvl]
                ? PARTNERS_STYLES?.[programName]?.[nextNestingLvl]
                : lvl.is_reinvest
                ? PARTNERS_STYLES?.['reinvest']?.icon
                : lvl.is_stored_coin
                ? PARTNERS_STYLES?.['stored_coin']?.icon
                : PARTNERS_STYLES?.[lvl?.overflow || 'private']?.icon
              : PARTNERS_STYLES?.[programName]?.[nextNestingLvl];

            return (
              <div
                className={`flex flex-col justify-around items-center ${
                  isXQore ? `w-[50px] sm:w-[30px] place-${lvl?.place}` : ''
                } ${withFull && 'w-full'}`}
                key={lvlIndex}
              >
                <CustomLink
                  href={linkWithQuery(`/dashboard/${query.program}/${query.level}`, { user: lvl.user_id })}
                  withLink={!!lvl.user_id}
                >
                  <div className="relative">
                    <div
                      className={`flex flex-col  ${bgElement} 
                      items-center justify-center text-main-blue text-base group ${
                        nextNestingLvl <= 3 && !lvl.sync && 'hover:opacity-75'
                      } rounded-full ${partnerBorder} ${size?.circle} `}
                    >
                      {!lvl.sync && (
                        <>
                          {IconItem && (!lvl?.active || (lvl?.active && nestingLvl === 3)) && (
                            <IconItem className={`${size?.icon} ${lvl?.active && 'stroke-current text-main-bg'}`} />
                          )}
                          {lvl?.user_id && nextNestingLvl < 4 && (
                            <span className={`text-main-bg ${size?.textSize}`}>{lvl?.user_id}</span>
                          )}
                          {lvl?.user_id && (
                            <span
                              className={`${
                                nextNestingLvl > 3 && 'group-hover:flex group-hover:absolute'
                              } hidden w-20 h-20 sm:w-12 sm:h-12 rounded-full ${bgElement} text-main-bg flex justify-center items-center z-30 text-sm sm:text-mini `}
                            >
                              {lvl?.user_id}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </CustomLink>
                {(!!lvl?.elements?.length || MAX_DEEP_ITERATION_PROGRAMS[programName] > nextNestingLvl) &&
                  renderElements(lvl?.elements, nextNestingLvl)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderBody = useMemo(() => {
    if (!isCompletedCountdownXQore) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-white text-2xl sm:text-xl font-medium items-start pb-14">
          <AlarmWatchIcon className="w-24 h-24 pb-2.5" />
          <Countdown
            onComplete={() => setIsCompletedCountdownXQore(true)}
            date={XQORE_DATE_START}
            renderer={renderer}
          />
        </div>
      );
    }
    if ((missed_revenue || missed_partners) && !active) {
      return (
        <div className="flex flex-col justify-center items-center text-base leading-6 text-white mt-5">
          {!!missed_revenue ? (
            <>
              <span className="mb-2.5 text-base text-white-500 sm:text-sm">Missed profits</span>
              <span className="font-bold text-two-half notranslate sm:text-xl">
                {missed_revenue} {programCurrency}
              </span>
            </>
          ) : (
            <>
              <span className="mb-2.5 text-base text-white-500 sm:text-sm">Missed partners</span>
              <span className="font-bold text-two-half sm:text-xl">{missed_partners}</span>
            </>
          )}
        </div>
      );
    }

    if (!active) {
      return (
        <>
          <PumaLogo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 fill-current text-white-50 sm:w-48 sm:h-48" />
          <div className="flex flex-col justify-center items-center text-base leading-6 text-white mt-5 z-10">
            {level?.level && (
              <>
                <span className="mb-2.5 text-base text-white-500 sm:text-sm">Activation cost</span>
                <span className="font-bold text-two-half notranslate sm:text-xl">
                  {splitNumber(PROGRAM_PRICES[programName]?.[level?.level])} {programCurrency}
                </span>
              </>
            )}
          </div>
        </>
      );
    }

    if (active) {
      return (
        <>
          {isXQore ? (
            <div className="flex items-center justify-center relative w-[338px] h-[338px] sm:w-[280px] sm:h-[280px] mb-15 sm:mb-10">
              <div className="bg-black-verylight-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[338px] h-[338px] sm:w-[280px] sm:h-[280px] rounded-full" />
              <div className="bg-black-verylight-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[209px] h-[209px] sm:w-[180px] sm:h-[180px] rounded-full" />
              <div className="bg-main-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full" />
              <div className="bg-sky-blue-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[84px] h-[84px] rounded-full text-base text-white flex items-center justify-center">
                YOU
              </div>
              <div className="flex justify-center">{renderElements(level?.elements, 0)}</div>
            </div>
          ) : (
            <div className="flex justify-center mb-15 sm:mb-10">{renderElements(level?.elements, 0)}</div>
          )}
        </>
      );
    }

    return null;
  }, [level.active, level?.elements, missed_partners, missed_revenue, isXQore, isCompletedCountdownXQore, active]);

  const renderBottom = useMemo(() => {
    if (!isCompletedCountdownXQore) return null;
    if (!isPreviewMode && (isLastUnactive || (isLastUnactive && (!!missed_revenue || !!missed_partners)))) {
      return (
        <Button
          onClick={onUpgradeClick}
          className="animate-pulse z-10 mt-7.5"
          type={missed_revenue ? 'white-2' : 'primary'}
        >
          Activate now
        </Button>
      );
    }

    if (!active && !isPreviewMode) {
      return (
        <Button className="z-10 mt-7.5" disabled>
          Activate previous level to access
        </Button>
      );
    }

    if (active) {
      return (
        <div className="flex justify-between w-full">
          <div className="flex space-x-14 xl:space-x-8 sm:space-x-7.5">
            <div className="flex flex-col">
              <span className="text-white text-base sm:text-white-500 sm:text-sm">Partners</span>

              <div className="flex items-center mt-2.5">
                <PeopleIcon className="stroke-current text-white-500 w-6 h-6" />
                <span className="text-white text-base ml-2.5 sm:text-sm">{level?.descendants}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-base sm:text-white-500 sm:text-sm">Cycles</span>
              <div className="flex items-center mt-2.5">
                <ExchangeIcon className="stroke-current text-white-500 w-6 h-6" />
                <span className="text-white text-base ml-2.5 sm:text-sm">{level?.recycles}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-base text-right sm:text-white-500 sm:text-sm">Total level revenue</span>
            <div className="flex items-center mt-2.5 justify-end">
              <PurchaseIcon className="stroke-current text-white w-6 h-6" />
              <span className="text-white text-base ml-2.5 notranslate sm:text-sm">
                {splitNumber(level?.revenue)} {programCurrency}
              </span>
            </div>
          </div>
        </div>
      );
    }
  }, [active, level?.elements, isPreviewMode, missed_partners, isCompletedCountdownXQore]);

  const renderHeader = useMemo(() => {
    return (
      <>
        <div className="flex flex-1 items-start justify-start ">
          <div className="flex items-center space-x-2.5">
            <span className="text-white-300 text-two-half font-normal sm:text-xl">Lvl {level.level}</span>
            {!!level?.freeze && <SnowFlakeIcon className="w-8 h-8 stroke-current text-white-500 sm:w-6 sm:h-6" />}
          </div>
        </div>
        <ReactPlaceholder ready={level.user_id} showLoadingAnimation customPlaceholder={LevelUserIdPlaceholder}>
          <div className="flex-1 flex flex-col items-center">
            <span className="text-white text-two-half font-medium mb-2.5 sm:text-xl">
              {!isAuthedUserLevel ? `ID ${level.user_id}` : 'You'}
            </span>
            {isAuthedUserLevel && (
              <span className="rounded bg-white-100 px-2.5 text-white !leading-30px text-base sm:text-sm">
                ID {level?.user_id}
              </span>
            )}
          </div>
        </ReactPlaceholder>
        <div className="flex items-start justify-end flex-1 text-white-300 text-two-half font-normal text-right  sm:text-xl">
          <div className="flex items-center">
            <ProgramIcon className="w-6 h-6 sm:h-4 sm:w-4 mr-2.5 sm:mr-2" />
            {splitNumber(PROGRAM_PRICES[programName]?.[level?.level])}
          </div>
        </div>
      </>
    );
  }, [level, isAuthedUserLevel, query, ProgramIcon]);

  return (
    <>
      <div className={`flex w-full min-h-340px sm:min-h-290px col-span-4 rounded relative ${bgClass}`}>
        <div className="flex w-full flex-col z-10 p-7.5 sm:p-5">
          <ReactPlaceholder ready={!level.isLoading} showLoadingAnimation customPlaceholder={ProgramInfoPlaceHolder}>
            <div className="flex w-full justify-between pb-10 z-10">{renderHeader}</div>
            <div className={`flex flex-col ${isXQore ? 'justify-center items-center' : ''} w-full h-full z-10`}>
              {renderBody}
              {renderBottom}
            </div>
            {!!level?.freeze && (
              <img
                src="/freeze_bg_level.png"
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded opacity-50"
                alt=""
              />
            )}
          </ReactPlaceholder>
        </div>
        {!isFirstCycle && (
          <div className={`flex absolute rounded -bottom-5 top-5 right-5 left-2.5 bg-opacity-50 ${bgClass}`} />
        )}
      </div>
      {isOpened && <BuyProgramModal level={lastUnactiveLevel} name={programName} onClose={handleCloseModal} />}
    </>
  );
};
