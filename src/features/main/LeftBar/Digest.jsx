import React from 'react';

const DIGESTS = [
  {
    topic: 'Руководство',
    title: 'Почему forsage не пирамида?',
  },
  {
    topic: 'Руководство',
    title: 'Установка и регистрация forsage (кошелек token pocket)',
  },
  {
    topic: 'Руководство',
    title: 'Xgold руководство по взаимодействию с сайтом на пк с использованием metamask',
  },
];

const Digest = () => {
  return (
    <div className="flex flex-col bg-black-light rounded-3xl">
      <span className="text-white font-bold p-5 pb-0 text-base">Моя партнерская ссылка</span>
      {DIGESTS.map(({ topic, title }, index) => {
        return (
          <div className="flex flex-col border border-white-100 p-5 border-l-0 border-r-0 border-t-0" key={title}>
            <span className="text-white-500 text-sup-xs font-medium">{topic}</span>
            <span className="text-white text-xs mt-1.5">{title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Digest;
