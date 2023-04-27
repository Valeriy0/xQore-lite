const AccountProgramsMocks = {
  programs: [
    {
      id: '123',
      name: 'x3',
      revenue: 3200,
      slots: [
        {
          active: true,
          slug: '?',
          hash: '',
          price: 123.23,
        },
      ],
    },
    {
      id: '1234',
      name: 'x4',
      revenue: 3200,
      slots: [
        {
          active: true,
          slug: '?',
          hash: '',
          price: 123.23,
        },
        {
          active: true,
          slug: '?',
          hash: '',
          price: 123.23,
        },
        {
          active: false,
          slug: '?',
          hash: '',
          price: 123.23,
        },
      ],
    },
    {
      id: '1234',
      name: 'xxx',
      revenue: 3200,
      slots: [
        {
          active: true,
          slug: '?',
          hash: '',
          price: 123.23,
        },
        {
          active: true,
          slug: '?',
          hash: '',
          price: 123.23,
        },
        {
          active: false,
          slug: '?',
          hash: '',
          price: 123.23,
        },
      ],
    },
    {
      id: '1234',
      name: 'xGold',
      revenue: 3200,
      slots: [
        {
          active: true,
          slug: '?',
          hash: '',
          price: 123.23,
        },
        {
          active: true,
          slug: '?',
          hash: '',
          price: 123.23,
        },
        {
          active: false,
          slug: '?',
          hash: '',
          price: 123.23,
        },
      ],
    },
  ],
};

const AccountInfoMocks = {
  partners: {
    total: 12,
    new: 2,
  },
  spillovers: {
    total: 10,
    new: 5,
  },
  return_rate: {
    total: '1500%',
    new: '100%',
  },
  total_revenue: {
    total: 3200,
    new: 100,
  },
  chart: [
    {
      x: 12,
      y: 10,
    },
  ],
};

//auth only
const ProfileMocks = {
  partner_link: '',
  id: '',
};

const TableMocks = {
  events: [
    {
      type: 'is_released_coin',
      date: '2021-08-11T19:21:23.465+03:00',
      id: 1,
      address: 'TQS2Y...QJLtL',
      amount_usd: 666,
      amount_busd: 4325,
    },
    {
      type: 'is_leading_send_upline',
      date: '2021-08-11T19:21:23.465+03:00',
      id: 2,
      address: 'TQS2Y...QJLtL',
      amount_usd: 200,
      amount_busd: 400,
    },
    {
      type: 'is_stored_coin',
      date: '2021-08-11T19:21:23.465+03:00',
      id: 3,
      address: 'TQS2Y...QJLtL',
      amount_usd: 300,
      amount_busd: 450,
    },
  ],
};

export const LevelMocks = {
  level: {
    id: '',
    total_revenue: 1234,
    recycles: 2,
    descendants: 4,
    upline_id: '',
    active: true,
    price: 800,
    navigation: {
      next_level_id: 4,
      previous_level_id: 2,
      cycles: {
        upper: 2,
        lower: 1,
      },
    },
    elements: [
      {
        active: true,
        slug: '?',
        hash: '',
        price: 123.23,
        type: '',
      },
      {
        active: true,
        slug: '?',
        hash: '',
        price: 123.23,
      },
      {
        active: true,
        slug: '?',
        hash: '',
        price: 123.23,
      },
    ],
  },
};

const ProgramMocks = {
  missed_revenue: 345, //если 0 - не выводим плашку
  levels: new Array(9).fill({}).map((item, index) => ({
    id: '',
    price: 1234,
    recycles: 123,
    descendants: 123,
    active: index <= 3,
    missed_revenue: index >= 4 ? 100 : 0,
    elements: [
      {
        active: Boolean(index % 2),
        slug: '?',
        hash: '',
        price: 123.23,
        elements: [
          {
            active: Boolean(index % 2),
            slug: '?',
            hash: '',
            price: 123.23,
            elements: [],
          },
          {
            active: Boolean(index % 2),
            slug: '?',
            hash: '',
            price: 123.23,
            elements: [],
          },
        ],
      },
      {
        active: Boolean(index % 2),
        slug: '?',
        hash: '',
        price: 123.23,
        elements: [
          {
            active: Boolean(index % 2),
            slug: '?',
            hash: '',
            price: 123.23,
            elements: [],
          },
          {
            active: Boolean(index % 2),
            slug: '?',
            hash: '',
            price: 123.23,
            elements: [],
          },
        ],
      },
    ],
  })),
};

export const createAccountMocks = (mock) => {
  mock.onGet('/account/profile').reply(200, ProfileMocks);
  mock.onGet('/account/3/programs').reply(200, AccountProgramsMocks);
  mock.onGet('/account/3/info').reply(200, AccountInfoMocks);
  mock.onGet(/account\/\w+\/program\/\w+\/level\/\w+\/events/).reply(200, TableMocks);
  mock.onGet(/account\/\w+\/program\/\w+\/level\/\w+/).reply(200, LevelMocks);
  mock.onGet(/account\/\w+\/program\/\w+\/events/).reply(200, TableMocks);
  mock.onGet(/account\/\w+\/program\/\w+/).reply(200, ProgramMocks);
};
