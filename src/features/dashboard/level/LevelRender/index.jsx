import React from 'react';
import { isNil, reject } from 'ramda';
import { CustomLink } from 'components';
import { LevelsCarousel } from 'features/dashboard/level';
import { BreadCrumbs, Button } from 'components';
import ArrowUp from 'assets/icons/arrow_up.svg';
import ArrowDown from 'assets/icons/arrow_down.svg';
import { EventsTable } from 'features/dashboard/EventsTable';
import { ProgramLevel } from 'features/dashboard/level';
import { PROGRAM_NAMES } from 'helpers/constants';
import { linkWithQuery } from 'helpers/links';
import { useRouter } from 'next/router';
import { InfoCarousel } from 'features/main/InfoCarousel';

export const LevelRender = ({ level, addItems, isLoading, dataTable, userId }) => {
  const { query, pathname } = useRouter();
  const currentCycle = Number(query.cycle || level?.cycle);
  const levelLink = linkWithQuery(`/dashboard/${query.program}`, { user: query.user });

  const breadCrumbsProps = {
    title: `level ${query.level}`,
    links: [
      {
        href: !!query.user ? linkWithQuery('/dashboard', { user: query?.user }) : '/dashboard',
        title: `ID ${userId}`,
      },
      { href: levelLink, title: `Forsage ${query.program}` },
    ],
  };

  const blurList = {
    [PROGRAM_NAMES.X3]: '/blurs/levels/blue-blur.png',
    [PROGRAM_NAMES.X4]: '/blurs/levels/purple-blur.png',
    [PROGRAM_NAMES.XXX]: '/blurs/levels/pink-blur.png',
    [PROGRAM_NAMES.XGOLD]: '/blurs/levels/gold-blur.png',
  };

  const blurBg =
    (!!level?.missed_revenue || !!level?.missed_partners) && !level?.active
      ? '/blurs/levels/red-blur.png'
      : blurList?.[query.program];

  const styleBg = { backgroundImage: `url('${blurBg}')`, backgroundRepeat: 'round', backgroundSize: 'cover' };

  const uplineId = level?.current_upline?.user_id || level?.upline_id;

  return (
    <div className="flex flex-col space-y-10 sm:space-y-7.5 z-0 overflow-x-hidden">
      <div className="fixed top-0 right-0 w-full h-full z-0" style={styleBg} />

      <div className="flex z-10 notranslate !mt-0">
        <BreadCrumbs {...breadCrumbsProps} />
      </div>
      {!!uplineId && (
        <CustomLink
          scroll={false}
          href={linkWithQuery(
            pathname,
            reject(isNil, {
              level: level.level,
              program: query.program,
              user: uplineId,
              cycle: level?.current_upline?.cycle || null,
            }),
          )}
          className="flex w-full items-center justify-center sm:px-5 z-10"
        >
          <Button type="black-light" className="!p-5 w-8/12 notranslate xl:w-full sm:!p-4 rounded font-normal">
            <span className="text-white text-base !leading-30px  sm:text-sm">Upline</span>
            <span className="rounded bg-white-100 px-2.5 text-white text-base ml-2.5 !leading-30px sm:text-sm">
              ID {uplineId}
            </span>
          </Button>
        </CustomLink>
      )}
      <div className="hidden sm:block">
        <LevelsCarousel programName={query.program} level={level} />
      </div>
      <div className="sm:hidden">
        <ProgramLevel level={level} programName={query.program} />
      </div>
      <div className="flex w-full items-center justify-center z-10 sm:px-5">
        <div className="flex bg-black-light p-5 rounded w-full items-center justify-center w-8/12 xl:w-full">
          <div className="flex items-center justify-center w-full">
            {currentCycle > 1 && (
              <CustomLink scroll={false} href={linkWithQuery(pathname, { ...query, cycle: currentCycle - 1 })}>
                <div className="flex items-center justify-center cursor-pointer">
                  <span className="text-white text-base mr-4 sm:text-sm">{currentCycle - 1}</span>
                  <ArrowDown />
                </div>
              </CustomLink>
            )}
            <span className="text-white text-base w-24 text-center mx-2.5 sm:mx-4 sm:text-sm">
              Cycle: {currentCycle}
            </span>
            {currentCycle < level?.recycles + 1 && (
              <CustomLink scroll={false} href={linkWithQuery(pathname, { ...query, cycle: currentCycle + 1 })}>
                <div className="flex items-center justify-center cursor-pointer sm:text-sm">
                  <ArrowUp />
                  <span className="text-white text-base ml-4 sm:text-sm">{currentCycle + 1}</span>
                </div>
              </CustomLink>
            )}
          </div>
        </div>
      </div>
      <InfoCarousel />
      <EventsTable
        program={query?.program}
        className="sm:rounded-none z-10"
        isLoading={isLoading}
        events={dataTable}
        addItems={addItems}
        hideBtn={dataTable?.total_count_elements <= dataTable?.elements?.length}
      />
    </div>
  );
};
