import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import WarningIcon from 'assets/icons/warning.svg';
import { BreadCrumbs, ProgramLevel } from 'components';
import { useRequest } from 'helpers/hooks/useRequest';
import { EventsTable } from 'features/dashboard/EventsTable';
import { PartnersHistory } from 'features/dashboard/PartnersHistory';
import { linkWithQuery } from 'helpers/links';
import { ProgramRepository } from 'connectors/repositories/program';
import { checkRedirect } from 'helpers/auth';
import { TransactionsRepository } from 'connectors/repositories/transactions';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { CLIENT_PROGRAM_NAMES, PROGRAM_NAMES, PROGRAMS_MOCK } from 'helpers/constants';
import config from 'helpers/config';
import { redirect } from 'helpers/auth';
import { splitNumber } from 'helpers/format';
import ReactPlaceholder from 'react-placeholder';
import { TextRow } from 'react-placeholder/lib/placeholders';
import PumaLogo from 'assets/forsage/puma_full_to_right.svg';
import { subscriptionCreator } from 'helpers/pubsub';
import { PUBSUB_EVENTS } from 'helpers/pubsub/constants';

const LevelPlaceholder = (
  <div className="m-1 sm:m-0.5 relative">
    <TextRow
      color="rgba(0,0,0, 0.4)"
      className="flex items-center justify-center rounded-md"
      style={{ width: 180, height: 180 }}
    />
    <PumaLogo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-30 h-30 sm:w-20 sm:h-20 fill-current text-white-50" />
  </div>
);

const ProgramPage = () => {
  const { query } = useRouter();
  const authStore = useSelector(getAuthUser);
  const [countItemsLimit, setCountItemsLimit] = useState(0);
  const programCurrency = query.program === PROGRAM_NAMES.XQORE ? 'BNB' : 'BUSD';

  const stepCount = 9;
  const user = !!query.user ? query.user : authStore?.id;

  const {
    data: programData,
    call: callProgram,
    isLoading: isLoadingProgram,
    isDone: isDoneProgram,
  } = useRequest(ProgramRepository.getProgram, [{ user, matrix_title: query.program }]);

  const levels = useMemo(() => Object.entries(programData?.programs || {}), [programData]);
  const lastUnActive = useMemo(() => levels.findIndex(([, data]) => !data.active), [levels]);

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
  const defaultParams = { user, program: query?.program, limit: stepCount };

  useEffect(() => {
    callProgram();
  }, [query, user]);

  useEffect(() => {
    const sb = subscriptionCreator({
      [PUBSUB_EVENTS.CLOSE_MODAL_PROGRAM_LEVEL]: callProgram,
    });

    return () => {
      sb();
    };
  }, []);

  useEffect(() => {
    resetData();
    setCountItemsLimit(0);
    call([{ ...defaultParams, offset: 0 }]);
  }, [query?.level, user]);

  useEffect(() => {
    countItemsLimit && call([{ ...defaultParams, offset: countItemsLimit }]);
  }, [countItemsLimit]);

  const breadCrumbsProps = {
    title: `Forsage ${query.program}`,
    links: [
      {
        href: !!query.user ? linkWithQuery('/dashboard', { user: query?.user }) : '/dashboard',
        title: `ID ${user}`,
      },
    ],
  };

  const AddItems = () => {
    if (countItemsLimit < dataTable?.total_count_elements) {
      setCountItemsLimit(countItemsLimit + stepCount);
    }
  };

  const stepsBgUrls = {
    [PROGRAM_NAMES.X3]: '/blurs/program/blue-blur.png',
    [PROGRAM_NAMES.X4]: '/blurs/program/purple-blur.png',
    [PROGRAM_NAMES.XXX]: '/blurs/program/pink-blur.png',
    [PROGRAM_NAMES.XGOLD]: '/blurs/program/gold-blur.png',
  };

  const styleBg = {
    backgroundImage: `url('${stepsBgUrls?.[query.program]}')`,
    backgroundRepeat: 'round',
    backgroundSize: 'cover',
  };

  const programsContent = useMemo(() => {
    const mockLevels = PROGRAMS_MOCK.find((item) => item.name === query.program)?.slots;
    return (
      <div className="flex z-10 flex-wrap -m-2 sm:-mx-px mb-7.5 sm:justify-around">
        {(!isLoadingProgram && isDoneProgram ? levels : mockLevels)?.map((item, index) => {
          const level = item[0];
          const levelData = item[1];

          return (
            <ReactPlaceholder
              key={level}
              ready={!isLoadingProgram && isDoneProgram}
              showLoadingAnimation
              customPlaceholder={LevelPlaceholder}
            >
              <ProgramLevel
                isFirstUnactive={index === 0}
                isLastUnactive={index === lastUnActive}
                programName={query.program}
                level={level}
                {...levelData}
              />
            </ReactPlaceholder>
          );
        })}
      </div>
    );
  }, [programData, query, isDoneProgram, isLoadingProgram]);

  const dataOptions = useMemo(
    () => ({
      active_levels: programData?.active_levels,
      total_revenue: programData?.total_revenue,
      total_missed_revenue: programData?.total_missed_revenue,
    }),
    [programData],
  );

  return (
    <div className="flex flex-col space-y-10 sm:space-y-7.5">
      <div className="flex flex-wrap justify-between notranslate">
        <BreadCrumbs {...breadCrumbsProps} levels={dataOptions.active_levels}>
          <div className="self-end text-two-half text-white font-bold sm:text-2xl whitespace-nowrap">
            {splitNumber(dataOptions.total_revenue)} {programCurrency}
          </div>
        </BreadCrumbs>
      </div>
      {!!dataOptions?.total_missed_revenue && (
        <div className="flex w-full sm:px-5">
          <div className="flex w-full rounded-xl p-5 bg-black-light items-center justify-center">
            <WarningIcon />
            <span className="text-red text-base ml-2.5">
              {splitNumber(dataOptions?.total_missed_revenue)} {programCurrency} in total missed. Activate next levels
              to catch up with your partners
            </span>
          </div>
        </div>
      )}
      <div
        className="flex overflow-hidden relative w-full flex-col bg-black-light rounded p-7.5 pb-5 sm:p-5 sm:pl-2.5 sm:pr-2.5 sm:rounded-none"
        style={styleBg}
      >
        {programsContent}
        <PartnersHistory program={query?.program} />
      </div>
      <EventsTable
        program={query?.program}
        className={'sm:rounded-none'}
        isLoading={isLoading}
        events={dataTable}
        addItems={AddItems}
        hideBtn={dataTable?.total_count_elements <= dataTable?.elements?.length}
      />
    </div>
  );
};

ProgramPage.storeInitial = async ({ ctx }) => {
  checkRedirect(ctx);
  const program = ctx.query.program;
  if (!CLIENT_PROGRAM_NAMES?.includes(program) && program !== PROGRAM_NAMES.XGOLD && config.contractXGold) {
    redirect(linkWithQuery('/dashboard', { user: ctx?.query?.user }), ctx);
  }
};

export default ProgramPage;
