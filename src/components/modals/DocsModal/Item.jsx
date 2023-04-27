import React from 'react';
import { Button, CustomLink } from 'components';
import DocIcon from 'assets/icons/file.svg';

export const Item = ({ href = '', title = '' }) => {
  return (
    <CustomLink href={href} targetBlank className="w-full">
      <Button type="light-white" className="w-full py-4">
        <div className="flex items-center justify-start w-full font-medium">
          <DocIcon className="w-4 h-4 mr-2" />
          <span>{title}</span>
        </div>
      </Button>
    </CustomLink>
  );
};
