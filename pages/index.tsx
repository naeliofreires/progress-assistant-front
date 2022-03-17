import type { NextPage } from 'next';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

import { App } from '/src';
import styles from '../styles/Home.module.css';
import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Head>
          <title>To-Do</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <App />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
