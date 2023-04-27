import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';
import { RecentActivities } from 'components';
import { AccountInfo, AccountPrograms, Profile, AmbassadorBanner } from 'features/dashboard/main';
import { checkRedirect } from 'helpers/auth';
import { ActivitiesRepository } from 'connectors/repositories/activities';
import { useRequest } from 'helpers/hooks/useRequest';
import { TotalStatisticsRepository } from 'connectors/repositories/total-statistics';

const Dashboard = () => {
  const stepCount = 11;

  const [countItemsLimit, setCountItemsLimit] = useState(0);
  const [isObservedRecentActivities, setIsObservedRecentActivities] = useState(true);
  const [isObservedStatistics, setIsObservedStatistics] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const recentActivitiesRequestMapper = (prev, data) => {
    if (Object.keys(prev)?.length) {
      return { ...data, activities: [...prev?.activities, ...data?.activities] };
    }

    return data;
  };

  const statisticsRequestMapper = (prev, data) => data;

  const {
    isLoading,
    call: recentActivitiesCall,
    data: tableData,
  } = useRequest(
    ActivitiesRepository.getRecentActivities,
    [{ limit: stepCount, offset: countItemsLimit, count_hours: 1 }],
    recentActivitiesRequestMapper,
    isObservedRecentActivities,
    setIsObservedRecentActivities,
    inView,
  );

  const { data: statistics, call: statisticsCall } = useRequest(
    TotalStatisticsRepository.getStatistics,
    [],
    statisticsRequestMapper,
    isObservedStatistics,
    setIsObservedStatistics,
    inView,
  );

  useEffect(() => {
    if (isObservedRecentActivities) {
      recentActivitiesCall();
    }
    if (isObservedStatistics) {
      statisticsCall();
    }
  }, [inView]);

  useEffect(async () => {
    if (countItemsLimit >= stepCount) {
      recentActivitiesCall();
    }
  }, [countItemsLimit]);

  const AddItems = () => {
    if (countItemsLimit <= tableData?.total_count_activities) {
      setCountItemsLimit(countItemsLimit + stepCount);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-10 sm:space-y-5">
      <Helmet>
        <title>Dashboard | Forsage</title>
      </Helmet>
      <Profile />
      <AccountInfo />
      <AccountPrograms />
      <AmbassadorBanner />
      <RecentActivities
        recentActivitiesRef={ref}
        events={{ activities: tableData?.activities, ...statistics }}
        addItems={AddItems}
        isLoading={isLoading}
        hiddenBtn={tableData?.total_count_activities <= tableData?.activities?.length}
      />
    </div>
  );
};

Dashboard.storeInitial = async ({ ctx }) => {
  checkRedirect(ctx);
};

export default Dashboard;
