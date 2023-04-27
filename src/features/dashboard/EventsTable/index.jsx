import React, { useMemo } from 'react';
import { RoundShape, TextRow } from 'react-placeholder/lib/placeholders';
import CopyIcon from 'assets/icons/copy_white.svg';
import clsx from 'clsx';
import { shortenAddress } from 'helpers/format';
import { copy } from 'helpers/text';
import { CustomLink, Button, TableIcons } from 'components';
import config from 'helpers/config';
import EyeIcon from 'assets/icons/eye.svg';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { linkWithQuery } from 'helpers/links';
import LinkSquareIcon from 'assets/icons/link_square.svg';
import { useRouter } from 'next/router';
import { PROGRAM_NAMES } from 'helpers/constants';

export const EventsTable = ({ program, events, hideBtn, addItems, className, isLoading }) => {
  const { query } = useRouter();
  const eventsCurrency = !!program ? (program === PROGRAM_NAMES.XQORE ? 'BNB' : 'BUSD') : 'BNB/BUSD';

  const renderPlaceholders = useMemo(() => {
    return Array.from(new Array(2)).map((value, index) => (
      <tr className="border-b border-white-100" key={index}>
        <td className="py-6 px-6 text-left whitespace-nowrap flex-shrink-0 w-20 h-20">
          <RoundShape style={{ height: 24, width: 24, margin: 'auto' }} color="rgba(0,0,0, 0.4)" />
        </td>
        <td className="py-6 px-6 text-left whitespace-nowrap">
          <div className="text-white font-medium text-xs">
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </td>
        <td className="py-6 px-6 text-left whitespace-nowrap">
          <div>
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </td>
        <td className="py-6 px-6 text-left whitespace-nowrap">
          <div className="text-white font-medium text-xs">
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </td>
        <td className="py-6 px-6 text-left whitespace-nowrap">
          <div className="text-white font-medium text-xs">
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </td>
        <td className="py-6 px-6 text-left whitespace-nowrap">
          <div className="text-white font-medium text-xs">
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </td>
      </tr>
    ));
  }, [isLoading]);

  const eventsList = useMemo(() => {
    return events?.elements?.map((item) => {
      switch (item?.type) {
        case 'reinvest':
          return {
            type: item?.type,
            overflow: item?.overflow,
            reinvest_index: item?.reinvest_index,
            title:
              query?.program === PROGRAM_NAMES?.XGOLD || query?.program === PROGRAM_NAMES?.XXX
                ? 'recycle (released cycle)'
                : 'recycle',
            id: item?.referrer_id,
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: !!item?.overflow
              ? item?.overflow === 'up'
                ? 'text-orange'
                : 'text-yellow'
              : 'text-green-light',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        case 'sale_place':
          return {
            type: item?.type,
            overflow: item?.overflow,
            id: item?.referrer_id,
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'text-white',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        case 'send_upline':
          return {
            type: item?.type,
            title: 'send to upline',
            id: item?.referrer_id,
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'text-white',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        case 'upgrade_gift':
          return {
            type: item?.type,
            id: item?.referrer_id,
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-light-blue',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        case 'leading_gift':
          return {
            type: item?.type,
            id: item?.referrer_id,
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-light-blue',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        case 'stored_coin':
          return {
            type: item?.type,
            id: item?.referrer_id,
            title: 'stored coin',
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'text-yellow',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        case 'released_coin': {
          return {
            type: item?.type,
            id: item?.referrer_id,
            title: 'released coin',
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'text-hover-purple',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        }
        case 'activate_program':
          return {
            type: item?.type,
            title: 'activation',
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-main-blue',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        case 'upgrade':
          return {
            type: item?.type,
            title: 'upgrade',
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-green-light',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        case 'upgrade_missed':
          return {
            type: item?.type,
            overflow: item?.overflow,
            id: item?.referrer_id,
            title: 'missed profit (level freeze)',
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-red',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        case 'leading_missed':
          return {
            type: item?.type,
            overflow: item?.overflow,
            id: item?.referrer_id,
            title: 'missed profit (overtake)',
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-red',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        case 'leading_send_upline':
          return {
            type: item?.type,
            overflow: item?.overflow,
            id: item?.referrer_id,
            title: 'missed partner (overtake)',
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-red',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
        default:
          return {
            iconBg: 'bg-light-blue-100',
            id: item?.referrer_id,
            title: item?.type,
            date: item?.date,
            lvl: item?.level,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-light-blue',
            tx: item?.tx,
            currency: item?.currency || 'BUSD',
          };
      }
    });
  }, [isLoading, events]);

  const renderContent = useMemo(() => {
    return eventsList?.map((item, index) => {
      return (
        <tr className="border-b border-white-100 last:border-none" key={index}>
          <td className="p-4 text-left whitespace-nowrap sm:p-3">
            <TableIcons type={item?.type} overflow={item?.overflow} reinvest_index={item?.reinvest_index} />
          </td>
          <td className=" p-4 text-left whitespace-nowrap sm:p-3">
            <div className="text-white-500 text-sm ">{item?.date}</div>
          </td>
          <td className="p-4 text-left whitespace-nowrap sm:p-3">
            {!!item?.id && (
              <CustomLink
                href={linkWithQuery('/dashboard', { user: item?.id })}
                className="flex items-center notranslate justify-center px-2.5 leading-30px bg-blue-100 hover:bg-main-blue-300 text-main-blue rounded w-max text-sm"
              >
                ID {item?.id}
              </CustomLink>
            )}
          </td>
          <td className="p-4 text-left whitespace-nowrap sm:p-3">
            <div className="text-white text-sm ">{item?.lvl}</div>
          </td>
          <td className="p-4 text-left whitespace-nowrap sm:p-3">
            <div className="flex text-white text-sm space-x-5 notranslate sm:space-x-3">
              <span>{shortenAddress(item?.wallet, 5)}</span>
              <button
                onClick={() => {
                  copy(item?.wallet);
                }}
              >
                <CopyIcon className="h-18px w-18px" />
              </button>
              <CustomLink targetBlank href={`${config.scanNetwork}${item?.tx}`}>
                <LinkSquareIcon className="w-18px h-18px" />
              </CustomLink>
            </div>
          </td>
          {item?.title ? (
            <td className="p-4 text-left whitespace-nowrap sm:p-3" colSpan="2">
              <div className={`${item?.textStyle} text-right text-sm`}>{item?.title}</div>
            </td>
          ) : (
            <>
              <td className="p-4 text-left whitespace-nowrap sm:p-3">
                <div className="text-white text-sm text-right notranslate">
                  {item?.revenue} {item?.currency}
                </div>
              </td>
            </>
          )}
        </tr>
      );
    });
  }, [isLoading, events]);

  return (
    <div
      className={clsx(
        className,
        'flex flex-1 flex-col w-full flex-col bg-black-light rounded overflow-hidden h-full min-h-90 sm:max-h-3/4',
      )}
    >
      <div className="overflow-auto">
        <table className="min-w-max w-full table-auto border-white-100">
          <thead>
            <tr className="text-white-500 text-xs border-b border-white-100">
              <th className="p-4 text-left font-normal sm:p-3 ">Type</th>
              <th className="p-4 text-left font-normal sm:p-3">Date</th>
              <th className="p-4 text-left font-normal notranslate sm:p-3">ID</th>
              <th className="p-4 text-left font-normal sm:p-3">Level</th>
              <th className="p-4 text-left font-normal sm:p-3">Wallet</th>
              <th className="p-4 text-right font-normal notranslate sm:p-3">{eventsCurrency}</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light align-baseline">
            {isLoading && !events?.elements?.length ? renderPlaceholders : renderContent}
          </tbody>
        </table>
      </div>
      {(!hideBtn || isLoading) && (
        <div className="flex p-4 sm:p-2.5">
          <Button
            type="light-white"
            className="w-full rounded-mini flex justify-center items-center"
            onClick={addItems}
          >
            {isLoading ? (
              <PuffLoadingIcon className="w-6 h-6" />
            ) : (
              <>
                <EyeIcon className="mr-2.5" />
                <span> See more </span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
