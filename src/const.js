
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
  dateFrom: Date.now(),
  dateTo: Date.now(),
  destination: '',
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0]
};

const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};

const PointMode = {
  DEFAULT: 'default',
  EDIT: 'edit',
};

export { POINT_TYPES, POINT_EMPTY, FilterType, PointMode };

