import React, { useState } from 'react';
import ForsageFour from 'public/svg/forsage_4.svg';
import ForsageThree from 'public/svg/forsage_3.svg';
import ArrowUp from 'assets/icons/arrow_up.svg';
import ArrowDown from 'assets/icons/arrow_down.svg';
import People from 'assets/icons/people.svg';
import Exchange from 'assets/icons/exchange.svg';
import { CustomLink } from 'components';

const Icons = {
  3: ForsageThree,
  4: ForsageFour,
};

export const TariffItem = ({ value, trx, amount }) => {
  const [opened, setOpened] = useState(false);

  const handleOnClick = () => {
    setOpened((prev) => !prev);
  };

  const renderElements = (elements) => {
    return (
      <div className="flex w-full">
        <div className="flex w-full justify-around mt-4">
          {elements.map((lvl, lvlIndex) => {
            const style = lvl.active ? 'bg-light-blue' : 'border-line-gray border-2';
            const rotate = lvlIndex % 2 === 0 ? '-rotate-60 left-1/3' : 'rotate-60 right-1/3';

            return (
              <div className="flex flex-col w-full justify-around items-center">
                <div className="relative" key={lvlIndex}>
                  <CustomLink href={'/page'} as={'/page'} passHref>
                    <div className={`rounded-full w-5 h-5 ${style}`} />
                  </CustomLink>
                  <div className={`border-line-gray border-0 border-b-2 w-5 -z-1 absolute -top-2.5 ${rotate}`} />
                </div>
                {!!lvl.elements.length && renderElements(lvl.elements)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const CurrentIcon = Icons[value];

  return (
    <div className="flex w-full flex-col bg-black-light rounded-3xl p-6">
      <div className="flex justify-between">
        <CurrentIcon />
        <div className="flex items-start">
          <div className="flex flex-col">
            <span className="text-white text-right text-3xl font-bold">{trx} TRX</span>
            <span className="text-white-500 text-base font-bold text-right">{amount} $</span>
          </div>
          <div
            className="flex items-center justify-center rounded-full bg-purple ml-5 cursor-pointer w-6 h-6"
            onClick={handleOnClick}
          >
            {opened ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {new Array(9)
          .fill({
            id: '',
            price: 1234,
            recycles: 123,
            descendants: 1,
            elements: [
              {
                active: true,
                slug: '?',
                hash: '',
                price: 123.23,
                elements: [
                  {
                    active: true,
                    slug: '?',
                    hash: '',
                    price: 123.23,
                    elements: [],
                  },
                  {
                    active: false,
                    slug: '?',
                    hash: '',
                    price: 123.23,
                    elements: [],
                  },
                ],
              },
              {
                active: true,
                slug: '?',
                hash: '',
                price: 123.23,
                elements: [
                  {
                    active: true,
                    slug: '?',
                    hash: '',
                    price: 123.23,
                    elements: [],
                  },
                  {
                    active: false,
                    slug: '?',
                    hash: '',
                    price: 123.23,
                    elements: [],
                  },
                ],
              },
            ],
          })
          .map((line, index) => {
            return (
              <div className="flex flex-col border-2 rounded-lg border-light-blue relative" key={index}>
                <span className="flex items-center justify-center absolute -left-2 -top-2 text-white text-center text-xs w-6 h-6 z-10 border-2 border-light-blue rounded-full overflow-hidden bg-black-light">
                  {index + 1}
                </span>
                <span className="flex items-center justify-center w-full py-2.5 font-bold	text-white text-base border-0 border-b-2 border-light-blue">
                  {line.price}
                </span>
                <div className="flex flex-col overflow-hidden">{renderElements(line.elements)}</div>
                <div className="py-2.5">
                  <div className="flex justify-around">
                    <div className="flex space-x-2 items-center">
                      <People />
                      <span className="text-sm	text-white font-bold">{line.recycles}</span>
                    </div>
                    <div className="flex space-x-2 items-center">
                      <Exchange />
                      <span className="text-sm	text-white font-bold">{line.descendants}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
