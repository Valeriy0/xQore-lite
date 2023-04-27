import config from './config';
import { BigNumber } from '@ethersproject/bignumber';

export const ROLES = {
  BASIC: 'basic',
  MANAGER: 'manager',
};

export const MAX_VALUE = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
export const BASE_BNB_EXCHANGE_PERCENT = 5;

export const FORSAGE_AND_XQORE = 'FORSAGE_AND_XQORE';

export const PROGRAM_NAMES = {
  X3: 'x3',
  X4: 'x4',
  XGOLD: 'xGold',
  XXX: 'xXx',
  XQORE: 'xQore',
};

export const ContractNames = {
  BASE: 'xbase',
  TOKEN: 'token',
  XGOLD: 'xGold',
  XQORE: 'xQore',
  XXX: 'xXx',
  X3: 'x3',
  X4: 'x4',
  ROUTER: 'router',
  PANCAKE: 'pancake',
  PANCAKE_EXCHANGE: 'pancakeExchange',
};

export const CONTRACT_NAMES = {
  BASE: 'xbase',
  TOKEN: 'token',
  XGOLD: 'xGold',
  XXX: 'xXx',
  XQORE: 'xQore',
  X3: 'x3',
  X4: 'x4',
  ROUTER: 'router',
  PANCAKE: 'pancake',
  PANCAKE_EXCHANGE: 'pancakeExchange',
};

export const nameToType = {
  [PROGRAM_NAMES.X3]: CONTRACT_NAMES.BASE,
  [PROGRAM_NAMES.X4]: CONTRACT_NAMES.BASE,
  [PROGRAM_NAMES.XXX]: CONTRACT_NAMES.XXX,
  [PROGRAM_NAMES.XGOLD]: CONTRACT_NAMES.XGOLD,
  [PROGRAM_NAMES.XQORE]: CONTRACT_NAMES.XQORE,
};

export const SERVICE_FEE = config.stand === 'dev' ? 0.009 : 0.9;
export const SERVICE_FEE_XQORE = 0.003;

export const MAX_CUSTOMLINKS = 4;

export const DEFAULT_GAS_LIMIT = BigNumber.from(2000000);

export const FORSAGE_MAIN_URL = 'https://forsage.io/';

export const ReflinkTypes = {
  base: FORSAGE_MAIN_URL + 'b/',
  group: FORSAGE_MAIN_URL + 'br/',
  [PROGRAM_NAMES.XQORE]: FORSAGE_MAIN_URL + 'q/',
};

export const CLIENT_PROGRAM_NAMES = [
  PROGRAM_NAMES.XQORE,
  PROGRAM_NAMES.XGOLD,
  PROGRAM_NAMES.XXX,
  PROGRAM_NAMES.X3,
  PROGRAM_NAMES.X4,
];

export const NETWORK_NAMES = {
  1: 'Ethereum Mainnet',
  97: 'BSC Testnet',
  56: 'Smart Chain',
};

export const PROGRAM_MAX_LEVELS = {
  [PROGRAM_NAMES.X3]: 12,
  [PROGRAM_NAMES.X4]: 12,
  [PROGRAM_NAMES.XXX]: 12,
  [PROGRAM_NAMES.XGOLD]: 15,
  [PROGRAM_NAMES.XQORE]: 12,
};

export const XQORE_FIXED_NUM = config.stand === 'stage' ? 5 : 3;

export const XQORE_PROGRAM_PRICES =
  config.stand === 'stage'
    ? {
        1: 0.00018,
        2: 0.00024,
        3: 0.00033,
        4: 0.00046,
        5: 0.00062,
        6: 0.00088,
        7: 0.00125,
        8: 0.00175,
        9: 0.00245,
        10: 0.00345,
        11: 0.00455,
        12: 0.00644,
      }
    : {
        1: 0.018,
        2: 0.024,
        3: 0.033,
        4: 0.046,
        5: 0.062,
        6: 0.088,
        7: 0.125,
        8: 0.175,
        9: 0.245,
        10: 0.345,
        11: 0.455,
        12: 0.644,
      };

export const PROGRAM_PRICES = {
  [PROGRAM_NAMES.X3]: {
    1: 5,
    2: 10,
    3: 20,
    4: 40,
    5: 80,
    6: 160,
    7: 320,
    8: 640,
    9: 1250,
    10: 2500,
    11: 5000,
    12: 9900,
  },
  [PROGRAM_NAMES.X4]: {
    1: 5,
    2: 10,
    3: 20,
    4: 40,
    5: 80,
    6: 160,
    7: 320,
    8: 640,
    9: 1250,
    10: 2500,
    11: 5000,
    12: 9900,
  },
  [PROGRAM_NAMES.XXX]: {
    1: 8,
    2: 15,
    3: 29,
    4: 57,
    5: 111,
    6: 211,
    7: 411,
    8: 799,
    9: 1555,
    10: 2999,
    11: 5755,
    12: 9696,
  },
  [PROGRAM_NAMES.XGOLD]: {
    1: 10,
    2: 20,
    3: 30,
    4: 50,
    5: 80,
    6: 130,
    7: 210,
    8: 340,
    9: 550,
    10: 890,
    11: 1440,
    12: 2330,
    13: 3770,
    14: 6100,
    15: 9870,
  },
  [PROGRAM_NAMES.XQORE]: XQORE_PROGRAM_PRICES,
};

export const XGOLD_DATE_START = '2021-12-01T18:00Z';
export const XQORE_DATE_START = '2023-04-27T15:00Z';

export const BNB_COMMISSIONS = {
  [PROGRAM_NAMES.X3]: 0.005,
  [PROGRAM_NAMES.X4]: 0.005,
  [PROGRAM_NAMES.XXX]: 0.005,
  [PROGRAM_NAMES.XGOLD]: 0.005,
  [PROGRAM_NAMES.XQORE]: 0.005,
};

export const POTENTIAL_PERCENTS = {
  [PROGRAM_NAMES.X3]: 300,
  [PROGRAM_NAMES.X4]: 400,
  [PROGRAM_NAMES.XXX]: 580,
  [PROGRAM_NAMES.XGOLD]: 1020,
  [PROGRAM_NAMES.XQORE]: 500,
};

export const POTENTIAL_MULTIPLIER = {
  [PROGRAM_NAMES.X3]: 3,
  [PROGRAM_NAMES.X4]: 4,
  [PROGRAM_NAMES.XXX]: 5.8,
  [PROGRAM_NAMES.XGOLD]: 10.2,
  [PROGRAM_NAMES.XQORE]: 5,
};

export const PARTNERS_CYCLES = {
  [PROGRAM_NAMES.X3]: 3,
  [PROGRAM_NAMES.X4]: 6,
  [PROGRAM_NAMES.XXX]: 14,
  [PROGRAM_NAMES.XGOLD]: 30,
  [PROGRAM_NAMES.XQORE]: 12,
};

export const MAX_DEEP_ITERATION_PROGRAMS = {
  [PROGRAM_NAMES.X3]: 1,
  [PROGRAM_NAMES.X4]: 2,
  [PROGRAM_NAMES.XXX]: 3,
  [PROGRAM_NAMES.XGOLD]: 4,
  [PROGRAM_NAMES.XQORE]: 2,
};

export const NESTED_FIRST_COUNT = {
  [PROGRAM_NAMES.X3]: 3,
  [PROGRAM_NAMES.X4]: 2,
  [PROGRAM_NAMES.XXX]: 2,
  [PROGRAM_NAMES.XGOLD]: 2,
  [PROGRAM_NAMES.XQORE]: 3,
};

export const NESTED_DEEP_COUNT = {
  [PROGRAM_NAMES.X3]: 3,
  [PROGRAM_NAMES.X4]: 2,
  [PROGRAM_NAMES.XXX]: 2,
  [PROGRAM_NAMES.XGOLD]: 2,
  [PROGRAM_NAMES.XQORE]: 3,
};

export const DEFAULT_LEVEL = {
  id: '',
  upline_id: '',
  active: false,
  price: 0,
  elements: [],
};

export const DEFAULT_LEVEL_MOCKS = {
  [PROGRAM_NAMES.X3]: {
    id: '',
    recycles: '∞',
    descendants: 30,
    upline_id: '',
    active: false,
    price: 10,
    elements: [
      {
        active: false,
      },
      {
        active: false,
      },
      {
        active: false,
      },
    ],
  },
  [PROGRAM_NAMES.X4]: {
    id: '',
    recycles: '∞',
    descendants: 30,
    upline_id: '',
    active: false,
    price: 10,
    elements: [
      {
        active: false,
        elements: [
          {
            active: false,
          },
          {
            active: false,
          },
        ],
      },
      {
        active: false,
        elements: [
          {
            active: false,
          },
          {
            active: false,
          },
        ],
      },
    ],
  },
  [PROGRAM_NAMES.XXX]: {
    id: '',
    recycles: '∞',
    descendants: 14,
    upline_id: '',
    active: false,
    price: 10,
    elements: [
      {
        active: false,
        elements: [
          {
            active: false,
            elements: [
              {
                active: false,
              },
              {
                active: false,
              },
            ],
          },
          {
            active: false,
            elements: [
              {
                active: false,
              },
              {
                active: false,
              },
            ],
          },
        ],
      },
      {
        active: false,
        elements: [
          {
            active: false,
            elements: [
              {
                active: false,
              },
              {
                active: false,
              },
            ],
          },
          {
            active: false,
            elements: [
              {
                active: false,
              },
              {
                active: false,
              },
            ],
          },
        ],
      },
    ],
  },
  [PROGRAM_NAMES.XGOLD]: {
    id: '',
    recycles: '∞',
    descendants: 30,
    upline_id: '',
    active: false,
    price: 10,
    elements: [
      {
        active: false,
        elements: [
          {
            active: false,
            elements: [
              {
                active: false,
                elements: [
                  {
                    active: false,
                  },
                  {
                    active: false,
                  },
                ],
              },
              {
                active: false,
                elements: [
                  {
                    active: false,
                  },
                  {
                    active: false,
                  },
                ],
              },
            ],
          },
          {
            active: false,
            elements: [
              {
                active: false,
                elements: [
                  {
                    active: false,
                  },
                  {
                    active: false,
                  },
                ],
              },
              {
                active: false,
                elements: [
                  {
                    active: false,
                  },
                  {
                    active: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        active: false,
        elements: [
          {
            active: false,
            elements: [
              {
                active: false,
                elements: [
                  {
                    active: false,
                  },
                  {
                    active: false,
                  },
                ],
              },
              {
                active: false,
                elements: [
                  {
                    active: false,
                  },
                  {
                    active: false,
                  },
                ],
              },
            ],
          },
          {
            active: false,
            elements: [
              {
                active: false,
                elements: [
                  {
                    active: false,
                  },
                  {
                    active: false,
                  },
                ],
              },
              {
                active: false,
                elements: [
                  {
                    active: false,
                  },
                  {
                    active: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  [PROGRAM_NAMES.XQORE]: {
    id: '',
    recycles: '∞',
    descendants: 30,
    upline_id: '',
    active: false,
    price: 10,
    elements: [
      {
        active: false,
        elements: [
          {
            place: 4,
            active: false,
          },
          {
            place: 5,
            active: false,
          },
          {
            place: 6,
            active: false,
          },
        ],
      },
      {
        active: false,
        elements: [
          {
            place: 7,
            active: false,
          },
          {
            place: 8,
            active: false,
          },
          {
            place: 9,
            active: false,
          },
        ],
      },
      {
        active: false,
        elements: [
          {
            place: 10,
            active: false,
          },
          {
            place: 11,
            active: false,
          },
          {
            place: 12,
            active: false,
          },
        ],
      },
    ],
  },
};

export const SORT_MAP_PARTNERS = {
  Date: 'date',
  x3: 'last_active_level_x3',
  x4: 'last_active_level_x4',
  xGold: 'last_active_level_xgold',
  xXx: 'last_active_level_xxx',
  xQore: 'last_active_level_xqore',
  ProfitBUSD: 'total_revenue',
  ProfitBNB: 'total_revenue_bnb_forsage',
  'New partners': 'new_partners',
  Partners: 'total_partners',
};

export const SORT_MAP_STATS = {
  Date: 'date',
  'BUSD profit / Type': 'revenue',
  Level: 'level',
};

export const STATUS_TYPES = {
  BASE: 'base',
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
};

export const STATUS_COLORS = {
  [STATUS_TYPES?.BASE]: {
    pumaColor: 'text-main-bg',
    bg: 'bg-white',
  },
  [STATUS_TYPES?.BRONZE]: {
    pumaColor: 'text-gray',
    bg: 'bg-status-bronze',
  },
  [STATUS_TYPES?.SILVER]: {
    pumaColor: 'text-gray',
    bg: 'bg-status-silver',
  },
  [STATUS_TYPES?.GOLD]: {
    pumaColor: 'text-gray',
    bg: 'bg-status-gold',
  },
};

export const COUNTRIES = [
  { title: 'Afghanistan', key: 'AF' },
  { title: 'Albania', key: 'AL' },
  { title: 'Algeria', key: 'DZ' },
  { title: 'American Samoa', key: 'AS' },
  { title: 'Andorra', key: 'AD' },
  { title: 'Angola', key: 'AO' },
  { title: 'Anguilla', key: 'AI' },
  { title: 'Antarctica', key: 'AQ' },
  { title: 'Antigua and Barbuda', key: 'AG' },
  { title: 'Argentina', key: 'AR' },
  { title: 'Armenia', key: 'AM' },
  { title: 'Aruba', key: 'AW' },
  { title: 'Australia', key: 'AU' },
  { title: 'Austria', key: 'AT' },
  { title: 'Azerbaijan', key: 'AZ' },
  { title: 'Bahamas', key: 'BS' },
  { title: 'Bahrain', key: 'BH' },
  { title: 'Bangladesh', key: 'BD' },
  { title: 'Barbados', key: 'BB' },
  { title: 'Belarus', key: 'BY' },
  { title: 'Belgium', key: 'BE' },
  { title: 'Belize', key: 'BZ' },
  { title: 'Benin', key: 'BJ' },
  { title: 'Bermuda', key: 'BM' },
  { title: 'Bhutan', key: 'BT' },
  { title: 'Bolivia', key: 'BO' },
  { title: 'Bosnia and Herzegovina', key: 'BA' },
  { title: 'Botswana', key: 'BW' },
  { title: 'Bouvet Island', key: 'BV' },
  { title: 'Brazil', key: 'BR' },
  { title: 'British Indian Ocean Territory', key: 'IO' },
  { title: 'Brunei Darussalam', key: 'BN' },
  { title: 'Bulgaria', key: 'BG' },
  { title: 'Burkina Faso', key: 'BF' },
  { title: 'Burundi', key: 'BI' },
  { title: 'Cambodia', key: 'KH' },
  { title: 'Cameroon', key: 'CM' },
  { title: 'Canada', key: 'CA' },
  { title: 'Cape Verde', key: 'CV' },
  { title: 'Cayman Islands', key: 'KY' },
  { title: 'Central African Republic', key: 'CF' },
  { title: 'Chad', key: 'TD' },
  { title: 'Chile', key: 'CL' },
  { title: 'China', key: 'CN' },
  { title: 'Christmas Island', key: 'CX' },
  { title: 'Cocos (Keeling) Islands', key: 'CC' },
  { title: 'Colombia', key: 'CO' },
  { title: 'Comoros', key: 'KM' },
  { title: 'Congo', key: 'CG' },
  { title: 'Congo, The Democratic Republic of the', key: 'CD' },
  { title: 'Cook Islands', key: 'CK' },
  { title: 'Costa Rica', key: 'CR' },
  { title: 'Cote D"Ivoire', key: 'CI' },
  { title: 'Croatia', key: 'HR' },
  { title: 'Cuba', key: 'CU' },
  { title: 'Cyprus', key: 'CY' },
  { title: 'Czech Republic', key: 'CZ' },
  { title: 'Denmark', key: 'DK' },
  { title: 'Djibouti', key: 'DJ' },
  { title: 'Dominica', key: 'DM' },
  { title: 'Dominican Republic', key: 'DO' },
  { title: 'Ecuador', key: 'EC' },
  { title: 'Egypt', key: 'EG' },
  { title: 'El Salvador', key: 'SV' },
  { title: 'Equatorial Guinea', key: 'GQ' },
  { title: 'Eritrea', key: 'ER' },
  { title: 'Estonia', key: 'EE' },
  { title: 'Ethiopia', key: 'ET' },
  { title: 'Falkland Islands (Malvinas)', key: 'FK' },
  { title: 'Faroe Islands', key: 'FO' },
  { title: 'Fiji', key: 'FJ' },
  { title: 'Finland', key: 'FI' },
  { title: 'France', key: 'FR' },
  { title: 'French Guiana', key: 'GF' },
  { title: 'French Polynesia', key: 'PF' },
  { title: 'French Southern Territories', key: 'TF' },
  { title: 'Gabon', key: 'GA' },
  { title: 'Gambia', key: 'GM' },
  { title: 'Georgia', key: 'GE' },
  { title: 'Germany', key: 'DE' },
  { title: 'Ghana', key: 'GH' },
  { title: 'Gibraltar', key: 'GI' },
  { title: 'Greece', key: 'GR' },
  { title: 'Greenland', key: 'GL' },
  { title: 'Grenada', key: 'GD' },
  { title: 'Guadeloupe', key: 'GP' },
  { title: 'Guam', key: 'GU' },
  { title: 'Guatemala', key: 'GT' },
  { title: 'Guernsey', key: 'GG' },
  { title: 'Guinea', key: 'GN' },
  { title: 'Guinea-Bissau', key: 'GW' },
  { title: 'Guyana', key: 'GY' },
  { title: 'Haiti', key: 'HT' },
  { title: 'Heard Island and Mcdonald Islands', key: 'HM' },
  { title: 'Holy See (Vatican City State)', key: 'VA' },
  { title: 'Honduras', key: 'HN' },
  { title: 'Hong Kong', key: 'HK' },
  { title: 'Hungary', key: 'HU' },
  { title: 'Iceland', key: 'IS' },
  { title: 'India', key: 'IN' },
  { title: 'Indonesia', key: 'ID' },
  { title: 'Iran, Islamic Republic Of', key: 'IR' },
  { title: 'Iraq', key: 'IQ' },
  { title: 'Ireland', key: 'IE' },
  { title: 'Isle of Man', key: 'IM' },
  { title: 'Israel', key: 'IL' },
  { title: 'Italy', key: 'IT' },
  { title: 'Jamaica', key: 'JM' },
  { title: 'Japan', key: 'JP' },
  { title: 'Jersey', key: 'JE' },
  { title: 'Jordan', key: 'JO' },
  { title: 'Kazakhstan', key: 'KZ' },
  { title: 'Kenya', key: 'KE' },
  { title: 'Kiribati', key: 'KI' },
  { title: 'Korea, Democratic People"S Republic of', key: 'KP' },
  { title: 'Korea, Republic of', key: 'KR' },
  { title: 'Kuwait', key: 'KW' },
  { title: 'Kyrgyzstan', key: 'KG' },
  { title: 'Lao People"S Democratic Republic', key: 'LA' },
  { title: 'Latvia', key: 'LV' },
  { title: 'Lebanon', key: 'LB' },
  { title: 'Lesotho', key: 'LS' },
  { title: 'Liberia', key: 'LR' },
  { title: 'Libyan Arab Jamahiriya', key: 'LY' },
  { title: 'Liechtenstein', key: 'LI' },
  { title: 'Lithuania', key: 'LT' },
  { title: 'Luxembourg', key: 'LU' },
  { title: 'Macao', key: 'MO' },
  { title: 'Macedonia, The Former Yugoslav Republic of', key: 'MK' },
  { title: 'Madagascar', key: 'MG' },
  { title: 'Malawi', key: 'MW' },
  { title: 'Malaysia', key: 'MY' },
  { title: 'Maldives', key: 'MV' },
  { title: 'Mali', key: 'ML' },
  { title: 'Malta', key: 'MT' },
  { title: 'Marshall Islands', key: 'MH' },
  { title: 'Martinique', key: 'MQ' },
  { title: 'Mauritania', key: 'MR' },
  { title: 'Mauritius', key: 'MU' },
  { title: 'Mayotte', key: 'YT' },
  { title: 'Mexico', key: 'MX' },
  { title: 'Micronesia, Federated States of', key: 'FM' },
  { title: 'Moldova, Republic of', key: 'MD' },
  { title: 'Monaco', key: 'MC' },
  { title: 'Mongolia', key: 'MN' },
  { title: 'Montserrat', key: 'MS' },
  { title: 'Morocco', key: 'MA' },
  { title: 'Mozambique', key: 'MZ' },
  { title: 'Myanmar', key: 'MM' },
  { title: 'Namibia', key: 'NA' },
  { title: 'Nauru', key: 'NR' },
  { title: 'Nepal', key: 'NP' },
  { title: 'Netherlands', key: 'NL' },
  { title: 'Netherlands Antilles', key: 'AN' },
  { title: 'New Caledonia', key: 'NC' },
  { title: 'New Zealand', key: 'NZ' },
  { title: 'Nicaragua', key: 'NI' },
  { title: 'Niger', key: 'NE' },
  { title: 'Nigeria', key: 'NG' },
  { title: 'Niue', key: 'NU' },
  { title: 'Norfolk Island', key: 'NF' },
  { title: 'Northern Mariana Islands', key: 'MP' },
  { title: 'Norway', key: 'NO' },
  { title: 'Oman', key: 'OM' },
  { title: 'Pakistan', key: 'PK' },
  { title: 'Palau', key: 'PW' },
  { title: 'Palestinian Territory, Occupied', key: 'PS' },
  { title: 'Panama', key: 'PA' },
  { title: 'Papua New Guinea', key: 'PG' },
  { title: 'Paraguay', key: 'PY' },
  { title: 'Peru', key: 'PE' },
  { title: 'Philippines', key: 'PH' },
  { title: 'Pitcairn', key: 'PN' },
  { title: 'Poland', key: 'PL' },
  { title: 'Portugal', key: 'PT' },
  { title: 'Puerto Rico', key: 'PR' },
  { title: 'Qatar', key: 'QA' },
  { title: 'Reunion', key: 'RE' },
  { title: 'Romania', key: 'RO' },
  { title: 'Russian Federation', key: 'RU' },
  { title: 'RWANDA', key: 'RW' },
  { title: 'Saint Helena', key: 'SH' },
  { title: 'Saint Kitts and Nevis', key: 'KN' },
  { title: 'Saint Lucia', key: 'LC' },
  { title: 'Saint Pierre and Miquelon', key: 'PM' },
  { title: 'Saint Vincent and the Grenadines', key: 'VC' },
  { title: 'Samoa', key: 'WS' },
  { title: 'San Marino', key: 'SM' },
  { title: 'Sao Tome and Principe', key: 'ST' },
  { title: 'Saudi Arabia', key: 'SA' },
  { title: 'Senegal', key: 'SN' },
  { title: 'Serbia and Montenegro', key: 'CS' },
  { title: 'Seychelles', key: 'SC' },
  { title: 'Sierra Leone', key: 'SL' },
  { title: 'Singapore', key: 'SG' },
  { title: 'Slovakia', key: 'SK' },
  { title: 'Slovenia', key: 'SI' },
  { title: 'Solomon Islands', key: 'SB' },
  { title: 'Somalia', key: 'SO' },
  { title: 'South Africa', key: 'ZA' },
  { title: 'South Georgia and the South Sandwich Islands', key: 'GS' },
  { title: 'Spain', key: 'ES' },
  { title: 'Sri Lanka', key: 'LK' },
  { title: 'Sudan', key: 'SD' },
  { title: 'Suriname', key: 'SR' },
  { title: 'Svalbard and Jan Mayen', key: 'SJ' },
  { title: 'Swaziland', key: 'SZ' },
  { title: 'Sweden', key: 'SE' },
  { title: 'Switzerland', key: 'CH' },
  { title: 'Syrian Arab Republic', key: 'SY' },
  { title: 'Taiwan, Province of China', key: 'TW' },
  { title: 'Tajikistan', key: 'TJ' },
  { title: 'Tanzania, United Republic of', key: 'TZ' },
  { title: 'Thailand', key: 'TH' },
  { title: 'Timor-Leste', key: 'TL' },
  { title: 'Togo', key: 'TG' },
  { title: 'Tokelau', key: 'TK' },
  { title: 'Tonga', key: 'TO' },
  { title: 'Trinidad and Tobago', key: 'TT' },
  { title: 'Tunisia', key: 'TN' },
  { title: 'Turkey', key: 'TR' },
  { title: 'Turkmenistan', key: 'TM' },
  { title: 'Turks and Caicos Islands', key: 'TC' },
  { title: 'Tuvalu', key: 'TV' },
  { title: 'Uganda', key: 'UG' },
  { title: 'Ukraine', key: 'UA' },
  { title: 'United Arab Emirates', key: 'AE' },
  { title: 'United Kingdom', key: 'GB' },
  { title: 'United States', key: 'US' },
  { title: 'United States Minor Outlying Islands', key: 'UM' },
  { title: 'Uruguay', key: 'UY' },
  { title: 'Uzbekistan', key: 'UZ' },
  { title: 'Vanuatu', key: 'VU' },
  { title: 'Venezuela', key: 'VE' },
  { title: 'Viet Nam', key: 'VN' },
  { title: 'Virgin Islands, British', key: 'VG' },
  { title: 'Virgin Islands, U.S.', key: 'VI' },
  { title: 'Wallis and Futuna', key: 'WF' },
  { title: 'Western Sahara', key: 'EH' },
  { title: 'Yemen', key: 'YE' },
  { title: 'Zambia', key: 'ZM' },
  { title: 'Zimbabwe', key: 'ZW' },
];

export const OFFLINE_EVENTS_LANGUAGES = [
  {
    title: 'Russian',
    key: 'ru',
  },
  {
    title: 'English',
    key: 'en',
  },
  {
    title: 'German',
    key: 'de',
  },
  {
    title: 'Spanish',
    key: 'es',
  },
  {
    title: 'French',
    key: 'fr',
  },
  {
    title: 'Italian',
    key: 'it',
  },
  {
    title: 'Azerbaijani',
    key: 'az',
  },
  {
    title: 'Turkish',
    key: 'tr',
  },
  {
    title: 'Portuguese',
    key: 'pt',
  },
  {
    title: 'Indonesian',
    key: 'id',
  },
  {
    title: 'Tamil',
    key: 'ta',
  },
  {
    title: 'Arabic',
    key: 'ar',
  },
  {
    title: 'Hindi',
    key: 'hi',
  },
];

export const OFFLINE_EVENTS_GUESTS_OPTIONS = [
  {
    title: '5-10',
    key: '5-10',
  },
  {
    title: '10-30',
    key: '10-30',
  },
  {
    title: '30-50',
    key: '30-50',
  },
  {
    title: '50+',
    key: '50+',
  },
];

export const OFFLINE_EVENTS_DATES = [
  {
    title: '02.02.2023',
    key: '2023-02-02',
  },
  {
    title: '03.02.2023',
    key: '2023-02-03',
  },
  {
    title: '04.02.2023',
    key: '2023-02-04',
  },
  {
    title: '05.02.2023',
    key: '2023-02-05',
  },
];

export const OFFLINE_EVENTS_TIMEZONES = [
  {
    title: 'UTC-11',
    key: '-11:00',
  },
  {
    title: 'UTC-10',
    key: '-10:00',
  },
  {
    title: 'UTC-9:30',
    key: '-09:30',
  },
  {
    title: 'UTC-9',
    key: '-09:00',
  },
  {
    title: 'UTC-8',
    key: '-08:00',
  },
  {
    title: 'UTC-7',
    key: '-07:00',
  },
  {
    title: 'UTC-6',
    key: '-06:00',
  },
  {
    title: 'UTC-5',
    key: '-05:00',
  },
  {
    title: 'UTC-4',
    key: '-04:00',
  },
  {
    title: 'UTC-3:30',
    key: '-03:30',
  },
  {
    title: 'UTC-3',
    key: '-03:00',
  },
  {
    title: 'UTC-2:30',
    key: '-02:30',
  },
  {
    title: 'UTC-2',
    key: '-02:00',
  },
  {
    title: 'UTC-1',
    key: '-01:00',
  },
  {
    title: 'UTC+0',
    key: '+00:00',
  },
  {
    title: 'UTC+1',
    key: '+01:00',
  },
  {
    title: 'UTC+2',
    key: '+02:00',
  },
  {
    title: 'UTC+3',
    key: '+03:00',
  },
  {
    title: 'UTC+3:30',
    key: '+3:30',
  },
  {
    title: 'UTC+4',
    key: '+04:00',
  },
  {
    title: 'UTC+4:30',
    key: '+4:30',
  },
  {
    title: 'UTC+5',
    key: '+05:00',
  },
  {
    title: 'UTC+5:30',
    key: '+05:30',
  },
  {
    title: 'UTC+5:45',
    key: '+05:45',
  },
  {
    title: 'UTC+6',
    key: '+06:00',
  },
  {
    title: 'UTC+6:30',
    key: '+06:30',
  },
  {
    title: 'UTC+7',
    key: '+07:00',
  },
  {
    title: 'UTC+8',
    key: '+08:00',
  },
  {
    title: 'UTC+8:45',
    key: '+08:45',
  },
  {
    title: 'UTC+9',
    key: '+09:00',
  },
  {
    title: 'UTC+9:30',
    key: '+09:30',
  },
  {
    title: 'UTC+10',
    key: '+10:00',
  },
  {
    title: 'UTC+10:30',
    key: '+10:30',
  },
  {
    title: 'UTC+11',
    key: '+11:00',
  },
  {
    title: 'UTC+12',
    key: '+12:00',
  },
  {
    title: 'UTC+12:45',
    key: '+12:45',
  },
  {
    title: 'UTC+13',
    key: '+13:00',
  },
  {
    title: 'UTC+13:45',
    key: '+13:45',
  },
  {
    title: 'UTC+14',
    key: '+14:00',
  },
];

export const PROGRAMS_MOCK = [
  { name: PROGRAM_NAMES.X3, slots: new Array(12).fill({}) },
  { name: PROGRAM_NAMES.X4, slots: new Array(12).fill({}) },
  { name: PROGRAM_NAMES.XXX, slots: new Array(12).fill({}) },
  { name: PROGRAM_NAMES.XGOLD, slots: new Array(15).fill({}) },
  { name: PROGRAM_NAMES.XQORE, slots: new Array(12).fill({}) },
];

export const EVENT_NAMES = {
  BUY_PROGRAM_STEP_APPROVE_BUSD: {
    [PROGRAM_NAMES.XXX]: '<personal_event19_step2xxx>',
    [PROGRAM_NAMES.XGOLD]: '<personal_event23_step2xgold>',
    [PROGRAM_NAMES.X3]: '<personal_event15_step2x3x4>',
    [PROGRAM_NAMES.X4]: '<personal_event15_step2x3x4>',
  },
  BUY_PROGRAM_STEP_UPGRADE_EVENT: {
    [PROGRAM_NAMES.XXX]: '<upgrade_event33_step2xxx>',
    [PROGRAM_NAMES.XGOLD]: '<upgrade_event36_step2xgold>',
    [PROGRAM_NAMES.X3]: '<upgrade_event27_step2x3>',
    [PROGRAM_NAMES.X4]: '<upgrade_event30_step2x4>',
  },
  SUCCESS_PROGRAM_STEP: {
    [PROGRAM_NAMES.XXX]: '<upgrade_event34_step3xxx>',
    [PROGRAM_NAMES.XGOLD]: '<upgrade_event37_step3xgold>',
    [PROGRAM_NAMES.X3]: '<upgrade_event28_step3x3>',
    [PROGRAM_NAMES.X4]: '<upgrade_event31_step3x4>',
  },
  LEVEL_UPGRADE_OR_ACTIVATE: {
    [PROGRAM_NAMES.XXX]: '<upgrade_event32_step1xxx>',
    [PROGRAM_NAMES.XGOLD]: '<upgrade_event35_step1xgold>',
    [PROGRAM_NAMES.X3]: '<upgrade_event26_step1x3>',
    [PROGRAM_NAMES.X4]: '<upgrade_event29_step1x4>',
  },
  INVITE_PAGE_REGISTER: '<invitepage_event38_step1reg>',
  SUPPORT_CLICK: '<invitepage_event39_support>',
  CONNECT_WALLET: '<mainsite_event3_step1reg>',
  WALLET_CLICK: '<mainsite_event4_step2reg>',
  DEMO_AND_PREVIEW: '<mainsite_event2_demo>',
  HELP_ME_BUTTON: '<mainsite_event1_support_helpme>',
  LOGIN_TO_ACCOUNT: '<landing_event3_step3reg_step2busd>',
  APPROVE_BUSD_REGISTRATION_STEP: '<mainsite_event6_step4reg>',
  REGISTRATION_AND_CHECK_AGAIN_REGISTRATION_STEP: '<mainsite_event7_step5reg>',
  APPROVE_BUSD_XGOLD: '<mainsite_event13_step2xgold>',
  ACTIVATE_XXX: '<mainsite_event10_step1xxx>',
  ACTIVATE_XGOLD: '<mainsite_event12_step1xgold>',
  APPROVE_BUSD_XXX: '<mainsite_event11_step2xxx>',
};
