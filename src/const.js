
const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const POINT_EMPTY = {
  id: crypto.randomUUID(),
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[5]
};

const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const ENABLED_SORT_TYPES = [
  SortTypes.DAY, SortTypes.TIME, SortTypes.PRICE
];

const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major'
};

const UserAction = {
  CREATE_POINT: 'create-point',
  UPDATE_POINT: 'update-point',
  REMOVE_POINT: 'remove-point',
};

export { POINT_TYPES, POINT_EMPTY, FilterType, SortTypes, ENABLED_SORT_TYPES, UpdateType, UserAction };

