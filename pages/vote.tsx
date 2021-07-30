import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

import getConfig from 'next/config'
import Head from "next/head";

import styles from "../styles/Vote.module.css";

// ...holds access token and current directory
const { serverRuntimeConfig } = getConfig()

interface AudioFile {
  id: string;  // ...unique identifier created by Videoask API
  src: string;
}

interface VoteProps {
  audioFiles: AudioFile[];
}

export async function getStaticProps() {
  // ...TODO: This form ID should come from somewhere else and should not be hardcoded. I think the best way would be if this
  // ...was part of a dynamic route like this: '/votes/[formId].tsx', so the formId is actually in the name of the route and acts 
  // ...as an ID for a specific vote e.g. '/votes/71ddf739-b426-4464-8e9b-9b2bf29b18b7.tsx'
  // ...this tutorial is perfect to achieve this: https://nextjs.org/learn/basics/dynamic-routes
  const formId = '71ddf739-b426-4464-8e9b-9b2bf29b18b7';

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${serverRuntimeConfig.store.token}`);
  
  var requestOptions: RequestInit = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };

  // ...step 1: get the form for the vote using the formId
  const res = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/forms/${formId}`, requestOptions);
  const data = await res.json();

  // ...store all question IDs from this from
  const questionIds: string[] = [];

  if (data.questions) {
    for (const question of data.questions) {
      questionIds.push(question['question_id'])
    }
  } else {
    console.error(`WARNING: Form with ID ${formId} does not contain a 'questions' field`)
    return;
  }

  // ...step 2: get the answers to each question associated to the form and make a list of the audio files available from the API
  // ...at the moment we store all audio responses in the same variable even though they could be from different questions in the same form.
  // ...the question here is whether we have multiple audio submissions per form, probably not: this is ok if there's only one.
  const externallyAvailableAudioFiles: AudioFile[] = [];

  for (const questionId of questionIds) {
    const res = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/questions/${questionId}/answers`, requestOptions);
    const data = await res.json();

    if (data.results) {
      for (const result of data.results) {
        if (result.type === 'audio') {
          externallyAvailableAudioFiles.push({id: result['media_id'], src: result['media_url']});
        }
        // ...TODO: We need to also get non-audio related data such as the title of the question etc; this is not implemented yet.
        // ...you would do this by creating a switch statement here: switch (result.type) { case 'audio': processAudioAnswer(result); case 'text': processTextAnswer(result); ... } 
      }
    }
    else {
      console.error(`WARNING: Question with ID ${questionId} does not contain a 'results' field`)
      return;
    }
  }

  // ...step 3: let's save all the audio files that we do not have yet locally to our /public folder
  const localAudioFilesPath = '/audio/';
  const locallyAvailableAudioFilenames = fs.readdirSync(path.join(serverRuntimeConfig.store.projectRoot, 'public', localAudioFilesPath));
    
  const audioFiles: AudioFile[] = []; // ...we will fill this array up with local copies of all externally available audio files and pass it as prop to the React component.

  // ...note that the downloading behaviour in this for loop is sequential, i.e. files get downloaded one after the other. there would be ways of doing this in parallel.
  for (const externallyAvailableAudioFile of externallyAvailableAudioFiles) {
    const filename = `${externallyAvailableAudioFile.id}.mp3`

    if (locallyAvailableAudioFilenames.includes(filename)) {
      // ...case 1: we already have the file locally, we push its ID to audioFiles but with its *local* path
      audioFiles.push({ id: externallyAvailableAudioFile.id, src: path.join(localAudioFilesPath, filename) })
    } else {
      // ...case 2: audio file is not available locally, so we download and then save it with its ID (from Videoask) as the filename
      const downloadStatus = await downloadAudioFile(externallyAvailableAudioFile, localAudioFilesPath, filename)
      if (downloadStatus) { // ...download success
        audioFiles.push({ id: externallyAvailableAudioFile.id, src: path.join(localAudioFilesPath, filename) })
      } else {
        console.error(`ERROR: Audio file could not be downloaded from Videoask API. Err Msg: ${downloadStatus}`)
      }
    }
  }

  // ...let's return all the audio files to the React component :)
  return {
    props: { audioFiles }
  }
}

async function downloadAudioFile(audioFile: AudioFile, localAudioFilesPath: string, filename: string): Promise<boolean> {
  // ...we need to wrap the asynchronous 'downloading' behaviour into a promise, in order to be able to using async / await, which we need in this case to avoid race conditions.
  return new Promise<boolean>((resolve, reject) => {
    https.get(audioFile.src, (res) => {
      const file = fs.createWriteStream(path.join(serverRuntimeConfig.store.projectRoot, 'public', localAudioFilesPath, filename));
      res.pipe(file);
      file.on('finish',() => {
        file.close();
        resolve(true);
      })
      file.on('error', (e) => {
        reject(e);
      })
    });
  })
}

export default function Home(props: VoteProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vote Example Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <h2>All responses to a form</h2>
          <ul>
            {props.audioFiles.map((audioFile: AudioFile) => <a href={audioFile.src} key={audioFile.id}>{audioFile.id}</a>)}
          </ul>
      </main>
    </div>
  );
}
