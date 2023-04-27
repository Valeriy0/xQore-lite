import React, { useMemo } from 'react';
import { CustomLinkItem } from './CustomLinkItem';
import { CreateLink } from './CreateLink';
import { useRouter } from 'next/router';
import { CustomLinkPlaceholder } from './Placeholder';
import { MAX_CUSTOMLINKS } from 'helpers/constants';

export const CustomLinks = ({ reflinkList, CreateLinkFunc, isLoading }) => {
  const { query } = useRouter();
  const isPreviewMode = !!query.user;

  const renderContent = useMemo(() => {
    const linksLength = !!reflinkList && reflinkList.length;
    const isAllowCreateLink = linksLength < MAX_CUSTOMLINKS;

    return (
      <>
        {reflinkList?.map((item, index) => (
          <CustomLinkItem data={item} index={index} key={index} />
        ))}
        {!isPreviewMode && isAllowCreateLink && <CreateLink CreateLinkFunc={CreateLinkFunc} />}
      </>
    );
  }, [isLoading, reflinkList]);

  const renderPlaceholder = useMemo(() => {
    return Array.from(new Array(2)).map((item, index) => <CustomLinkPlaceholder />);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col px-5">
        <span className="text-white text-3xl mb-2.5 sm:text-2xl">Custom links</span>
        <span className="text-white-500 text-base w-full sm:w-full sm:text-sm">
          Promote different teams by using cutom links, Create and set up custom links for your team. Include as many
          participants in your link as you want and set up how the new registrations will be distributed within the
          group.
        </span>
      </div>
      <div className="grid grid-cols-2 w-full gap-10 xl:grid-cols-1 lg:gap-5 mt-7.5">
        {isLoading ? renderPlaceholder : renderContent}
      </div>
    </div>
  );
};
