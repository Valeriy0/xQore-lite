import React from 'react';
import DropdownArrowGrey from 'assets/icons/dropdown_arrow_grey.svg';

export const MenuDropdown = ({ isOpenedDropdown = false, openDropdown, style, children, icon, title }) => {
  const Icon = icon;

  return (
    <div
      className={`${style} ${
        isOpenedDropdown ? 'bg-black-light lg:bg-transparent lg:!pb-0' : ''
      }  min-w-[186px] cursor-pointer hover:bg-black-light lg:hover:bg-transparent rounded-[10px] lg:border-b lg:border-white-300 lg:rounded-none lg:justify-between`}
    >
      <>
        <div onClick={() => openDropdown()} className="flex p-[10px] lg:px-0 lg:py-5">
          <Icon className="w-6 h-6" />
          <span className="text-[#8B8C8C] text-[16px] ml-2.5 lg:text-white-500">{title}</span>
          <DropdownArrowGrey className={`ml-auto lg:mr-5 ${isOpenedDropdown ? 'rotate-180' : ''}`} />
        </div>
        {isOpenedDropdown && <div className="border-solid border-[1px] border-[#363738] lg:hidden mx-[10px]" />}
        {isOpenedDropdown && <div className="flex flex-col p-2.5 lg:py-0 lg:pr-0">{children}</div>}
      </>
    </div>
  );
};
