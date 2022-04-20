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
          <Collapse heading="Änderung des Transplantationsgesetzes">
            <div>
              In den vergangenen fünf Jahren haben in der Schweiz im Schnitt jährlich rund 450 Menschen eines oder mehrere Organe einer verstorbenen Person erhalten. Der Bedarf an Organen ist allerdings deutlich grösser. Eine Transplantation ist heute nur möglich, wenn die verstorbene Person der Spende zu Lebzeiten zugestimmt hat (Zustimmungslösung). Der Wille der betroffenen Person ist aber häufig nicht bekannt. Dann müssen die Angehörigen entscheiden. In der Mehrheit der Fälle sprechen sie sich gegen eine Organspende aus.
              <br/>
              <br/>
              Bundesrat und Parlament möchten die Chance von Patientinnen und Patienten erhöhen, ein Organ zu erhalten. Sie wollen darum die Organspende neu regeln.
              <br/>
              <br/>
              Wer seine Organe nicht spenden möchte, muss dies zu Lebzeiten festhalten (Widerspruchslösung). Hat eine Person nicht widersprochen, wird davon ausgegangen, dass sie ihre Organe spenden möchte. Die Angehörigen können eine Organspende aber ablehnen, wenn sie wissen oder vermuten, dass die betroffene Person sich dagegen entschieden hätte. Sind keine Angehörigen erreichbar, dürfen keine Organe entnommen werden.
              <br/>
              <br/>
              Das geänderte Transplantationsgesetz ist ein Gegenvorschlag zur Volksinitiative «Organspende fördern – Leben retten».
            </div>
            <LinkBlock link={"https://www.admin.ch/gov/de/start/dokumentation/abstimmungen/20220515/aenderung-des-transplantationsgesetzes.html"}>
              Mehr Informationen (admin.ch)
            </LinkBlock>
          </Collapse>
          <Link href="./aenderung-des-transplantationsgesetzes/listen">
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