import { FilterType } from '../const.js';
import { getRandomValue } from '../utils/common';

function getRandomFilter() {
  return getRandomValue(Object.values(FilterType));
}

export { getRandomFilter };
