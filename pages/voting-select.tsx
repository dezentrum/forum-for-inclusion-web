import Head from "next/head";
import Link from 'next/link';

import { PageHeading } from '../components/page-heading';
import { LinkBlock } from '../components/link-block';

import container from "../assets/styles/Container.module.scss"
import typo from "../assets/styles/Typo.module.scss"
import button from "../assets/styles/Button.module.scss"

export default function Home() {
  const testURL = 'https://dezentrum.com/teset'
  return (
    <div>
      <Head>
        <title>Forum for Inclusion</title>
        <meta name="description" content="Forum for Inclusion" />
        <link rel="icon" href="/favicon/favicon-48.png" type="image/png" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/favicon-apple-touch.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
      </Head>
      <main>
        <div className={container.pageContainer}>
          <PageHeading title="Neue Aufnahme"></PageHeading>
          <p>Wozu möchtest du deine Meinung aufnehmen?</p>
          <h3 className={typo.headingSection}>Generelle Statements</h3>
          <LinkBlock link={`/voting/statements/`}>
            <p>Wer sollte am politischen Prozess in der Schweiz mitbestimmen dürfen?</p>
          </LinkBlock>
          <h3 className={typo.headingSection}>Nationale Abstimmungen</h3>
          <LinkBlock link="/voting/aenderung-des-filmgesetzes">
            <p>Änderung vom 1. Oktober 2021 des Bundesgesetzes über Filmproduktion und Filmkultur</p>
          </LinkBlock>
          <LinkBlock link="/voting/aenderung-des-transplantationsgesetzes">
            <p>Änderung vom 1. Oktober 2021 des Bundesgesetzes über die Transplantation von Organen, Geweben und ZeIlen</p>
          </LinkBlock>
          <LinkBlock link="/voting/uebernahme-der-eu-verordnung-ueber-die-europaeische-grenz--und-kuestenwache">
            <p>Bundesbeschluss vom 1. Oktober 2021 über die Genehmigung und die Umsetzung des Notenaustausches zwischen der Schweiz und der EU betreffend die Übernahme der Verordnung (EU) 2019/1896 über die Europäische Grenz- und Küstenwache und zur Aufhebung der Verordnungen (EU) Nr. 1052/2013 und (EU) 2016/1624</p>
          </LinkBlock>
          <h3 className={typo.headingSection}>Kantonale Abstimmungen ZH</h3>
          <LinkBlock link="/voting/aenderung-der-kantonsverfassung-klimaschutz">
            <p>Klimaschutzartikel</p>
          </LinkBlock>
          <LinkBlock link="/voting/aenderung-der-kantonsverfassung-stimm--und-wahlrechtsalter-16">
            <p>Stimm- und Wahlrechtsalter 16</p>
          </LinkBlock>
          <LinkBlock link="/voting/kantonales-buergerrechtsgesetz">
            <p>Kantonales Bürgerrechtsgesetz</p>
          </LinkBlock>
          <LinkBlock link="voting/volksinitiative-fuer-eine-elternzeit">
            <p>Kantonale Volksinitiative «für eine Elternzeit (Elternzeit-Initiative)»</p>
          </LinkBlock>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}