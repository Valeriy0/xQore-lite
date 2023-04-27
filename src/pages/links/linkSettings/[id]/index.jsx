import React, { useEffect } from 'react';
import { BreadCrumbs, InfoBlock } from 'components';
import { EditLinkForm, EditLinkTable } from 'features/links/EditLink';
import { checkAuth } from 'helpers/auth';
import { GroupReflinkRepository } from 'connectors/repositories/group-reflink';
import { useRouter } from 'next/router';
import { linkWithQuery } from 'helpers/links';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { callNotification } from 'helpers/notification';
import { useRequest } from 'helpers/hooks/useRequest';

const EditLink = () => {
  const authStore = useSelector(getAuthUser);
  const { query } = useRouter();
  const userId = !!query.user ? query.user : authStore?.id;

  const breadCrumbsProps = {
    title: `Link settings`,
    links: [
      {
        href: !!query.user ? linkWithQuery('/links', { user: query?.user }) : '/links',
        title: `ID ${userId}`,
      },
    ],
  };

  const { isLoading, call, data: link } = useRequest(GroupReflinkRepository.getLink, [query?.id]);

  const isAuthProfile = useSelector(getAuthUser)?.id === link?.user_id;

  useEffect(() => {
    call([query?.id]);
  }, []);

  const updateTable = async () => {
    call([query?.id]);
  };

  const togglePartner = async (id, status) => {
    const active = status == 'pause' ? 1 : 0;

    const message = status == 'pause' ? `Partner restored ` : `Partner stopped`;

    try {
      await GroupReflinkRepository.togglePartner(id, { active: active });
      updateTable();
      callNotification({ type: 'success', message: message });
    } catch (e) {}
  };

  const deletePartner = async (id) => {
    try {
      const result = await GroupReflinkRepository.deletePartner(id);

      if (!result.lenght) {
        updateTable();
        callNotification({ type: 'success', message: 'partner deleted' });
      }
    } catch (e) {}
  };

  return (
    <main className="flex flex-1 flex-col w-full">
      <div className="flex w-full justify-between items-center mb-10 sm:mb-7.5">
        <div className="">
          <BreadCrumbs {...breadCrumbsProps} />
        </div>
      </div>
      <div className={`flex items-start ${isAuthProfile && 'flex-1'} w-full mb-15 space-x-10 sm:space-x-0 sm:flex-col`}>
        <div className="max-w-500px w-full sm:order-2 sm:max-w-full">
          <EditLinkForm id={link?.id} updateTable={updateTable} {...link} />
        </div>
        <div className="max-w-500px w-full flex items-start justify-start sm:mb-5 sm:order-1 sm:px-5 sm:max-w-full">
          <InfoBlock
            className={'justify-between'}
            title={'Link Clicks'}
            total={link?.touch}
            new={`+${link?.touch_dynamic}`}
            withIcon={false}
            withMarginGap={false}
          />
        </div>
      </div>
      <div className={`flex flex-col ${!isAuthProfile && 'flex-1'}`}>
        <span className="text-3xl text-white font-medium mb-7.5 sm:text-2xl sm:px-5">Partners</span>
        <EditLinkTable
          data={link?.partners}
          togglePartner={togglePartner}
          deletePartner={deletePartner}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

EditLink.storeInitial = async ({ ctx }) => {
  checkAuth(ctx);
  let props = {};

  return {
    ...props,
  };
};

export default EditLink;
