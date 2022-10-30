import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.scss";
import { createNewSpending, getSpendings } from "../utils/api";
import {
  filterSpendings,
  defaultFilterSettings,
  currencies,
  direction,
  sortBy,
} from "../utils/filter";

const Home = ({ fetchedSpendings }) => {
  const [spendings, setSpending] = useState([...fetchedSpendings]);
  const [filterSettings, setFilterSettings] = useState(defaultFilterSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDirectionChange = () => {
    setFilterSettings((prevState) => ({
      ...prevState,
      direction:
        prevState.direction === direction.ASC ? direction.DSC : direction.ASC,
    }));
  };

  const onSortByChange = (e) => {
    setFilterSettings((prevState) => ({
      ...prevState,
      sortBy: e.target.value,
    }));
  };

  const onCurrencyFilterChange = (e) => {
    setFilterSettings((prevState) => ({
      ...prevState,
      currency: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newSpending = {
      description: e.target.description.value,
      amount: Number(e.target.amount.value),
      currency: e.target.currency.value,
      spent_at: new Date().toISOString(),
    };

    await createNewSpending(newSpending).then((created) => {
      setSpending((prevState) => [...prevState, created]);
      setIsSubmitting(false);
      e.target.description.value = "";
      e.target.amount.value = null;
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Homework | Polyglance</title>
        <meta name="description" content="Spending Tracker App" />
      </Head>

      <main className={styles.contentWrapper}>
        <h1>Spending Tracker</h1>
        <section className={styles.filterBlock}>
          <input
            type="radio"
            id="sortByDate"
            name="sortBy"
            value={sortBy.DATE}
            defaultChecked
            onChange={(e) => onSortByChange(e)}
          ></input>
          <label htmlFor="sortByDate">{sortBy.DATE}</label>
          <input
            type="radio"
            id="sortByAmount"
            name="sortBy"
            value={sortBy.AMOUNT}
            onChange={(e) => onSortByChange(e)}
          ></input>
          <label htmlFor="sortByAmount">{sortBy.AMOUNT}</label>
          <input
            type="checkbox"
            id="sortDirection"
            name="direction"
            onChange={() => onDirectionChange()}
          />
          <label htmlFor="sortDirection">{direction.ASC}</label>
          <input
            type="radio"
            id="allFilter"
            name="currencyFilter"
            value={currencies.ALL}
            defaultChecked
            onChange={(e) => onCurrencyFilterChange(e)}
          ></input>
          <label htmlFor="allFilter">{currencies.ALL}</label>
          <input
            type="radio"
            id="hufFilter"
            name="currencyFilter"
            value={currencies.HUF}
            onChange={(e) => onCurrencyFilterChange(e)}
          ></input>
          <label htmlFor="hufFilter">{currencies.HUF}</label>
          <input
            type="radio"
            id="usdFilter"
            name="currencyFilter"
            value={currencies.USD}
            onChange={(e) => onCurrencyFilterChange(e)}
          ></input>
          <label htmlFor="usdFilter">{currencies.USD}</label>
        </section>
        <form id="spendingInput" onSubmit={handleSubmit}>
          <input
            type="text"
            id="description"
            placeholder="description"
            maxLength={200}
          />
          <input type="number" id="amount" placeholder="0" />
          <br />
          <input
            type="radio"
            id="hufCurrency"
            name="currency"
            value={currencies.HUF}
            defaultChecked
          ></input>
          <label htmlFor="hufCurrency">{currencies.HUF}</label>
          <input
            type="radio"
            id="usdCurrency"
            name="currency"
            value={currencies.USD}
          ></input>
          <label htmlFor="usdCurrency">{currencies.USD}</label>
          <br />
          <button type="submit" form="spendingInput" disabled={isSubmitting}>
            Submit
          </button>
        </form>

        <ul>
          {filterSpendings(spendings, filterSettings).map((el) => (
            <li key={el.id}>
              <b>{el.id}</b> {el.description} {el.amount} {el.currency}{" "}
              {new Date(el.spent_at).toLocaleDateString("hu-HU")}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export const getServerSideProps = async () => {
  const fetchedSpendings = await getSpendings();
  return { props: { fetchedSpendings } };
};

export default Home;
