import React from 'react';

import ExchangeIcon from 'assets/icons/exchange.svg';
import GiftIcon from 'assets/icons/gift.svg';
import PersonIcon from 'assets/icons/person.svg';
import ArrowUpFullIcon from 'assets/icons/arrow_up_fill.svg';
import OverflowUp from 'assets/icons/rocket_up.svg';
import OverflowDown from 'assets/icons/rocket_down.svg';
import UpgradeIcon from 'assets/icons/upgrade.svg';
import SnowIcon from 'assets/icons/snowflake.svg';
import StoredCoin from 'assets/icons/stored_coin.svg';
import ReleasedCoin from 'assets/icons/released_coin.svg';
import NewUserIcon from 'assets/icons/new_user.svg';
import WalletIcon from 'assets/icons/wallet.svg';
import TargetAchieved from 'assets/icons/target_achieved.svg';
import TargetExpired from 'assets/icons/target_expired.svg';
import InfoIcon from 'assets/icons/information_circle.svg';
import UnreadMessageIcon from 'assets/icons/unread_message.svg';

const IconTypes = {
  reinvest: {
    icon: ExchangeIcon,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-light',
    overflow_up: {
      icon: ExchangeIcon,
      iconBg: 'bg-orange-100',
      iconColor: 'stroke-current text-orange',
    },
    overflow_down: {
      icon: ExchangeIcon,
      iconBg: 'bg-yellow-100',
      iconColor: 'stroke-current text-yellow',
    },
  },
  sale_place: {
    icon: PersonIcon,
    iconBg: 'bg-white-100',
    iconColor: 'text-white',
    overflow_up: {
      icon: OverflowDown,
      iconBg: 'bg-orange-100',
      iconColor: 'fill-current text-orange',
    },
    overflow_down: {
      icon: OverflowUp,
      iconBg: 'bg-yellow-100',
      iconColor: 'fill-current text-yellow',
    },
  },
  new_partner: {
    icon: NewUserIcon,
    iconBg: 'bg-white-100',
    iconColor: 'text-white',
  },
  profit: {
    icon: WalletIcon,
    iconBg: 'bg-green-200',
    iconColor: 'fill-current text-green',
  },
  send_upline: {
    icon: ArrowUpFullIcon,
    iconBg: 'bg-white-200',
    iconColor: 'text-white',
  },
  upgrade_gift: {
    icon: GiftIcon,
    iconBg: 'bg-light-blue-100',
    iconColor: 'fill-current text-light-blue',
  },
  leading_gift: {
    icon: GiftIcon,
    iconBg: 'bg-light-blue-100',
    iconColor: 'fill-current text-light-blue',
  },
  activate_program: {
    iconPng: '/icons/activate_program.png',
    iconBg: 'bg-main-blue-200',
  },
  stored_coin: {
    icon: StoredCoin,
    iconBg: 'bg-yellow-100',
    iconColor: '',
  },
  released_coin: {
    icon: ReleasedCoin,
    iconBg: 'bg-purple-400',
    iconColor: '',
  },
  upgrade: {
    icon: UpgradeIcon,
    iconBg: 'bg-green-100',
    iconColor: 'fill-current text-green-light',
  },
  upgrade_missed: {
    icon: SnowIcon,
    iconBg: 'bg-red-200',
    iconColor: 'stroke-current text-red',
    overflow_up: {
      icon: OverflowDown,
      iconBg: 'bg-red-200',
      iconColor: 'fill-current text-red',
    },
    overflow_down: {
      icon: OverflowUp,
      iconBg: 'bg-red-200',
      iconColor: 'fill-current text-red',
    },
  },
  upgrade_required: {
    icon: InfoIcon,
    iconBg: 'bg-white-200',
    iconColor: 'text-white',
  },
  leading_missed: {
    icon: OverflowDown,
    iconBg: 'bg-red-200',
    iconColor: 'fill-current text-red',
  },
  leading_send_upline: {
    icon: ArrowUpFullIcon,
    iconBg: 'bg-red-200',
    iconColor: 'fill-current text-red',
  },
  target_achieved: {
    icon: TargetAchieved,
    iconBg: 'bg-green-100',
  },
  target_expired: {
    icon: TargetExpired,
    iconBg: 'bg-red-200',
    iconColor: 'fill-current text-red',
  },
  unread_message: {
    icon: UnreadMessageIcon,
    iconBg: 'bg-white-100',
    iconColor: 'text-white',
  },
};

export const TableIcons = ({ type, overflow = false, reinvest_index }) => {
  const IconStyle = !!overflow ? IconTypes[type][`overflow_${overflow}`] : IconTypes[type];
  const Icon = !!IconStyle?.icon && IconStyle?.icon;

  return (
    <div className="flex w-full">
      <div
        className={`relative flex items-center justify-center rounded-full ${IconStyle?.iconBg} w-11 h-11 sm:w-7.5 sm:h-7.5`}
      >
        {Icon && <Icon className={`${IconStyle?.iconColor} h-18px w-18px `} />}
        {!!IconStyle?.iconPng && <img src={IconStyle?.iconPng} className="h-18px w-18px " />}
        <span className={`absolute top-0 right-0 text-mini leading-3 ${IconStyle?.iconColor}`}>{reinvest_index}</span>
      </div>
    </div>
  );
};
