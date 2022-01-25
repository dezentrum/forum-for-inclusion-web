import * as fs from 'fs';
import * as path from 'path';
import getConfig from 'next/config'
import Head from "next/head";
import Link from 'next/link';

import { Hero } from '../components/hero';
import { AudioPlaceholder } from '../components/audio-placeholder';

import page from '../assets/styles/Home.module.scss';
import container from "../assets/styles/Container.module.scss"
import typo from "../assets/styles/Typo.module.scss"
import button from "../assets/styles/Button.module.scss"

import { fetchForm } from '../utils/fetchForm';
import { fetchForms } from '../utils/fetchForms';

// ...holds access token
const nextConfig: NextConfig = getConfig();

export interface NextConfig {
  serverRuntimeConfig: { store: { token: string, projectRoot: string }};
  reactStrictMode: boolean;
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Forum for Inclusion</title>
        <meta name="description" content="Forum for Inclusion" />
        <link rel="icon" href="/favicon/favicon-48.png" type="image/png" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/favicon-apple-touch.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
      </Head>

      <main className={page.main}>
        <Hero></Hero>
        <div className={container.pageContainer}>
          <div className={page.pageContent}>
            <p className={typo.text}>«Forum for Inclusion» gibt diesen Personen eine Stimme. Keine demokratische, sondern die Möglichkeit ihre wortwörtliche Stimme zu aktuellen Abstimmungen zu geben.</p>
            <div className={page.pagePlaceholders}>
              <AudioPlaceholder></AudioPlaceholder>
              <AudioPlaceholder></AudioPlaceholder>
              <AudioPlaceholder></AudioPlaceholder>
              <div className={page.pageButtonContainer}>
                <Link href="/feed">
                  <div className={button.primaryPlay}>
                    <span>Anhören</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}