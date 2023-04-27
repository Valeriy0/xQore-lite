import React, { useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { Button } from 'components';
import QuestionIcon from 'assets/icons/question.svg';
import ReactTooltip from 'react-tooltip';

export const Tips = ({ title = '', iconStyle = '' }) => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const openTooltip = async () => {
    if (window.innerWidth <= 767) {
      setIsOpenedModal(true);
    }
  };

  const tooltipsContent = {
    Partners: 'Total number of direct partners and last 24 hours change',
    Team: 'Total number of partners in full structure and last 24 hours change',
    Ratio: 'Performance rate showing ratio "amount received" / "amount spent" and last 24 hours change',
    Profits: 'Total amount received to your wallet from all the Forsage programs and last 24 hours change',
    'My personal link': 'Invite your friends to Forsage BUSD and build your team by sharing your link',
    'Personal link': 'Invite your friends to Forsage BUSD and build your team by sharing your link',
    'Forsage Programs':
      'Overview of the current programs status and progress. Click on any of the programs for detailed view',
    'Platform recent activity': 'Forsage BUSD real-time global events with links to transactions in blockchain ',
    'Members total': 'Total number of members in Forsage BUSD and last 24 hours change',
    'Members received': 'Total amount received by all members of Forsage and last 24 hours change',
    'Members received, BUSD': 'Total amount of BUSD received by all members of Forsage BUSD and last 24 hours change',
    'Members received, BNB': 'Total amount of BNB received by all members of Forsage BNB and last 24 hours change',
    'Link clicks': 'Total number of visitors by your link and last 24 hours change',
    'Service fee': 'Service Fee applies from the 2nd level of each program for ecosystem development.',
  };

  return (
    <div className="relative group">
      {!!tooltipsContent?.[title] && (
        <Button data-tip data-for={title} className="ml-1.5" onClick={openTooltip}>
          <QuestionIcon className={`w-5 h-5 ${iconStyle}`} />
        </Button>
      )}
      <DialogOverlay
        className="!hidden header-dialog-overlay !bg-black-500 sm:!block"
        onClose={() => setIsOpenedModal(false)}
        isOpen={isOpenedModal}
        as={'div'}
      >
        <DialogContent className="header-dialog-content relative" as={'div'} aria-label={'modal'}>
          <div className="z-30 fixed left-0 bottom-0 w-screen h-screen flex items-end bg-black-500 text-white">
            <div className="flex relative flex-col justify-end p-5 w-full bg-black-light rounded rounded-b-none">
              {!!title && <span className="text-xl font-medium mb-2.5 hidden sm:block">{title}</span>}
              {!!tooltipsContent?.[title] && <span className="mb-5">{tooltipsContent?.[title]}</span>}
              <Button type="light-white" onClick={() => setIsOpenedModal(false)}>
                Close tip
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>

      <ReactTooltip
        place="bottom"
        type="light"
        className="!max-w-300px !p-2.5 !text-main-bg !bg-white !opacity-100 !rounded-mini !text-sm !font-normal sm:!hidden"
        multiline
        data-class="!bg-green"
        id={title}
      >
        {tooltipsContent?.[title]}
      </ReactTooltip>
    </div>
  );
};
