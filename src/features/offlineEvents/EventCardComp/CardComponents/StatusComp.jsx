import React, { useMemo } from 'react';
import ApprovedIcon from 'assets/moderationStatuses/approved.svg';
import ModerationIcon from 'assets/moderationStatuses/moderation.svg';
import RejectedIcon from 'assets/moderationStatuses/rejected.svg';
import ReportedIcon from 'assets/moderationStatuses/reported.svg';

export const StatusComp = ({ declined, approved, reported }) => {
  const cardStatus = useMemo(() => {
    if (!!declined) {
      return {
        title: 'Rejected',
        icon: RejectedIcon,
        color: 'text-red',
      };
    } else if (!!approved) {
      if (reported) {
        return {
          title: 'content sent',
          icon: ReportedIcon,
          color: 'text-main-blue',
        };
      } else {
        return {
          title: 'Approved',
          icon: ApprovedIcon,
          color: 'text-green',
        };
      }
    } else {
      return {
        title: 'Moderation',
        icon: ModerationIcon,
        color: 'text-yellow',
      };
    }
  }, [declined, approved]);

  const Icon = cardStatus?.icon;

  return (
    <div className={`flex items-center space-x-2.5 ${cardStatus?.color}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{cardStatus?.title}</span>
    </div>
  );
};
