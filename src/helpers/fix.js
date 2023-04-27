const STATUSES_ENUM = {
  SUCCESS: 'success',
  ERROR: 'error',
  WAIT: 'pending',
};

const classStatuses = {
  [STATUSES_ENUM.SUCCESS]: 'status-suc',
  [STATUSES_ENUM.ERROR]: 'status-err',
  [STATUSES_ENUM.WAIT]: 'status-wait',
};

const checkNetwork = async () => {
  try {
    const result = await window.ethereum.request({ method: 'eth_chainId' });

    if (result === '0x61') {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject();
  }
};

const checkBalance = async () => {
  try {
    let balanceBnb = 0.0;
    let balanceBusd = 10;

    if (balanceBnb >= 0.01 && balanceBusd >= 10) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject();
  }
};

const callbacks = [
  {
    key: 'checkNetwork',
    func: checkNetwork,
    selector: '#changeNetwork',
  },
  {
    key: 'checkBalance',
    func: checkBalance,
    selector: '#checkBalance',
  },
];

const changeStatuses = (index, status) => {
  const selector = document.getElementById(callbacks[index.selector]);

  Object.keys(classStatuses).forEach((key) => {
    if (key === status) {
      return selector.classList.add(classStatuses[key]);
    }

    return selector.classList.remove(classStatuses[key]);
  });
};

const callNextPromise = async (callback) => {
  const index = callbacks.findIndex((currentCallback) => currentCallback.key === callback.key);
  try {
    changeStatuses(index, STATUSES_ENUM.PENDING);
    await callback.func();
    changeStatuses(index, STATUSES_ENUM.SUCCESS);

    if (callbacks[index + 1]) {
      await callNextPromise(callbacks[index + 1]);
    }
  } catch (e) {
    changeStatuses(index, STATUSES_ENUM.ERROR);
  }
};
