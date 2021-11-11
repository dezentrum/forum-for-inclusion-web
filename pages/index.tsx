import * as fs from 'fs';
import * as path from 'path';
import getConfig from 'next/config'
import Head from "next/head";
import Link from 'next/link';

import styles from '../styles/Home.module.scss';
import headings from "../styles/Typo.module.scss"

import { fetchForm } from '../utils/fetchForm';
import { fetchForms } from '../utils/fetchForms';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/feed">
          <span>Anhören</span>
        </Link>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}