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
          <Collapse heading="Volksinitiative «Ja zum Tier und Menschenversuchsverbot»">
            <div>
              Tierversuche sind in der Schweiz erlaubt. Sie werden eingesetzt, um Medikamente und Therapien zu entwickeln, mit denen Krankheiten besser behandelt werden können.
              <br />
              <br />
              Die Schweiz hat eines der weltweit strengsten Gesetze für Tierversuche: Ein Tierversuch wird nur bewilligt, wenn die Ergebnisse nicht auf anderem Weg erzielt werden können. Die Forscherinnen und Forscher dürfen in ihren Versuchen mit nur so vielen Tieren arbeiten wie unbedingt nötig, und sie müssen deren Belastungen so gering wie möglich halten.
              <br />
              <br />
              Die Volksinitiative fordert ein Verbot von Tierversuchen. Produkte, die unter Anwendung von Tierversuchen entwickelt wurden, sollen zudem nicht mehr importiert werden dürfen. Die Initiative verlangt auch, dass Forschung, die ohne Tierversuche auskommt, mindestens dieselbe staatliche Unterstützung erhält wie heute diejenige mit Tierversuchen. Auch sogenannte Menschenversuche sollen verboten werden.
              <br />
              <br />
              Bei Annahme der Initiative gäbe es in der Schweiz keine neuen Medikamente mehr, die mit Tierversuchen entwickelt werden. Die Forschung sowie die Entwicklung von Medikamenten oder anderen Produkten wie Pflanzenschutzmitteln würden eingeschränkt und möglicherweise ins Ausland verlagert.
            </div>
            <LinkBlock link={"https://www.admin.ch/gov/de/start/dokumentation/abstimmungen/20220213/volksinitiative-ja-zum-tier-und-menschenversuchsverbot.html"}>
              Mehr Informationen (admin.ch)
            </LinkBlock>
          </Collapse>
          <Link href="./volksinitiative-ja-zum-tier-und-menschenversuchsverbot/listen">
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