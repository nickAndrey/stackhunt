/**
 * @argument pattern:
 */

function formatTime(date: Date, pattern?: 'YYYY-MM-DD') {
  let formatOption: {
    key: Intl.LocalesArgument;
    options: Intl.DateTimeFormatOptions;
  } = { key: '', options: {} };

  switch (pattern) {
    case 'YYYY-MM-DD':
      formatOption = {
        key: 'en-CA',
        options: { day: '2-digit', year: 'numeric', month: '2-digit' },
      };
      break;
    default:
      formatOption = {
        key: 'en-CA',
        options: { day: '2-digit', year: 'numeric', month: '2-digit' },
      };
  }

  return new Intl.DateTimeFormat(formatOption.key, formatOption.options).format(date);
}
export default formatTime;
