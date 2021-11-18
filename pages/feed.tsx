import * as fs from 'fs';
import * as path from 'path';
import getConfig from 'next/config'
import Head from "next/head";
import Link from 'next/link';
import Audio from '../components/audio';

import styles from '../styles/Home.module.scss';
import headings from "../styles/Typo.module.scss"

import { fetchForm } from '../utils/fetchForm';
import { fetchForms } from '../utils/fetchForms';
import { Recording } from '../models/types';

import React, { useMemo, useState } from 'react';

// ...holds access token
const nextConfig: NextConfig = getConfig()

export interface NextConfig {
  serverRuntimeConfig: { store: { token: string, projectRoot: string }};
  reactStrictMode: boolean;
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    const formIds = await fetchForms(nextConfig)
    for (const formId of formIds) {
      await fetchForm(nextConfig, formId)
    }
  }



  const formMap = new Map<string, Map<string, Recording>>()

  // Read forms file

  // LEVEL 1: FORMS
  const formsData: any = JSON.parse(fs.readFileSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', 'forms.json'), { encoding:'utf8' }));
  const formTitles: string[] = formsData.results.map((result: any): string => {
    return result.title
  })

  // LEVEL 2: FORM = ABSTIMMUNG
  for (const form of formsData.results) {

    const formId = form.form_id;
    const formTitle = form.title;
    const formData: any = JSON.parse(fs.readFileSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, `${formId}.json`), { encoding:'utf8' }));
    const recordingsMap = new Map<string, Recording>();

    // LEVEL 3: QUESTION = EINZELNE FRAGE IN EINEM ABSTIMMUNGSFORM, ZB AUDIO ODER GRUPPE
    for (const question of formData.questions) {
        const questionId = question.question_id
        const questionData: any = JSON.parse(fs.readFileSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, questionId, `${questionId}.json`), { encoding:'utf8' }));

        for (const answer of questionData.results) {
            switch (answer.type) {
                case 'poll':
                    for (const pollAnswer of questionData.results) {
                        recordingsMap.set(pollAnswer.contact_id, { ...recordingsMap.get(pollAnswer.contact_id), tags: pollAnswer.poll_options.map((pollOption: any) => pollOption.content), voting: formTitle })
                    }
                case 'audio':
                    for (const audioAnswer of questionData.results) {
                        if (audioAnswer.media_id) {
                            recordingsMap.set(audioAnswer.contact_id, { ...recordingsMap.get(audioAnswer.contact_id), path: path.join('forms', formId, questionId, `${audioAnswer.media_id}.mp3`), voting: formTitle  })
                        }
                    }
                default:
                    break
            }

            // TODO: Remove from map if the path property is not there
            if (recordingsMap.get(answer.contact_id)?.path === undefined) {
                recordingsMap.delete(answer.contact_id)
            }
        }


    }
    formMap.set(formId, recordingsMap)
  }


  const votings = Array.from(formMap.values())

  let recordings: any[] = []

  for (const voting of votings) {
    recordings = recordings.concat(Array.from(voting.values()))
  }

  return {
    props: { recordings }
  }
}

interface FeedProps {
    recordings: Recording[];
}

export default function Feed({ recordings}: FeedProps) {


    const [selectedVoting, setSelectedVoting] = useState<string | null>('All')

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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={container.pageContainer}>
          <h1 className={headings.headingBig}>Meinungen Ausgeschlossener</h1>
          <select onChange={(event) => setSelectedVoting(event?.target.value)}>
              {Array.from(votingNames.values()).map((votingName) => <option key={votingName}>{votingName}</option>)}
          </select>
          <div>
            {filteredRecordings.map((recording) =>
              recording.path && <Audio key={recording.path} recording={recording}></Audio>
              )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}