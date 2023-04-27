import React from 'react';
import { useRouter } from 'next/router';
import { UserRepository } from 'connectors/repositories/user';
import { GroupReflinkRepository } from 'connectors/repositories/group-reflink';
import { BreadCrumbs, Reflink } from 'components';
import { PartnersStatistics } from 'features/partners';
import { CustomLinks } from 'features/links';
import { useRequest } from 'helpers/hooks/useRequest';
import { checkRedirect } from 'helpers/auth';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { callNotification } from 'helpers/notification';
import { useEffect } from 'react';

const breadCrumbsProps = {
  title: 'Links',
};

const LinksPage = ({ info, profile }) => {
  const { query } = useRouter();
  const authProfile = useSelector(getAuthUser);
  const isPreviewMode = !!query.user;
  const user = query?.user || authProfile?.id;

  const {
    isLoading: isLoadingLinks,
    call: callLinks,
    data: links,
  } = useRequest(GroupReflinkRepository.getList, [{ user: user }]);

  const createLink = async () => {
    try {
      await GroupReflinkRepository.create({ user: user });
      callLinks([{ user }]);
    } catch (e) {
      e?.response?.data?.message &&
        callNotification({ type: 'error', message: e.response?.data?.message, autoClose: 7000 });
    }
  };

  useEffect(() => {
    callLinks([{ user }]);
  }, []);

  return (
    <main className="flex flex-1 w-full">
      <div className="flex flex-col w-full space-y-10 sm:space-y-7.5">
        <BreadCrumbs {...breadCrumbsProps} />
        <PartnersStatistics user={query?.user || authProfile?.id} statistic={info} />
        <div className="w-full sm:px-5">
          <Reflink type="fullScreen" {...profile} />
        </div>
        <div className="w-full sm:px-5">
          <Reflink type="fullScreenQore" {...profile} />
        </div>
        {(!!links?.group_ref_links?.length || !isPreviewMode) && (
          <CustomLinks isLoading={isLoadingLinks} reflinkList={links?.group_ref_links} CreateLinkFunc={createLink} />
        )}
      </div>
    </main>
  );
};

LinksPage.storeInitial = async ({ ctx }) => {
  checkRedirect(ctx);
  let props = {};
  const authProfile = ctx.reduxStore?.getState()?.profile?.authUser;
  const user = ctx?.query?.user || authProfile?.id;
  if (!!user) {
    try {
      const [info, profile] = await Promise.all([
        UserRepository.info({ user: user }),
        UserRepository.profile({ user: user }),
      ]);

      props = { ...props, profile: profile || {}, info: info?.data || {} };
    } catch (e) {
      console.log(e);
    }
  }

  return {
    ...props,
  };
};

export default LinksPage;
