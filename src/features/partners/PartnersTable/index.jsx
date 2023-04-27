import React, { useMemo } from 'react';
import { TextRow } from 'react-placeholder/lib/placeholders';
import CopyIcon from 'assets/icons/copy_white.svg';
import SortIcon from 'assets/icons/sort_arrow.svg';
import { shortenAddress } from 'helpers/format';
import { Button, CustomLink } from 'components';
import EyeIcon from 'assets/icons/eye.svg';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import config from 'helpers/config';
import { SORT_MAP_PARTNERS } from 'helpers/constants';
import { copy } from 'helpers/text';
import { linkWithQuery } from 'helpers/links';
import LinkSquareIcon from 'assets/icons/link_square.svg';
import { format } from 'date-fns';
import _debounce from 'lodash/debounce';

export const PartnersTable = ({ isLoading, partnersList, hideBtn, addItems, sortType, setSortType }) => {
  const renderPlaceholders = useMemo(() => {
    return Array.from(new Array(4)).map((index) => (
      <tr className="border-b border-white-100 last:border-b-0" key={index}>
        {Array.from(new Array(10)).map((v, indexMap) => (
          <td
            className="p-6 xl:p-4 lg:p-6 lg:px-3 text-left whitespace-nowrap flex-shrink-0 w-[110px] h-30 sm:w-20 sm:h-20"
            key={indexMap}
          >
            <div className="text-white font-medium text-xs">
              <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            </div>
          </td>
        ))}
      </tr>
    ));
  }, [isLoading]);

  const columns = [
    {
      title: 'Date',
      key: 'date',
      rowStyle: 'text-left text-white-500 font-medium text-xs',
      colsStyle: 'text-left',
      render: (value) => <span>{format(new Date(value), 'dd.MM.yyyy kk:mm')}</span>,
    },
    {
      title: 'Address',
      key: 'address',
      rowStyle: 'text-left',
      colsStyle: 'text-left',
      render: (value) => (
        <div className="flex items-center space-x-2.5">
          <span className="text-white font-medium text-xs">{shortenAddress(value)}</span>
          <button
            onClick={() => {
              copy(value);
            }}
          >
            <CopyIcon className="h-18px w-18px" />
          </button>
          <CustomLink targetBlank href={`${config.scanNetworkAddress}${value}`}>
            <LinkSquareIcon className="h-18px w-18px" />
          </CustomLink>
        </div>
      ),
    },
    {
      renderTitle: () => <span className="notranslate">ID</span>,
      key: 'user_id',
      rowStyle: 'text-left',
      colsStyle: 'text-left',
      render: (value) => (
        <CustomLink
          href={linkWithQuery('/dashboard', { user: value })}
          className="flex items-center notranslate justify-center px-2.5 leading-30px bg-blue-100 hover:bg-main-blue-300 text-main-blue rounded w-max text-sm"
        >
          ID {value}
        </CustomLink>
      ),
    },
    {
      renderTitle: () => <span className="notranslate">x3</span>,
      key: 'last_active_level_x3',
      rowStyle: 'text-center text-white font-medium text-xs',
      colsStyle: 'text-center',
    },
    {
      renderTitle: () => <span className="notranslate">x4</span>,
      key: 'last_active_level_x4',
      rowStyle: 'text-center text-white font-medium text-xs',
      colsStyle: 'text-center',
    },
    {
      renderTitle: () => <span className="notranslate">xXx</span>,
      key: 'last_active_level_xxx',
      rowStyle: 'text-center text-white font-medium text-xs',
      colsStyle: 'text-center',
    },
    {
      renderTitle: () => <span className="notranslate">xGold</span>,
      key: 'last_active_level_xgold',
      rowStyle: 'text-center text-white font-medium text-xs',
      colsStyle: 'text-center',
    },
    {
      renderTitle: () => <span className="notranslate">xQore</span>,
      key: 'last_active_level_xqore',
      rowStyle: 'text-center text-white font-medium text-xs',
      colsStyle: 'text-center',
    },
    {
      title: 'Profit BUSD',
      key: 'total_revenue',
      rowStyle: 'text-right text-white font-medium text-xs',
      colsStyle: 'text-right',
      render: (value) => value + ' BUSD',
    },
    {
      title: 'Profit BNB',
      key: 'total_revenue_bnb_forsage',
      rowStyle: 'text-right text-white font-medium text-xs',
      colsStyle: 'text-right',
      render: (value) => value + ' BNB',
    },
    {
      title: 'New partners',
      key: 'new_partners',
      rowStyle: 'text-white text-right font-medium text-xs',
      colsStyle: 'text-right',
      render: (value) => {
        if (value > 0) {
          return <span className="text-green-350 font-semibold">+ {value}</span>;
        }
        return <span>{value}</span>;
      },
    },
    {
      title: 'Partners',
      key: 'total_partners',
      rowStyle: 'text-white text-right font-medium text-xs',
      colsStyle: 'text-right',
    },
  ];

  const renderContent = useMemo(() => {
    return partnersList?.map((row, index) => {
      return (
        <tr
          className={`${
            row.new_partners ? 'bg-green-100' : ''
          } border-b border-white-100 whitespace-nowrap last:border-b-0`}
          key={index}
        >
          {columns?.map((col, indexRow) => {
            return (
              <td className={`p-6 xl:p-4 lg:p-6 lg:p-3 whitespace-nowrap notranslate ${col.rowStyle}`} key={indexRow}>
                {col.render ? col.render(row[col.key]) : row[col.key]}
              </td>
            );
          })}
        </tr>
      );
    });
  }, [isLoading, partnersList]);

  const tableTitleClickSortHandler = (event) => {
    const target = event.target.innerText;
    if (Object.keys(SORT_MAP_PARTNERS).includes(target)) {
      const currentSortType = Object.keys(sortType)[0];
      setSortType({
        [target]: currentSortType === target ? (sortType[target] === 'asc' ? 'desc' : 'asc') : 'asc',
      });
    }
  };

  return (
    <div className="flex flex-col mb-5 w-full">
      <div className="flex-1 sm:rounded-none z-10 flex flex-col w-full flex-col bg-black-light rounded overflow-hidden h-full min-h-90 sm:max-h-3/4">
        <div className="overflow-auto">
          <table className="min-w-max w-full table-auto border-white-100">
            <thead>
              <tr className="text-white-500 text-xs font-normal border-b border-white-100">
                {columns.map((item, index) => (
                  <th
                    className={`${
                      Object.values(SORT_MAP_PARTNERS).includes(item.key) ? 'cursor-pointer' : ''
                    } p-6 xl:p-4 lg:p-6 lg:px-3 ${item.colsStyle}`}
                    key={index}
                    onClick={_debounce(tableTitleClickSortHandler, 500, { maxWait: 1000 })}
                  >
                    <div className="whitespace-nowrap flex items-center notranslate">
                      {!!item.title ? item.title : item.renderTitle()}
                      {Object.values(SORT_MAP_PARTNERS).includes(item.key) && (
                        <div className="flex flex-col ml-[4px]">
                          <SortIcon
                            className={
                              SORT_MAP_PARTNERS[Object.keys(sortType)[0]] === item.key &&
                              Object.values(sortType)[0] === 'asc'
                                ? 'fill-[#FFE027] opacity-100'
                                : ''
                            }
                          />
                          <SortIcon
                            className={`rotate-180 mt-[2px] ${
                              SORT_MAP_PARTNERS[Object.keys(sortType)[0]] === item.key &&
                              Object.values(sortType)[0] === 'desc'
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
            <tbody className="text-gray-600 text-sm font-light">{isLoading ? renderPlaceholders : renderContent}</tbody>
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
                  <EyeIcon className="mr-2.5" /> <span>See more</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
