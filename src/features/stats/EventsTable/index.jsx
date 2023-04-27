import React, { useMemo } from 'react';
import { RoundShape, TextRow } from 'react-placeholder/lib/placeholders';
import CopyIcon from 'assets/icons/copy_white.svg';
import clsx from 'clsx';
import { shortenAddress } from 'helpers/format';
import { copy } from 'helpers/text';
import { CustomLink, Button, TableIcons } from 'components';
import config from 'helpers/config';
import EyeIcon from 'assets/icons/eye.svg';
import { linkWithQuery } from 'helpers/links';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import LinkSquareIcon from 'assets/icons/link_square.svg';
import { PROGRAM_NAMES, SORT_MAP_STATS } from 'helpers/constants';
import _debounce from 'lodash/debounce';
import { SortIcon } from 'assets/icons/sort_arrow.svg';

export const EventsTable = ({ className, dataTable, isLoading, hideBtn, onAdd, sortType, setSortType }) => {
  const events = dataTable?.elements;

  const renderPlaceholders = useMemo(() => {
    return Array.from(new Array(6)).map((value, index) => (
      <tr className="border-b border-white-100" key={index}>
        <td className="py-6 px-6 text-left whitespace-nowrap flex-shrink-0 w-20 h-20">
          <RoundShape style={{ margin: 'auto' }} color={'#000'} />
        </td>
        <td className="py-6 px-6 whitespace-nowrap sm:w-20">
          <div>
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </td>
        <td className="py-6 px-6 whitespace-nowrap sm:w-20">
          <div>
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </td>
        <td className="py-6 px-6 whitespace-nowrap sm:w-20">
          <div>
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </td>
        <td className="py-6 px-6 whitespace-nowrap sm:w-20">
          <div>
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </td>
        <td className="py-6 px-6 whitespace-nowrap sm:w-20">
          <div>
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </td>
        <td className="py-6 px-6 whitespace-nowrap">
          <div>
            <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
          </div>
        </td>
      </tr>
    ));
  }, [isLoading]);

  const eventsList = useMemo(() => {
    return events?.map((item) => {
      switch (item?.type) {
        case 'reinvest':
          return {
            type: item?.type,
            overflow: item?.overflow,
            reinvest_index: item?.reinvest_index,
            title:
              item?.program === PROGRAM_NAMES?.XGOLD || item?.program === PROGRAM_NAMES?.XXX
                ? 'recycle (released cycle)'
                : 'recycle',
            id: item?.referrer_id,
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: !!item?.overflow
              ? item?.overflow === 'up'
                ? 'text-orange'
                : 'text-yellow'
              : 'text-green-light',
            tx: item?.tx,
          };
        case 'sale_place':
          return {
            type: item?.type,
            overflow: item?.overflow,
            id: item?.referrer_id,
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'text-white',
            tx: item?.tx,
          };
        case 'send_upline':
          return {
            type: item?.type,
            title: 'send to upline',
            id: item?.referrer_id,
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'text-white',
            tx: item?.tx,
          };
        case 'upgrade_gift':
          return {
            type: item?.type,
            id: item?.referrer_id,
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-light-blue',
            tx: item?.tx,
          };
        case 'leading_gift':
          return {
            type: item?.type,
            id: item?.referrer_id,
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-light-blue',
            tx: item?.tx,
          };
        case 'stored_coin':
          return {
            type: item?.type,
            id: item?.referrer_id,
            title: 'stored coin',
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'text-yellow',
            tx: item?.tx,
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
          };
        }
        case 'activate_program':
          return {
            type: item?.type,
            title: 'activation',
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-main-blue',
            tx: item?.tx,
          };
        case 'upgrade':
          return {
            type: item?.type,
            title: 'upgrade',
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-green-light',
            tx: item?.tx,
          };
        case 'upgrade_missed':
          return {
            type: item?.type,
            overflow: item?.overflow,
            id: item?.referrer_id,
            title: 'missed profit (level freeze)',
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-red',
            tx: item?.tx,
          };
        case 'leading_missed':
          return {
            type: item?.type,
            overflow: item?.overflow,
            id: item?.referrer_id,
            title: 'missed profit (overtake)',
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-red',
            tx: item?.tx,
          };
        case 'leading_send_upline':
          return {
            type: item?.type,
            overflow: item?.overflow,
            id: item?.referrer_id,
            title: 'missed partner (overtake)',
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-red',
            tx: item?.tx,
          };
        default:
          return {
            iconBg: 'bg-light-blue-100',
            id: item?.referrer_id,
            title: item?.type,
            date: item?.date,
            lvl: item?.level,
            program: item?.program,
            wallet: item?.referrer_address,
            revenue: item?.revenue,
            textStyle: 'fill-current text-light-blue',
            tx: item?.tx,
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
          <td className="p-4 text-left whitespace-nowrap sm:p-3">
            <div className="text-white-500 text-sm ">{item?.date}</div>
          </td>
          <td className="p-4 text-left whitespace-nowrap notranslate sm:p-3">
            {item?.id && (
              <CustomLink
                href={linkWithQuery('/dashboard', { user: item?.id })}
                className="flex items-center justify-center px-2.5 leading-30px bg-blue-100 hover:bg-main-blue-3000 text-main-blue rounded w-max text-sm"
              >
                ID {item?.id}
              </CustomLink>
            )}
          </td>
          <td className="py-6 px-6 text-left whitespace-nowrap">
            <div className="text-white text-sm notranslate">{item?.program}</div>
          </td>
          <td className="p-4 text-left whitespace-nowrap sm:p-3">
            <div className="text-white text-sm notranslate">{item?.lvl}</div>
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
                <div className="text-white text-sm text-right notranslate">{item?.revenue} BUSD</div>
              </td>
            </>
          )}
        </tr>
      );
    });
  }, [isLoading, events]);

  const tableTitleClickSortHandler = (event) => {
    const target = event.target.innerText;
    if (Object.keys(SORT_MAP_STATS).includes(target)) {
      const currentSortType = Object.keys(sortType)[0];
      setSortType({
        [target]: currentSortType === target ? (sortType[target] === 'asc' ? 'desc' : 'asc') : 'asc',
      });
    }
  };

  const columns = [
    {
      title: 'Type',
      key: 'Type',
      style: 'p-4 text-left font-normal notranslate sm:p-3',
    },
    {
      title: 'Date',
      key: 'Date',
      style: 'p-4 text-left font-normal notranslate cursor-pointer sm:p-3',
    },
    {
      title: 'ID',
      key: 'ID',
      style: 'p-4 text-left font-normal notranslate sm:p-3',
    },
    {
      title: 'Program',
      key: 'Program',
      style: 'p-4 text-left font-normal notranslate sm:p-3',
    },
    {
      title: 'Level',
      key: 'Level',
      style: 'p-4 text-left font-normal notranslate cursor-pointer sm:p-3',
    },
    {
      title: 'Wallet',
      key: 'Wallet',
      style: 'p-4 text-left font-normal notranslate sm:p-3',
    },
    {
      title: 'BUSD profit / Type',
      key: 'BUSD profit / Type',
      style: 'p-4 text-left font-normal notranslate cursor-pointer sm:p-3',
    },
  ];

  return (
    <div
      className={clsx(
        className,
        'flex flex-col w-full flex-col bg-black-light rounded overflow-hidden h-full min-h-90 sm:max-h-3/4',
      )}
    >
      <div className="overflow-auto">
        <table className="min-w-max w-full table-auto border-white-100">
          <thead>
            <tr
              className="text-white-500 text-xs border-b border-white-100"
              onClick={_debounce(tableTitleClickSortHandler, 500, { maxWait: 1000 })}
            >
              {columns.map((item) => (
                <th key={item.key} className={item.style}>
                  <div className="flex items-center">
                    {item.title}
                    {Object.keys(SORT_MAP_STATS).includes(item.key) && (
                      <div className="flex flex-col ml-[4px]">
                        <SortIcon
                          className={
                            Object.keys(sortType)[0] === item.key && Object.values(sortType)[0] === 'asc'
                              ? 'fill-[#FFE027] opacity-100'
                              : ''
                          }
                        />
                        <SortIcon
                          className={`rotate-180 mt-[2px] ${
                            Object.keys(sortType)[0] === item.key && Object.values(sortType)[0] === 'desc'
                              ? 'fill-[#FFE027] opacity-100'
                              : ''
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {isLoading && !events?.length ? renderPlaceholders : renderContent}
          </tbody>
        </table>
      </div>
      {(!hideBtn || isLoading) && (
        <div className="flex p-4 sm:p-2.5">
          <Button type="light-white" className="w-full rounded-mini flex justify-center items-center" onClick={onAdd}>
            {isLoading ? (
              <PuffLoadingIcon className="w-6 h-6" />
            ) : (
              <>
                <EyeIcon className="mr-2.5" /> <span>See more</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
