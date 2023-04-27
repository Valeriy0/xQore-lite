import React from 'react';
import PersonIcon from 'assets/icons/profile.svg';
import { CustomLink } from 'components';

export const MessagesListItem = ({ id, message, date }) => {
  return (
    <CustomLink
      href={`/messages/chat/${id}`}
      className="flex cursor-pointer w-full item-center justify-between border-b border-white-100 p-7.5 sm:p-5"
    >
      <div className="flex items-center justify-start">
        <div className="flex flex-shrink-0 justify-center items-center rounded-full bg-white-200 w-11 h-11 mr-5">
          {' '}
          <PersonIcon className="w-6 h-6" />{' '}
        </div>
        <div className="flex flex-col">
          <span className="text-white-900 font-medium notranslate">ID {id}</span>
          <div className="max-h-6 overflow-hidden">
            <span className="text-white-500" dangerouslySetInnerHTML={{ __html: message }} />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-end">
        <span className="whitespace-nowrap text-white-500 mb-1">{date}</span>
      </div>
    </CustomLink>
  );
};
