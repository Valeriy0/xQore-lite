import React from 'react';
import { TariffItem } from './TariffItem';

const TARIFFS = [
  {
    value: 3,
    trx: 3200,
    amount: 171,
  },
  {
    value: 4,
    trx: 3200,
    amount: 172,
  },
];

export const TariffList = () => {
  return (
    <div className="flex flex-col space-y-8">
      {TARIFFS.map((tariff, index) => (
        <TariffItem {...tariff} key={tariff.value} />
      ))}
    </div>
  );
};
