import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';
import { RecentActivities, Button } from 'components';
import { LoginLayout } from 'layouts';
import { useRequest } from 'helpers/hooks/useRequest';
import { ActivitiesRepository } from 'connectors/repositories/activities';
import { HeaderBanner, PreviewAccount } from 'features/login';
import { TotalStatisticsRepository } from 'connectors/repositories/total-statistics';
import { useOpenSupport } from 'helpers/hooks/useOpenSupport';

const Index = () => {
  const stepCount = 11;
  const [countItemsLimit, setCountItemsLimit] = useState(0);
  const [isObservedRecentActivities, setIsObservedRecentActivities] = useState(true);
  const [isObservedStatistics, setIsObservedStatistics] = useState(true);
  const { openSupport } = useOpenSupport();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const randomListLeaders = [
    2597, 1454, 1192, 4882, 20387, 2700, 267, 18376, 468, 4728, 601, 448, 2669, 2359, 20785, 7366, 7, 18,
  ];

  const randomLeader = randomListLeaders[Math.floor(Math.random() * randomListLeaders?.length)];

  const styleBg = {
    backgroundImage: `url('/blurs/login/blue-blur.png')`,
    backgroundRepeat: 'round',
    backgroundSize: 'cover',
  };

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
    <div className="flex flex-col">
      <Helmet>
        <title>Main page | Forsage</title>
        <meta
          name="description"
          content="Participant authorization for access to all functions of the personal account"
        />
      </Helmet>
      <HeaderBanner />
      <PreviewAccount randomLeader={randomLeader} />
      <div className="">
        <RecentActivities
          recentActivitiesRef={ref}
          events={{ activities: tableData?.activities, ...statistics }}
          addItems={AddItems}
          isLoading={isLoading}
          hiddenBtn={tableData?.total_count_activities <= tableData?.activities?.length}
        />

        <div
          style={styleBg}
          className="absolute left-1/2 -bottom-1/2 transform -translate-x-1/2 w-full h-full z-0 sm:hidden"
        />
      </div>

      <div className="flex flex-col items-center sm:items-start justify-center my-25 sm:my-12 sm:mb-0 sm:p-5 z-10 sm:my-0 sm:pt-7.5">
        <span className="text-white text-3xl font-bold mb-5"> Need help on how to use the platform? </span>
        <span className="mb-7.5"> Get qualified support from Forsage experts via online chat </span>
        <Button type="primary" className="font-medium rounded-mini sm:w-full" onClick={openSupport}>
          Contact support
        </Button>
      </div>
    </div>
  );
};

Index.Layout = LoginLayout;

export default Index;
