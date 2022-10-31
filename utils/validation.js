const statusMessages = {
  INITIAL: "",
  VALID: "ok",
  SUCCESS: "Congratulations, your money is getting less!",
  EMPTY: "These fields are as empty as your soul.",
  TOO_LONG: "No need to rewrite War and Peace.",
  NAN: "You need to relearn the difference between numbers and letters.",
  NEGATIVE: "Nice try, but it won't make you any more money.",
};

const initaialStatus = {
  message: statusMessages.INITIAL,
  isError: false,
};

const validate = (input) => {
  if (input.description === "" || input.amount === 0) {
    return statusMessages.EMPTY;
  }

  if (input.description.length > 50) {
    return statusMessages.TOO_LONG;
  }

  if (isNaN(input.amount)) {
    return statusMessages.NAN;
  }

  if (input.amount <= 0) {
    return statusMessages.NEGATIVE;
  }

  return statusMessages.VALID;
};

export { statusMessages, initaialStatus, validate };
