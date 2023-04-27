import React from 'react';
import PlaceIcon from 'assets/icons/place.svg';

export const Address = ({ address, map_url }) => {
  return (
    <div className="flex items-center space-x-2.5">
      <PlaceIcon className="w-3.5 sm:w-2.5" />
      {map_url ? (
        <a
          href={map_url}
          target="_blank"
          rel="noreferrer"
          className="bg-white-100 rounded-mini px-2.5 py-1 hover:bg-white-200 hover:text-white"
        >
          <span>{address}</span>
        </a>
      ) : (
        <span>{address}</span>
      )}
    </div>
  );
};
