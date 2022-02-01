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
          <Collapse heading="Volksinitiative «Ja zum Schutz der Kinder und Jugendlichen vor Tabakwerbung»">
            <div>
              In der Schweiz darf heute mit gewissen Einschränkungen für Tabakprodukte geworben werden. Verboten sind Tabakwerbung in Radio und Fernsehen sowie Werbung, die sich gezielt an Minderjährige richtet. Eine Mehrheit der Kantone hat weitergehende Verbote erlassen, etwa für Tabakwerbung auf Plakaten und im Kino.
              <br />
              <br />
              Die Initiative will Tabakwerbung überall dort verbieten, wo Kinder und Jugendliche sie sehen können, zum Beispiel in der Presse, auf Plakaten, im Internet, im Kino, in Kiosken oder an Veranstaltungen. Für elektronische Zigaretten würden die gleichen Regeln gelten. Erlaubt wäre weiterhin Werbung, die sich nur an Erwachsene richtet oder sich an Orten befindet, zu denen Minderjährige keinen Zugang haben.
              <br />
              <br />
              Bundesrat und Parlament stellen der Initiative mit dem neuen Tabakproduktegesetz einen indirekten Gegenvorschlag gegenüber. Die neuen Bestimmungen würden Werbung für Tabakprodukte und elektronische Zigaretten auf Plakaten und im Kino verbieten. Auch dürften Tabakkonzerne keine Zigaretten mehr gratis abgeben oder internationale Veranstaltungen in der Schweiz sponsern. Das neue Tabakproduktegesetz kann unabhängig vom Ausgang der Abstimmung über die Volksinitiative in Kraft treten.
            </div>
            <LinkBlock link={"https://www.admin.ch/gov/de/start/dokumentation/abstimmungen/20220213/volksinitiative-ja-zum-tier-und-menschenversuchsverbot.html"}>
              Mehr Informationen (admin.ch)
            </LinkBlock>
          </Collapse>
          <Link href="./volksinitiative-ja-zum-schutz-der-kinder-und-jugendlichen-vor-tabakwerbung/listen">
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