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


// ...holds access token
const nextConfig: NextConfig = getConfig()

export interface NextConfig {
  serverRuntimeConfig: { store: { token: string, projectRoot: string }};
  reactStrictMode: boolean;
}

export async function getStaticProps() {
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
                            recordingsMap.set(audioAnswer.contact_id, { ...recordingsMap.get(audioAnswer.contact_id), path: path.join('/forms', formId, questionId, `${audioAnswer.media_id}.mp3`), voting: formTitle  })
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

    const votingNames = new Set<string>(['Änderung des Schweizerischen Zivilgesetzbuches (Ehe für alle)']);
    recordings.forEach((recording) => votingNames.add(recording.voting ?? ''))

    const filteredRecordings = useMemo(() => {
        if (selectedVoting == 'Änderung des Schweizerischen Zivilgesetzbuches (Ehe für alle)') {
            return recordings.filter(recording => {
              return recording.voting === selectedVoting
            })
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
            <AudioCaller recordings={filteredRecordings} />
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