import React, { useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { InfoBlock } from 'components/InfoBlock';
import { AccountProfit } from 'components/InfoBlock/ AccountProfit';
import PumaIcon from 'assets/forsage/puma.svg';
import { splitNumber } from 'helpers/format';
import { UserRepository } from 'connectors/repositories/user';
import { useRequest } from 'helpers/hooks/useRequest';
import Countdown from 'react-countdown';
import { useTimerOver } from 'helpers/hooks/useTimerOver';
import { XQORE_DATE_START } from 'helpers/constants';
import { parseISO } from 'date-fns';

export const AccountInfo = () => {
  const { query } = useRouter();
  const authStore = useSelector(getAuthUser);
  const user = !!query.user ? query.user : authStore?.id;
  const { isCompleted, onComplete } = useTimerOver(parseISO(XQORE_DATE_START));
  const { isLoading, call, data } = useRequest(UserRepository.info, [{ user }]);

  useEffect(() => {
    if (!!user) {
      call();
    }
  }, [user]);

  const chartView = useMemo(() => {
    if (!isLoading && data?.data?.chart?.length > 1) {
      return (
        <ResponsiveContainer>
          <AreaChart data={data?.chart?.map(({ x, y }) => ({ name: x, uv: y }))}>
            <Area type="monotone" dataKey="uv" stroke="#406AFF" fill="rgba(64, 106, 255, 0.3)" />
          </AreaChart>
        </ResponsiveContainer>
      );
    } else {
      return <PumaIcon className="absolute top-1/2 right-0 transform -translate-y-1/2 fill-current text-white-100" />;
    }
  }, [data, isLoading]);

  return (
    <div className="flex w-full mt-15 sm:mt-5 sm:px-5">
      <div className="flex w-full flex-wrap lg:flex-col">
        <div className="flex mr-10 space-x-10 lg:mr-0 lg:mt-10 sm:mt-5 sm:space-x-5 lg:order-3 sm:overflow-auto sm:w-full">
          <InfoBlock
            isNewUpcount
            isLoading={isLoading}
            className="lg:flex-grow"
            title={'Partners'}
            total={data?.data?.count_partners}
            new={data?.data?.count_partners_dynamic}
            prompt="Total number of your direct partners and last 24 hours change"
          />
          <InfoBlock
            isNewUpcount
            isLoading={isLoading}
            className="lg:flex-grow"
            title={'Team'}
            total={data?.data?.team}
            new={data?.data?.team_dynamic}
            prompt="Total number of partners in your full structure and last 24 hours change"
          />
          <InfoBlock
            isNewUpcount
            isLoading={isLoading}
            className="lg:flex-grow sm:max-w-full"
            title={'Ratio'}
            total={`${data?.data?.rate_of_return} %`}
            new={`${data?.data?.rate_of_return_dynamic} %`}
            prompt='Performance rate showing ratio "amount received" / "amount spent" and last 24 hours change'
          />
        </div>
        <div className="flex flex-1 lg:flex-0 sm:flex-0 h-full sm:max-w-full overflow-hidden w-full relative justify-start items-end bg-black-light rounded lg:max-w-full desktop-infoblock-chart-base">
          {isCompleted ? (
            <AccountProfit
              isNewUpcount
              isLoading={isLoading}
              className="flex-shrink-0"
              title="Profits"
              totalBUSD={data?.data?.total_revenue}
              newBUSD={data?.data?.total_revenue_dynamic}
              totalBNB={data?.data?.total_revenue_bnb_forsage}
              newBNB={data?.data?.total_revenue_dynamic_bnb_forsage}
              prompt="Total amount received to your wallet from all the Forsage programs and last 24 hours change"
            />
          ) : (
            <>
              <InfoBlock
                isNewUpcount
                isLoading={isLoading}
                className="flex-shrink-0"
                title="Profits"
                total={`${splitNumber(data?.data?.total_revenue)} BUSD`}
                new={`${splitNumber(data?.data?.total_revenue_dynamic)} BUSD`}
                prompt="Total amount received to your wallet from all the Forsage programs and last 24 hours change"
              />
              <div className="flex h-full w-full -mb-1.5 -mr-1.5 sm:max-h-140px">{chartView}</div>
            </>
          )}
        </div>
      </div>
      <div className="hidden">
        <Countdown date={XQORE_DATE_START} onComplete={onComplete} />
      </div>
    </div>
  );
};
