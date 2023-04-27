import React from 'react';
import { CopyLink } from 'components';

const PartnerLink = () => {
  return (
    <div className="flex flex-col bg-black-light p-5 rounded-3xl space-y-6">
      <span className="text-white font-bold text-base">Моя партнерская ссылка</span>
      <CopyLink />
      <div className="flex flex-col space-y-4">
        <button className="text-white text-xs font-bold bg-purple rounded-lg py-3">Пригласить в Forsage</button>
        <button className="text-white text-xs font-bold bg-purple rounded-lg py-3">Телеграм-инструменты</button>
      </div>
    </div>
  );
};

export default PartnerLink;
