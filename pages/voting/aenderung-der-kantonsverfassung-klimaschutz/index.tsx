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
          <Collapse heading="Änderung der Kantonsverfassung, Klimaschutz">
            <div>
              Der Klimaschutz ist eine der wichtigsten Aufgaben unserer Zeit – auch im Kanton Zürich. Er soll deshalb in der Kantonsverfassung verankert werden. Der geplante neue Verfassungsartikel definiert das Ziel der Treibhausgasneutralität, kurz «Netto-Null». Er erteilt dem Kanton und den Gemeinden verbindlich den Auftrag, sich für die Begrenzung des Klimawandels und seiner Auswirkungen einzusetzen. Weiter bezeichnet er die Handlungsfelder für Massnahmen und schafft die Grundlage für die Förderung von geeigneten Technologien, Materialien und Prozessen.
            </div>
            <LinkBlock link={"https://app.statistik.zh.ch/wahlen_abstimmungen/prod/#/Actual"}>
              Mehr Informationen (zh.ch)
            </LinkBlock>
          </Collapse>
          <Link href="./aenderung-der-kantonsverfassung-klimaschutz/listen">
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