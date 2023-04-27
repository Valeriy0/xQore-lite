import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { UserRepository } from 'connectors/repositories/user';
import { GroupReflinkRepository } from 'connectors/repositories/group-reflink';
import { BreadCrumbs, Select, Button } from 'components';
import { PartnersTable } from 'features/partners';
import { useRequest } from 'helpers/hooks/useRequest';
import { checkRedirect } from 'helpers/auth';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { InputForm } from 'components/Forms';
import { PROGRAM_NAMES, PROGRAM_MAX_LEVELS } from 'helpers/constants';
import FilterIcon from 'assets/icons/filter.svg';
import { SORT_MAP_PARTNERS } from 'helpers/constants';

const breadCrumbsProps = {
  title: 'Partners',
};

const programsOptions = Array.from(
  [PROGRAM_NAMES.X3, PROGRAM_NAMES.X4, PROGRAM_NAMES.XXX, PROGRAM_NAMES.XGOLD],
  (v) => ({
    title: `${v}`,
    key: `${v}`,
  }),
);

const LIMIT = 9;

const Partners = () => {
  const [sortType, setSortType] = useState({ 'New partners': 'desc' });
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const isNeedMapper = useRef(true);
  const { query } = useRouter();
  const authProfile = useSelector(getAuthUser);

  const [filtersState, setFiltersState] = useState({
    isOpened: false,
    program: '',
    level: '',
    search: '',
    offset: 0,
  });

  const levelOptions = Array.from(Array(PROGRAM_MAX_LEVELS[filtersState.program] || 15), (v, i) => ({
    title: `${i + 1}`,
    key: `${i + 1}`,
  }));

  const user = query?.user || authProfile?.id;

  const requestMapper = (prev, data) => {
    if (Object.keys(prev)?.length) {
      if (isNeedMapper.current) {
        return { ...data, partners: [...prev?.partners, ...data?.partners] };
      } else {
        isNeedMapper.current = true;
        return { ...data, partners: [...data?.partners] };
      }
    }

    return data;
  };

  const { isLoading, call, data, resetData } = useRequest(UserRepository.partners, [{ user: user }], requestMapper);

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
    call([
      {
        user,
        level: filtersState.level,
        search: filtersState.search,
        program: filtersState.program,
        limit: LIMIT,
        offset: 0,
        sort: SORT_MAP_PARTNERS[Object.keys(sortType)[0]],
        order: Object.values(sortType)[0],
      },
    ]);
  };

  useEffect(() => {
    filtersState?.offset &&
      call([
        {
          user,
          level: filtersState.level,
          search: filtersState.search,
          program: filtersState.program,
          limit: LIMIT,
          offset: filtersState?.offset,
          sort: SORT_MAP_PARTNERS[Object.keys(sortType)[0]],
          order: Object.values(sortType)[0],
        },
      ]);
  }, [filtersState?.offset]);

  const resetFilters = () => {
    const mainData = {
      program: '',
      level: '',
      offset: 0,
      search: '',
    };

    resetData({});
    setFiltersState({
      isOpened: true,
      ...mainData,
    });

    call([{ ...mainData, user, limit: LIMIT }]);
  };

  const { call: callLinks } = useRequest(GroupReflinkRepository.getList, [{ user: user }]);

  useEffect(() => {
    if (isFirstLoading) {
      resetData({});
      call([
        {
          user,
          level: filtersState.level,
          search: filtersState.search,
          program: filtersState.program,
          limit: LIMIT,
          offset: 0,
          sort: SORT_MAP_PARTNERS[Object.keys(sortType)[0]],
          order: Object.values(sortType)[0],
        },
      ]);
      callLinks([{ user }]);
      setIsFirstLoading(false);
    }
    if (!isFirstLoading) {
      isNeedMapper.current = false;
      call([
        {
          user,
          level: filtersState.level,
          search: filtersState.search,
          program: filtersState.program,
          limit: LIMIT,
          offset: filtersState?.offset,
          sort: SORT_MAP_PARTNERS[Object.keys(sortType)[0]],
          order: Object.values(sortType)[0],
        },
      ]);
    }
  }, [sortType]);

  return (
    <main className="flex flex-1 w-full">
      <div className="flex flex-col w-full space-y-10 sm:space-y-7.5">
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
        <div className="flex flex-col">
          {filtersState.isOpened && (
            <div className="sm:px-5">
              <div className="flex p-7 mb-5 rounded bg-black-light">
                <div className="flex w-full space-x-5 sm:flex-col sm:space-x-0 sm:space-y-5">
                  <div className="flex w-full flex-col space-y-5">
                    <div className="w-full relative flex flex-col s">
                      <label className="mb-2.5 text-white-500 sm:text-sm">Program</label>
                      <Select
                        className={'notranslate'}
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
                    onChange={onChangeFiltersInput('search')}
                    value={filtersState.search}
                    type="text"
                    title={'Search ID / address'}
                    placeholder="Enter ID / wallet"
                  />
                  <Button onClick={applyFilters} className="hidden w-full sm:block" type="primary" buttonType="submit">
                    Apply filters
                  </Button>
                  <Button
                    onClick={resetFilters}
                    className="hidden w-full sm:block"
                    type="light-white"
                    buttonType="reset"
                  >
                    Reset filters
                  </Button>
                </div>
              </div>
            </div>
          )}
          <PartnersTable
            sortType={sortType}
            setSortType={setSortType}
            partnersList={data?.partners}
            addItems={onAddOffset}
            isLoading={isLoading}
            hideBtn={data?.total_count_partners <= data?.partners?.length}
          />
        </div>
      </div>
    </main>
  );
};

Partners.storeInitial = async ({ ctx }) => {
  checkRedirect(ctx);
};

export default Partners;
