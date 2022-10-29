const getSpendings = async () => {
  const res = await fetch(`${process.env.BASE_URL}/spendings`);
  const data = await res.json();
  return data;
};

const createNewSpending = async (newSpending) => {
  const res = await fetch(
    `https://polygence-spendtracker.herokuapp.com/spendings/`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newSpending),
    }
  );
  const data = await res.json();
  return data;
};

export { getSpendings, createNewSpending };
