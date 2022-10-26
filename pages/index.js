import Head from "next/head";
import styles from "../styles/Home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Homework | Polyglance</title>
        <meta name="description" content="Spending Tracker App" />
      </Head>

      <main className={styles.contentWrapper}>
        <h1>hello world</h1>
      </main>
    </div>
  );
};

export default Home;
