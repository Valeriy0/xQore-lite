import React from 'react';
import { NewMessage } from 'features/messages/NewMessage';
import { DirectMessageRepository } from 'connectors/repositories/direct-message';
import { checkAuth } from 'helpers/auth';
import { BreadCrumbs } from 'components';

const New = ({ recipients, limit, offset }) => {
  const breadCrumbsProps = {
    title: 'New message',
    links: [{ href: '/messages', title: 'Messages' }],
  };

  return (
    <main className="flex flex-1 space-y-10 flex-col w-full">
      <BreadCrumbs {...breadCrumbsProps} />
      <div className="flex w-full sm:flex-1 flex flex-1-1-0 pb-5 max-h-full overflow-y-auto">
        <NewMessage recipients={recipients} limit={limit} offset={offset} />
      </div>
    </main>
  );
};

New.storeInitial = async ({ ctx }) => {
  checkAuth(ctx);

  try {
    const { recipients, limit, offset } = await DirectMessageRepository.getRecipient();

    return {
      limit,
      offset,
      recipients,
    };
  } catch (e) {}

  return {};
};

export default New;
