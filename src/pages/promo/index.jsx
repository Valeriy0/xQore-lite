import React, { useMemo } from 'react';
import { BreadCrumbs } from 'components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { UserRepository } from 'connectors/repositories/user';
import { checkRedirect } from 'helpers/auth';
import { PromoItem } from 'features/promo/PromoItem';
import { promoLinks } from 'helpers/promoLinks';

const Promo = ({ profile = {} }) => {
  const breadCrumbsProps = {
    title: `Promo`,
  };

  const renderContent = useMemo(
    () => (
      <Tabs>
        <TabList>
          {promoLinks?.map((item, index) => {
            return <Tab key={index}>{item?.sectionTitle}</Tab>;
          })}
        </TabList>

        {promoLinks?.map((item, index) => {
          return (
            <TabPanel key={index}>
              <div className="flex flex-col">
                <div className="text-white py-1.5">{item?.sectionDescription}</div>
                <div className="grid gap-5 grid-cols-2 sm:grid-cols-1 pt-2.5">
                  {item?.files?.map((file, index) => (
                    <PromoItem
                      file={file}
                      key={index}
                      refkey={profile?.refkey}
                      preview={item?.withPreview}
                      type={item?.type}
                    />
                  ))}
                </div>
              </div>
            </TabPanel>
          );
        })}
      </Tabs>
    ),
    [promoLinks],
  );

  return (
    <main className="flex flex-1 flex-col w-full">
      <div className="mb-10 sm:mb-7.5">
        <BreadCrumbs {...breadCrumbsProps}>
          <span className="w-full text-white-500 text-base sm:text-sm">
            Expand your Forsage team and get more partners and results by using ready-made promotional materials
          </span>
        </BreadCrumbs>
      </div>
      <div className="relative flex flex-1 w-full space-x-10 sm:flex-col sm:px-0 sm:space-x-0">
        <div className="w-full flex flex-1 overflow-hidden relative w-full flex-col bg-black-light rounded p-7.5 pb-5 space-y-5 sm:space-y-2.5 sm:p-5 sm:rounded-none lg:max-w-full">
          {renderContent}
        </div>
      </div>
    </main>
  );
};

Promo.storeInitial = async ({ ctx }) => {
  checkRedirect(ctx);
  let props = {};
  const authProfile = ctx.reduxStore?.getState()?.profile?.authUser;
  const user = ctx?.query?.user || authProfile?.id;

  try {
    const [profile] = await Promise.all([UserRepository.profile({ user: user })]);

    props = { ...props, profile: profile || {} };
  } catch (e) {
    console.log(e);
  }

  return {
    ...props,
  };
};

export default Promo;
