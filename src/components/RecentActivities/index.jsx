import React, { useMemo, useEffect, useRef } from 'react';
import WalletIcon from 'assets/icons/wallet.svg';
import GiftIcon from 'assets/icons/gift.svg';
import NewUserIcon from 'assets/icons/new_user.svg';
import ActivateIcon from 'assets/icons/activate_activities.svg';
import EyeIcon from 'assets/icons/eye.svg';
import LinkSquareIcon from 'assets/icons/link_square.svg';
import { RoundShape, TextRow } from 'react-placeholder/lib/placeholders';
import { InfoBlock, CustomLink, Button } from 'components';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { parseUTC } from 'helpers/date';
import config from 'helpers/config';
import { PROGRAM_NAMES, XQORE_DATE_START } from 'helpers/constants';
import { PROGRAMS_STYLES } from 'helpers/program';
import { linkWithQuery } from 'helpers/links';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { Tips } from 'components/Tips';
import { splitNumber } from 'helpers/format';
import { ContractBlock } from 'components';
import { ReceivedTokens } from './ReceivedTokens';
import { useTimerOver } from 'helpers/hooks/useTimerOver';
import Countdown from 'react-countdown';

export const nameToContractConfig = {
  [PROGRAM_NAMES.X3]: 'contractXBase',
  [PROGRAM_NAMES.XXX]: 'contractXxx',
  [PROGRAM_NAMES.XGOLD]: 'contractXGold',
  [PROGRAM_NAMES.XQORE]: 'contractXqore',
};

export const RecentActivities = ({ events, isLoading, addItems, hiddenBtn, recentActivitiesRef }) => {
  const { isCompleted, onComplete } = useTimerOver(parseISO(XQORE_DATE_START));

  const containerRef = useRef(null);
  const contractInfo = useMemo(() => {
    if (isCompleted) {
      return [
        { name: `${PROGRAM_NAMES.X3}/${PROGRAM_NAMES.X4}`, address: config[nameToContractConfig[PROGRAM_NAMES.X3]] },
        { name: PROGRAM_NAMES.XXX, address: config[nameToContractConfig[PROGRAM_NAMES.XXX]] },
        { name: PROGRAM_NAMES.XGOLD, address: config[nameToContractConfig[PROGRAM_NAMES.XGOLD]] },
        { name: PROGRAM_NAMES.XQORE, address: config[nameToContractConfig[PROGRAM_NAMES.XQORE]] },
      ];
    }
    return [
      { name: `${PROGRAM_NAMES.X3}/${PROGRAM_NAMES.X4}`, address: config[nameToContractConfig[PROGRAM_NAMES.X3]] },
      { name: PROGRAM_NAMES.XXX, address: config[nameToContractConfig[PROGRAM_NAMES.XXX]] },
      { name: PROGRAM_NAMES.XGOLD, address: config[nameToContractConfig[PROGRAM_NAMES.XGOLD]] },
    ];
  }, [isCompleted]);

  useEffect(() => {
    containerRef?.current?.scrollTo({
      top: containerRef.current?.scrollHeight,
      behavior: 'smooth',
    });

    const refList = containerRef.current?.childNodes;
    const lastItems = refList?.length - 1 || 0;
    const childHeight = refList?.[lastItems - 2]?.getBoundingClientRect?.()?.height;

    setTimeout(() => {
      containerRef.current?.scrollTo({
        top: containerRef.current?.scrollTop + (childHeight + 5) * 2,
        behavior: 'smooth',
      });
    }, 0);
  }, [isLoading]);

  const contractStat = useMemo(() => {
    return [
      {
        title: 'Transactions made',
        total: splitNumber(events?.total_contract_transactions),
        new: splitNumber(events?.total_contract_transactions_dynamic),
      },
      {
        renderTitle: () => (
          <span>
            Turnover, <span className="notranslate">BUSD</span>{' '}
          </span>
        ),
        total: splitNumber(events?.total_revenue ? events?.total_revenue * 2 : ''),
        new: splitNumber(events?.day_revenue ? events?.day_revenue * 2 : ''),
      },
    ];
  }, [events]);

  const activitiesInfo = useMemo(() => {
    if (isCompleted) {
      return [
        {
          title: 'Members total',
          total: splitNumber(events?.count_total_users),
          new: splitNumber(events?.count_day_users),
          prompt: 'Total number of members in Forsage BUSD and last 24 hours change',
        },
      ];
    }
    return [
      {
        title: 'Members total',
        total: splitNumber(events?.count_total_users),
        new: splitNumber(events?.count_day_users),
        prompt: 'Total number of members in Forsage BUSD and last 24 hours change',
      },
      {
        title: 'Members received, BUSD',
        total: splitNumber(events?.total_revenue),
        new: splitNumber(events?.day_revenue),
        prompt: 'Total amount of BUSD received by all members of Forsage BUSD and last 24 hours change',
      },
    ];
  }, [events, isCompleted]);

  const activitiesReceivedTokens = useMemo(() => {
    return [
      {
        token: 'BUSD',
        total: splitNumber(events?.total_revenue),
        new: splitNumber(events?.day_revenue),
        prompt: 'Total amount of BUSD received by all members of Forsage BUSD and last 24 hours change',
      },
      {
        token: 'BNB',
        total: splitNumber(events?.total_revenue_bnb_forsage),
        new: splitNumber(events?.day_revenue_bnb_forsage),
        prompt: 'Total amount of BNB received by all members of Forsage BNB and last 24 hours change',
      },
    ];
  }, [events]);

  const renderPlaceholders = useMemo(() => {
    return new Array(7).fill({}).map((item, itemIndex) => (
      <div
        key={itemIndex}
        className="flex items-center justify-between py-7.5 border-line-gray border-b first:pt-0 w-full sm:py-5"
      >
        <div className="flex items-center justify-start w-full">
          <div className="flex w-10 h-10 items-center justify-center rounded-full">
            <RoundShape style={{ height: 24, width: 24, margin: 'auto' }} color="rgba(0,0,0, 0.4)" />
          </div>
          <div className="flex ml-5 items-center w-full">
            <TextRow style={{ margin: 0 }} color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
        </div>
      </div>
    ));
  }, [isLoading]);

  const activitiesList = useMemo(() => {
    return events?.activities?.map((item) => {
      switch (item.type) {
        case 'sale_place':
          return {
            icon: WalletIcon,
            iconWrapperColor: 'bg-green-200',
            iconStyles: 'fill-current text-green',
            userId: item?.user_id,
            userText: `ID ${item?.user_id}`,
            text: '+',
            revenue: item?.revenue,
            program: item?.program,
            hash: item?.transaction_hash,
            date: item?.date,
            currency: !!item?.currency ? item?.currency : 'BUSD',
          };
        case 'leading_gift':
        case 'upgrade_gift':
          return {
            icon: GiftIcon,
            iconWrapperColor: 'bg-green-200',
            iconStyles: 'fill-current text-green',
            userId: item?.user_id,
            userText: `ID ${item?.user_id}`,
            text: '+ bonus',
            revenue: item?.revenue,
            program: item?.program,
            hash: item?.transaction_hash,
            date: item?.date,
            currency: !!item?.currency ? item?.currency : 'BUSD',
          };
        case 'activate_program':
          if (item?.program === 'xBase') {
            return {
              icon: NewUserIcon,
              iconWrapperColor: 'bg-white-100',
              iconStyles: 'fill-current text-white',
              userId: item?.user_id,
              userText: `ID ${item?.user_id}`,
              idOrder: 'order-2',
              text: 'new user joined',
              hash: item?.transaction_hash,
              date: item?.date,
            };
          } else if (item?.program === PROGRAM_NAMES.XXX) {
            return {
              icon: ActivateIcon,
              iconWrapperColor: PROGRAMS_STYLES[PROGRAM_NAMES.XXX]?.iconBg,
              iconStyles: `fill-current ${PROGRAMS_STYLES[PROGRAM_NAMES.XXX]?.textColor}`,
              userId: item?.user_id,
              userText: `ID ${item?.user_id}`,
              activate_program: item?.program,
              text: 'activates',
              hash: item?.transaction_hash,
              date: item?.date,
            };
          } else if (item?.program === PROGRAM_NAMES.XGOLD) {
            return {
              icon: ActivateIcon,
              iconWrapperColor: PROGRAMS_STYLES[PROGRAM_NAMES.XGOLD]?.iconBg,
              iconStyles: `fill-current ${PROGRAMS_STYLES[PROGRAM_NAMES.XGOLD]?.textColor}`,
              userId: item?.user_id,
              userText: `ID ${item?.user_id}`,
              activate_program: item?.program,
              text: 'activates',
              hash: item?.transaction_hash,
              date: item?.date,
            };
          } else if (item?.program === PROGRAM_NAMES.XQORE) {
            return {
              icon: ActivateIcon,
              iconWrapperColor: PROGRAMS_STYLES[PROGRAM_NAMES.XQORE]?.iconBg,
              iconStyles: `fill-current ${PROGRAMS_STYLES[PROGRAM_NAMES.XQORE]?.textColor}`,
              userId: item?.user_id,
              userText: `ID ${item?.user_id}`,
              activate_program: item?.program,
              text: 'activates',
              hash: item?.transaction_hash,
              date: item?.date,
            };
          }
      }
    });
  }, [isLoading, events]);

  const renderContent = useMemo(() => {
    return activitiesList?.map((item, index) => {
      const Icon = item?.icon;
      return (
        <div
          className="flex items-center justify-between py-5 border-line-gray border-b first:pt-0 w-full sm:py-5 sm:items-start"
          key={index}
        >
          <div className="flex items-center sm:items-start justify-start sm:w-full">
            <div
              className={`${item?.iconWrapperColor} flex w-10 h-10 items-center justify-center rounded-full flex-shrink-0 sm:w-7.5 sm:h-7.5`}
            >
              <Icon className={`${!!item?.iconStyles && item?.iconStyles} w-5 h-5`} />
            </div>
            <div className="flex ml-5 items-center sm:w-full flex flex-wrap sm:ml-2.5">
              <CustomLink
                href={linkWithQuery('/dashboard', { user: item?.userId })}
                className={`flex items-center justify-center notranslate px-2.5 leading-30px bg-blue-100 hover:bg-main-blue-300 text-main-blue rounded font-medium text-base sm:text-sm w-max ${
                  !!item?.idOrder && item?.idOrder
                }`}
              >
                {item?.userText}
              </CustomLink>
              <div
                className={`h-full flex flex-wrap justify-center items-center mx-2.5 sm:mx-1.5 ${
                  !!item?.idOrder && 'ml-0'
                }`}
              >
                <span className="text-white-500 text-base sm:text-sm sm:leading-30px">{item?.text}</span>
                {item?.revenue && (
                  <>
                    <span className="text-white text-base sm:text-sm mx-1 notranslate sm:leading-30px">
                      {item?.revenue} {item?.currency}{' '}
                    </span>
                    <span className="text-white-500 text-base sm:text-sm sm:leading-30px">
                      in{' '}
                      <span className={`notranslate ${PROGRAMS_STYLES[item?.program]?.textColor}`}>
                        {' '}
                        {item?.program}{' '}
                      </span>
                    </span>
                  </>
                )}
                {!!item?.activate_program && (
                  <span className="text-white text-base sm:text-sm sm:leading-30px">
                    &nbsp;
                    <span className={`notranslate ${PROGRAMS_STYLES[item?.activate_program]?.textColor}`}>
                      {item?.activate_program}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center justify-end whitespace-nowrap h-full">
              <CustomLink className="sm:order-2" targetBlank href={`${config.scanNetwork}${item?.hash}`}>
                <LinkSquareIcon className="w-6 h-6" />
              </CustomLink>
              {!!item?.date && (
                <span className="ml-2.5 text-white-500 text-base sm:text-sm sm:order-1 sm:ml-2.5 sm:mr-1 sm:leading-30px">
                  {formatDistanceToNow(parseUTC(new Date(parseISO(item?.date)))).replace('about ', '~ ')}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    });
  }, [isLoading, activitiesList]);

  return (
    <div ref={recentActivitiesRef} className="flex flex-col">
      <div className="flex items-center sm:px-5">
        <span className="text-white text-3xl font-bold sm:text-2xl">Platform recent activity</span>
        <Tips title="Platform recent activity" />
      </div>
      <div className="grid grid-cols-3 gap-10 mt-5 lg:grid-cols-1 lg:gap-0 z-10">
        <div className="notranslate w-full overflow-hidden flex flex-col col-span-2 p-5 bg-gray rounded h-[1000px]  lg:order-2 sm:rounded-none sm:p-5 sm:max-h-3/4">
          <div ref={containerRef} className="flex -mr-10 pr-10 flex-col flex-1 overflow-auto">
            {isLoading && !events?.activities?.length ? renderPlaceholders : renderContent}
          </div>
          {(!hiddenBtn || isLoading) && (
            <Button
              type="light-white"
              className="w-full rounded-mini mt-5 flex justify-center items-center"
              onClick={addItems}
            >
              {isLoading ? (
                <PuffLoadingIcon className="w-6 h-6" />
              ) : (
                <>
                  <EyeIcon className="mr-2.5" /> See more
                </>
              )}
            </Button>
          )}
        </div>
        <div className="flex flex-col space-y-10 lg:w-full lg:order-1 lg:mb-10 sm:mb-5 sm:space-y-5 sm:px-5">
          {activitiesInfo?.map((item, index) => (
            <InfoBlock {...item} key={index} />
          ))}
          {isCompleted && <ReceivedTokens data={activitiesReceivedTokens} />}
          <ContractBlock
            contractInfo={contractInfo}
            contractStat={contractStat}
            titleBlock={'Forsage BUSD Contracts'}
          />
        </div>
        <div className="hidden">
          <Countdown date={XQORE_DATE_START} onComplete={onComplete} />
        </div>
      </div>
    </div>
  );
};
