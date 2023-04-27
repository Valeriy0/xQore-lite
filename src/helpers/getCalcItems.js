import { PROGRAM_NAMES } from 'helpers/constants';

export const getCalcItemsDecrement = (value, actualArray, blockName) => {
  if (![PROGRAM_NAMES.XGOLD, PROGRAM_NAMES.XXX].includes(blockName)) {
    return actualArray.reduce((result, item) => {
      if (item > value) return result;
      return [...result, item];
    }, []);
  }

  return actualArray.reduce((result, item) => {
    if (item >= value) return result;
    return [...result, item];
  }, []);
};

export const getCalcItemsIncrement = (value) => {
  return new Array(value).fill({}).map((item, index) => index + 1);
};
