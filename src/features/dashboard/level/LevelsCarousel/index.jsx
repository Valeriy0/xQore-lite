import React from 'react';
import { PROGRAM_MAX_LEVELS } from 'helpers/constants';
import { ProgramInfo } from '../ProgramInfo';
import { useRouter } from 'next/router';
import { linkWithQuery } from 'helpers/links';
import ArrowLeft from 'assets/icons/arrow_left.svg';
import ArrowRight from 'assets/icons/arrow_right.svg';
import { CustomLink } from 'components';

export const LevelsCarousel = ({ programName, level }) => {
  const maxLevel = PROGRAM_MAX_LEVELS[programName];
  const currentLevel = level.level;
  const { query } = useRouter();

  return (
    <div className="flex flex-col px-5 space-y-10">
      <ProgramInfo level={level} programName={programName} />
      <div className="flex justify-between z-10">
        <div className="flex flex-1">
          {currentLevel > 1 && (
            <CustomLink
              scroll={false}
              href={`${linkWithQuery(`/dashboard/${query.program}/${currentLevel - 1}`, { user: query?.user })}`}
              className={'flex items-center justify-start font-normal h-full w-full'}
            >
              <ArrowLeft className="flex-shrink-0" />
              <span className="text-white text-base ml-2.5">Level {currentLevel - 1}</span>
            </CustomLink>
          )}
        </div>
        <div className="flex flex-1">
          {currentLevel < maxLevel && (
            <CustomLink
              scroll={false}
              href={`${linkWithQuery(`/dashboard/${query.program}/${currentLevel + 1}`, { user: query?.user })}`}
              className={'flex items-center justify-end font-normal h-full w-full '}
            >
              <span className="text-white text-base mr-2.5">Level {currentLevel + 1}</span>
              <ArrowRight className="flex-shrink-0" />
            </CustomLink>
          )}
        </div>
      </div>
    </div>
  );
};
