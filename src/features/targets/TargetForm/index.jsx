import React, { useEffect } from 'react';
import { InputForm } from 'components/Forms/InputForm';
import { Button } from 'components';
import PictureIcon from 'assets/icons/picture.svg';
import { Controller, useForm } from 'react-hook-form';
import { formScheme } from './form';
import { Checkbox, ImageUploader } from 'components';
import { TargetRepository } from 'connectors/repositories/target';
import { reject, isEmpty } from 'ramda';
import { useRouter } from 'next/router';
import { callNotification } from 'helpers/notification';

export const TargetForm = ({}) => {
  const { replace, asPath } = useRouter();
  const { register, handleSubmit, control, formState, reset } = useForm({ ...formScheme.initialScheme });

  const onSubmit = async (data) => {
    const totalData = { ...data, is_global: Number(data.is_global) };
    try {
      await TargetRepository.create(reject(isEmpty, totalData));
      await replace(asPath);
      reset({});
    } catch (e) {}
  };

  useEffect(() => {
    reset({
      amount: 0,
      budget: 0,
    });
  }, []);

  useEffect(() => {
    if (Object.keys(formState?.errors)?.length) {
      callNotification({ type: 'error', message: 'Incorrect values' });
    }
  }, [formState?.errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-1 w-full space-x-10 mb-15 sm:space-x-0 sm:flex-col sm:mb-12">
        <div className="flex flex-col items-start w-full max-w-500px rounded bg-black-light p-7.5 space-y-7.5 sm:order-2 sm:w-full sm:max-w-full sm:rounded-none">
          <InputForm type="text" title="Alias" placeholder="Enter target name" {...register('subject')} />
          <InputForm type="text" title="Description" placeholder="Type something here" {...register('description')} />
          <InputForm type="number" title="Budget" placeholder="e.g. 500 000" {...register('budget')} />
          <div className="flex flex-col w-full">
            <label className="mb-2.5 text-white-500" htmlFor="descr-input">
              Need sum
            </label>
            <div className="flex w-full space-x-5">
              <InputForm className="flex-1" type="number" placeholder="e.g. 500 000" {...register('amount')} />
              <InputForm className="w-120px" type="text" value="BUSD" disabled />
            </div>
          </div>
          <div className="flex space-x-5 w-full">
            <InputForm {...register('date_start')} type="text" title="Start date" mask={'99.99.9999'} />
            <InputForm {...register('date_end')} type="text" title="End date" mask={'99.99.9999'} />
          </div>
          <Checkbox {...register('is_global')} title="Private target" />
          <Button buttonType="submit" type="primary" className="sm:w-full">
            Create new target
          </Button>
        </div>
        <div className="w-full sm:px-5 sm:mb-5">
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageUploader
                className={
                  'flex cursor-pointer items-center justify-center px-5 py-2.5 bg-black-light hover:bg-line-gray w-full max-w-500px max-h-450px h-full flex-col rounded font-normal sm:w-full sm:max-w-full sm:h-200px'
                }
                onChange={onChange}
                value={value}
                maxFileSize={2097152}
              >
                <PictureIcon className="w-10 h-10 sm:h-7.5 sm:w-7.5 stroke-current text-white" />
                <span className="text-white-500 text-center">
                  Click to download <br /> target image
                </span>
                <span className="text-white-500 text-sm mt-5">Maximum file size: 2 MB</span>
                <span className="text-white-500 text-sm">Allowed file formats: jpg, jpeg, png</span>
              </ImageUploader>
            )}
            name="image"
            defaultValue=""
          />
        </div>
      </div>
    </form>
  );
};
