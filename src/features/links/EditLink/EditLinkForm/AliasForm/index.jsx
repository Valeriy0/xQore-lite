import React, { useEffect } from 'react';
import { Input } from 'components/Input';
import { Button } from 'components';
import { GroupReflinkRepository } from 'connectors/repositories/group-reflink';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { formScheme } from './form';
import { reject, isEmpty } from 'ramda';
import { callNotification } from 'helpers/notification';
import { ReflinkTypes } from 'helpers/constants';

export const AliasForm = ({ alias, isAllowChange }) => {
  const { query } = useRouter();
  const { register, handleSubmit, formState, reset } = useForm({ ...formScheme.initialScheme });

  const AddAlias = async (data) => {
    const totalData = { ...data };

    try {
      const result = await GroupReflinkRepository.addAlias(query?.id, reject(isEmpty, totalData));
      reset({
        alias: !!data?.alias ? data?.alias : '',
      });
      callNotification({ type: 'success', message: 'Alias added' });
    } catch (e) {}
  };

  useEffect(() => {
    reset({
      alias: !!alias ? alias : '',
    });
  }, [alias]);

  useEffect(() => {
    if (Object.keys(formState?.errors)?.length) {
      callNotification({ type: 'error', message: 'Incorrect values' });
    }
  }, [formState?.errors]);

  return (
    <form onSubmit={handleSubmit(AddAlias)} className="flex flex-col w-full">
      <label className="mb-2.5 text-white-500 sm:text-sm">Alias</label>
      <div className="flex space-x-5 sm:flex-col sm:space-x-0 sm:space-y-4">
        <div className="flex">
          <Input
            className="!pr-0 !rounded-r-none !bg-main-bg !w-130px"
            type="text"
            value={ReflinkTypes['group']}
            readOnly
          />
          <Input
            className="!pl-0 !rounded-l-none"
            type="text"
            title="Alias"
            placeholder="Enter link name"
            {...register('alias')}
          />
        </div>
        {isAllowChange && (
          <Button buttonType="submit" type="primary">
            Save
          </Button>
        )}
      </div>
    </form>
  );
};
