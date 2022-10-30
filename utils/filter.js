const currencies = {
  ALL: "ALL",
  USD: "USD",
  HUF: "HUF",
};

const direction = {
  ASC: "ascending",
  DSC: "descending",
};

const sortBy = {
  DATE: "date",
  AMOUNT: "amount",
};

const defaultFilterSettings = {
  currency: currencies.ALL,
  direction: direction.DSC,
  sortBy: sortBy.DATE,
};

const convertToUSD = (el) => {
  const conversionRate = 413.2; // should be updated from an API
  return el.currency === currencies.HUF
    ? el.amount / conversionRate
    : el.amount;
};

const filterSpendings = (spendings, settings = defaultFilterSettings) => {
  const arr =
    settings.currency === currencies.ALL
      ? spendings
      : spendings.filter((s) => s.currency === settings.currency);

  if (settings.sortBy === sortBy.AMOUNT) {
    arr.sort((a, b) => convertToUSD(a) - convertToUSD(b));
  } else {
    arr.sort((a, b) => new Date(a.spent_at) - new Date(b.spent_at));
  }

  if (settings.direction === direction.DSC) {
    arr.reverse();
  }

  return arr;
};

export {
  currencies,
  direction,
  sortBy,
  defaultFilterSettings,
  filterSpendings,
};
