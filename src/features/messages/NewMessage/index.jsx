import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Button, Input } from 'components';
import { DirectMessageRepository } from 'connectors/repositories/direct-message';
import { useRouter } from 'next/router';
import PersonIcon from 'assets/icons/person.svg';
import SuccessIcon from 'assets/icons/success_check.svg';
import CloseIcon from 'assets/icons/close.svg';
import { useRequest } from 'helpers/hooks/useRequest';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import _throttle from 'lodash/throttle';

let actualOffset = 0;
let actualLimit = 0;

export const NewMessage = ({ recipients = [], limit, offset }) => {
  const { push } = useRouter();
  const { call, data, isLoading } = useRequest(DirectMessageRepository.getRecipient);
  const usersRef = useRef(null);
  const [isSendMessage, setIsSendMessage] = useState(false);
  const [actualRecipients, setActualRecipients] = useState([]);
  const [newMessageState, setNewMessageState] = useState({
    searchValue: '',
    text: '',
    selectedUsers: [],
  });
  const minOffset = 10;
  const minLimit = 10;

  useEffect(() => {
    if (data.limit) {
      actualOffset = data.offset > minOffset ? data.offset : actualOffset;
      actualLimit = data.limit > minLimit ? data.limit : actualLimit;
      const newActualRecipients = [...actualRecipients, ...data.recipients].reduce((result, item, index) => {
        if (index === 0) {
          return [...result, item];
        }
        if (!result.some((resultItem) => resultItem.id === item.id)) {
          return [...result, item];
        }
        return result;
      }, []);
      setActualRecipients(newActualRecipients);
    }
  }, [data]);

  useEffect(() => {
    setActualRecipients(recipients);
    actualOffset = offset;
    actualLimit = limit;
  }, []);

  const loadData = async () => {
    if (usersRef.current.scrollTop + usersRef.current.clientHeight === usersRef.current.scrollHeight) {
      call([{ offset: actualOffset + actualLimit }]);
    }
  };

  useEffect(() => {
    if (usersRef?.current) {
      usersRef.current.addEventListener('scroll', _throttle(loadData, 250));
    }
    return () => usersRef?.current?.removeEventListener('scroll', loadData);
  }, [usersRef?.current]);

  useEffect(() => {
    if (newMessageState.searchValue.length >= 1) {
      call([{ search: newMessageState.searchValue }]);
    }
  }, [newMessageState]);

  const filteredRecipients = useMemo(() => {
    return actualRecipients?.filter((recipient) => {
      return (
        recipient?.id?.toString()?.includes(newMessageState.searchValue) ||
        recipient?.nickname?.toString()?.includes(newMessageState.searchValue)
      );
    });
  }, [actualRecipients, newMessageState]);

  const onChangeField = (field) => (e) => {
    const value = e?.target ? e?.target.value : e;

    setNewMessageState((prev) => ({ ...prev, [field]: value }));
  };

  const onChangeSelected = (id) => () => {
    const selectedUsers = newMessageState.selectedUsers?.includes(id)
      ? newMessageState.selectedUsers?.filter((user) => user !== id)
      : [...newMessageState.selectedUsers, id];

    setNewMessageState((prev) => ({ ...prev, selectedUsers }));
  };

  const onSubmit = async () => {
    setIsSendMessage(true);
    try {
      await DirectMessageRepository.sendToMultiUsers({
        to_users: newMessageState.selectedUsers,
        message: newMessageState.text,
      });

      push(
        newMessageState.selectedUsers.length > 1 ? '/messages' : `/messages/chat/${newMessageState.selectedUsers[0]}`,
      );
    } catch (e) {}
  };

  return (
    <div className="flex sm:flex-col sm:space-y-10 sm:space-x-0 mb-5 space-x-10 w-full">
      <div className="flex sm:overflow-hidden sm:min-h-340px flex-col w-full bg-black-light space-y-2.5 rounded py-7.5 sm:rounded-none">
        <div className="px-7.5 sm:px-5">
          <div className="relative">
            <Input
              value={newMessageState.searchValue}
              onChange={_throttle(onChangeField('searchValue'), 300)}
              placeholder="Search"
            />
            {isLoading && <PuffLoadingIcon className="w-6 absolute right-3 top-3 h-6" />}
          </div>
        </div>
        {!!newMessageState?.selectedUsers?.length && (
          <div className="flex px-7.5 sm:px-5">
            <div className="flex flex-wrap py-1.5 px-2.5 w-full pb-0 bg-white-100 overflow-auto max-h-180px rounded-mini">
              {newMessageState?.selectedUsers?.map((user) => (
                <div
                  className="flex items-center text-center cursor-pointer ml-2.5 mb-1.5 px-2.5 bg-main-blue text-white leading-8 font-bold min-w-32px rounded"
                  onClick={onChangeSelected(user)}
                >
                  {user}
                  <div className="h-4 5 w-4 5 ml-2.5 rounded-full flex items-center justify-center bg-white">
                    <CloseIcon className="stroke-current w-3 h-3 text-main-blue" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col h-full sm:h-300px sm:overflow-y overflow-y-auto px-7.5 sm:px-5" ref={usersRef}>
          {filteredRecipients?.map((recipient) => (
            <div
              key={recipient.id}
              className="flex cursor-pointer justify-between items-center py-5  border-b border-white-100 last:border-b-0"
              onClick={onChangeSelected(recipient.id)}
            >
              <div className="flex space-x-5">
                <div className="flex h-10 w-10 rounded-full items-center justify-center bg-white-200">
                  <PersonIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex space-x-2.5">
                    <span className="text-base leading-6 text-white font-medium">
                      {recipient.nickname ? recipient.nickname : recipient.id}
                    </span>
                    {recipient.type === 'upline' && (
                      <div className="bg-main-blue-200 rounded px-2.5 text-xs mb-2 text-main-blue">upline</div>
                    )}
                  </div>
                  {recipient.nickname && (
                    <span className="text-white-500 text-base leading-6 notranslate">ID {recipient.id}</span>
                  )}
                </div>
              </div>
              <div className="flex w-6 h-6 rounded-full">
                {newMessageState?.selectedUsers?.includes(recipient.id) && <SuccessIcon />}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full bg-black-light rounded p-7.5 space-y-6 sm:rounded-none sm:p-5">
        <textarea
          onChange={onChangeField('text')}
          value={newMessageState.text}
          placeholder="Your message..."
          className="resize-none flex flex-1 bg-white-100 rounded-mini text-base text-white font-normal p-15px outline-none h-240px sm:h-200px sm:text-sm"
        />
        <Button
          type="primary"
          onClick={onSubmit}
          disabled={!newMessageState.text || !newMessageState?.selectedUsers.length || isSendMessage}
        >
          {isSendMessage ? <PuffLoadingIcon className="w-6 h-6" /> : 'Send message'}
        </Button>
      </div>
    </div>
  );
};
