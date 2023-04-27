import React from 'react';
import PartnersLight from 'assets/icons/partnersLight.svg';

export const PeopleCount = ({ partners }) => {
  return (
    <div className="flex items-center space-x-2.5">
      <PartnersLight className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
      <span>{partners} Guests</span>
    </div>
  );
};
