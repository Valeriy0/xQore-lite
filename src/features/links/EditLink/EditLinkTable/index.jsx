import React, { useMemo } from 'react';
import { Button, CustomLink } from 'components';
import { linkWithQuery } from 'helpers/links';
import CloseIcon from 'assets/icons/close.svg';
import PauseIcon from 'assets/icons/pause.svg';
import PlayIcon from 'assets/icons/play.svg';

export const EditLinkTable = ({ data, togglePartner, deletePartner }) => {
  const content = useMemo(() => {
    return data?.map((item, index) => {
      const togglePartnerStatus = !item?.allowed_actions.length
        ? false
        : !!item?.allowed_actions.length && item?.allowed_actions.includes('pause')
        ? 'play'
        : 'pause';

      return (
        <tr className="border-b border-white-100 last:border-none" key={index}>
          <td className="p-4 text-left whitespace-nowrap sm:p-3">
            {(item?.allowed_actions.includes('pause') || item?.allowed_actions.includes('enable')) && (
              <Button type="transparent" onClick={() => togglePartner(item?.id, togglePartnerStatus)}>
                {item?.active ? (
                  <div className="flex items-center text-main-blue">
                    <PauseIcon className="w-5 h-5 fill-current mr-2.5" />
                    <span className="text-base font-normal sm:text-sm"> pause </span>
                  </div>
                ) : (
                  <div className="flex items-center text-white">
                    <PlayIcon className="w-5 h-5 fill-current text-white mr-2.5" />
                    <span className="text-base font-normal sm:text-sm"> play </span>
                  </div>
                )}
              </Button>
            )}
          </td>
          <td className="p-4 text-left whitespace-nowrap sm:p-3">
            <CustomLink
              href={linkWithQuery('/dashboard', { user: item?.user_id })}
              className="flex items-center justify-center notranslate px-2.5 leading-30px bg-blue-100 hover:bg-main-blue-300 text-main-blue rounded w-max text-sm"
            >
              ID {item?.user_id}
            </CustomLink>
          </td>
          <td className="p-4 text-left whitespace-nowrap sm:p-3">
            <div className="text-white text-sm ">{item?.partners_count}</div>
          </td>
          <td className="p-4 text-left whitespace-nowrap sm:p-3">
            <div className="text-white text-sm notranslate">{item?.revenue} BUSD</div>
          </td>
          <td className="p-4 text-left whitespace-nowrap sm:p-3">
            {item?.allowed_actions.includes('delete') && (
              <Button className="!justify-end !text-right w-full" onClick={() => deletePartner(item?.id)}>
                <CloseIcon className="w-5 h-5" />
              </Button>
            )}
          </td>
        </tr>
      );
    });
  }, [data]);

  return (
    <div className="flex flex-1 flex-col w-full flex-col bg-black-light rounded overflow-hidden h-full min-h-90 sm:max-h-3/4 sm:rounded-none">
      <div className="overflow-auto">
        <table className="min-w-max w-full table-auto border-white-100">
          <thead>
            <tr className="text-white-500 text-xs border-b border-white-100">
              <th className="p-4 text-left font-normal sm:p-3 "></th>
              <th className="p-4 text-left font-normal sm:p-3">ID</th>
              <th className="p-4 text-left font-normal sm:p-3">Partners</th>
              <th className="p-4 text-left font-normal sm:p-3">Profit</th>
              <th className="p-4 text-right font-normal sm:p-3"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light align-baseline">{data?.length && content}</tbody>
        </table>
      </div>
    </div>
  );
};
