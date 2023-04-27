import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const matrixXBaseAbi = [
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    name: 'balances',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'lastUserId',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'userIds',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    name: 'users',
    outputs: [
      {
        name: 'id',
        type: 'uint256',
      },
      {
        name: 'referrer',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    name: 'levelPrice',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'ownerAddress',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        name: 'referrer',
        type: 'address',
      },
    ],
    name: 'Registration',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        name: 'currentReferrer',
        type: 'address',
      },
      {
        indexed: false,
        name: 'matrix',
        type: 'uint8',
      },
      {
        indexed: false,
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'Reinvest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        name: 'matrix',
        type: 'uint8',
      },
      {
        indexed: false,
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'Upgrade',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        name: 'matrix',
        type: 'uint8',
      },
      {
        indexed: false,
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        name: 'place',
        type: 'uint8',
      },
    ],
    name: 'NewUserPlace',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'MoneyHolded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'MoneyUnholded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        name: 'matrix',
        type: 'uint8',
      },
      {
        indexed: false,
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'MatixClosed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        name: 'money',
        type: 'uint256',
      },
    ],
    name: 'CannotSendMoney',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'referrerAddress',
        type: 'address',
      },
    ],
    name: 'registrationExt',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'matrix',
        type: 'uint8',
      },
      {
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'buyNewLevel',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'userAddress',
        type: 'address',
      },
      {
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'findFreeX3Referrer',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'userAddress',
        type: 'address',
      },
      {
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'findFreeX6Referrer',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'userAddress',
        type: 'address',
      },
      {
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'usersActiveX3Levels',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'userAddress',
        type: 'address',
      },
      {
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'usersActiveX6Levels',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'userAddress',
        type: 'address',
      },
      {
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'usersX3Matrix',
    outputs: [
      {
        name: '',
        type: 'address',
      },
      {
        name: '',
        type: 'address[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'userAddress',
        type: 'address',
      },
      {
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'usersX6Matrix',
    outputs: [
      {
        name: '',
        type: 'address',
      },
      {
        name: '',
        type: 'address[]',
      },
      {
        name: '',
        type: 'address[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'user',
        type: 'address',
      },
    ],
    name: 'isUserExists',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'userAddress',
        type: 'address',
      },
    ],
    name: 'getActiveX3Levels',
    outputs: [
      {
        name: 'res',
        type: 'bool[12]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'userAddress',
        type: 'address',
      },
    ],
    name: 'getActiveX6Levels',
    outputs: [
      {
        name: 'res',
        type: 'bool[12]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const matrixXGoldAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'MissedEthReceive',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'place',
        type: 'uint8',
      },
    ],
    name: 'NewUserPlace',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'userId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'referrerId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'xGoldStorageAddress',
        type: 'address',
      },
    ],
    name: 'Registration',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'currentReferrer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'Reinvest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'ReleasedETH',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'xGoldStorageAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'StoredETH',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'Upgrade',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MAX_LEVEL',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'controller',
    outputs: [
      {
        internalType: 'contract Controller',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'firstLevelUpdater',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forsage',
    outputs: [
      {
        internalType: 'contract Forsage',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fourthLevelUpdater',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'idToAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'impl',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'levelPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'secondLevelUpdater',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'thirdLevelUpdater',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'users',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'exists',
        type: 'bool',
      },
      {
        internalType: 'address payable',
        name: 'storageAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_controllerAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_forsage',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_firstLevelUpdater',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_secondLevelUpdater',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_thirdLevelUpdater',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_fourthLevelUpdater',
        type: 'address',
      },
    ],
    name: 'init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'registrationExt',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'buyNewLevel',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'findFreeX6Referrer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'usersActiveX6Levels',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'usersX6Matrix',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address[2]',
        name: '',
        type: 'address[2]',
      },
      {
        internalType: 'address[4]',
        name: '',
        type: 'address[4]',
      },
      {
        internalType: 'address[8]',
        name: '',
        type: 'address[8]',
      },
      {
        internalType: 'address[16]',
        name: '',
        type: 'address[16]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'isUserExists',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'trcTokenAddress',
        type: 'address',
      },
    ],
    name: 'withdrawLostTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const matrixXxxAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'MissedEthReceive',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'place',
        type: 'uint8',
      },
    ],
    name: 'NewUserPlace',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'userId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'referrerId',
        type: 'uint256',
      },
    ],
    name: 'Registration',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'currentReferrer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'Reinvest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'ReleasedETH',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'SentExtraEthDividends',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'StoredETH',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'Upgrade',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MAX_LEVEL',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'buyNewLevel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'buyNewLevelFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'changeLock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'findFreeX6Referrer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'findNextUserLevel',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forsage',
    outputs: [
      {
        internalType: 'contract Forsage',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'idToAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'impl',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_forsage',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_multisig',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_depositTokenAddress',
        type: 'address',
      },
    ],
    name: 'init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'isUserExists',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'levelPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'locked',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'multisig',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'receiveEth',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'registrationExt',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
    ],
    name: 'registrationFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'users',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'exists',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'usersActiveX6Levels',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'usersX6Matrix',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address[2]',
        name: '',
        type: 'address[2]',
      },
      {
        internalType: 'address[4]',
        name: '',
        type: 'address[4]',
      },
      {
        internalType: 'address[8]',
        name: '',
        type: 'address[8]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
    ],
    name: 'withdrawLostTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xGoldStorage',
    outputs: [
      {
        internalType: 'contract XGoldStorage',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const matrixTokenAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const pancakeSwapAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'Burn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0In',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1In',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0Out',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1Out',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'Swap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint112',
        name: 'reserve0',
        type: 'uint112',
      },
      {
        indexed: false,
        internalType: 'uint112',
        name: 'reserve1',
        type: 'uint112',
      },
    ],
    name: 'Sync',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'MINIMUM_LIQUIDITY',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'burn',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'factory',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getReserves',
    outputs: [
      {
        internalType: 'uint112',
        name: '_reserve0',
        type: 'uint112',
      },
      {
        internalType: 'uint112',
        name: '_reserve1',
        type: 'uint112',
      },
      {
        internalType: 'uint32',
        name: '_blockTimestampLast',
        type: 'uint32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_token0',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_token1',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'kLast',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [
      {
        internalType: 'uint256',
        name: 'liquidity',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'permit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'price0CumulativeLast',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'price1CumulativeLast',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'skim',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount0Out',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount1Out',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'swap',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'sync',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'token0',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'token1',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const contractRouterAbi = [
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [],
    name: 'busd',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'busdFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeWallet',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forsage',
    outputs: [
      {
        internalType: 'contract IForsage',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'referrerAddress',
        type: 'address',
      },
    ],
    name: 'forsageAndXGoldRegistration',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'referrerAddress',
        type: 'address',
      },
    ],
    name: 'forsageAndXQoreRegistration',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'referrerAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'busdRequest',
        type: 'uint256',
      },
    ],
    name: 'forsageAndXQoreRegistrationBusd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'referrerAddress',
        type: 'address',
      },
    ],
    name: 'forsageAndXxxRegistration',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forsageExpress',
    outputs: [
      {
        internalType: 'contract IForsageExpress',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forsageLottery',
    outputs: [
      {
        internalType: 'contract IForsageLottery',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'referrerAddress',
        type: 'address',
      },
    ],
    name: 'forsageRegistration',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'referrerAddress',
        type: 'address',
      },
    ],
    name: 'forsageRegistrationBUSD',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'impl',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IForsage',
        name: '_forsage',
        type: 'address',
      },
      {
        internalType: 'contract IXxx',
        name: '_xxx',
        type: 'address',
      },
      {
        internalType: 'contract IXGold',
        name: '_xGold',
        type: 'address',
      },
      {
        internalType: 'contract IPancakeRouter',
        name: '_pancakeRouter',
        type: 'address',
      },
      {
        internalType: 'contract IXQore',
        name: '_xQore',
        type: 'address',
      },
    ],
    name: 'init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxDrive',
    outputs: [
      {
        internalType: 'contract IMaxDrive',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pancakeRouter',
    outputs: [
      {
        internalType: 'contract IPancakeRouter',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_feeWallet',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_busdFee',
        type: 'uint256',
      },
    ],
    name: 'setFeeData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'matrixType',
        type: 'uint8',
      },
      {
        internalType: 'uint8[]',
        name: '_levels',
        type: 'uint8[]',
      },
    ],
    name: 'x3x4BuyLevelBatch',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'matrixType',
        type: 'uint8',
      },
      {
        internalType: 'uint8[]',
        name: '_levels',
        type: 'uint8[]',
      },
    ],
    name: 'x3x4BuyLevelBatchBusd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xGold',
    outputs: [
      {
        internalType: 'contract IXGold',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xGoldActivation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xGoldActivationBusd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8[]',
        name: '_levels',
        type: 'uint8[]',
      },
    ],
    name: 'xGoldBuyLevelBatch',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8[]',
        name: '_levels',
        type: 'uint8[]',
      },
    ],
    name: 'xGoldBuyLevelBatchBusd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xQore',
    outputs: [
      {
        internalType: 'contract IXQore',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xQoreRegistration',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'busdRequest',
        type: 'uint256',
      },
    ],
    name: 'xQoreRegistrationBusd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'xQoreUpgrades',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'busdRequest',
        type: 'uint256',
      },
    ],
    name: 'xQoreUpgradesBusd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xxx',
    outputs: [
      {
        internalType: 'contract IXxx',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xxxActivation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xxxActivationBusd',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8[]',
        name: '_levels',
        type: 'uint8[]',
      },
    ],
    name: 'xxxBuyLevelBatch',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8[]',
        name: '_levels',
        type: 'uint8[]',
      },
    ],
    name: 'xxxBuyLevelBatchBusd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
];

const pancakeExchangeAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_factory',
        type: 'address',
      },
      { internalType: 'address', name: '_WETH', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenA', type: 'address' },
      {
        internalType: 'address',
        name: 'tokenB',
        type: 'address',
      },
      { internalType: 'uint256', name: 'amountADesired', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountBDesired',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountBMin',
        type: 'uint256',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'addLiquidity',
    outputs: [
      { internalType: 'uint256', name: 'amountA', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountB',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      {
        internalType: 'uint256',
        name: 'amountTokenDesired',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountETHMin',
        type: 'uint256',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'addLiquidityETH',
    outputs: [
      { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountETH',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'reserveIn',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'reserveOut', type: 'uint256' },
    ],
    name: 'getAmountIn',
    outputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'reserveIn',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'reserveOut', type: 'uint256' },
    ],
    name: 'getAmountOut',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
    ],
    name: 'getAmountsIn',
    outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
    ],
    name: 'getAmountsOut',
    outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountA', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'reserveA',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'reserveB', type: 'uint256' },
    ],
    name: 'quote',
    outputs: [{ internalType: 'uint256', name: 'amountB', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenA', type: 'address' },
      {
        internalType: 'address',
        name: 'tokenB',
        type: 'address',
      },
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountAMin',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'removeLiquidity',
    outputs: [
      { internalType: 'uint256', name: 'amountA', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountB',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      {
        internalType: 'uint256',
        name: 'liquidity',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountETHMin',
        type: 'uint256',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'removeLiquidityETH',
    outputs: [
      { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountETH',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      {
        internalType: 'uint256',
        name: 'liquidity',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountETHMin',
        type: 'uint256',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'removeLiquidityETHSupportingFeeOnTransferTokens',
    outputs: [{ internalType: 'uint256', name: 'amountETH', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      {
        internalType: 'uint256',
        name: 'liquidity',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountETHMin',
        type: 'uint256',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      { internalType: 'bool', name: 'approveMax', type: 'bool' },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'removeLiquidityETHWithPermit',
    outputs: [
      { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountETH',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      {
        internalType: 'uint256',
        name: 'liquidity',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountETHMin',
        type: 'uint256',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      { internalType: 'bool', name: 'approveMax', type: 'bool' },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
    outputs: [{ internalType: 'uint256', name: 'amountETH', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenA', type: 'address' },
      {
        internalType: 'address',
        name: 'tokenB',
        type: 'address',
      },
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountAMin',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      {
        internalType: 'bool',
        name: 'approveMax',
        type: 'bool',
      },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      { internalType: 'bytes32', name: 's', type: 'bytes32' },
    ],
    name: 'removeLiquidityWithPermit',
    outputs: [
      { internalType: 'uint256', name: 'amountA', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountB',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapETHForExactTokens',
    outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactETHForTokens',
    outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForETH',
    outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountInMax',
        type: 'uint256',
      },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapTokensForExactETH',
    outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'amountInMax',
        type: 'uint256',
      },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapTokensForExactTokens',
    outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
];

const matrixXqoreAbi = [
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'buyNewLevel',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'buyNewLevelFor',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'CannotSendETH',
    type: 'event',
  },
  {
    inputs: [],
    name: 'changeLock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'FeeSent',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_forsage',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_multisig',
        type: 'address',
      },
    ],
    name: 'init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'MissedEthReceive',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'place',
        type: 'uint8',
      },
    ],
    name: 'NewUserPlace',
    type: 'event',
  },
  {
    inputs: [],
    name: 'receiveEth',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'userId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'referrerId',
        type: 'uint256',
      },
    ],
    name: 'Registration',
    type: 'event',
  },
  {
    inputs: [],
    name: 'registrationExt',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
    ],
    name: 'registrationFor',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'currentReferrer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'Reinvest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'ReleasedETH',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: '_level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'SentExtraEthDividends',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_feeBnb',
        type: 'uint256',
      },
    ],
    name: 'setFeePercent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'StoredETH',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'Upgrade',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
    ],
    name: 'withdrawLostTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
  {
    inputs: [],
    name: 'contractOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeBnb',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'findFreeX6Referrer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'findRequestedLevel',
    outputs: [
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forsage',
    outputs: [
      {
        internalType: 'contract Forsage',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'idToAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'impl',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'isUserExists',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'levelPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'locked',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_LEVEL',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'multisig',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'users',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'exists',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'usersActiveX6Levels',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'level',
        type: 'uint8',
      },
    ],
    name: 'usersX6Matrix',
    outputs: [
      {
        internalType: 'address',
        name: 'currentReferrerAddress',
        type: 'address',
      },
      {
        internalType: 'address[3]',
        name: 'firstLevelReferrals',
        type: 'address[3]',
      },
      {
        internalType: 'address[9]',
        name: 'secondLevelReferrals',
        type: 'address[9]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xComebackStorage',
    outputs: [
      {
        internalType: 'contract XComebackStorage',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export default {
  scanNetwork: publicRuntimeConfig.SCAN_NETWORK,
  scanNetworkAddress: publicRuntimeConfig.SCAN_NETWORK_ADDRESS,
  contractXBase: publicRuntimeConfig.CONTRACT_XBASE,
  contractToken: publicRuntimeConfig.CONTRACT_TOKEN,
  contractXGold: publicRuntimeConfig.CONTRACT_XGOLD,
  contractXxx: publicRuntimeConfig.CONTRACT_XXX,
  contractXqore: publicRuntimeConfig.CONTRACT_XQORE,
  allowedChainId: parseInt(publicRuntimeConfig.ALLOWED_CHAIN_ID),
  pancakeSwapAddress: publicRuntimeConfig.PANCAKE_SWAP_CONTRACT,
  pancakeExchange: publicRuntimeConfig.CONTRACT_PANCAKE_EXCHANGE,
  router: publicRuntimeConfig.CONTRACT_ADDRESS_ROUTER,

  coinName: 'BUSD',
  cookieNameAuthBase: 'auth',

  matrixXBaseAbi: matrixXBaseAbi,
  matrixXGoldAbi: matrixXGoldAbi,
  matrixXxxAbi: matrixXxxAbi,
  matrixXqoreAbi: matrixXqoreAbi,
  matrixTokenAbi: matrixTokenAbi,
  pancakeSwapAbi: pancakeSwapAbi,
  contractRouterAbi: contractRouterAbi,
  contractPancakeExchangeAbi: pancakeExchangeAbi,

  stand: publicRuntimeConfig.STAND,
};
