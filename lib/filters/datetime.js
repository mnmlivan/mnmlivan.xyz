const { DateTime } = require('luxon');

module.exports = (string, format) => {
  // Enable special `now` value
  const dateObject = string === 'now' ? DateTime.local().toJSDate() : string;

  let date = DateTime.fromJSDate(dateObject, {
    locale: 'bg',
    zone: 'utc',
  });

  if (format) {
    // Format date if formatting tokens provided
    date = DateTime.fromISO(date).setLocale('bg').toFormat(format);
  } else {
    // Format date as ISO 8601
    date = date.toISO();
  }

  return date;
};
