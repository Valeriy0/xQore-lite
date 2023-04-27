import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { formScheme } from 'features/offlineEvents/OfflineEventForm/form';
import { InputForm } from 'components/Forms';
import { useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { Button, Select } from 'components';
import {
  COUNTRIES,
  OFFLINE_EVENTS_DATES,
  OFFLINE_EVENTS_GUESTS_OPTIONS,
  OFFLINE_EVENTS_LANGUAGES,
  OFFLINE_EVENTS_TIMEZONES,
} from 'helpers/constants';
import { UploadImageOfflineEvent } from 'features/offlineEvents/OfflineEventForm/UploadImageOfflineEvent';
import { SelectGuestsNumber } from 'features/offlineEvents/OfflineEventForm/SelectGuestsNumber';
import { EventRepository } from 'connectors/repositories/event';
import { isEmpty, isNil, reject } from 'ramda';
import { callNotification } from 'helpers/notification';

export const OfflineEventForm = ({ onRefetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const currentAuthUser = useSelector(getAuthUser);
  const { register, handleSubmit, control, formState, watch, reset, setValue, getValues } = useForm({
    ...formScheme.initialScheme,
  });

  const onSubmit = async () => {
    if (!isLoading) {
      const { timezone, time, date, ...rest } = await getValues();
      const totalValues = { ...rest, date: `${date}T${time}${timezone}` };

      setIsLoading(true);

      try {
        await EventRepository.createEvent(reject(isNil, reject(isEmpty, totalValues)));

        reset({
          date: '',
          address: '',
          country: '',
          invitation_image: '',
          expected_guests_number: '',
          map_url: '',
          timezone: '',
          time: '',
          tg_username: '',
          title: '',
          description: '',
          organizer_id: currentAuthUser.id,
        });

        onRefetch();
      } catch (e) {
        callNotification({ type: 'error', message: e.response.data.message });
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValue('organizer_id', currentAuthUser.id);
  }, [currentAuthUser?.id]);

  return (
    <div className="flex flex-col space-y-10 flex-1 sm:w-full sm:space-y-5">
      <div className="sm:px-5">
        <span className="text-4xl font-medium text-white sm:text-3xl">Offline events form</span>
      </div>
      <div className="relative ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col flex-1 items-start w-full max-w-500px rounded bg-black-light p-7.5 space-y-7.5 sm:order-2 sm:w-full sm:max-w-full sm:rounded-none sm:p-5">
            <InputForm type="text" title="Title" placeholder="Enter event name" {...register('title')} />
            <InputForm type="text" title="Description" placeholder="Enter description" {...register('description')} />
            <InputForm
              type="text"
              title="Telegram username"
              placeholder="Enter Telegram username"
              {...register('tg_username')}
            />
            <InputForm
              disabled
              type="text"
              title="Organizer id"
              errorText={formState.errors?.organizer_id?.message}
              placeholder="Enter description"
              {...register('organizer_id')}
            />
            <div className="w-full relative flex flex-col">
              <div className="flex items-baseline">
                <label className="mb-2.5 text-white-500 sm:text-sm">Country</label>
                {formState.errors?.country?.message && (
                  <span className="text-red ml-2.5 text-xs">{formState.errors?.country?.message}</span>
                )}
              </div>
              <div className="w-full relative">
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      className={formState.errors?.country?.message ? 'border-red' : ''}
                      value={value}
                      onChange={onChange}
                      data={COUNTRIES}
                    />
                  )}
                />
              </div>
            </div>
            <InputForm
              errorText={formState.errors?.address?.message}
              type="text"
              title="Address"
              placeholder="Enter address"
              {...register('address')}
            />
            <InputForm
              errorText={formState.errors?.map_url?.message}
              type="text"
              title="Map url"
              placeholder="Enter Map url"
              {...register('map_url')}
            />
            <div className="flex w-full space-x-5">
              <InputForm
                errorText={formState.errors?.time?.message}
                {...register('time')}
                type="text"
                title="Time event"
                mask={'99:99'}
              />
              <div className="w-full relative flex flex-col">
                <div className="flex items-baseline">
                  <label className="mb-2.5 text-white-500 sm:text-sm">Timezone</label>
                  {formState.errors?.timezone?.message && (
                    <span className="text-red ml-2.5 text-xs">{formState.errors?.timezone?.message}</span>
                  )}
                </div>
                <div className="w-full relative">
                  <Controller
                    name="timezone"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        className={formState.errors?.date?.message ? 'border-red' : ''}
                        value={value}
                        onChange={onChange}
                        data={OFFLINE_EVENTS_TIMEZONES}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="w-full relative flex flex-col">
              <div className="flex items-baseline">
                <label className="mb-2.5 text-white-500 sm:text-sm">Date</label>
                {formState.errors?.date?.message && (
                  <span className="text-red ml-2.5 text-xs">{formState.errors?.date?.message}</span>
                )}
              </div>
              <div className="w-full relative">
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      className={formState.errors?.date?.message ? 'border-red' : ''}
                      value={value}
                      onChange={onChange}
                      data={OFFLINE_EVENTS_DATES}
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full relative flex flex-col">
              <div className="flex items-baseline">
                <label className="mb-2.5 text-white-500 sm:text-sm">Language</label>
                {formState.errors?.language?.message && (
                  <span className="text-red ml-2.5 text-xs">{formState.errors?.language?.message}</span>
                )}
              </div>
              <div className="w-full relative">
                <Controller
                  name="language"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      className={formState.errors?.language?.message ? 'border-red' : ''}
                      value={value}
                      onChange={onChange}
                      data={OFFLINE_EVENTS_LANGUAGES}
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full relative flex flex-col">
              <div className="flex flex-col items-baseline">
                <label className="mb-2.5 text-white-500 sm:text-sm">
                  Upload your Img invitation, no more than 3 mb
                </label>
                {formState.errors?.invitation_image?.message && (
                  <span className="text-red mb-2.5 text-xs">{formState.errors?.invitation_image?.message}</span>
                )}
              </div>
              <div className="w-full relative">
                <Controller
                  name="invitation_image"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <UploadImageOfflineEvent value={value} onChange={onChange} />
                  )}
                />
              </div>
            </div>
            <div className="w-full relative flex flex-col">
              <div className="flex items-baseline">
                <label className="mb-2.5 text-white-500 sm:text-sm">Number of guests at your event</label>{' '}
                {formState.errors?.expected_guests_number?.message && (
                  <span className="text-red ml-2.5 text-xs">{formState.errors?.expected_guests_number?.message}</span>
                )}
              </div>
              <div className="w-full relative">
                <Controller
                  name="expected_guests_number"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <SelectGuestsNumber value={value} onChange={onChange} options={OFFLINE_EVENTS_GUESTS_OPTIONS} />
                  )}
                />
              </div>
            </div>
            <Button disabled={isLoading} buttonType="submit" type="primary" className="w-full">
              Create new Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
