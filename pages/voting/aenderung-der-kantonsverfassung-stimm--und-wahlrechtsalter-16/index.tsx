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
          <Collapse heading="Änderung der Kantonsverfassung, Stimm- und Wahlrechtsalter 16">
            <div>
              Mit einer Änderung der Kantonsverfassung soll das Stimm- und Wahlrechtsalter im Kanton Zürich von bisher 18 auf 16 Jahre gesenkt werden. Das neue Stimm- und Wahlrechtsalter 16 soll für Abstimmungen auf Gemeinde- und Kantonsebene gelten. Es umfasst das Recht, an Abstimmungen und Wahlen teilzunehmen (aktives Wahlrecht). Für ein öffentliches Amt wählbar sein (passives Wahlrecht) sollen hingegen weiterhin nur Personen ab 18 Jahren.
            </div>
            <LinkBlock link={"https://app.statistik.zh.ch/wahlen_abstimmungen/prod/#/Actual"}>
              Mehr Informationen (zh.ch)
            </LinkBlock>
          </Collapse>
          <Link href="./aenderung-der-kantonsverfassung-stimm--und-wahlrechtsalter-16/listen">
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