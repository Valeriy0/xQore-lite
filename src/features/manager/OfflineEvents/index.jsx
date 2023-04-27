import React, { useEffect, useState } from 'react';
import { CardItem } from './CardItem';
import { EventRepository } from 'connectors/repositories/event';

export const OfflineEvents = () => {
  const [events, setEvents] = useState(null);
  const fetchEvents = async () => {
    try {
      const { events } = await EventRepository.getList({ for_moderation: 1 });

      setEvents(events);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const onClickApprove = async (id) => {
    try {
      await EventRepository.approveEvent(id);
    } catch (e) {}
    fetchEvents();
  };

  const onClickDecline = async (id) => {
    try {
      await EventRepository.declineEvent(id);
    } catch (e) {}
    fetchEvents();
  };

  return (
    <div className="sm:px-5 space-y-10 w-full">
      {events?.map((item, indexItem) => {
        return (
          <CardItem
            {...item}
            key={indexItem}
            approveFunc={() => onClickApprove(item?.id)}
            declineFunc={() => onClickDecline(item?.id)}
          />
        );
      })}
    </div>
  );
};
