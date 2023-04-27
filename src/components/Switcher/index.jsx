import React from 'react';

export const Switcher = () => {
  return (
    <div className="flex flex-col">
      <span className="text-white">English</span>
      <ul className="hidden">
        <li>
          <span className="text-white">Russian</span>
        </li>
        <li>
          <span className="text-white">Spanish</span>
        </li>
      </ul>
    </div>
  );
};
