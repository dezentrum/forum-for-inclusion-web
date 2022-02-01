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
          <Collapse heading="Änderung des Bundesgesetzes über die Stempelabgaben">
            <div>
              Unternehmen brauchen Kapital, um zum Beispiel Investitionen zu tätigen oder Verluste zu decken. Wenn ein Unternehmen Eigenkapital beschafft, indem es Aktien oder dergleichen ausgibt, erhebt der Bund eine Steuer: die Emissionsabgabe.
              <br />
              <br />
              Diese beträgt ein Prozent des aufgenommenen Kapitals. Die Steuer wird erst auf Beträgen über einer Million Franken erhoben. In der Regel bezahlen kleine Unternehmen keine solche Abgabe; die Steuereinnahmen stammen vorwiegend von mittleren und grossen Unternehmen.
              <br />
              <br />
              Bundesrat und Parlament wollen die Emissionsabgabe abschaffen. Unternehmen sollen neues Eigenkapital aufnehmen können, ohne darauf Steuern bezahlen zu müssen. Das senkt die Investitionskosten, was sich positiv auf Wachstum und Arbeitsplätze auswirkt.
              <br />
              <br />
              Von der Abschaffung der Emissionsabgabe profitieren insbesondere junge, wachstumsstarke Unternehmen, die noch keine Reserven haben. Um ihr Wachstum zu finanzieren, sind sie auf zusätzliches Eigenkapital angewiesen, das heute der Emissionsabgabe unterliegt. Aus der Abschaffung der Abgabe entstünden dem Bund Mindereinnahmen von schätzungsweise 250 Millionen Franken pro Jahr.
            </div>
            <LinkBlock link={"https://www.admin.ch/gov/de/start/dokumentation/abstimmungen/20220213/aenderung-des-bundesgesetzesueber-die-stempelabgaben.html"}>
              Mehr Informationen (admin.ch)
            </LinkBlock>
          </Collapse>
          <Link href="./aenderung-des-bundesgesetzes-ueber-die-stempelabgaben/listen">
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