import React, { useEffect, useMemo, useState } from 'react';
import { useRequest } from 'helpers/hooks/useRequest';
import { UserRepository } from 'connectors/repositories/user';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ArrowDown from 'assets/icons/arrow_down.svg';
import { DropdownSelect } from './DropdownSelect';
import { isEmpty, reject } from 'ramda';
import { enUS } from 'date-fns/locale';

const periodOptions = [
  {
    title: 'year',
    value: 'year',
  },
  {
    title: 'month',
    value: 'month',
  },
];

const START_YEAR = 2021;

export const PartnersBar = ({ user }) => {
  const { data, call } = useRequest(UserRepository.getRefChart);
  const [periodParams, setPeriodParams] = useState({
    period: 'month',
    year: new Date()?.getFullYear(),
    month: new Date()?.getMonth() + 1,
  });

  const monthOptions = useMemo(() => {
    const currentDate = new Date();

    if (currentDate?.getFullYear() === START_YEAR) {
      return Array.from(new Array(12 - new Date()?.getMonth() + 5), (v, i) => ({
        title: enUS.localize.month(i + 4),
        value: i + 5,
      }));
    } else if (currentDate?.getFullYear() === periodParams.year) {
      return Array.from(new Array(currentDate?.getMonth() + 1), (v, i) => ({
        title: enUS.localize.month(i),
        value: i + 1,
      }));
    }

    return Array.from(new Array(12), (v, i) => ({
      title: enUS.localize.month(i),
      value: i + 1,
    }));
  }, [periodParams]);

  const yearOptions = Array.from(new Array(new Date()?.getFullYear() - START_YEAR + 1), (v, i) => ({
    title: i + START_YEAR,
    value: i + START_YEAR,
  }));

  const onChangeSelect = (field) => (value) => {
    if (field === 'period') {
      const stateProps =
        value === 'month'
          ? { year: new Date()?.getFullYear(), month: new Date()?.getMonth() + 1 }
          : { year: new Date()?.getFullYear(), month: '' };
      if (value === 'month') {
        return setPeriodParams((prev) => ({ ...prev, [field]: value, ...stateProps }));
      } else {
        return setPeriodParams((prev) => ({ ...prev, [field]: value, ...stateProps }));
      }
    }

    setPeriodParams((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    call([user, reject(isEmpty, periodParams)]);
  }, [periodParams]);

  const barData = data?.elements?.map((item, index) => ({
    period:
      periodParams.period === 'year'
        ? enUS.localize.month(item.index - 1)
        : `${item.index} of ${enUS.localize.month(periodParams.month - 1)}`,
    partners: item.value,
  }));

  return (
    <div className="flex flex-col p-7.5 sm:p-5 rounded bg-black-light w-full max-w-470px xl:max-w-full xl:mb-10 sm:mb-5">
      <div className="flex w-full justify-between items-center sm:flex-col sm:items-start sm:space-y-2.5">
        <div className="flex items-center">
          <span className="text-white-500 text-base">New partners by </span>
          <DropdownSelect options={periodOptions} onChange={onChangeSelect('period')} value={periodParams.period}>
            <div className="flex ml-1 items-center w-20 cursor-pointer">
              <span className="text-white text-base">{periodParams.period}</span>
              <ArrowDown className={'ml-1 flex-shrink-0'} />
            </div>
          </DropdownSelect>
        </div>
        <div className="flex space-x-3">
          {periodParams.period === 'month' && (
            <DropdownSelect options={monthOptions} onChange={onChangeSelect('month')} value={periodParams.month}>
              <div className="inline-flex cursor-pointer px-2.5 bg-blue-100 hover:bg-main-blue-300 text-main-blue rounded text-base !leading-8 w-max sm:text-base">
                {enUS.localize.month(periodParams.month - 1)}
              </div>
            </DropdownSelect>
          )}
          <DropdownSelect
            options={yearOptions}
            onChange={onChangeSelect('year')}
            value={periodParams.year}
            disableDropdown={yearOptions.length === 1}
          >
            <div
              className={`inline-flex cursor-pointer px-2.5 bg-blue-100 text-main-blue rounded text-base !leading-8 w-max sm:text-base ${
                yearOptions.length > 1 ? 'hover:bg-main-blue-300' : ''
              }`}
            >
              {periodParams.year}
            </div>
          </DropdownSelect>
        </div>
      </div>
      <div className="flex flex-shrink w-full h-full max-h-52 sm:h-40 mt-5 max-w-470px xl:max-w-700px lg:max-w-full sm:mt-5">
        <div className="flex flex-shrink w-full h-full max-h-52 sm:h-40 mt-8 max-w-470px xl:max-w-700px lg:max-w-full">
          <ResponsiveContainer>
            <BarChart data={barData}>
              <Bar dataKey="partners" fill="#406AFF" minPointSize={1} />
              <YAxis
                orientation="right"
                dataKey="partners"
                axisLine={false}
                tickLine={false}
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <XAxis dataKey="period" tick={false} tickLine={false} stroke={'none'} />
              <Tooltip labelClassName="!text-black-100" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
