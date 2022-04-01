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
          <Collapse heading="Änderung des Filmgesetzes">
            <div>
            Inländische Fernsehsender sind verpflichtet, 4 Prozent ihres Umsatzes in das Schweizer Filmschaffen zu investieren. Damit leisten sie einen wichtigen Beitrag zur einheimischen Filmproduktion. Filme und Serien werden jedoch zunehmend auch im Internet zum Abruf angeboten (Streaming). Für die oft global tätigen Streamingdienste gibt es bis jetzt in der Schweiz keine Investitionspflicht.
            <br/>
            <br/>
            Die Änderung des Filmgesetzes sieht vor, dass Streamingdienste künftig ebenfalls 4 Prozent des in der Schweiz erzielten Umsatzes in das hiesige Filmschaffen investieren müssen. Sie können sich entweder direkt an Schweizer Film- und Serienproduktionen beteiligen oder eine Ersatzabgabe entrichten, die der Schweizer Filmförderung zugutekommt. Zudem muss das Angebot der Streamingdienste zu 30 Prozent aus Filmen oder Serien bestehen, die in Europa produziert wurden. Gegen die Gesetzesänderung wurde das Referendum ergriffen.
            </div>
            <LinkBlock link={"https://www.admin.ch/gov/de/start/dokumentation/abstimmungen/20220515/aenderung-des-filmgesetzes.html"}>
              Mehr Informationen (admin.ch)
            </LinkBlock>
          </Collapse>
          <Link href="./aenderung-des-filmgesetzes/listen">
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