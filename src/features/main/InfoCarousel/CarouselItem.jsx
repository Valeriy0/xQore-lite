import React from 'react';
import { CustomLink } from 'components';

export const CarouseItem = ({ title, link, text }) => {
  return (
    <CustomLink className="flex flex-col justify-center items-center h-20 my-4 mx-10 sm:my-7" href={link} targetBlank>
      <span className="font-medium text-white">{title}</span>
      <span className="text-white-700 text-sm mb-1">{text}</span>
      <span className="underline text-white-700 text-sm">Read more</span>
    </CustomLink>
  );
};
