import React, { useEffect, useRef, useState } from 'react';
import { BreadCrumbs, Button } from 'components';
import MessageIcon from 'assets/icons/message.svg';
import { MessagesListItem } from 'features/messages/main/MessagesListItem';
import { DirectMessageRepository } from 'connectors/repositories/direct-message';
import { useRequest } from 'helpers/hooks/useRequest';
import { format, parseISO } from 'date-fns';
import { CustomLink } from 'components';
import _throttle from 'lodash/throttle';

let actualOffset = 0;
let actualLimit = 0;

const breadCrumbsProps = {
  title: 'Messages',
};

const Messages = () => {
  const chats = useRef(null);
  const { data, call } = useRequest(DirectMessageRepository.getChats);
  const [actualChats, setActualChats] = useState([]);
  const minOffset = 10;
  const minLimit = 10;

  useEffect(() => {
    call();
  }, []);

  useEffect(() => {
    if (data.limit && data.chats?.length) {
      actualOffset = data.offset > minOffset ? data.offset : actualOffset;
      actualLimit = data.limit > minLimit ? data.limit : actualLimit;
      setActualChats((prevState) => [...prevState, ...data.chats]);
    }
  }, [data]);

  const loadData = () => {
    if (chats.current.scrollTop + chats.current.clientHeight >= chats.current.scrollHeight) {
      call([{ offset: actualOffset + actualLimit }]);
    }
  };

  useEffect(() => {
    if (chats?.current) {
      chats.current.addEventListener('scroll', _throttle(loadData, 250));
    }
    return () => {
      actualOffset = 0;
      actualLimit = 0;
      return chats?.current?.removeEventListener('scroll', loadData);
    };
  }, [chats?.current]);

  return (
    <main className="flex flex-1 sm:flex-auto sm:h-full flex-col w-full">
      <div className="w-full mb-10 sm:pr-5">
        <BreadCrumbs {...breadCrumbsProps}>
          <CustomLink href="/messages/new">
            <Button type="primary" className="sm:!p-2.5 sm:rounded-full">
              <MessageIcon className="mr-2.5 sm:mr-0" />
              <span className="sm:hidden">New message</span>
            </Button>
          </CustomLink>
        </BreadCrumbs>
      </div>
      <div
        ref={chats}
        className="flex flex-1-1-0 sm:rounded-none h-full overflow-y-auto flex-col rounded bg-black-light w-full"
      >
        {actualChats?.map((chat, index) => (
          <MessagesListItem
            key={index}
            id={chat.to_user_id}
            message={chat?.last_message?.message}
            date={chat?.last_message?.send_at ? format(parseISO(chat?.last_message?.send_at), 'MM/dd/yyyy HH:mm') : '-'}
          />
        ))}
      </div>
    </main>
  );
};

export default Messages;
