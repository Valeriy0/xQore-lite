class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, fn) {
    const events = event.split(' ');
    events.forEach((event) => {
      if (this.events[event] === undefined) {
        this.events[event] = [];
      }
      this.events[event].push(fn);
    });
  }

  unsubscribe(event, fn) {
    if (this.events[event] !== undefined) {
      this.events[event] = this.events[event].filter((subFn) => {
        if (subFn !== fn) {
          return fn;
        }
      });
    }
  }

  emit(event, data) {
    if (this.events[event] !== undefined) {
      this.events[event].map((subFn) => {
        if (data) {
          subFn(data);
        } else {
          subFn();
        }
      });
    }
  }
}

let BasePubSub = null;

/**
 *
 * @returns {PubSub} - основной инстанс пабсаба
 */
export const getPubSub = () => {
  if (BasePubSub === null) {
    /* eslint-disable-next-line */
        BasePubSub = new PubSub()
  }
  return BasePubSub;
};

/**
 * Метод для подписки на эвенты
 * @param eventsToFunctions {Object} - объект где ключ является названием эвента, а значение функцией которая обрабатывает это событие
 * @returns {function()} - функция с помощью которой можно отписаться от всех подписок созданных ранее
 */
export const subscriptionCreator = (eventsToFunctions) => {
  const ps = getPubSub();
  const iterator = (fn) => {
    for (let event in eventsToFunctions) {
      if (eventsToFunctions.hasOwnProperty(event)) {
        fn(event, eventsToFunctions[event]);
      }
    }
  };
  //Подвязываем все события
  iterator(ps.subscribe.bind(ps));
  let subscribed = true;
  //Возвращаем функцию которой можно отписаться от всех подвязанных событий
  return () => {
    if (subscribed) {
      iterator(ps.unsubscribe.bind(ps));
      subscribed = false;
    }
  };
};
