import React, { useMemo } from 'react';
import { format } from 'date-fns-tz';
import { parseISO } from 'date-fns';
import ClockIcon from 'assets/icons/miniClock.svg';
import { CustomLink, Button } from 'components';
import LinkIcon from 'assets/icons/link.svg';
import PlaceIcon from 'assets/icons/place.svg';
import PartnersLightIcon from 'assets/icons/partnersLight.svg';
import FileIcon from 'assets/icons/file.svg';
import EarthIcon from 'assets/icons/earth.svg';
import { COUNTRIES, OFFLINE_EVENTS_LANGUAGES } from 'helpers/constants';

export const CardItem = ({
  address,
  country,
  date,
  expected_guests_number,
  id,
  invitation_image_url,
  language,
  map_url,
  organizer_id,
  approveFunc,
  declineFunc,
}) => {
  const renderButtons = () => {
    return (
      <div className="flex justify-end items-center space-x-2.5 sm:w-full">
        <Button onClick={() => approveFunc()} type="green" className="py-1.5 sm:flex-1 sm:h-10">
          Approve
        </Button>
        <Button onClick={() => declineFunc()} type="red" className="py-1.5 sm:flex-1 sm:h-10">
          Decline
        </Button>
      </div>
    );
  };
  const convertedInfo = useMemo(() => {
    return [
      {
        title: 'Language',
        isFilled: Boolean(language),
        renderValue: () => {
          const languageTitle = OFFLINE_EVENTS_LANGUAGES.find(({ key }) => key === language)?.title;
          return <span>{languageTitle}</span>;
        },
        icon: EarthIcon,
        iconStyle: 'fill-current text-white-700',
      },
      {
        title: 'Date',
        isFilled: Boolean(date),
        renderValue: () => {
          const currentDate = date.slice(0, date.length - 6);
          return <span>{format(parseISO(currentDate), 'dd MMMM, yyyy | HH:mm')}</span>;
        },
        icon: ClockIcon,
      },
      {
        title: 'Country',
        isFilled: Boolean(country),
        renderValue: () => {
          const countryTitle = COUNTRIES.find(({ key }) => key === country)?.title || '';
          return <span>{countryTitle}</span>;
        },
        icon: PlaceIcon,
      },
      {
        title: 'Address',
        isFilled: Boolean(address),
        renderValue: () => {
          return <span>{address}</span>;
        },
        icon: PlaceIcon,
      },
      {
        title: 'Map link',
        isFilled: Boolean(map_url),
        renderValue: () => {
          if (Boolean(map_url)) {
            return (
              <div>
                <CustomLink
                  className="flex items-center justify-end hover:bg-white-300 bg-white-100 px-2.5 py-1 rounded-mini"
                  href={map_url}
                  targetBlank
                >
                  Link
                  <LinkIcon className="w-4 h-4 ml-1.5" />
                </CustomLink>
              </div>
            );
          } else {
            return null;
          }
        },
        icon: PlaceIcon,
      },
      {
        title: 'Max guests at event',
        isFilled: Boolean(expected_guests_number),
        renderValue: () => {
          return <span>{expected_guests_number}</span>;
        },
        icon: PartnersLightIcon,
      },
      {
        title: 'Invitation image link',
        isFilled: Boolean(invitation_image_url),
        renderValue: () => {
          if (Boolean(invitation_image_url)) {
            return (
              <div>
                <CustomLink
                  className="flex items-center justify-end hover:bg-white-300 bg-white-100 px-2.5 py-1 rounded-mini"
                  href={invitation_image_url}
                  targetBlank
                >
                  Link
                  <LinkIcon className="w-4 h-4 ml-1.5" />
                </CustomLink>
              </div>
            );
          } else {
            return null;
          }
        },
        icon: FileIcon,
        iconStyle: 'stroke-current text-white-500',
      },
    ];
  }, [address, country, date, expected_guests_number, id, invitation_image_url, language, map_url, organizer_id]);

  return (
    <div className="flex flex-col w-full bg-black-light p-5 rounded">
      <div className="flex justify-between items-center w-full border-b border-white-500 pb-5 px-2.5 sm:px-0 sm:flex-col sm:items-start sm:justify-start sm:space-y-1.5 sm:pb-2.5">
        <div className="flex items-center justify-start text-white space-x-2.5">
          <span className="text-2xl font-bold sm:text-xl"> Event id {id}</span>
          <div className="bg-main-blue-300 py-1.5 px-2.5 rounded-mini">id {organizer_id}</div>
        </div>
        <div className="sm:hidden">{renderButtons()}</div>
      </div>
      <div className="pt-5 flex flex-wrap w-full text-white sm:pt-2.5">
        {convertedInfo?.map((item, itemIndex) => {
          const Icon = item?.icon;
          if (item?.isFilled) {
            return (
              <div className="flex justify-center items-center w-1/2 p-2.5 sm:flex-col sm:w-full sm:px-0">
                <div className="flex justify-start items-center w-full bg-white-100 rounded-mini p-2.5" key={itemIndex}>
                  <div className="flex justify-between items-center w-full space-x-2.5">
                    <div className="flex items-center justify-start space-x-1.5 text-white-500">
                      <Icon className={`w-3.5 h-3.5 ${!!item?.iconStyle ? item?.iconStyle : ''}`} />
                      <span className="sm:text-sm">{item?.title}</span>
                    </div>

                    {item?.renderValue()}
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="hidden sm:flex sm:pt-2.5">{renderButtons()}</div>
    </div>
  );
};
