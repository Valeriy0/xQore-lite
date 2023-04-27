import React, { useMemo } from 'react';
import { RARITY_NAMES, RARITY_COLOR } from 'helpers/boxInfo';
import LinkIcon from 'assets/icons/link.svg';
import { capitalizeFirstLetter } from 'helpers/text';

export const Item = ({ result }) => {
  const power = Number(result?.power);
  const rarity = result?.attributes.find((item) => item.trait_type === 'rarity').value;
  const finalRarity = capitalizeFirstLetter(rarity);

  return (
    <div className="nftCard-lineGradient flex items-center justify-center p-1 rounded-[40px] max-w-max">
      <div className="flex flex-col p-2.5 pb-3.5 nftCard-wrapper rounded-[40px] text-white">
        <img src={result?.image} className="h-[240px] w-[240px] mb-4 rounded-[30px]" alt="" />
        <div className="flex items-center justify-between text-white-800  mb-3 px-2.5">
          <span className="font-semibold">{result?.name}</span>
          {!!finalRarity && (
            <div
              className={`py-[5px] px-2.5 text-white-800 text-[12px] leading-[14px] rounded-[30px] ${RARITY_COLOR[finalRarity]}`}
            >
              {finalRarity}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-[20px] py-5 text-[12px] leading-[14px] nftCard__power-wrapper rounded-[30px]">
          <span>Power {power}/100</span>
          <a
            href={result?.scan_url}
            target="_blank"
            className="cursor-pointer hover:underline flex items-center justify-end space-x-1"
            rel="noreferrer"
          >
            <span className="text-xs">bscscan</span>
            <LinkIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
