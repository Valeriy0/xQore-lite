import React, { useEffect, useState } from 'react';
import { OfflineEventForm, UserEvents, AllEvents } from 'features/offlineEvents';
import { EventRepository } from 'connectors/repositories/event';
import { useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { useRouter } from 'next/router';

const OfflineEvents = () => {
  const { query } = useRouter();
  const isPreviewMode = !!query.user;

  const currenAuthUser = useSelector(getAuthUser);
  const [events, setEvents] = useState(null);
  const [userEvents, setUserEvents] = useState(null);

  const fetchUserEvents = async () => {
    try {
      const { events } = await EventRepository.getList({ user_id: currenAuthUser.id });

      setUserEvents(events);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchEvents = async () => {
    try {
      const { events } = await EventRepository.getList();

      setEvents(events);
    } catch (e) {
      console.log(e);
    }
  };

  const onRefetch = () => {
    fetchEvents();
    fetchUserEvents();
  };

  useEffect(() => {
    if (!isPreviewMode) {
      fetchUserEvents();
    }
  }, [currenAuthUser?.id, isPreviewMode]);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div className="w-full flex flex-1 flex-col space-y-[60px]">
        {!isPreviewMode && (
          <div className="flex w-full justify-start items-start space-x-10 sm:flex-col sm:space-x-0 sm:space-y-5">
            <OfflineEventForm onRefetch={onRefetch} />
            <UserEvents onFetchEvents={fetchEvents} onFetchUserEvents={fetchUserEvents} events={userEvents} />
          </div>
        )}
        <AllEvents events={events} />
      </div>
    </>
  );
};

export default OfflineEvents;
