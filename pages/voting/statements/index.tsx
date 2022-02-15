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
        <title>Forum for Inclusio</title>
        <meta name="description" content="Forum for Inclusion" />
        <link rel="icon" href="/favicon/favicon-48.png" type="image/png" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/favicon-apple-touch.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
      </Head>

      <main>
        <div className={container.pageContainer}>
          <PageHeading title="Informieren"></PageHeading>
          <Collapse heading="Wer sollte am politischen Prozess in der Schweiz mitbestimmen dürfen?">
            <div>
              1 von 3 Personen in der Schweiz können nicht an nationalen Wahlen und Abstimmungen teilnehmen. Die meisten davon, weil sie keinen Schweizer Pass besitzen. Forum for Inclusion möchte hören, was du dazu denkst.
              <br />
              <br />
              Wer sollte am politischen Prozess in der Schweiz mitbestimmen dürfen? Warum?
            </div>
          </Collapse>
          <Link href="./statements/listen">
            <div className={ button.primaryText }>
              <span>
                Weiter geht’s
              </span>
            </div>
          </Link>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}