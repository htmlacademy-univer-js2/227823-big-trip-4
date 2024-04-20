import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';

dayjs.extend(duration);

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_DAY;

function formatDateToShortDate(date) {
  return dayjs(date).format('MMM DD');
}

function formatDateToDateTime(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function formatDateToDateTimeHTML(date) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

function formatDateToTime(date) {
  return dayjs(date).format('HH:mm');
}

function formatDuration(dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dateFrom);
  const patterns = ['DD[D] ', 'HH[H] ', 'mm[M]'];
  const patternsSkip = (timeDiff < MSEC_IN_DAY) + (timeDiff < MSEC_IN_HOUR);
  const pattern = patterns.slice(patternsSkip).join('');
  const pointDuration = dayjs.duration(timeDiff).format(pattern);
  return pointDuration;
}

const isPointPast = (point) => dayjs().isAfter(point.dateTo);
const isPointPresent = (point) => dayjs().isBefore(point.dateTo) && dayjs().isAfter(point.dateFrom);
const isPointFuture = (point) => dayjs().isBefore(point.dateFrom);

const getDateDifference = (pointA, pointB) => dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
const getDurationDifference = (pointA, pointB) => (dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom))) - (dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom)));
const getPriceDifference = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  formatDateToShortDate,
  formatDateToDateTimeHTML,
  formatDateToDateTime,
  formatDateToTime,
  formatDuration,
  isPointPast,
  isPointPresent,
  isPointFuture,
  getDateDifference,
  getDurationDifference,
  getPriceDifference,
};
