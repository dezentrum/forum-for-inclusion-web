import * as fs from 'fs';
import * as path from 'path';
import getConfig from 'next/config'
import Head from "next/head";

import { AudioCaller } from '../components/audio-caller';
import { PageHeading } from '../components/page-heading';
import { RecordHighlightBox } from '../components/record-highlight-box';

import styles from '../assets/styles/Feed.module.scss';
import headings from "../assets/styles/Typo.module.scss"
import container from "../assets/styles/Container.module.scss"

import { Recording } from '../models/types';

import React, { useMemo, useState } from 'react';


// ...holds access token
const nextConfig: NextConfig = getConfig()

export interface NextConfig {
  serverRuntimeConfig: { store: { token: string, projectRoot: string } };
  reactStrictMode: boolean;
}
export async function getStaticProps() {
  // Read forms file

  // LEVEL 1: FORMS
  const formsData: any = JSON.parse(fs.readFileSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', 'forms.json'), { encoding: 'utf8' }));
  const formTitles: string[] = formsData.results.map((result: any): string => {
    return result.title
  })
  const recordings: Recording[] = []

  // LEVEL 2: FORM = ABSTIMMUNG
  for (const form of formsData.results) {
    const formId = form.form_id;
    const formTitle = form.title;
    const formData: any = JSON.parse(fs.readFileSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, `${formId}.json`), { encoding: 'utf8' }));

    // LEVEL 3: QUESTION = EINZELNE FRAGE IN EINEM ABSTIMMUNGSFORM, ZB AUDIO ODER GRUPPE
    for (const question of formData.questions) {
      const questionId = question.question_id

      try {
        console.log('success')
        const mediaFolderContents = fs.readdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, questionId))
        for (const mediaFilePath of mediaFolderContents) {
          recordings.push({ path: path.join('forms', formId, questionId, mediaFilePath), voting: formTitle })
        }
      } catch {

      }
    }

    return {
      props: { recordings }
    }
  }
}

interface FeedProps {
  recordings: Recording[];
}

export default function Feed({ recordings }: FeedProps) {
  console.log('Recordings: ', recordings)

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

  const onChangeRoute = () => {
    // is called when route is about to change
    setShouldDestroyWavesurfer(true)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Forum for Inclusion – Feed</title>
        <meta name="description" content="Forum for Inclusion" />
        <link rel="icon" href="/favicon/favicon-48.png" type="image/png" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/favicon-apple-touch.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
      </Head>

      <main className={styles.main}>
        <div className={container.pageContainer}>
          <PageHeading title="Meinungen Ausgeschlossener"></PageHeading>
          <div className={styles.selectWrap}>
            <select className={styles.select} onChange={(event) => setSelectedVoting(event?.target.value)}>
              {Array.from(votingNames.values()).map((votingName) => <option key={votingName}>{votingName}</option>)}
            </select>
            <span className={styles.selectIcon}></span>
          </div>
          <div className={container.audioFeedContainer}>
            <AudioCaller recordings={filteredRecordings} shouldDestroyWavesurfer={shouldDestroyWavesurfer} />
          </div>
        </div>
        <RecordHighlightBox onChangeRoute={onChangeRoute}></RecordHighlightBox>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}