import React, { useEffect } from 'react';
import { Input } from 'components/Input';
import { Button } from 'components';
import { GroupReflinkRepository } from 'connectors/repositories/group-reflink';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { formScheme } from './form';
import { reject, isEmpty } from 'ramda';
import { callNotification } from 'helpers/notification';

export const PartnersForm = ({ updateTable }) => {
  const { query } = useRouter();
  const { register, handleSubmit, control, formState, watch, reset } = useForm({ ...formScheme.initialScheme });
  const AddPartner = async (data) => {
    const totalData = { ...data, group_ref_link_id: query?.id };

    try {
      const result = await GroupReflinkRepository.addPartner(reject(isEmpty, totalData));
      reset({
        user_id: '',
      });
      updateTable();
      callNotification({ type: 'success', message: 'User added' });
    } catch (e) {}
  };

  useEffect(() => {
    reset({
      user_id: '',
    });
  }, []);

  useEffect(() => {
    if (Object.keys(formState?.errors)?.length) {
      callNotification({ type: 'error', message: 'Incorrect values' });
    }
  }, [formState?.errors]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(AddPartner)}
        className="flex flex-col w-full rounded bg-main-blue-200 p-7.5 sm:rounded-none sm:p-5"
      >
        <label className="mb-2.5 text-white-500 sm:text-sm">Add partner</label>
        <div className="flex space-x-5 sm:flex-col sm:space-x-0 sm:space-y-4">
          <Input type="text" title="Add partner" placeholder="Partner's ID" {...register('user_id')} />
          <Button buttonType="submit" type="primary">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
