import React, { useMemo } from 'react';
import ProfileInfo from './ProfileInfo';
import PartnerLink from './PartnerLink';
import Digest from './Digest';

export const LeftBar = ({ allowedBlocks = [] }) => {
  const renderBlocks = useMemo(() => {
    return allowedBlocks?.map((block) => {
      switch (block) {
        case 'profile':
          return <ProfileInfo />;
        case 'partner':
          return <PartnerLink />;
        case 'digest':
          return <Digest />;
        default:
          return null;
      }
    });
  }, []);

  return <div className="flex flex-col space-y-30 w-full space-y-10">{renderBlocks}</div>;
};
