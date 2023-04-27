import React from 'react';
import Link from 'next/link';

export const CustomLink = ({ children, className, targetBlank, withLink = true, ...props }) => {
  if (!withLink) {
    if (className) {
      return (
        <div className={className} {...props}>
          {children}
        </div>
      );
    }

    return children;
  }

  return (
    <Link {...props}>
      <a className={className} target={targetBlank && '_blank'}>
        {children}
      </a>
    </Link>
  );
};
