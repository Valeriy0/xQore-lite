import React from 'react';
import ArrowLeft from 'assets/icons/arrow_left.svg';
import ArrowRight from 'assets/icons/arrow_right.svg';
import { useRouter } from 'next/router';
import { CustomLink, Button } from 'components';
import { linkWithQuery } from 'helpers/links';
import { PROGRAM_MAX_LEVELS } from 'helpers/constants';
import { ProgramInfo } from '../ProgramInfo';

export const ProgramLevel = ({ level, programName, isLoading }) => {
  const maxLevel = PROGRAM_MAX_LEVELS[programName];
  const currentLevel = Number(level.level);
  const { query } = useRouter();

  return (
    <div className="flex flex-col sm:px-5 space-y-10 z-10">
      <div className="flex space-x-10 xl:space-x-0 z-10">
        <Button type="black-light" className={'min-w-140px xl:hidden p-7 bg-black-light rounded'}>
          {currentLevel > 1 && (
            <CustomLink
              scroll={false}
              href={`${linkWithQuery(`/dashboard/${query.program}/${currentLevel - 1}`, { user: query?.user })}`}
              className={'flex items-center justify-center font-normal h-full w-full'}
            >
              <ArrowLeft className="flex-shrink-0" />
              <span className="text-white text-base ml-2 5">Level {currentLevel - 1}</span>
            </CustomLink>
          )}
        </Button>
        <ProgramInfo level={level} programName={programName} isLoading={isLoading} />
        <Button type="black-light" className={'min-w-140px xl:hidden p-7 bg-black-light rounded'}>
          {currentLevel < maxLevel && (
            <CustomLink
              scroll={false}
              href={`${linkWithQuery(`/dashboard/${query.program}/${currentLevel + 1}`, { user: query?.user })}`}
              className={'flex items-center justify-center font-normal h-full w-full'}
            >
              <span className="text-white text-base mr-2.5">Level {currentLevel + 1}</span>
              <ArrowRight className="flex-shrink-0" />
            </CustomLink>
          )}
        </Button>
      </div>
      <div className="hidden xl:flex justify-between">
        {currentLevel > 1 && (
          <CustomLink
            scroll={false}
            href={`${linkWithQuery(`/dashboard/${query.program}/${currentLevel - 1}`, { user: query?.user })}`}
            className={'flex cursor-pointer py-5 px-10 z-10 sm:hidden items-center'}
          >
            <ArrowLeft className="flex-shrink-0 stroke-current text-white" />
            <span className="text-white text-base ml-4">Level {currentLevel - 1}</span>
          </CustomLink>
        )}
        {currentLevel < maxLevel && (
          <CustomLink
            scroll={false}
            href={`${linkWithQuery(`/dashboard/${query.program}/${currentLevel + 1}`, { user: query?.user })}`}
            className={'flex cursor-pointer py-5 px-10 z-10 ml-auto sm:hidden items-center'}
          >
            <span className="text-white text-base mr-4">Level {currentLevel + 1}</span>
            <ArrowRight className="flex-shrink-0" />
          </CustomLink>
        )}
      </div>
    </div>
  );
};
