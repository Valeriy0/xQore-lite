import React from 'react';
import ExchangeIcon from 'assets/icons/exchange.svg';

const Transactions = () => {
  return (
    <div className="flex flex-col w-full flex-col bg-black-light rounded-3xl">
      <table className="min-w-max w-full table-auto border-white-100">
        <thead>
          <tr className="text-white-500 uppercase text-xs font-normal border-b border-white-100">
            <th className="py-6 px-6 text-left">тип</th>
            <th className="py-6 px-6 text-left">Дата</th>
            <th className="py-6 px-6 text-left">id</th>
            <th className="py-6 px-6 text-left">кошелек</th>
            <th className="py-6 px-6 text-left">TRX</th>
            <th className="py-6 px-6 text-left">USD</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          <tr className="border-b border-white-100">
            <td className="py-6 px-6 text-left whitespace-nowrap">
              <div className="flex items-center">
                <ExchangeIcon />
              </div>
            </td>
            <td className="py-6 px-6 text-left whitespace-nowrap">
              <div className="text-white font-medium text-xs">21.01.2021 в 21:00</div>
            </td>
            <td className="py-6 px-6 text-left whitespace-nowrap">
              <div className="text-light-blue font-medium text-xs">367904</div>
            </td>
            <td className="py-6 px-6 text-left whitespace-nowrap">
              <div className="text-white font-medium text-xs">TQS2Y...QJLtL</div>
            </td>
            <td className="py-6 px-6 text-left whitespace-nowrap" colSpan="2">
              <div className="text-green-light font-medium text-xs text-center">реинвест</div>
            </td>
          </tr>
          <tr className="border-b border-white-100">
            <td className="py-6 px-6 text-left whitespace-nowrap">
              <div className="flex items-center">
                <ExchangeIcon />
              </div>
            </td>
            <td className="py-6 px-6 text-left whitespace-nowrap">
              <div className="text-white font-medium text-xs">21.01.2021 в 21:00</div>
            </td>
            <td className="py-6 px-6 text-left whitespace-nowrap">
              <div className="text-light-blue font-medium text-xs">367904</div>
            </td>
            <td className="py-6 px-6 text-left whitespace-nowrap">
              <div className="text-white font-medium text-xs">TQS2Y...QJLtL</div>
            </td>
            <td className="py-6 px-6 text-left whitespace-nowrap" colSpan="2">
              <div className="text-green-light font-medium text-xs text-center">реинвест</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
