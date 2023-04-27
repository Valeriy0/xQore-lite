import { PROGRAM_NAMES } from './constants';
import Person from 'assets/icons/person_line.svg';
import ArrowCircle from 'assets/icons/rounded_arrow_top.svg';
import ExchangeIcon from 'assets/icons/exchange.svg';
import StoredCoin from 'assets/icons/stored_coin_black.svg';

export const PROGRAMS_STYLES = {
  noActive: 'bg-line-gray hover:bg-white-200',
  missed: 'bg-red hover:bg-hover-red',
  [PROGRAM_NAMES.X3]: {
    bgColorClass: 'bg-main-blue',
    blurBgColor: 'bg-main-blue',
    textColor: 'text-main-blue',
    upgradeBtnStyle: 'primary',
  },
  [PROGRAM_NAMES.X4]: {
    bgColorClass: 'bg-main-blue',
    blurBgColor: 'bg-light-purple',
    textColor: 'text-light-purple',
    upgradeBtnStyle: 'purple',
  },
  [PROGRAM_NAMES.XXX]: {
    bgColorClass: 'bg-main-blue',
    blurBgColor: 'bg-dark-pink',
    textColor: 'text-dark-pink',
    upgradeBtnStyle: 'pink',
    iconBg: 'bg-dark-pink-200',
  },
  [PROGRAM_NAMES.XGOLD]: {
    bgColorClass: 'bg-main-blue',
    blurBgColor: 'bg-orange',
    textColor: 'text-orange',
    upgradeBtnStyle: 'orange',
    iconBg: 'bg-orange-200',
  },
  [PROGRAM_NAMES.XQORE]: {
    bgColorClass: 'bg-main-blue',
    blurBgColor: 'bg-cyan',
    textColor: 'text-cyan-100',
    upgradeBtnStyle: 'cyan-300',
    iconBg: 'bg-cyan-400',
  },
};

export const PARTNERS_STYLES = {
  [PROGRAM_NAMES.X4]: {
    1: ArrowCircle,
  },
  [PROGRAM_NAMES.XXX]: {
    1: ArrowCircle,
    last: ExchangeIcon,
  },
  [PROGRAM_NAMES.XGOLD]: {
    1: ArrowCircle,
    last: ExchangeIcon,
  },
  freeze: {
    bg: 'bg-red',
  },
  stored_coin: {
    icon: StoredCoin,
    up: {
      bg: 'bg-yellow border-2 border-yellow',
    },
    bottom: {
      bg: 'bg-orange border-2 border-yellow',
    },
    upgrade_gift: {
      bg: 'bg-light-blue border-2 border-yellow',
    },
    private: {
      bg: 'bg-white border-2 border-yellow',
    },
  },
  reinvest: {
    icon: ExchangeIcon,
    up: {
      bg: 'bg-yellow border-2 border-green',
    },
    bottom: {
      bg: 'bg-orange border-2 border-green',
    },
    upgrade_gift: {
      bg: 'bg-light-blue border-2 border-green',
    },
    private: {
      bg: 'bg-white border-2 border-green',
    },
  },
  up: {
    icon: ArrowCircle,
    bg: 'bg-yellow',
  },
  bottom: {
    icon: Person,
    bg: 'bg-orange',
  },
  private: {
    icon: Person,
    bg: 'bg-white',
  },
  upgrade_gift: {
    icon: Person,
    bg: 'bg-light-blue',
  },
};
