import React from 'react';
import { InputForm } from 'components/Forms';
import { useDebouncedEffect } from 'helpers/hooks/useDebounce';
import { UserRepository } from 'connectors/repositories/user';

export const RegistrationInput = ({ setUplineInfo, uplineInfo }) => {
  const onChangeInputUpline = ({ target }) => {
    setUplineInfo((prev) => ({
      ...prev,
      value: target?.value?.replace(/\D/g, '') || '',
    }));
  };

  useDebouncedEffect(
    async () => {
      try {
        await UserRepository.profile({ user: uplineInfo.value });

        setUplineInfo((prev) => ({
          ...prev,
          error: false,
        }));
      } catch (e) {
        setUplineInfo((prev) => ({
          ...prev,
          error: true,
        }));
      }
    },
    300,
    [uplineInfo.value],
  );

  return (
    <div className="flex flex-col mb-10 sm:mb-7.5">
      <InputForm
        title="Your upline"
        className="flex-grow-0 flex-shrink-0"
        inputStyles={uplineInfo.error && 'border-red'}
        type="text"
        onChange={onChangeInputUpline}
        placeholder="Upline"
        value={uplineInfo.value}
      />
      {uplineInfo.error && (
        <span className="text-base mt-4 text-red">
          User not found. Enter existing <span className="notranslate">upline ID</span>
        </span>
      )}
    </div>
  );
};
