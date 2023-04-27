import React from 'react';
import { CustomLink } from 'components';
import { useRouter } from 'next/router';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { linkWithQuery } from 'helpers/links';
import { Helmet } from 'react-helmet';
import { PROGRAM_MAX_LEVELS } from 'helpers/constants';

export const BreadCrumbs = ({ links = [], title, children, levels = 0 }) => {
  const { query } = useRouter();
  const authProfile = useSelector(getAuthUser);

  const user = query?.user || authProfile?.id;

  return (
    <div className="flex flex-col flex-wrap w-full sm:px-5">
      <div className="notranslate">
        <Helmet>
          <title>{title} | Forsage</title>
        </Helmet>
      </div>
      <div className="flex items-center mb-1.5 sm:mb-2.5">
        {!!links.length && (
          <div className="flex">
            {links?.map((link) => (
              <CustomLink className="mr-1.5 text text-white-300 sm:text-sm" href={link.href} passHref key={link.href}>
                <span className="hover:text-white-500">{`${link.title}`}</span> /
              </CustomLink>
            ))}
          </div>
        )}
        {!!links.length && <span className="text text-white whitespace-nowrap sm:text-sm">{title}</span>}
        {!!levels && (
          <span className="text text-white whitespace-nowrap ml-1.5 sm:text-sm">
            (
            <span className="inline sm:hidden">
              {levels} out of {PROGRAM_MAX_LEVELS?.[query.program]} levels
            </span>
            <span className="hidden sm:inline">
              {levels}/{PROGRAM_MAX_LEVELS?.[query.program]}
            </span>
            )
          </span>
        )}
      </div>
      <div className="w-full flex justify-between flex-wrap">
        <div className="flex flex-wrap items-center">
          <span className="text-two-half text-white font-medium mr-2 sm:text-2xl whitespace-nowrap">{title}</span>
          {!links.length && (
            <CustomLink
              className="inline-flex px-2.5 !leading-30px bg-blue-100 notranslate hover:bg-main-blue-300 text-main-blue rounded text-xl w-max sm:text-base"
              href={!!query?.user ? linkWithQuery('/dashboard', { user: user }) : '/dashboard'}
            >
              ID {user}
            </CustomLink>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
