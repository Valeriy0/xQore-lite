import React from 'react';
import { Modal, Button } from 'components';
import SnowFlakeIcon from 'assets/icons/snowflake.svg';
import WarningIcon from 'assets/icons/warning.svg';

export const MatrixInfoModal = ({ openedModal, onClose }) => {
  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-start w-full rounded-2xl bg-black-light p-10 overflow-hidden sm:rounded-none sm:p-5 overflow-auto sm:!pt-20">
        <div className="flex items-center justify-between mb-5">
          <span className="text-white text-3xl font-medium sm:text-2xl">Programs marketing info</span>
        </div>
        <div className="flex flex-col flex-1 overflow-auto space-y-2.5">
          <div className="flex text-left text-white text-base sm:text-sm">
            Overview of the current programs status and progress. Click on any of the programs for detailed view
          </div>
          <div className="flex">
            <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-md bg-main-blue mr-2.5" />
            <div className="text-white text-base sm:text-sm">
              <span className="font-normal"> Activated level in the program. </span>
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-md bg-white-100 mr-2.5" />
            <div className="text-white text-base sm:text-sm">
              <span className="font-normal"> Not activated level in the the program. </span>
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-md mr-2.5 shadow-freeze-program bg-white-100">
              <SnowFlakeIcon className="h-3.5 w-3.5" />
            </div>
            <div className="text-white text-base sm:text-sm">
              <span className="font-normal">
                {' '}
                Level freeze is when the level made 1st cycle, but the next level was not activated, new partners
                continue to get into the spots but profits are missed. Upgrade to the next level to unfreeze.{' '}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-md mr-2.5 bg-red">
              <WarningIcon className="fill-current text-white w-3.5 h-3.5" />
            </div>
            <div className="text-white text-base sm:text-sm">
              <span className="font-normal">
                {' '}
                Level with missed profits or missed partners. Partners overtook on this level and profits were missed,
                because the level is not activated. Upgrade required to catch up with partners.{' '}
              </span>
            </div>
          </div>
        </div>
        <Button type="light-white" className="!mt-5" onClick={onClose}>
          Close tip
        </Button>
      </div>
    </Modal>
  );
};
