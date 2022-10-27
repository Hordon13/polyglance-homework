import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

const Home = ({ data }) => {
  const [spendings, setSpending] = useState([...data]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currencies = {
    HUF: "HUF",
    EUR: "EUR",
  };

  const initialFormFields = {
    discription: "",
    amount: null,
    currency: currencies.HUF,
  };

  const [formFields, setFormFields] = useState(initialFormFields);

  const sortByOptions = {
    AMOUNT: "amount",
    DATE: "date",
  };

  const defaultSortSettings = {
    isAscending: false,
    sortBy: sortByOptions,
  };

  const [sortSettings, setSortSettings] = useState(defaultSortSettings);

  const addNewSpending = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("submitting...", formFields);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Homework | Polyglance</title>
        <meta name="description" content="Spending Tracker App" />
      </Head>

      <main className={styles.contentWrapper}>
        <h1>hello world</h1>
        <form id="form1" onSubmit={addNewSpending}>
          <button
            type="submit"
            form="form1"
            value="Submit"
            disabled={isSubmitting}
          >
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
  const res = await fetch(`${process.env.BASE_URL}/spendings`);
  const data = await res.json();
  return { props: { data } };
};

export default Home;
