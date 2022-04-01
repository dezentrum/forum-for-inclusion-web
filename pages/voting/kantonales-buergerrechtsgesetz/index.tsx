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
          <Collapse heading="Kantonales Bürgerrechtsgesetz">
            <div>
              Wer sich in der Schweiz einbürgern lassen will, muss zahlreiche Voraussetzungen erfüllen. Die Gemeinde, der Kanton und der Bund prüfen diese nach klaren Regeln. Heute gibt vor allem der Bund vor, was nötig ist, um das Schweizer Bürgerrecht zu erhalten. Mit dem zur Abstimmung stehenden neuen Kantonalen Bürgerrechtsgesetz ergänzt und konkretisiert der Kanton Zürich diese Voraussetzungen. Das neue Gesetz führt bewährte Regeln der Zürcher Einbürgerungspraxis weiter und trägt zu einer einheitlichen Behandlung der Einbürgerungsgesuche im ganzen Kanton bei. Die Kantonsverfassung verlangt, dass die Einbürgerungsvoraussetzungen in einem Gesetz geregelt und damit demokratisch beschlossen werden.
            </div>
            <LinkBlock link={"https://app.statistik.zh.ch/wahlen_abstimmungen/prod/#/Actual"}>
              Mehr Informationen (zh.ch)
            </LinkBlock>
          </Collapse>
          <Link href="./kantonales-buergerrechtsgesetz/listen">
            <div className={ button.primaryText }>
              <span>
                Ich bin genug informiert, weiter geht’s
              </span>
            </div>
          </Link>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}