import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { TransactionsRepository } from 'connectors/repositories/transactions';
import { BreadCrumbs } from 'components';
import { useRequest } from 'helpers/hooks/useRequest';
import { EventsTable } from 'features/stats/EventsTable';
import { useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { InputForm } from 'components/Forms';
import { Button, Select } from 'components';
import { PROGRAM_NAMES, PROGRAM_MAX_LEVELS, SORT_MAP_STATS } from 'helpers/constants';
import FilterIcon from 'assets/icons/filter.svg';

const breadCrumbsProps = {
  title: 'Stats',
};

const programsOptions = Array.from(
  [PROGRAM_NAMES.X3, PROGRAM_NAMES.X4, PROGRAM_NAMES.XXX, PROGRAM_NAMES.XGOLD],
  (v) => ({
    title: `${v}`,
    key: `${v}`,
  }),
);

const LIMIT = 7;

const Stats = () => {
  const [sortType, setSortType] = useState({ Date: 'desc' });
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const isNeedMapper = useRef(true);
  const { query } = useRouter();
  const authProfile = useSelector(getAuthUser);

  const [filtersState, setFiltersState] = useState({
    isOpened: false,
    program: '',
    level: '',
    user: query?.user || authProfile?.id,
    offset: 0,
  });

  const user = filtersState?.user || query?.user || authProfile?.id;

  const requestMapper = (prev, data) => {
    if (Object.keys(prev)?.length) {
      if (isNeedMapper.current) {
        return { ...data, elements: [...prev?.elements, ...data?.elements] };
      } else {
        isNeedMapper.current = true;
        return { ...data, elements: [...data?.elements] };
      }
    }

    return data;
  };

  const { isLoading, call, data, resetData } = useRequest(
    TransactionsRepository.getTransactionStatistics,
    [],
    requestMapper,
  );

  const onAddOffset = () => {
    setFiltersState((prev) => ({ ...prev, offset: prev.offset + LIMIT }));
  };

  const onClickFilters = () => {
    setFiltersState((prev) => ({ ...prev, isOpened: !prev.isOpened }));
  };

  const onChangeFilters = (field) => (value) => {
    setFiltersState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onChangeFiltersInput = (field) => (e) => {
    setFiltersState((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const applyFilters = () => {
    resetData({});
    setFiltersState((prev) => ({ ...prev, offset: 0 }));

    call([
      {
        user,
        level: filtersState.level,
        program: filtersState.program,
        limit: LIMIT,
        offset: 0,
        sort: SORT_MAP_STATS[Object.keys(sortType)[0]],
        order: Object.values(sortType)[0],
      },
    ]);
  };

  useEffect(() => {
    if (isFirstLoading) {
      resetData({});

      call([
        {
          user,
          level: filtersState.level,
          program: filtersState.program,
          limit: LIMIT,
          offset: 0,
          sort: SORT_MAP_STATS[Object.keys(sortType)[0]],
          order: Object.values(sortType)[0],
        },
      ]);
      setIsFirstLoading(false);
    }
    if (!isFirstLoading) {
      isNeedMapper.current = false;
      call([
        {
          user,
          level: filtersState.level,
          program: filtersState.program,
          limit: LIMIT,
          offset: 0,
          sort: SORT_MAP_STATS[Object.keys(sortType)[0]],
          order: Object.values(sortType)[0],
        },
      ]);
    }
  }, [sortType]);

  useEffect(() => {
    filtersState?.offset &&
      call([
        {
          user,
          level: filtersState.level,
          program: filtersState.program,
          limit: LIMIT,
          offset: filtersState?.offset,
          sort: SORT_MAP_STATS[Object.keys(sortType)[0]],
          order: Object.values(sortType)[0],
        },
      ]);
  }, [filtersState?.offset]);

  const resetFilters = () => {
    const mainData = {
      program: '',
      level: '',
      offset: 0,
      user: query?.user || authProfile?.id,
    };
    resetData({});

    setFiltersState({
      isOpened: true,
      ...mainData,
    });

    call([
      { ...mainData, limit: LIMIT, sort: SORT_MAP_STATS[Object.keys(sortType)[0]], order: Object.values(sortType)[0] },
    ]);
  };

  const levelOptions = Array.from(Array(PROGRAM_MAX_LEVELS[filtersState.program] || 15), (v, i) => ({
    title: `${i + 1}`,
    key: `${i + 1}`,
  }));

  return (
    <main className="flex flex-1 w-full">
      <div className="flex flex-col w-full">
        <div className="mb-7.5">
          <BreadCrumbs {...breadCrumbsProps}>
            <div className="flex items-center ml-7.5 cursor-pointer" onClick={onClickFilters}>
              <div
                className={`flex items-center rounded px-2.5 py-1 ${
                  filtersState.isOpened ? 'bg-main-blue' : 'bg-main-blue-200'
                }`}
              >
                <FilterIcon
                  className={`w-5 h-5 fill-current mr-1.5 ${filtersState.isOpened ? 'text-white' : 'text-main-blue'}`}
                />
                <span className={`text-base leading-6 ${filtersState.isOpened ? 'text-white' : 'text-main-blue'}`}>
                  Filters
                </span>
              </div>
            </div>
          </BreadCrumbs>
        </div>
        {filtersState.isOpened && (
          <div className="sm:px-5 mb-5">
            <div className="flex p-7 5 rounded bg-black-light">
              <div className="flex w-full space-x-5 sm:flex-col sm:space-x-0 sm:space-y-5">
                <div className="flex w-full flex-col space-y-5">
                  <div className="w-full relative flex flex-col s">
                    <label className="mb-2.5 text-white-500 sm:text-sm">Program</label>
                    <Select
                      className="notranslate"
                      value={filtersState.program}
                      onChange={onChangeFilters('program')}
                      data={programsOptions}
                    />
                  </div>
                  <Button onClick={applyFilters} className="w-full sm:hidden" type="primary" buttonType="submit">
                    Apply filters
                  </Button>
                </div>
                <div className="flex w-full flex-col space-y-5">
                  <div className="w-full relative flex flex-col">
                    <label className="mb-2.5 text-white-500 sm:text-sm">Level</label>
                    <Select value={filtersState.level} onChange={onChangeFilters('level')} data={levelOptions} />
                  </div>
                  <Button onClick={resetFilters} className="w-full sm:hidden" type="light-white" buttonType="reset">
                    Reset filters
                  </Button>
                </div>
                <InputForm
                  onChange={onChangeFiltersInput('user')}
                  value={filtersState.user}
                  type="text"
                  title={'Search ID / address'}
                  placeholder="Enter ID / wallet"
                />
                <Button onClick={applyFilters} className="hidden w-full sm:block" type="primary" buttonType="submit">
                  Apply filters
                </Button>
                <Button onClick={resetFilters} className="hidden w-full sm:block" type="light-white" buttonType="reset">
                  Reset filters
                </Button>
              </div>
            </div>
          </div>
        )}
        <EventsTable
          sortType={sortType}
          setSortType={setSortType}
          className="flex-1 sm:rounded-none z-10"
          hideBtn={data?.total_count_elements <= data?.elements?.length}
          onAdd={onAddOffset}
          isLoading={isLoading}
          dataTable={data}
        />
      </div>
    </main>
  );
};

export default Stats;
