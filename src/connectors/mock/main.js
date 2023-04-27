const RecentActivities = {
  members: {
    total: '120 000',
    new: '5 000',
  },
  members_revenue: {
    total: '924 900 098',
    new: '120 000',
  },
  activities: [
    {
      date: '21.01.2018',
      type: '',
      hash: '',
      events: [
        {
          id: '',
          type: 'joined',
        },
        {
          id: '',
          type: 'send',
          amount: 123,
        },
        {
          id: 123,
          type: 'receive_coins',
          amount: 123,
          program: 'x3' || null,
        },
        {
          id: 123,
          type: 'receive_gift',
        },
      ],
    },
  ],
};

export const createMainMocks = (mock) => {
  mock.onGet('/recent-activities').reply(200, RecentActivities);
};
