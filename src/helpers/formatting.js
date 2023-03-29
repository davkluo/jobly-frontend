/** Convert salary to formatted string */

function formatSalary(salary) {
  if (salary === null) return 'Unspecified';

  const formatter = new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    },
  );

  return formatter.format(salary);
}


/** Convert equity decimal to formatted string */

function formatEquity(equity) {
  if (equity === null) return 'Unspecified';

  return Number(equity).toLocaleString(
    undefined,
    {
      style: 'percent',
      minimumFractionDigits: 2,
    },
  )
}

export { formatSalary, formatEquity };