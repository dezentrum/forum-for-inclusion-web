import Head from "next/head";
import Link from 'next/link';

import { PageHeading } from '../components/page-heading';
import { LinkBlock } from '../components/link-block';

import container from "../assets/styles/Container.module.scss"
import typo from "../assets/styles/Typo.module.scss"
import button from "../assets/styles/Button.module.scss"

export default function Home() {
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
          <p>Zu welcher Abstimmung möchtest du deine Meinung aufnehmen?</p>
          <LinkBlock link={`/voting/volksinitiative-ja-zum-tier-und-menschenversuchsverbot`}>
            <p>Volksinitiative «Ja zum Tier- und Menschenversuchsverbot»</p>
          </LinkBlock>
          <LinkBlock link={`/voting/volksinitiative-ja-zum-schutz-der-kinder-und-jugendlichen-vor-tabakwerbung`}>
            <p>Volksinitiative «Ja zum Schutz der Kinder und Jugendlichen vor Tabakwerbung»</p>
          </LinkBlock>
          <LinkBlock link={`/voting/aenderung-des-bundesgesetzes-ueber-die-stempelabgaben`}>
            <p>Änderung des Bundesgesetzes über die Stempelabgaben</p>
          </LinkBlock>
          <LinkBlock link={`/voting/bundesgesetz-ueber-ein-massnahmenpaket-zugunsten-der-medien`}>
            <p>Bundesgesetz über ein Massnahmenpaket zugunsten der Medien</p>
          </LinkBlock>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}