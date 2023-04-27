import React, { useState, Fragment } from 'react';
import ArrowRight from 'assets/icons/arrow_right.svg';
import { useRouter } from 'next/router';
import { linkWithQuery } from 'helpers/links';
import { CustomLink, MenuDropdown } from 'components';
import { LINKS } from './constants';

const getLinkContent = ({
  icon,
  activeIcon,
  mobileOnly,
  disabled,
  index,
  link,
  query,
  onClick,
  changeActive,
  iconStyle,
  isActive,
  betaVersion,
  newVersion,
  comingSoon,
  submenu,
  title,
  style,
  isDropdownItem,
  showInPreview,
}) => {
  const Icon = isActive ? activeIcon : icon;
  if (showInPreview) {
    return (
      <CustomLink
        className={`${mobileOnly && `hidden lg:block`} ${disabled && 'cursor-no-drop'}`}
        href={linkWithQuery(link, { user: query.user })}
        key={index}
        withLink={!disabled && !onClick}
      >
        <button
          onClick={onClick || changeActive}
          disabled={disabled}
          className={`relative w-full flex items-center px-2.5 py-2 rounded-xl cursor-pointer ${
            disabled && 'cursor-not-allowed'
          } ${!disabled && 'hover:bg-black-light lg:hover:bg-transparent'} ${
            isActive && 'bg-black-light lg:bg-transparent'
          } lg:rounded-none lg:pl-0 lg:pr-5 lg:py-5 lg:justify-between ${style ? style : ''} ${
            isDropdownItem
              ? 'lg:pl-5 lg:border-t lg:border-white-300 hover:!bg-white-50 lg:hover:!bg-transparent'
              : ' lg:border-b lg:border-white-300'
          }`}
        >
          <div className="flex items-center text-left">
            <Icon className={`w-6 h-6 stroke-current text-white-500 ${iconStyle ? iconStyle : ''}`} />
            <span className={`text-white-500 text-base ml-2.5 ${isActive && 'text-white-900'}`}>{title}</span>
            {(disabled || betaVersion) && (
              <span className="absolute top-1 right-1.5 text-orange text-sm lg:bg-orange-200 lg:px-2.5 lg:py-1 lg:rounded lg:top-1/2 lg:-translate-y-1/2 lg:right-5">
                {betaVersion ? 'Beta' : 'Soon'}
              </span>
            )}
            {newVersion && (
              <span className="absolute top-1 right-1.5 text-green text-sm lg:bg-green-200 lg:px-2.5 lg:py-1 lg:rounded lg:top-1/2 lg:-translate-y-1/2 lg:right-5">
                New
              </span>
            )}
            {comingSoon && (
              <span className="absolute top-1 right-1.5 text-main-blue lg:text-white text-sm lg:bg-main-blue lg:px-2.5 lg:py-1 lg:rounded lg:top-1/2 lg:-translate-y-1/2 lg:right-5">
                Soon
              </span>
            )}
          </div>
          {!!submenu && <ArrowRight className="stroke-current text-white-500 hidden lg:flex" />}
        </button>
      </CustomLink>
    );
  } else {
    return null;
  }
};

export const Menu = ({ changeActive, openSearchPreview }) => {
  const { query, pathname } = useRouter();
  const isPreviewMode = !!query.user;
  const [openedMenu, setOpenedMenu] = useState('Team');

  return (
    <div className="flex flex-1 flex-col h-full w-full overflow-y-auto space-y-2.5 lg:space-y-0">
      <div className="flex flex-1 flex-col w-full h-full overflow-y-auto space-y-2.5 lg:space-y-0 lg:mb-5">
        {LINKS.map((item) => {
          const isActive = item.link === pathname;
          const showMenuItem = isPreviewMode ? item.showInPreview : true;
          const isDropdown = item.type === 'dropdown';
          const onClick = item.title === 'Forsage Account search' ? openSearchPreview : undefined;
          const isOpenedDropdown = item?.title === openedMenu;
          const switchMenu = isOpenedDropdown ? '' : item?.title;

          if (showMenuItem && !isDropdown)
            return (
              <Fragment key={item.title}>
                {getLinkContent({ ...item, query, changeActive, isActive, onClick, showInPreview: showMenuItem })}
              </Fragment>
            );
          if (isDropdown)
            return (
              <MenuDropdown
                key={item.title}
                title={item.title}
                icon={item.icon}
                titleList={item.titleList}
                style={item.style}
                isDefaultOpen={item.isOpen}
                isOpenedDropdown={isOpenedDropdown}
                openDropdown={() => setOpenedMenu(switchMenu)}
              >
                {item.dropdownContent.map((item, index) => {
                  const showMenuItemDropdown = isPreviewMode ? item.showInPreview : true;

                  return getLinkContent({
                    icon: item.icon,
                    activeIcon: item.activeIcon,
                    mobileOnly: item.mobileOnly,
                    disabled: item.disabled,
                    index,
                    link: item.link,
                    query,
                    onClick: item.onClick,
                    changeActive,
                    iconStyle: item.iconStyle,
                    isActive: item.link === pathname,
                    betaVersion: item.betaVersion,
                    newVersion: item.newVersion,
                    comingSoon: item.comingSoon,
                    submenu: item.submenu,
                    title: item.title,
                    style: item.style,
                    isDropdownItem: true,
                    showInPreview: showMenuItemDropdown,
                  });
                })}
              </MenuDropdown>
            );
        })}
      </div>
    </div>
  );
};
