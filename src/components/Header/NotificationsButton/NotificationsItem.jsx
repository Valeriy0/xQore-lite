import React, { useMemo } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import config from 'helpers/config';
import LinkSquareIcon from 'assets/icons/link_square.svg';
import { linkWithQuery } from 'helpers/links';
import { CustomLink } from '../../CustomLink';
import { TableIcons } from 'components';
import { PROGRAM_NAMES } from 'helpers/constants';
import { PROGRAMS_STYLES } from 'helpers/program';

export const NotificationsItem = ({
  message,
  fired_at,
  program,
  level,
  user_id,
  partners_count,
  amount,
  place,
  transaction_hash,
  user_target,
  type,
}) => {
  const isXQore = program === PROGRAM_NAMES?.XQORE;
  const currentCurrency = isXQore ? 'BNB' : 'BUSD';
  const notificationTitle = useMemo(() => {
    switch (type) {
      case 'leading_missed':
        return `${amount} ${currentCurrency} Extra profit missed!`;
      case 'new_partner':
        return 'New partner joined';
      case 'profit':
        return `+ ${amount} ${currentCurrency} received!`;
      case 'reinvest':
        return 'New cycle started!';
      case 'send_upline':
        return 'Payment sent to upline';
      case 'target_achieved':
        return 'Goal achieved!';
      case 'target_expired':
        return 'Goal expired';
      case 'upgrade':
        return 'Upgrade successful!';
      case 'upgrade_missed':
        return `- ${amount} ${currentCurrency} missed`;
      case 'upgrade_required':
        return 'Upgrade is advised!';
      case 'unread_message':
        return 'Message';
      default:
        return '';
    }
  }, [type, currentCurrency]);

  const renderContent = useMemo(() => {
    const baseTextClassName = 'text-sm leading-4 text-white-500';
    const textWhiteClassName = 'text-white font-bold mr-1';

    switch (type) {
      case 'new_partner':
        return (
          <>
            <div className="flex items-center space-x-2">
              <a
                target="_blank"
                href={linkWithQuery('/dashboard', { user: user_id })}
                className="flex notranslate text-sm leading-6 bg-main-blue-200 text-main-blue flex-shrink-0 rounded px-2.5 text-white "
                rel="noreferrer"
              >
                ID {user_id}
              </a>
              <span className={baseTextClassName}>has joined your team!</span>
            </div>
            <span className={baseTextClassName}>
              You now have
              <span className="text-white font-bold ml-1">{partners_count} partners.</span>
            </span>
          </>
        );
      case 'upgrade_required':
        return (
          <span className={baseTextClassName}>
            You can miss profits! Get back on track - upgrade now
            <span className="text-white font-bold ml-1">
              program <span className={`notranslate ${PROGRAMS_STYLES[program]?.textColor}`}>{program}</span>.
            </span>
          </span>
        );
      case 'upgrade_missed':
        return (
          <span className={baseTextClassName}>
            How to fix: upgrade to level
            <span className="text-white font-bold mx-1">{+level + 1}</span>
            in the
            <span className="text-white font-bold mx-1 notranslate">{program}</span>
            to continue receiving profits on current level.
          </span>
        );
      case 'leading_missed':
        return (
          <span className={baseTextClassName}>
            How to fix: your partner overtook you in the
            <span className="text-white font-bold ml-1">
              <span className={`notranslate ${PROGRAMS_STYLES[program]?.textColor}`}>{program}</span>, level {level}
            </span>
            , catch him back - upgrade
            <span className="text-white font-bold mx-1 notranslate">{program}</span>
            now.
          </span>
        );
      case 'upgrade':
        return (
          <>
            <span className={baseTextClassName}>
              Program&nbps;
              <span className="text-white font-bold ml-1 notranslate">{program}</span>, level
              <span className="text-white font-bold mx-1">{level}</span>
              <div className="flex flex-wrap">Activated successfully!</div>
            </span>
            <a
              target="_blank"
              href={`${config.scanNetwork}${transaction_hash}`}
              className="inline-flex w-5 h-5 absolute right-4 top-1"
              rel="noreferrer"
            >
              <LinkSquareIcon className="w-5 h-5" />
            </a>
          </>
        );
      case 'target_achieved':
        return (
          <>
            <span className={baseTextClassName}>
              Today together with the Forsage community you have reached your goal:
              <span className="text-white font-bold mx-1">{user_target?.subject}.</span>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              This is truly a special and remarkable day! You know what? Let's do it again! Add your next goal to
              personal account
            </span>
            <CustomLink href="/targets" className="inline-flex w-5 h-5 absolute right-4 top-1">
              <LinkSquareIcon className="w-5 h-5" />
            </CustomLink>
          </>
        );
      case 'target_expired':
        return (
          <>
            <span className={baseTextClassName}>
              Unfortunately the time allocated for completing the goal
              <span className="text-white font-bold mx-1">{user_target?.subject}</span>
              has expired, Keep going and do your best!
            </span>
            <CustomLink href="/targets" className="inline-flex w-5 h-5 absolute right-4 top-1">
              <LinkSquareIcon className="w-5 h-5" />
            </CustomLink>
          </>
        );
      case 'reinvest':
        return (
          <span className={baseTextClassName}>
            <span className="inline-flex text-white font-bold mr-1">
              Program <span className={`notranslate ${PROGRAMS_STYLES[program]?.textColor}`}>{program}</span>, level{' '}
              {level}
            </span>
            reopened.
            <div className="flex flex-wrap">
              Closing
              <span className="text-white font-bold mx-1">position {place}</span>
              bought by
              <a
                target="_blank"
                href={linkWithQuery('/dashboard', { user: user_id })}
                className="ml-1 flex-shrink-0 whitespace-nowrap text-sm leading-4 bg-main-blue-200 text-main-blue flex-shrink-0 rounded px-2.5 text-white"
                rel="noreferrer"
              >
                ID {user_id}
              </a>
            </div>
            <div className="flex flex-wrap">Payment sent to upline.</div>
          </span>
        );
      case 'send_upline':
        return (
          <span className={baseTextClassName}>
            Program&nbsp;
            <span className="text-white font-bold mx-1 notranslate">{program},</span>
            level
            <span className="text-white font-bold mx-1">{level},</span>
            position
            <span className="text-white font-bold mx-1">{place}</span>
            <div className="flex flex-wrap">
              bought by
              <a
                target="_blank"
                href={linkWithQuery('/dashboard', { user: user_id })}
                className="ml-1 notranslate flex-shrink-0 whitespace-nowrap text-sm leading-4 bg-main-blue-200 text-main-blue flex-shrink-0 rounded px-2.5 text-white"
                rel="noreferrer"
              >
                ID {user_id}
              </a>
            </div>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <div className="flex">Congrats! Let's move on</div>
          </span>
        );
      case 'profit':
        return (
          <>
            <span className={baseTextClassName}>
              <span className={`inline-flex ${textWhiteClassName}`}>
                Program&nbsp;<span className={`notranslate ${PROGRAMS_STYLES[program]?.textColor}`}>{program}</span>,
                level {level}
              </span>
              <span className="inline-flex mt-1">
                from
                <a
                  target="_blank"
                  href={linkWithQuery('/dashboard', { user: user_id })}
                  className="ml-1 notranslate flex-shrink-0 whitespace-nowrap text-sm leading-4 bg-main-blue-200 text-main-blue flex-shrink-0 rounded px-2.5 text-white"
                  rel="noreferrer"
                >
                  ID {user_id}
                </a>
              </span>
              <div className="mt-1">Congratulations!</div>
            </span>
            <a
              target="_blank"
              href={`${config.scanNetwork}${transaction_hash}`}
              className="inline-flex w-5 h-5 absolute right-4 top-1"
              rel="noreferrer"
            >
              <LinkSquareIcon className="w-5 h-5" />
            </a>
          </>
        );
      case 'unread_message':
        return (
          <>
            <span className={baseTextClassName}>
              <span className={`inline-flex ${textWhiteClassName}`}>You have new message</span>
              <span className="inline-flex mt-1">
                from
                <a
                  target="_blank"
                  href={linkWithQuery('/dashboard', { user: user_id })}
                  className="ml-1 notranslate flex-shrink-0 whitespace-nowrap text-sm leading-4 bg-main-blue-200 text-main-blue flex-shrink-0 rounded px-2.5 text-white"
                  rel="noreferrer"
                >
                  ID {user_id}
                </a>
              </span>
            </span>
            <a
              href={`/messages/chat/${user_id}`}
              className="notranslate flex-shrink-0 whitespace-nowrap text-sm leading-4 text-main-blue flex-shrink-0 rounded text-white"
              rel="noreferrer"
            >
              View message
            </a>
          </>
        );
      default:
        return <span className="text-white-900 font-medium break-all">{message}</span>;
    }
  }, [type]);

  return (
    <div className="relative w-full flex bg-gray-500 rounded px-3 pb-8 pt-5 group max-w-380px w-full sm:max-w-full">
      <div className="flex items-center justify-center w-11 h-11 flex-shrink-0">
        <TableIcons type={type} />
      </div>
      <div className="flex flex-col ml-2.5 space-y-1.5">
        <span className="text-white-900 text-base font-medium break-all">{notificationTitle}</span>
        <div className="flex items-start justify-start flex-col flex-wrap space-y-2.5">{renderContent}</div>
      </div>
      <span className="text-mini absolute text-white right-4 bottom-3">{formatDistanceToNow(parseISO(fired_at))}</span>
    </div>
  );
};
