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
          <Collapse heading="Übernahme der EU-Verordnung über die Europäische Grenz- und Küstenwache (Weiterentwicklung des Schengen-Besitzstands)">
            <div>
              Die Schweiz gehört zum Schengen-Sicherheitsverbund. Die Europäische Agentur für die Grenz- und Küstenwache (Frontex) unterstützt die Schengen-Staaten operativ bei der Kontrolle der Schengen-Aussengrenzen. Die Schweiz arbeitet seit über zehn Jahren mit Frontex zusammen.
              <br/>
              <br/>
              Seit Ende 2019 wird Frontex in der EU ausgebaut. Bundesrat und Parlament haben entschieden, dass die Schweiz ihren Anteil an dieser Reform übernimmt. Dagegen wurde das Referendum ergriffen.
              <br/>
              <br/>
              Mit dem Ausbau erhält Frontex mehr Geld und mehr Personal. Dazu kommen neue Aufgaben im Bereich der Rückkehr ausreisepflichtiger Personen. Zudem wird die unabhängige Stelle für Grundrechte aufgestockt. Sie trägt dazu bei, dass bei Einsätzen an den Schengen-Aussengrenzen die Rechte aller gewahrt werden.
              <br/>
              <br/>
              Die Gegnerinnen und Gegner argumentieren, dass die Schweiz angebliche Menschenrechtsverletzungen durch Frontex mitverantwortet, indem sie die Agentur finanziell unterstützt.
              <br/>
              <br/>
              Falls die Schweiz diese Schengen-Weiterentwicklung ablehnt, endet ihre Zusammenarbeit mit den Schengen- und Dublin-Staaten automatisch – es sei denn, die EU-Staaten und die EU-Kommission kommen der Schweiz entgegen.
            </div>
            <LinkBlock link={"https://www.admin.ch/gov/de/start/dokumentation/abstimmungen/20220515/uebernahme-der-eu-verordnung-ueber-die-europaeische-grenz-und-kuestenwache.html"}>
              Mehr Informationen (admin.ch)
            </LinkBlock>
          </Collapse>
          <Link href="./uebernahme-der-eu-verordnung-ueber-die-europaeische-grenz--und-kuestenwache/listen">
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