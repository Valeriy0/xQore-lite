import React from 'react';
import { BreadCrumbs } from 'components';
import { OfflineEvents } from 'features/manager/OfflineEvents';
import { checkRoleRedirect } from 'helpers/auth';

const CheckEvents = () => {
  const breadCrumbsProps = {
    title: `Event Manager`,
  };

  return (
    <main className="flex flex-1 flex-col w-full">
      <div className="mb-10 sm:mb-7.5">
        <BreadCrumbs {...breadCrumbsProps}>
          <span className="w-full text-white-500 text-base sm:text-sm">
            This section is available exclusively for team Forsage and is aimed at administering entry forms
          </span>
        </BreadCrumbs>
      </div>
      <div className="relative flex flex-1 w-full space-x-10 sm:flex-col sm:px-0 sm:space-x-0">
        <OfflineEvents />
      </div>
    </main>
  );
};

CheckEvents.storeInitial = async ({ ctx }) => {
  checkRoleRedirect(ctx);
};

export default CheckEvents;
