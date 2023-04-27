import React from 'react';
import { CustomLink, Button } from 'components';
import { checkRoleRedirect } from 'helpers/auth';

const MainManager = () => {
  return (
    <div className="flex flex-col space-y-5">
      <CustomLink href="/manager/allStats">
        <Button className="w-[300px]" type="primary">
          Статистика
        </Button>
      </CustomLink>
      <CustomLink href="/manager/checkEvents">
        <Button className="w-[300px]" type="primary">
          Offline events
        </Button>
      </CustomLink>
    </div>
  );
};

MainManager.storeInitial = async ({ ctx }) => {
  checkRoleRedirect(ctx);
};

export default MainManager;
