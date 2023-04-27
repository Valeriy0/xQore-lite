import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { ProgramCard } from 'components/ProgramCard';
import QuestionIcon from 'assets/icons/question.svg';
import { MatrixInfoModal } from 'components/modals/MatrixInfoModal';
import { Button } from 'components';
import { PROGRAMS_MOCK } from 'helpers/constants';
import { UserRepository } from 'connectors/repositories/user';
import { subscriptionCreator } from 'helpers/pubsub';
import { PUBSUB_EVENTS } from 'helpers/pubsub/constants';
import { useRequest } from 'helpers/hooks/useRequest';

export const AccountPrograms = () => {
  const [isOpened, setIsOpened] = useState(false);

  const { query } = useRouter();
  const authStore = useSelector(getAuthUser);
  const user = !!query.user ? query.user : authStore?.id;

  const { isLoading, isDone, call, data } = useRequest(UserRepository.programs, [{ user }]);

  const OpenMatrixInfoModal = (e) => {
    e.preventDefault();
    setIsOpened(true);
  };

  useEffect(() => {
    if (user) {
      call();
    }
  }, [user]);

  useEffect(() => {
    const sb = subscriptionCreator({
      [PUBSUB_EVENTS.CLOSE_MODAL_PROGRAM_CARD]: call,
    });

    return () => {
      sb();
    };
  }, []);

  const renderPrograms = useMemo(() => {
    const programs = isLoading || !isDone ? PROGRAMS_MOCK : data?.programs;

    return programs?.reduce(
      (result, item) => {
        return { ...result, forsage: { ...result.forsage, programs: [...result.forsage.programs, item] } };
      },
      {
        forsage: {
          renderTitle: () => (
            <span>
              <span className="notranslate mr-1.5">Forsage</span> Programs
            </span>
          ),
          programs: [],
          style: 'grid-cols-2 sm:grid-cols-1',
        },
      },
    );
  }, [data?.programs, isDone, isLoading]);

  return (
    <div className="notranslate flex flex-col mt-15 sm:px-5">
      {renderPrograms &&
        Object.keys(renderPrograms)?.map((key, index) => (
          <Fragment key={index}>
            <div className={`flex items-center ${index > 0 && 'mt-12'}`}>
              <span className="text-white text-3xl font-bold sm:text-2xl mr-2.5">
                {renderPrograms[key].renderTitle()}
              </span>
              <Button
                onClick={OpenMatrixInfoModal}
                type="light-blue-rounded"
                className="font-normal sm:items-center py-1"
              >
                <QuestionIcon className="w-5 h-5 mr-1.5" />
                <span className="text-base sm:text-sm"> Info </span>
              </Button>
            </div>
            <div className={`grid w-full gap-10 mt-8 ${renderPrograms[key].style}`}>
              {renderPrograms[key].programs?.map((program, index) => (
                <ProgramCard isLoading={isLoading || !isDone} key={index} {...program} />
              ))}
            </div>
          </Fragment>
        ))}
      {isOpened && <MatrixInfoModal onClose={() => setIsOpened(false)} />}
    </div>
  );
};
