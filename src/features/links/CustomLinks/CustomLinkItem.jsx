import React, { useMemo } from 'react';
import { InfoBlock, Reflink, CustomLink } from 'components';
import SettingsIcon from 'assets/icons/settings.svg';
import EyeIcon from 'assets/icons/eye.svg';
import { useRouter } from 'next/router';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';

export const CustomLinkItem = ({ data, index }) => {
  const { query } = useRouter();
  const isPreviewmode = !!query.user;
  const authProfile = useSelector(getAuthUser);

  const user = query?.user || authProfile?.id;

  const LinkInfo = useMemo(() => {
    return {
      id: data?.id,
      ownerId: data?.user_id,
      owner: data?.user_id === user ? 'You' : `ID ${data?.user_id}`,
      hash: data?.hash,
      stat: {
        clicks: {
          title: 'Clicks',
          total: data?.touch,
          new: data?.touch_dynamic,
        },
        referrals: {
          title: 'Registrations',
          total: data?.referrals,
          new: data?.referrals_dynamic,
        },
        revenue: {
          title: 'Revenue',
          total: data?.revenue,
          new: data?.revenue_dynamic,
        },
      },
      partners: data?.partners.length,
    };
  }, [data]);

  return (
    <div className="xl:max-w-full max-w-1/2 flex flex-col bg-black-light rounded sm:rounded-none p-7.5 sm:p-5 relative">
      {!isPreviewmode && (
        <CustomLink
          href={`/links/linkSettings/${LinkInfo?.id}`}
          className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5"
        >
          {LinkInfo?.ownerId === user ? <SettingsIcon /> : <EyeIcon />}
        </CustomLink>
      )}
      <span className="text-white text-2xl mb-7 sm:mb-5 sm:text-xl">Custom link #{index + 1}</span>
      <Reflink type="mini" refkeyType="group" refkey={LinkInfo?.hash} />
      <div className="flex flex-nowrap overflow-auto space-x-3  w-full">
        {Object.keys(LinkInfo?.stat).map((index) => (
          <InfoBlock
            key={index}
            className={'!bg-white-100 justify-between !w-130px !min-w-0 sm:!min-w-118px sm:flex-shrink-0'}
            title={LinkInfo?.stat[index]?.title}
            total={LinkInfo?.stat[index]?.total}
            new={`+${LinkInfo?.stat[index]?.new}`}
            withIcon={false}
            withMarginGap={false}
          />
        ))}
      </div>
      <div className="flex flex-wrap space-x-2.5 justify-between mt-7.5">
        <div className="flex sm:flex-col space-x-2.5 sm:space-x-0 sm:space-y-1">
          <span className="block text-white-500 text-base sm:text-sm">Owner</span>
          <div className="flex">
            <span className="text-white-900 text-base sm:text-sm">{LinkInfo?.owner}</span>
          </div>
        </div>
        <div className="flex sm:flex-col sm:items-end space-x-2.5 sm:space-x-0 sm:space-y-1">
          <span className="block text-white-500 text-base sm:text-sm">Participants</span>
          <div className="flex ">
            {/* <div className='w-16 relative'>
              {new Array(3).fill({}).map((val, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 bg-gray-light border-2 border-black-light absolute rounded-full ml-${5 * index} overflow-hidden z-${index + 1}`} />
              ))}
            </div> */}
            <span className="block text-white text-base sm:text-sm">{LinkInfo?.partners}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
