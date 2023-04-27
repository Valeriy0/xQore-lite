import React, { useState } from 'react';
import { Modal, Button } from 'components';
import { DateComp, Address, PeopleCount, Language } from 'features/offlineEvents/EventCardComp/CardComponents';
import { COUNTRIES, OFFLINE_EVENTS_LANGUAGES } from 'helpers/constants';

export const MoreInfoOfflineEventModal = ({
  openedModal,
  onClose,
  invitation_image_url,
  map_url,
  country,
  id,
  date,
  language,
  address,
}) => {
  const languageTitle = OFFLINE_EVENTS_LANGUAGES.find(({ key }) => key === language)?.title;
  const countryTitle = COUNTRIES.find(({ key }) => key === country)?.title || '';

  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-between w-full rounded-2xl bg-black-light overflow-hidden sm:rounded-none sm:p-5 overflow-auto sm:!p-0">
        <img src="/events/modals/moreInfoWrapper.png" className="w-full" alt="" />
        <div className="w-full flex flex-col pb-10 px-10 -mt-20 sm:-mt-16 h-full sm:justify-between sm:px-5 ">
          <div className="w-full flex flex-col space-y-2.5 mb-5 text-white sm:space-y-1.5">
            <span className="text-3xl text-white font-medium sm:text-2xl">ID {id}</span>
            <DateComp date={date} />
            <div className="w-full flex flex-col text-white-500 space-y-2.5 sm:space-y-1.5">
              <Address map_url={map_url} address={`${countryTitle} ${address}`} />
              <Language lang={languageTitle} />
              <PeopleCount partners={10} />
            </div>
          </div>
          <div className="flex flex-col space-y-5">
            {invitation_image_url && (
              <a className="w-full" href={invitation_image_url} target="_blank" rel="noreferrer">
                <Button className="w-full" type="primary">
                  Img invitation
                </Button>
              </a>
            )}
            <Button onClick={onClose} type="light-white">
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
