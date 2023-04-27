import React, { useEffect, useState, useMemo } from 'react';
import { useRequest } from 'helpers/hooks/useRequest';
import { ContentStatisticsRepository } from 'connectors/repositories/content-statistics';
import { checkRoleRedirect } from 'helpers/auth';
import { LvlsActivationStats, LeadersList, NewUsersChart } from 'features/manager/AllStats';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { BreadCrumbs } from 'components';

const AllStats = () => {
  const breadCrumbsProps = {
    title: `Main statistics`,
  };
  const [category, setCategory] = useState(1);
  const [timeLine, setTimeLine] = useState(1);
  const { isLoading, call, data } = useRequest(ContentStatisticsRepository.getStats, [{ period: timeLine }]);

  useEffect(() => {
    call();
  }, [timeLine]);

  const renderContent = useMemo(() => {
    if (isLoading || !data) {
      return <PuffLoadingIcon className="w-16 h-16" />;
    } else {
      switch (category) {
        case 0:
          return <LvlsActivationStats data={data?.activation_statistics} />;
        case 1:
          return <LeadersList data={data?.leaders} />;
        case 2:
          return <NewUsersChart data={data?.new_users} />;
      }
    }
  }, [category, data, isLoading, timeLine]);

  const btnsList = ['Активированные лвла', 'Топ лидеры', 'Статистика новых пользователей'];
  const timeLineList = [1, 7, 30];

  return (
    <div className="w-full h-full flex-1 flex flex-col items-start space-y-2.5">
      <BreadCrumbs {...breadCrumbsProps}>
        <div className="flex items-center justify-end space-x-2 sm:w-full sm:my-5">
          {timeLineList?.map((item, itemIndex) => {
            const isActive = timeLine === item;
            return (
              <div
                className={`flex items-center justify-center flex-1 sm:w-full ${
                  isActive ? 'bg-main-blue-500' : 'bg-white-100'
                } cursor-pointer text-center text-white p-1.5 min-w-[50px] rounded-[15px]`}
                onClick={() => setTimeLine(item)}
              >
                {item}d
              </div>
            );
          })}
        </div>
      </BreadCrumbs>
      <div className="sm:px-5 w-full">
        <div className="sm:px-5 flex items-center justify-between bg-black-light rounded-[20px] p-2.5 space-x-2.5 sm:flex-col sm:space-y-2.5 sm:space-x-0 w-full">
          {btnsList?.map((item, itemIndex) => {
            const isActive = category === itemIndex;
            return (
              <div
                className={`flex font-medium items-center justify-center flex-1 h-full sm:w-full ${
                  isActive ? 'bg-main-blue-500' : ''
                } cursor-pointer text-center text-white p-2.5 rounded-[15px]`}
                onClick={() => setCategory(itemIndex)}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="sm:px-5 text-white flex-1 flex items-center justify-center w-full h-full">{renderContent}</div>
    </div>
  );
};

AllStats.storeInitial = async ({ ctx }) => {
  checkRoleRedirect(ctx);
};

export default AllStats;
