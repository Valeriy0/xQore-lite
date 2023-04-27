import React from 'react';
import { BreadCrumbs } from 'components';
import { TargetForm, TargetItems } from 'features/targets';
import { checkAuth } from 'helpers/auth';
import { TargetRepository } from 'connectors/repositories/target';

const breadCrumbsProps = {
  title: 'Targets',
};

const Targets = ({ list }) => {
  return (
    <main className="flex flex-1 flex-col w-full">
      <div className="flex w-full justify-between items-center mb-10">
        <div className="">
          <BreadCrumbs {...breadCrumbsProps} />
        </div>
      </div>
      <TargetForm />
      <TargetItems targetList={list} />
    </main>
  );
};

Targets.storeInitial = async ({ ctx }) => {
  checkAuth(ctx);
  let props = {};

  try {
    const result = await TargetRepository.getList();

    props = { ...props, list: result };
  } catch (e) {
    console.log(e);
  }

  return {
    ...props,
  };
};

export default Targets;
