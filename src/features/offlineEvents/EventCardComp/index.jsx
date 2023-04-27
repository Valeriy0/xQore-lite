import React, { useMemo, useState } from 'react';
import { Button } from 'components';
import DeleteIcon from 'assets/icons/delete.svg';
import InfoIcon from 'assets/icons/information_circle.svg';
import { DeleteOfflineEventModal } from 'components/modals';
import { SendReportOfflineEventModal } from 'components/modals/SendReportOfflineEventModal';
import { MoreInfoOfflineEventModal } from 'components/modals/MoreInfoOfflineEventModal';
import { DateComp, Address, PeopleCount, StatusComp } from './CardComponents';
import { COUNTRIES } from 'helpers/constants';

export const EventCardComp = ({
  id,
  date,
  address,
  country,
  map_url,
  language,
  className,
  approved_at,
  declined_at,
  reported_at,
  onFetchEvents,
  onFetchUserEvents,
  invitation_image_url,
  expected_guests_number,
  isAuthCard = false,
}) => {
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
  const [isOpenedReportModal, setIsOpenedReportModal] = useState(false);
  const [isOpenedMoreModal, setIsOpenedMoreModal] = useState(false);
  const isReported = Boolean(reported_at);

  const renderHeader = useMemo(() => {
    return (
      <div className="flex items-center justify-between w-full z-10">
        <span className="font-semibold text-white text-2xl sm:text-xl">ID {id}</span>
        {isAuthCard && (
          <Button
            onClick={() => setIsOpenedDeleteModal(true)}
            className="absolute top-5 right-5 w-10 h-10 !p-0"
            type="light-white-rounded"
          >
            <DeleteIcon className="w-[18px] h-[18px]" />
          </Button>
        )}
      </div>
    );
  }, [isAuthCard, id, setIsOpenedDeleteModal]);

  const renderContent = useMemo(() => {
    const countryTitle = COUNTRIES.find(({ key }) => key === country)?.title || '';

    return (
      <div className="flex flex-col space-y-2 z-10 sm:text-sm">
        <DateComp date={date} />
        <Address map_url={map_url} address={`${countryTitle} ${address}`} />
        {isAuthCard && <StatusComp declined={declined_at} approved={approved_at} reported={isReported} />}
      </div>
    );
  }, [date, address, map_url, declined_at, approved_at, isReported]);

  const renderFooter = useMemo(() => {
    const isApproved = !!approved_at;

    return (
      <div className="flex justify-between items-end w-full z-10 sm:text-sm">
        <PeopleCount partners={expected_guests_number} />
        {isAuthCard ? (
          isApproved && (
            <Button onClick={() => setIsOpenedReportModal(true)} type={!isReported ? 'primary' : 'black'}>
              Send report
            </Button>
          )
        ) : (
          <Button onClick={() => setIsOpenedMoreModal(true)} type="primary">
            <InfoIcon className="w-4 h-4 mr-1.5" />
            <span>More info</span>
          </Button>
        )}
      </div>
    );
  }, [isAuthCard, expected_guests_number, setIsOpenedReportModal, isReported]);

  const eventSrcBackground = useMemo(() => {
    const countPictures = 8;

    for (let i = countPictures; i >= 0; i--) {
      if (id % i === 0) {
        return `/events/cardWrapperImg/${i}.png`;
      }
    }
  }, [id]);

  return (
    <>
      <div
        className={`relative overflow-hidden rounded max-w-[500px] w-full h-[259px] flex flex-col bg-black-light p-7.5 text-white-500 ${className} sm:!w-[calc(100vw-40px)] sm:h-[207px] sm:p-5`}
      >
        <div className="flex flex-col w-full flex-1 space-y-3">
          {renderHeader}
          {renderContent}
        </div>
        {renderFooter}
        <img className="absolute bottom-0 right-0 sm:max-h-[175px] sm:bottom-[-20px]" src={eventSrcBackground} alt="" />
      </div>
      {isOpenedDeleteModal && (
        <DeleteOfflineEventModal
          eventId={id}
          onDelete={() => {
            onFetchEvents();
            onFetchUserEvents();
          }}
          onClose={() => setIsOpenedDeleteModal(false)}
          openedModal={isOpenedDeleteModal}
        />
      )}
      {isOpenedReportModal && (
        <SendReportOfflineEventModal
          eventId={id}
          onReport={onFetchUserEvents}
          openedModal={isOpenedReportModal}
          onClose={() => setIsOpenedReportModal(false)}
        />
      )}
      {isOpenedMoreModal && (
        <MoreInfoOfflineEventModal
          id={id}
          country={country}
          date={date}
          map_url={map_url}
          language={language}
          address={address}
          invitation_image_url={invitation_image_url}
          openedModal={isOpenedMoreModal}
          onClose={() => setIsOpenedMoreModal(false)}
        />
      )}
    </>
  );
};
