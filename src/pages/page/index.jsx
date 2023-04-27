import React from 'react';
import LevelInfo from './LevelInfo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Transactions from './Transactions';
import { BreadCrumbs } from 'components';
import ForsageThree from 'public/svg/forsage_3.svg';

const breadCrumbsProps = {
  title: <ForsageThree />,
  links: [{ href: '/', title: 'Главная' }],
};

const Page = () => {
  return (
    <main className="flex flex-1 w-full justify-center">
      <div className="flex w-full max-w-screen-xl mt-14 mb-14">
        <div className="ml-10 w-full">
          <BreadCrumbs {...breadCrumbsProps} />
          <div className="mt-8">
            <LevelInfo />
          </div>
          <div className="mt-8">
            <Transactions />
          </div>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Page;
