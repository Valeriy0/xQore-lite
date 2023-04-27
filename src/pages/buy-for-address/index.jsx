import React, { useState } from 'react';
import { InputForm } from 'components/Forms';
import { BreadCrumbs, Button, Select } from 'components';
import { PROGRAM_MAX_LEVELS, PROGRAM_NAMES, XQORE_DATE_START } from 'helpers/constants';
import { useBuyForAddress } from 'helpers/hooks/useBuyForAddress';
import { redirect } from 'helpers/auth';
import { checkAuth } from 'store/userSlice/asyncActions';
import { addHours, isAfter, isBefore, parseISO } from 'date-fns';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/format';

const selectOptions = new Array(PROGRAM_MAX_LEVELS[PROGRAM_NAMES.XQORE])
  .fill({})
  .map((v, i) => ({ title: `${i + 1} level`, key: String(i + 1) }));

const breadCrumbsProps = {
  title: 'Buy for address',
};

const BuyForAddress = () => {
  const [address, setAddress] = useState('');
  const [level, setLevel] = useState(selectOptions[0].key);

  const { onBuyForAddress } = useBuyForAddress();

  const onBuy = async () => {
    try {
      await onBuyForAddress(level, address);
    } catch (e) {
      callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
    }
  };

  return (
    <main className="flex flex-1 w-full">
      <div className="flex flex-col w-full space-y-10 sm:space-y-7.5">
        <BreadCrumbs {...breadCrumbsProps} />

        <div className="flex flex-col space-y-8 w-1/2">
          <InputForm value={address} onChange={(e) => setAddress(e.target.value)} title="Address" />
          <div className="w-full relative flex flex-col s">
            <label className="mb-2.5 text-white-500 sm:text-sm">Program</label>
            <Select className={'notranslate'} value={level} onChange={setLevel} data={selectOptions} />
          </div>

          <Button onClick={onBuy} type="primary">
            Buy level
          </Button>
        </div>
      </div>
    </main>
  );
};

BuyForAddress.storeInitial = async ({ ctx }) => {
  if (
    isAfter(new Date(), addHours(parseISO(XQORE_DATE_START), -1)) &&
    isBefore(new Date(), addHours(parseISO(XQORE_DATE_START), 1))
  ) {
    await ctx.reduxStore.dispatch(checkAuth());
  }

  if (parseInt(ctx.reduxStore.getState().profile.authUser?.id) !== 10) {
    redirect('/', ctx);
  }

  return {};
};
export default BuyForAddress;
