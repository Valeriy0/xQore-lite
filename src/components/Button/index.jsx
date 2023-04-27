import React from 'react';
import clsx from 'clsx';

const typesClasses = {
  transparent: 'px-0 py-0 bg-transparent',
  primary: 'px-5 py-3 bg-main-blue hover:bg-hover-main-blue active:bg-active-main-blue',
  black: 'px-5 py-3 bg-main-bg hover:bg-hover-main-bg active:bg-active-main-bg',
  'light-white': 'px-5 py-3 bg-white-100 hover:bg-white-300',
  'light-white-rounded': 'rounded-full py-0 px-2.5 bg-white-100 hover:bg-white-300',
  'white-2': 'px-5 py-3 bg-white text-red hover:bg-hover-red hover:text-white active:bg-active-red active:text-white',
  'preview-login': 'px-5 py-3 bg-main-bg hover:bg-black-500',
  'black-light': 'px-5 py-2.5 bg-black-light hover:bg-line-gray active:bg-active-gray',
  'black-light-circle': 'px-0 py-0 bg-black-light rounded-full w-10 h-10 hover:bg-line-gray active:bg-active-gray',
  'light-blue': 'px-5 py-3 bg-main-blue text-white hover:bg-hover-main-blue active:bg-active-main-blue',
  'light-blue-rounded':
    'py-0 px-2.5 bg-main-blue text-white rounded !leading-30px hover:bg-hover-main-blue active:bg-active-main-blue',
  'white-blue-rounded':
    'py-0 px-2.5 text-main-blue rounded !leading-30px bg-white-900 hover:bg-main-blue hover:text-white',
  red: 'bg-red text-white py-2.5 px-5 hover:bg-hover-red active:bg-active-red',
  purple: 'px-5 py-3 bg-light-purple hover:bg-hover-purple active:bg-active-purple',
  orange: 'px-5 py-3 bg-orange hover:bg-hover-orange active:bg-active-orange',
  'cyan-300': 'px-5 py-3 bg-cyan-300 hover:bg-hover-cyan-300 active:bg-active-cyan-300',
  pink: 'px-5 py-3 bg-dark-pink hover:bg-hover-pink active:bg-active-pink',
  disabled: 'bg-white-100 py-3 px-5 cursor-not-allowed',
  green: 'px-5 py-3 bg-green-350 hover:bg-hover-green active:bg-active-green',
  gold: 'px-5 py-3 bg-gold-500 hover:bg-gold-900 active:bg-agold-900',
  'upgrade-level': 'px-5 py-3 bg-gradient-to-tr from-purple-300 to-green-700 hover:bg-gradient-to-bl',
  'gradient-purp-orange': 'btn_gradient_purp_orange',
  yellow2: 'px-4 py-2.5 bg-yellow2 hover:bg-gold-500 leading-[16px]',
  'nft-gradient': 'nft-button-gradient rounded-[100px] px-0 py-0 text-white',
  'puma-gradient': 'puma-labs-gradient rounded-[100px] px-0 py-0 text-white',
  'sky-blue': 'bg-sky-blue rounded-[100px] px-0 py-0 text-white',
  'ambassador-gradient': 'ambassador-buttonGradient rounded-[100px] px-0 py-0 text-white',
  white: 'px-5 py-3 bg-white text-[#192223] hover:bg-white-100 hover:text-white active:bg-white-200 active:text-white',
};

const baseClasses =
  'flex justify-center items-center text-center text-base font-bold text-white rounded-mini sm:text-sm outline-none';

const Button = ({ type, className, buttonType, children, disabled, ...props }) => {
  const totalClassName = disabled ? typesClasses['disabled'] : typesClasses[type];

  return (
    <button type={buttonType} disabled={disabled} className={clsx(baseClasses, totalClassName, className)} {...props}>
      {children}
    </button>
  );
};

export { Button };
