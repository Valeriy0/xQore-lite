import React, { memo, useMemo } from 'react';
import { Tips } from 'components/Tips';
import { SERVICE_FEE, SERVICE_FEE_XQORE, PROGRAM_NAMES } from 'helpers/constants';

export const PriceWithFees = memo(({ title, price, basePrice, isFirstLevel, isFirstXxxOrXGold, currency, name }) => {
  const isXqore = name === PROGRAM_NAMES.XQORE;

  const serviceFee = useMemo(() => {
    if (isFirstLevel) return 0;
    if (isXqore) return SERVICE_FEE_XQORE;
    return SERVICE_FEE;
  }, [isFirstLevel, isXqore]);

  return (
    <div className="w-full flex flex-col items-center border border-l-0 border-r-0 border-white-100  px-10 py-5 sm:px-5 space-y-1">
      <div className="w-full flex items-center justify-between">
        <span className="text-main-blue font-medium text-base sm:text-sm">{title} amount</span>
        <span className="text-main-blue font-bold text-base flex notranslate sm:text-sm">
          {price} {currency}
          {basePrice && !isFirstXxxOrXGold && !isXqore && (
            <>
              <span className="ml-1">(</span>
              <span className="text-orange mx-px">{basePrice} BNB</span>)
            </>
          )}
        </span>
      </div>
      <div className="w-full flex items-center justify-between text-sm">
        <div className="flex items-center text-main-blue-750 notranslate">
          <span>Service fee</span>
          <Tips title="Service fee" iconStyle={'text-main-blue-750 fill-current'} />
        </div>
        <span className="text-main-blue-750 flex notranslate">
          {serviceFee} {currency}
        </span>
      </div>
    </div>
  );
});
