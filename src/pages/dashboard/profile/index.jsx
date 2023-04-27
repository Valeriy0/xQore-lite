import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BreadCrumbs, Button, Checkbox } from 'components';
import { linkWithQuery } from 'helpers/links';
import { InputForm } from 'components/Forms/InputForm';
import PictureIcon from 'assets/icons/picture.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserProfile } from 'store/userSlice/selectors';
import { UserRepository } from 'connectors/repositories/user';
import { Controller, useForm } from 'react-hook-form';
import { formScheme } from 'features/dashboard/profile/forms/form';
import { callNotification } from 'helpers/notification';
import { ImageUploader } from 'components';
import { omit } from 'ramda';
import CloseIcon from 'assets/icons/close.svg';
import { updateCurrentUser } from 'store/userSlice';
import { useComponentDidUpdate } from 'helpers/hooks/useComponentDidUpdate';
import EthIcon from 'assets/tokens/eth.svg';
import TrxIcon from 'assets/tokens/trx.svg';
import PuffLoadingIcon from 'assets/animations/puff.svg';

const Profile = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserProfile);
  const { errors, register, handleSubmit, reset, control, watch, formState } = useForm({
    ...formScheme.initialScheme,
    defaultValues: {
      username: currentUser.nickname,
      email: currentUser.email,
      telegram: currentUser.telegram,
      photo: currentUser.photo,
      ethereum_user_id: currentUser.ethereum_user_id,
      tron_user_id: currentUser.tron_user_id,
      show_personal_data: currentUser.show_personal_data,
    },
  });
  const { query } = useRouter();
  const breadCrumbsProps = {
    title: `Profile`,
    links: [
      {
        href: !!query.user ? linkWithQuery('/dashboard', { user: query.user }) : '/dashboard',
        title: 'Dashboard',
      },
    ],
  };

  useComponentDidUpdate(
    (prev) => {
      if (
        prev.currentUser.nickname !== currentUser.nickname ||
        prev.currentUser.email !== currentUser.email ||
        prev.currentUser.telegram !== currentUser.telegram ||
        prev.currentUser.photo !== currentUser.photo ||
        prev.currentUser.show_personal_data !== currentUser.show_personal_data
      ) {
        reset({
          username: currentUser.nickname,
          email: currentUser.email,
          telegram: currentUser.telegram,
          photo: currentUser.photo,
          ethereum_user_id: currentUser.ethereum_user_id,
          tron_user_id: currentUser.tron_user_id,
          show_personal_data: currentUser.show_personal_data,
        });
      }
    },
    { currentUser },
  );

  const onDeleteAvatar = async () => {
    if (typeof watch('photo') === 'string') {
      try {
        await UserRepository.deleteAvatar();

        dispatch(
          updateCurrentUser({
            photo: null,
          }),
        );
      } catch (e) {}
    } else {
      dispatch(
        updateCurrentUser({
          photo: null,
        }),
      );
    }
  };

  const onSubmit = async (data) => {
    const totalData = data?.photo === currentUser?.photo ? omit(['photo'], data) : data;
    if (!isLoading) {
      setIsLoading(true);

      try {
        const result = await UserRepository.updateSettings(totalData);

        if (result) {
          dispatch(
            updateCurrentUser({
              nickname: result.username || '',
              email: result.email || '',
              telegram: result.telegram || '',
              tron_user_id: result.tron_user_id || '',
              ethereum_user_id: result.ethereum_user_id || '',
              photo: result.photo,
              show_personal_data: result.show_personal_data,
            }),
          );

          callNotification({ type: 'success', message: 'Update success' });
        }
      } catch (e) {
        if (e?.response?.status === 413) {
          callNotification({ type: 'error', message: 'Too large image' });
        } else {
          callNotification({ type: 'error', message: e?.response?.data?.message || e?.data?.message || e?.message });
        }
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    const errors = Object.keys(formState?.errors);

    errors?.forEach((errorKey) => {
      formState?.errors[errorKey]?.message &&
        callNotification({ type: 'error', message: formState?.errors[errorKey]?.message });
    });
  }, [formState?.errors]);

  return (
    <main className="flex flex-1 flex-col w-full">
      <div className="flex w-full justify-between items-center mb-10 sm:mb-7.5">
        <div className="flex flex-wrap justify-between sm:px-5">
          <BreadCrumbs {...breadCrumbsProps} />
        </div>
      </div>
      <div className="flex space-x-5 sm:flex-col sm:space-x-0">
        <form
          className="max-w-50% flex flex-1 overflow-hidden relative w-full flex-col bg-black-light rounded p-7.5 pb-5 sm:p-5 sm:rounded-none lg:max-w-full sm:order-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-1 flex-col justify-start space-y-7.5 mb-10 sm:space-y-5 sm:mb-7.5">
            <div className="flex flex-col">
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="flex relative w-120px h-120px sm:h-98px sm:w-98px">
                    <ImageUploader
                      className={
                        'flex w-full items-center justify-center cursor-pointer px-5 py-3 bg-white-100 hover:bg-white-300 rounded-full text-white-500 hover:text-white hover:bg-black-500'
                      }
                      onChange={onChange}
                      value={value}
                      maxFileSize={2097152}
                    >
                      <PictureIcon className="w-10 h-10 sm:h-7.5 sm:w-7.5 stroke-current" />
                    </ImageUploader>
                    {value && (
                      <div
                        className="flex p-1 bg-gray-500 rounded-full absolute -right-2 cursor-pointer z-10 top-0"
                        onClick={onDeleteAvatar}
                      >
                        <CloseIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                )}
                name="photo"
                defaultValue=""
              />
              <div className="flex flex-col mt-3">
                <span className="text-white-500 text-sm">Maximum file size: 2 MB</span>
                <span className="text-white-500 text-sm">Allowed file formats: jpg, jpeg, png</span>
              </div>
            </div>
            <InputForm title="NickName" placeholder="your nickname (max 10 characters)" {...register('username')} />
            <InputForm title="Email" placeholder="e.g. hello@forsage.io" {...register('email')} />
            <InputForm title="Telegram" placeholder="@nickname" {...register('telegram')} />
            <div className="flex">
              <Checkbox {...register('show_personal_data')} className="w-[20px] h-[20px]" />
              <span className="text-white-500 text-sm">Show your contacts at invite page</span>
            </div>
          </div>
          <Button buttonType="submit" type="primary" disabled={isLoading}>
            {isLoading ? <PuffLoadingIcon className="w-6 h-6" /> : 'Save changes'}
          </Button>
        </form>

        <div className="flex flex-1 sm:flex-grow-0 sm:px-5">
          <div className="flex flex-1 flex-col w-full space-y-5 sm:space-y-0 sm:bg-black-light sm:rounded sm:mb-5">
            <div className="relative flex flex-col bg-black-light rounded p-7.5 space-y-5 sm:bg-transparent sm:rounded-none sm:border-b sm:border-white-300 sm:last:border-b-none">
              <div className="relative">
                <InputForm
                  title="Connect your Forsage ETH ID"
                  placeholder="38"
                  {...register('ethereum_user_id')}
                  className={'z-20'}
                />
                <EthIcon className="absolute h-full rotate-45 top-0 right-5" />
              </div>
              <Button disabled={isLoading} buttonType="submit" type="primary" onClick={handleSubmit(onSubmit)}>
                {isLoading ? <PuffLoadingIcon className="w-6 h-6 mr-2" /> : 'Link ETH'}
              </Button>
            </div>
            <div className="flex flex-col bg-black-light rounded p-7.5 space-y-5 sm:bg-transparent sm:rounded-none">
              <div className="relative">
                <InputForm
                  title="Connect your Forsage TRX ID"
                  placeholder="101"
                  {...register('tron_user_id')}
                  className={'z-20'}
                />
                <TrxIcon className="absolute h-full top-0 right-2.5 h-20" />
              </div>
              <Button disabled={isLoading} buttonType="submit" type="primary" onClick={handleSubmit(onSubmit)}>
                {isLoading ? <PuffLoadingIcon className="w-6 h-6 mr-2" /> : 'Link TRX'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
