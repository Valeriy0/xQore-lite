import React, { useEffect, useRef, useState } from 'react';
import { Button, BreadCrumbs } from 'components';
import SendMessageIcon from 'assets/icons/send_message.svg';
import { useRequest } from 'helpers/hooks/useRequest';
import { DirectMessageRepository } from 'connectors/repositories/direct-message';
import { useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { useRouter } from 'next/router';
import { OutMessage } from 'features/messages/chat/OutMessage';
import { ReceiveMessage } from 'features/messages/chat/ReceiveMessage';
import _throttle from 'lodash/throttle';
import PuffLoadingIcon from 'assets/animations/puff.svg';

let actualOffset = 0;
let actualPaginationStarted = 0;

const Chat = () => {
  const { query } = useRouter();
  const [actualData, setActualData] = useState({ messages: [] });
  const containerRef = useRef(null);
  const { call, data } = useRequest(DirectMessageRepository.getChat, [query.id]);
  const { call: callNewData, data: newData } = useRequest(DirectMessageRepository.getChat);
  const [inputValue, setInputValue] = useState('');
  const authUser = useSelector(getAuthUser);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const increaseOffset = 15;
  const lastMessageScrollPosition = 1300;
  const [isLoading, setIsLoading] = useState(false);

  const breadCrumbsProps = {
    title: `ID ${query.id}`,
    links: [{ href: '/messages', title: 'Messages' }],
  };

  useEffect(() => {
    setIsLoading(true);
    call();
  }, []);

  useEffect(() => {
    if (data) {
      actualOffset = data.offset + increaseOffset;
      actualPaginationStarted = data.pagination_started_at;
      setActualData({ ...data });
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (newData && newData?.messages?.length) {
      containerRef.current.scroll(0, lastMessageScrollPosition);
      setActualData((prevState) => {
        if (prevState?.messages && newData?.messages) {
          const resultMessages = [...prevState?.messages, ...newData.messages].reduce((result, item, index) => {
            if (index === 0) {
              return [...result, item];
            }
            if (!result.some((resultItem) => resultItem.id === item.id)) {
              return [...result, item];
            }
            return result;
          }, []);
          actualOffset = newData.offset + increaseOffset;
          actualPaginationStarted = newData.pagination_started_at;
          return {
            ...prevState,
            ...newData,
            messages: resultMessages,
          };
        }
      });
    }
  }, [newData]);

  const onSendMessage = async () => {
    try {
      await DirectMessageRepository.sendMessageToUser({
        to_user: query.id?.toString(),
        message: inputValue,
      });

      await call();
    } catch (e) {}
    setInputValue('');
    containerRef.current.scrollTo({ behavior: 'smooth', top: containerRef.current?.scrollHeight });
  };

  const loadData = async () => {
    if (containerRef.current.scrollTop <= 0) {
      setIsLoading(true);
      await callNewData([
        query.id,
        {
          offset: actualOffset,
          pagination_started_at: actualPaginationStarted,
        },
      ]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.addEventListener('scroll', _throttle(loadData, 250));
    }
    return () => containerRef?.current?.removeEventListener('scroll', loadData);
  }, [containerRef?.current]);

  useEffect(() => {
    if (isFirstLoading && actualData?.messages?.length) {
      containerRef.current.scrollTo({ behavior: 'smooth', top: containerRef.current?.scrollHeight });
      setIsFirstLoading(false);
    }
  }, [actualData]);

  return (
    <main className="flex flex-1 space-y-10 flex-col w-full">
      <BreadCrumbs {...breadCrumbsProps} />
      <div className="flex flex-1 flex-col rounded bg-black-light w-full justify-end p-7.5 sm:rounded-none sm:p-5 sm:text-xs">
        <div
          ref={containerRef}
          className="flex flex-1-1-0 pb-5 max-h-full overflow-y-auto flex-col h-full w-full space-y-5"
        >
          {isLoading && <PuffLoadingIcon className="!w-80px h-80px ml-auto mr-auto mt-auto mb-auto" />}
          {!isLoading &&
            actualData?.messages &&
            [...actualData?.messages]?.reverse()?.map((message) => {
              const isOutmessage = message.to_user_id !== authUser?.id;
              const Message = isOutmessage ? OutMessage : ReceiveMessage;

              return (
                <Message
                  key={message.id}
                  id={message.to_user_id === authUser?.id ? query.id : authUser?.id}
                  date={message?.send_at}
                  message={message.message}
                />
              );
            })}
        </div>
        <div className="flex justify-center items-center h-full w-full hidden">
          <span className="text-white-500">No messages yet...</span>
        </div>
        <div className="flex items-center">
          <input
            className="flex-1 bg-white-100 rounded-mini py-3 px-5 text-white outline-none mr-5"
            type="text"
            placeholder="Your message..."
            value={inputValue}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSendMessage();
              }
            }}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button onClick={onSendMessage} type="primary" className="font-medium rounded-mini sm:px-3">
            <span className="sm:hidden">Send</span>
            <SendMessageIcon className="ml-2.5 sm:ml-0 " />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Chat;
