import dayjs from 'dayjs';

function formatDateToShortDate(date){
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

function formatDuration(date1, date2){
  // TODO
  const duration = dayjs(date2).subtract(dayjs(date1));
  return `${duration.minute()}M`;
}

export { formatDateToShortDate, formatDateToDateTimeHTML, formatDateToDateTime, formatDateToTime, formatDuration };
