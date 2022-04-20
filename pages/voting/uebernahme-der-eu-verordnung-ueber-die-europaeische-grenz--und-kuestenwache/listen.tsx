import * as fs from 'fs';
import * as path from 'path';
import getConfig from 'next/config'
import Head from "next/head";
import Link from 'next/link';

import { AudioCaller } from '../../../components/audio-caller';
import { PageHeading } from '../../../components/page-heading';
import { RecordHighlightBox } from '../../../components/record-highlight-box';

import styles from '../../../assets/styles/Feed.module.scss';
import headings from "../../../assets/styles/Typo.module.scss"
import container from "../../../assets/styles/Container.module.scss"
import button from "../../../assets/styles/Button.module.scss"

import { Recording } from '../../../models/types';

import React, { useMemo, useState } from 'react';

import getRecordingsFromFS from '../../../utils/getRecordingsFromFS';

// ...holds access token
const nextConfig: NextConfig = getConfig()

export interface NextConfig {
  serverRuntimeConfig: { store: { token: string, projectRoot: string } };
  reactStrictMode: boolean;
}
export async function getStaticProps() {
  const recordings = getRecordingsFromFS(nextConfig.serverRuntimeConfig.store.projectRoot);
  return {
    props: { recordings }
  }
}

interface FeedProps {
  recordings: Recording[];
}

export default function Feed({ recordings }: FeedProps) {
  const [selectedVoting, setSelectedVoting] = useState<string | null>('All')
  const [shouldDestroyWavesurfer, setShouldDestroyWavesurfer] = useState(false)

  const votingNames = new Set<string>(['All']);
  recordings.forEach((recording) => votingNames.add(recording.voting ?? ''))

  const filteredRecordings = useMemo(() => {
    if (selectedVoting !== 'All') {
      return recordings.filter((recording) => recording.voting === selectedVoting)
    } else {
      return recordings
    }
  }, [recordings, selectedVoting])

  return (
    <div className={styles.container}>
      <Head>
        <title>Forum for Inclusion</title>
        <meta name="description" content="Forum for Inclusion" />
        <link rel="icon" href="/favicon/favicon-48.png" type="image/png" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/favicon-apple-touch.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
      </Head>

      <main className={styles.main}>
        <div className={container.pageContainer}>
          <PageHeading title="Zuhören vor Sprechen"></PageHeading>
          <p>Bevor du deine Meinung aufnehmen kannst, musst du mindestens drei Aufnahmen anhören.</p>
          <div className={container.audioFeedContainer }>
            {/* <AudioCaller recordings={filteredRecordings} /> */}
          </div>
          <Link href="./bundesgesetz-ueber-ein-massnahmenpaket-zugunsten-der-medien/out">
            <div className={ button.primaryText }>
              <span>
                Weiter, ich habe mir drei Aufnahmen angehört
              </span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}