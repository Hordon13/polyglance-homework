import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import { createNewSpending, getSpendings } from "../utils/api";

const Home = ({ fetchedSpendings }) => {
  const [spendings, setSpending] = useState([...fetchedSpendings]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            value="HUF"
            defaultChecked
          ></input>
          <label htmlFor="hufCurrency">HUF</label>
          <input
            type="radio"
            id="usdCurrency"
            name="currency"
            value="USD"
          ></input>
          <label htmlFor="usdCurrency">USD</label>
          <br />
          <button type="submit" form="spendingInput" disabled={isSubmitting}>
            Submit
          </button>
        </form>
        <ul>
          {spendings.map((el) => (
            <li key={el.id}>{el.description}</li>
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
