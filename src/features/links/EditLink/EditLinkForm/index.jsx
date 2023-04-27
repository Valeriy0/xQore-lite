import React, { useState, useEffect } from 'react';
import { InputForm } from 'components/Forms/InputForm';
import { Input } from 'components/Input';
import { Select } from 'components';
import { GroupReflinkRepository } from 'connectors/repositories/group-reflink';
import { callNotification } from 'helpers/notification';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { PartnersForm } from './PartnersForm';
import { AliasForm } from './AliasForm';
import { ReflinkTypes } from 'helpers/constants';

export const EditLinkForm = ({ id, hash, mode, updateTable, user_id, allowed_actions, hash_alias }) => {
  const isAuthProfile = useSelector(getAuthUser)?.id === user_id;
  const [changedMode, setChangedMode] = useState(0);

  useEffect(() => {
    setChangedMode(mode);
  }, [mode]);

  const linkOptions = ['Random distribution', 'Profit distribution', 'Queue distribution'];

  const updateLinkMode = async (modeId) => {
    try {
      await GroupReflinkRepository.changeLinkMode(id, { mode: modeId });
      setChangedMode(modeId);
      callNotification({ type: 'success', message: 'link mode changed' });
    } catch (e) {}
  };

  const changeLinkMode = () => (value) => {
    const modeId = linkOptions.indexOf(value);
    updateLinkMode(modeId);
  };

  return (
    <div>
      <div className="flex flex-col w-full space-y-10 sm:space-y-5">
        <div className="flex flex-col items-start w-full rounded bg-black-light p-7.5 space-y-7.5 sm:rounded-none sm:p-5">
          <InputForm type="text" title="Link" value={`${ReflinkTypes['group']}${hash}`} readOnly withCopy />
          {allowed_actions?.includes('alias') && (
            <AliasForm alias={hash_alias} isAllowChange={allowed_actions?.includes('alias')} />
          )}
          <div className="flex flex-col w-full">
            <label className="mb-2.5 text-white-500 sm:text-sm">Link mode</label>
            {isAuthProfile && allowed_actions?.includes('mode') ? (
              <Select
                className="w-full"
                value={linkOptions[changedMode]}
                data={linkOptions?.map((item) => ({ title: item, key: item }))}
                onChange={changeLinkMode('linkMode')}
              />
            ) : (
              <Input type="text" value={linkOptions[changedMode]} readOnly />
            )}
          </div>
        </div>
        {isAuthProfile && <PartnersForm updateTable={updateTable} />}
      </div>
    </div>
  );
};
