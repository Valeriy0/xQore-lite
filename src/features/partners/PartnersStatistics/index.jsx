import React, { useEffect, useMemo } from 'react';
import PumaIcon from 'assets/forsage/puma.svg';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { InfoBlock } from 'components';
import { PartnersBar } from './PartnersBar';
import { splitNumber } from 'helpers/format';

export const PartnersStatistics = ({ user, statistic }) => {
  const chartView = useMemo(() => {
    if (statistic?.chart.length > 1) {
      return (
        <ResponsiveContainer>
          <AreaChart data={statistic?.chart?.map(({ x, y }) => ({ name: x, uv: y }))}>
            <Area type="monotone" dataKey="uv" stroke="#406AFF" fill="rgba(64, 106, 255, 0.3)" />
          </AreaChart>
        </ResponsiveContainer>
      );
    } else {
      return <PumaIcon className="absolute top-1/2 right-0 transform -translate-y-1/2 fill-current text-white-100" />;
    }
  }, [statistic?.chart]);

  const mainInfo = useMemo(() => {
    return {
      clicks: {
        title: 'Link clicks',
        value: statistic?.ref_clicks,
        new: statistic?.ref_clicks_dynamic,
      },
      team: {
        title: 'Team',
        value: statistic?.team,
        new: statistic?.team_dynamic,
      },
      revenue: {
        title: 'Profits',
        value: splitNumber(statistic?.total_revenue),
        new: splitNumber(statistic?.total_revenue_dynamic),
        grow: 'flex-grow',
      },
      partners: {
        title: 'Partners',
        value: statistic?.count_partners,
        new: statistic?.count_partners_dynamic,
      },
    };
  }, [statistic]);

  return (
    <div className="flex justify-between xl:justify-start space-x-5 xl:flex-col sm:px-5 xl:space-x-0">
      <PartnersBar user={user} />
      <div className="flex flex-col overflow-hidden space-y-10 sm:space-y-5 xl:w-full">
        <div className="flex space-x-10 overflow-auto sm:space-x-5">
          <InfoBlock
            isNewUpcount
            className={'xl:flex-grow'}
            title={mainInfo['clicks']?.title}
            total={mainInfo['clicks']?.value}
            new={mainInfo['clicks']?.new}
            withMarginGap
          />
          <InfoBlock
            isNewUpcount
            className={'xl:flex-grow'}
            title={mainInfo['partners']?.title}
            total={mainInfo['partners']?.value}
            new={mainInfo['partners']?.new}
            withMarginGap
          />
          <InfoBlock
            isNewUpcount
            className={'xl:flex-grow'}
            title={mainInfo['team']?.title}
            total={mainInfo['team']?.value}
            new={mainInfo['team']?.new}
            withMarginGap
          />
        </div>
        <div className="flex flex-1 overflow-hidden w-full relative justify-start items-end bg-black-light rounded desktop-infoblock-chart-base lg:!w-full lg:!max-w-full">
          <InfoBlock
            isNewUpcount
            className="flex-shrink-0"
            title={mainInfo['revenue']?.title}
            total={`${mainInfo['revenue']?.value} BUSD`}
            new={`${mainInfo['revenue']?.new} BUSD`}
          />
          <div className="flex h-full w-full -mb-1.5 -mr-1.5 sm:max-h-140px">{chartView}</div>
        </div>
      </div>
    </div>
  );
};
