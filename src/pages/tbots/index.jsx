import React from 'react';
import { BreadCrumbs, CustomLink } from 'components';
import TelegramIcon from 'assets/icons/telegram.svg';

const breadCrumbsProps = {
  title: 'Telegram bots',
};

const botsList = [
  {
    title: 'FORSAGE BSC Notifier Bot',
    desc: 'New partners and transactions notifications',
    link: 'https://t.me/busd_forsage_io_bot',
  },
  {
    title: 'FORSAGE Support Bot',
    desc: 'Help in difficult situations',
    link: 'https://t.me/forsage_io_support_bot',
  },
];

const tbots = () => {
  return (
    <main className="flex flex-1 w-full">
      <div className="flex flex-col w-full">
        <div className="mb-7.5">
          <BreadCrumbs {...breadCrumbsProps} />
        </div>
        <div className="max-w-50% flex flex-1 overflow-hidden relative w-full flex-col bg-black-light rounded p-7.5 pb-5 space-y-5 sm:space-y-2.5 sm:p-5 sm:rounded-none lg:max-w-full">
          {botsList?.map((item, index) => (
            <CustomLink key={index} href={item?.link} targetBlank>
              <div className="flex items-center justify-between rounded-mini bg-white-100 hover:bg-white-300 p-5 sm:items-start ">
                <div className="bg-black-light flex justify-center items-center rounded-full w-10 h-10 mr-5">
                  <TelegramIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-1 flex-col items-start justify-center">
                  {!!item.title && (
                    <span className="text-white font-medium text-base mb-1.5 notranslate">{item?.title}</span>
                  )}
                  {!!item.desc && <span className="text-white-500 text-sm">{item?.desc}</span>}
                </div>
              </div>
            </CustomLink>
          ))}
        </div>
      </div>
    </main>
  );
};

export default tbots;
