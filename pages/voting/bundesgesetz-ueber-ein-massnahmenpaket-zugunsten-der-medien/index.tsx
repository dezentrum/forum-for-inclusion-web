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
          <Collapse heading="Bundesgesetz über ein Massnahmenpaket zugunsten der Medien">
            <div>
              Zeitungen, private Radio- und Fernsehstationen und Online-Medien versorgen die Bevölkerung täglich mit Informationen aus ihrer Region und der Schweiz. Sie tragen zur politischen Meinungsbildung und zum gesellschaftlichen Zusammenhalt bei.
              <br />
              <br />
              Trotz ihrer Bedeutung sind die lokalen und regionalen Medien aber finanziell unter Druck geraten: Werbegelder fliessen vermehrt zu grossen internationalen Internetplattformen. Viele Zeitungen sind verschwunden. Auch die privaten Radio- und Fernsehstationen haben weniger Werbeeinnahmen.
              <br />
              <br />
              Bundesrat und Parlament wollen die lokalen und regionalen Medien stärken. Der Bund vergünstigt seit langem die Zustellung von abonnierten Zeitungen. Diese Vergünstigung wird auf Zeitungen mit grösserer Auflage und auf die Zustellung früh am Morgen ausgedehnt. Zudem werden Online-Medien gefördert, und Lokalradios und das Regionalfernsehen können finanziell stärker unterstützt werden. Bedingung ist, dass sie sich vorwiegend an ein schweizerisches Publikum richten und Themen aus verschiedenen Bereichen der Politik, Wirtschaft und Gesellschaft behandeln.
              <br />
              <br />
              Die Fördermassnahmen werden aus den Einnahmen der bestehenden Radio- und Fernsehabgabe sowie über den Bundeshaushalt finanziert.
            </div>
            <LinkBlock link={"https://www.admin.ch/gov/de/start/dokumentation/abstimmungen/20220213/aenderung-des-bundesgesetzesueber-die-stempelabgaben.html"}>
              Mehr Informationen (admin.ch)
            </LinkBlock>
          </Collapse>
          <Link href="./bundesgesetz-ueber-ein-massnahmenpaket-zugunsten-der-medien/listen">
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