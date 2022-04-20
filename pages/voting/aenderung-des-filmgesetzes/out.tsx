import Head from "next/head";
import Link from 'next/link';

import { PageHeading } from '../../../components/page-heading';
import { LinkBlock } from '../../../components/link-block';
import { Collapse } from '../../../components/collapse';

import container from "../../../assets/styles/Container.module.scss"
import typo from "../../../assets/styles/Typo.module.scss"
import button from "../../../assets/styles/Button.module.scss"

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

      <main>
        <div className={container.pageContainer}>
          <PageHeading title="Los geht's!"></PageHeading>
          <p>
          «Forum for Inclusion» benutzt im Hintergrund das Online Tool VideoAsk. Um deine Meinung mit deiner Stimme aufzunehmen, leiten wir dich auf das Aufnahmeformular weiter.
          </p>
          <Link href="https://www.videoask.com/fsf25cnfw">
            <div className={ button.recordLink }>
              <span>
                Zur Website für Aufnahme
              </span>
              </div>
          </Link>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}