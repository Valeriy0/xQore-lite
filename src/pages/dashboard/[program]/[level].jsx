import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useRequest } from 'helpers/hooks/useRequest';
import { linkWithQuery } from 'helpers/links';
import { ProgramRepository } from 'connectors/repositories/program';
import { checkRedirect } from 'helpers/auth';
import { TransactionsRepository } from 'connectors/repositories/transactions';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { CLIENT_PROGRAM_NAMES, PROGRAM_NAMES } from 'helpers/constants';
import config from 'helpers/config';
import { redirect } from 'helpers/auth';
import { LevelRender } from 'features/dashboard/level';
import { subscriptionCreator } from 'helpers/pubsub';
import { PUBSUB_EVENTS } from 'helpers/pubsub/constants';

const Level = () => {
  const { query } = useRouter();
  const authStore = useSelector(getAuthUser);
  const [countItemsLimit, setCountItemsLimit] = useState(0);

  const stepCount = 9;
  const user = !!query.user ? query.user : authStore?.id;

  const {
    data: levelData,
    call: callGetLevel,
    isLoading: isLoadingGetLevel,
    isDone: isDoneGetLevel,
  } = useRequest(ProgramRepository.getLevel, [
    {
      user,
      matrix_title: query.program,
      level: query.level,
      cycle: query?.cycle,
    },
  ]);

  const stateLevelData = useMemo(() => {
    return { ...levelData, isLoading: isLoadingGetLevel || !isDoneGetLevel };
  }, [isLoadingGetLevel, isDoneGetLevel, levelData]);

  useEffect(async () => {
    callGetLevel();
  }, [query, user]);

  useEffect(() => {
    const sb = subscriptionCreator({
      [PUBSUB_EVENTS.CLOSE_MODAL_PROGRAM_INFO_LEVEL]: callGetLevel,
    });

    return () => {
      sb();
    };
  }, []);

  const requestMapper = (prev, data) => {
    if (Object.keys(prev)?.length) {
      return { ...data, elements: [...prev?.elements, ...data?.elements] };
    }

    return data;
  };

  const {
    isLoading,
    call,
    data: dataTable,
    resetData,
  } = useRequest(TransactionsRepository.getTransactionHistory, [], requestMapper);
  const defaultParams = { user, program: query?.program, level: query?.level, limit: stepCount };

  useEffect(async () => {
    resetData();
    setCountItemsLimit(0);
    call([{ ...defaultParams, offset: 0 }]);
  }, [query?.level, user]);

  useEffect(async () => {
    countItemsLimit && call([{ ...defaultParams, offset: countItemsLimit }]);
  }, [countItemsLimit, user]);

  const addItems = () => {
    if (countItemsLimit <= dataTable?.total_count_elements) {
      setCountItemsLimit(countItemsLimit + stepCount);
    }
  };

  return (
    <LevelRender level={stateLevelData} addItems={addItems} isLoading={isLoading} dataTable={dataTable} userId={user} />
  );
};

Level.storeInitial = async ({ ctx }) => {
  checkRedirect(ctx);
  const program = ctx.query.program;
  if (!CLIENT_PROGRAM_NAMES?.includes(program) && program !== PROGRAM_NAMES.XGOLD && config.contractXGold) {
    redirect(linkWithQuery('/dashboard', { user: ctx?.query?.user }), ctx);
  }
};

export default Level;
