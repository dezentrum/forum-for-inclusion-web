import Head from "next/head";
import Link from 'next/link';

import { PageHeading } from '../components/page-heading';
import { LinkBlock } from '../components/link-block';

import container from "../assets/styles/Container.module.scss"
import typo from "../assets/styles/Typo.module.scss"
import button from "../assets/styles/Button.module.scss"

export default function Home() {
  const testURL = 'https://dezentrum.com/teset'
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
      <main>
        <div className={container.pageContainer}>
          <PageHeading title="Neue Aufnahme"></PageHeading>
          <p>Wozu möchtest du deine Meinung aufnehmen?</p>
          <LinkBlock link={`/voting/statements/`}>
            <p>Wer sollte am politischen Prozess in der Schweiz mitbestimmen dürfen?</p>
          </LinkBlock>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}