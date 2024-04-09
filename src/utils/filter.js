import { FilterType } from '../const.js';
import { isPointPast, isPointPresent, isPointFuture } from './point.js';


const Filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
};

const Some = {
  [FilterType.EVERYTHING]: () => true,
  [FilterType.PAST]: (points) => points.some((point) => isPointPast(point)),
  [FilterType.PRESENT]: (points) => points.some((point) => isPointPresent(point)),
  [FilterType.FUTURE]: (points) => points.some((point) => isPointFuture(point)),
};

export { Filter, Some };
