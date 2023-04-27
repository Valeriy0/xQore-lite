import MegaphoneIcon from 'assets/icons/megaphone.svg';
import MegaphoneActiveIcon from 'assets/icons/megaphone_active.svg';
import LinksIcon from 'assets/icons/links.svg';
import LinksActiveIcon from 'assets/icons/links_active.svg';
import NftIcon from 'assets/icons/nft_menu.svg';
import NftActiveIcon from 'assets/icons/nft_menu_active.svg';
import CalculatorIcon from 'assets/icons/calculator.svg';
import CalculatorActiveIcon from 'assets/icons/calculator_active.svg';
import InformationIcon from 'assets/icons/information_menu.svg';
import InformationActiveIcon from 'assets/icons/information_menu_active.svg';
import PeopleIcon from 'assets/icons/people.svg';
import PeopleActiveIcon from 'assets/icons/people_active.svg';
import BoxesIcon from 'assets/icons/boxes.svg';
import BoxesActiveIcon from 'assets/icons/boxes_active.svg';
import StatsIcon from 'assets/icons/stats.svg';
import StatsActiveIcon from 'assets/icons/stats_active.svg';
import InstructionIcon from 'assets/icons/instruction_menu.svg';
import InstructionActiveIcon from 'assets/icons/instruction_menu_active.svg';
import TargetIcon from 'assets/icons/target.svg';
import TargetActiveIcon from 'assets/icons/target_active.svg';
import TelegramIcon from 'assets/icons/telegram.svg';
import TelegramActiveIcon from 'assets/icons/telegram_active.svg';
import ChatIcon from 'assets/icons/chat.svg';
import ChatActiveIcon from 'assets/icons/chat_active.svg';
import ExitIcon from 'assets/icons/exit.svg';
import MagnifierIcon from 'assets/icons/magnifier.svg';
import TeamIcon from 'assets/icons/team.svg';
import EventIcon from 'assets/icons/event_menu.svg';
import EventActiveIcon from 'assets/icons/event_menu_active.svg';

export const LINKS = [
  {
    title: 'Dashboard',
    icon: BoxesIcon,
    activeIcon: BoxesActiveIcon,
    link: '/dashboard',
    showInPreview: true,
  },
  {
    type: 'dropdown',
    title: 'Team',
    icon: TeamIcon,
    activeIcon: TeamIcon,
    isOpen: true,
    titleList: ['Partners', 'Links', 'Stats', 'Messages'],
    dropdownContent: [
      {
        title: 'Partners',
        icon: PeopleIcon,
        activeIcon: PeopleActiveIcon,
        link: '/partners',
        showInPreview: true,
      },
      {
        title: 'Links',
        icon: LinksIcon,
        activeIcon: LinksActiveIcon,
        link: '/links',
        showInPreview: true,
      },
      {
        title: 'Stats',
        icon: StatsIcon,
        activeIcon: StatsActiveIcon,
        link: '/stats',
        showInPreview: true,
      },
      {
        title: 'Messages',
        icon: ChatIcon,
        activeIcon: ChatActiveIcon,
        link: '/messages',
        showInPreview: false,
      },
    ],
  },
  {
    title: 'NFTs',
    icon: NftIcon,
    activeIcon: NftActiveIcon,
    link: '/nft',
    iconStyle: '',
    showInPreview: true,
  },
  {
    type: 'dropdown',
    title: 'Information',
    icon: InformationIcon,
    activeIcon: InformationActiveIcon,
    isOpen: false,
    titleList: ['Instruction', 'Targets', 'Calculator', 'Telegram bots'],
    dropdownContent: [
      {
        title: 'Instruction',
        icon: InstructionIcon,
        activeIcon: InstructionActiveIcon,
        link: '/instruction',
        showInPreview: true,
      },
      {
        title: 'Calculator',
        icon: CalculatorIcon,
        activeIcon: CalculatorActiveIcon,
        link: '/calculator',
        showInPreview: true,
        newVersion: true,
      },
      {
        title: 'Telegram bots',
        icon: TelegramIcon,
        activeIcon: TelegramActiveIcon,
        link: '/tbots',
        showInPreview: true,
      },
      {
        title: 'Targets',
        icon: TargetIcon,
        activeIcon: TargetActiveIcon,
        link: '/targets',
        showInPreview: false,
      },
    ],
  },
  // {
  //   title: 'Offline events',
  //   icon: EventIcon,
  //   activeIcon: EventActiveIcon,
  //   link: '/offline-events',
  //   showInPreview: true,
  //   iconStyle: '',
  // },
  {
    title: 'Promo & PDFs',
    icon: MegaphoneIcon,
    activeIcon: MegaphoneActiveIcon,
    link: '/promo',
    showInPreview: true,
    iconStyle: 'animate-bounce',
  },
  {
    title: 'Forsage Account search',
    icon: MagnifierIcon,
    activeIcon: MagnifierIcon,
    mobileOnly: true,
    showInPreview: false,
    submenu: true,
  },
  {
    title: 'Log out',
    icon: ExitIcon,
    activeIcon: ExitIcon,
    link: '/',
    mobileOnly: true,
    showInPreview: false,
  },
];
