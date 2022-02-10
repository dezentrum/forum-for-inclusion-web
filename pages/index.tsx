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

import { fetchForms } from '../utils/fetchForms';
import { fetchForm } from '../utils/fetchForm';
import { fetchContacts } from '../utils/fetchContacts';
import { fetchContact } from '../utils/fetchContact';

// ...holds access token
const nextConfig: NextConfig = getConfig();

export interface NextConfig {
  serverRuntimeConfig: { store: { token: string, projectRoot: string }};
  reactStrictMode: boolean;
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    const formData = await fetchForms(nextConfig)
    for (const formId of formData.formIds) {
      await fetchForm(nextConfig, formId)
      const contactIds = await fetchContacts(nextConfig, formId, formData.formCount)
      for (const contactId of contactIds) {
        await fetchContact(nextConfig, formId, contactId)
      }
    }
  }

export async function getStaticProps() {
  return { props: {} }
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
            <p className={typo.text}>Das Forum for Inclusion gibt Ausgeschlossenen eine Stimme. Zwar keine demokratische, aber doch hörbar. Mittels Sprachnachrichten teilen Menschen ihre Meinung, die sonst nichts zu sagen haben. Und wir alle diskutieren über die Stimmberechtigung in der Schweiz.</p>
            <div className={page.pagePlaceholders}>
              <AudioPlaceholder></AudioPlaceholder>
              <AudioPlaceholder></AudioPlaceholder>
              <AudioPlaceholder></AudioPlaceholder>
              <div className={page.pageButtonContainer}>
                  <div className={button.primaryPlay}>
                    <span>Coming Soon</span>
                  </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}