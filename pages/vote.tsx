import getConfig from 'next/config'
import Head from "next/head";
import styles from "../styles/Vote.module.css";

// ...holds access token
const { serverRuntimeConfig } = getConfig()

interface AudioResponse {
  audioId: string;
  audioUrl: string;
}

interface VoteProps {
  audioResponses: AudioResponse[];
}

export async function getStaticProps() {
  // ...TODO: This form ID should come from somewhere else and should not be hardcoded. I think the easiest way would be if this
  // ...was part of a dynamic route like this: '/votes/[formId].tsx', so the formId is actually in the name of the route and acts 
  // ...as an ID for a specific vote e.g. '/votes/1416f03a-5be9-42a7-a83d-3e29730d2ecb.tsx'
  const formId = '1416f03a-5be9-42a7-a83d-3e29730d2ecb';

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${serverRuntimeConfig.store.token}`);
  
  var requestOptions: RequestInit = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };

  // ...step 1: Get the form for the vote using the formId
  const res = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/forms/${formId}`, requestOptions);
  const data = await res.json();

  const questionIds: string[] = [];

  if (data.questions) {
    // ...step 2: get all questions associated to the form
    for (const question of data.questions) {
      questionIds.push(question['question_id'])
    }
  } else {
    console.error(`WARNING: Form with ID ${formId} does not contain a 'questions' field`)
    return;
  }

  // ...step 3: for each question, get all audio files 
  // ...TODO: At the moment we store all audio responses in the same variable even though they could be from different questions
  let audioResponses = [];

  for (const questionId of questionIds) {
    const res = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/questions/${questionId}/answers`, requestOptions);
    const data = await res.json();

    if (data.results) {
      for (const result of data.results) {
        if (result.type === 'audio') {
          audioResponses.push({audioId: result['media_id'], audioUrl: result['media_url']});
        }
      }
    }
    else {
      console.error(`WARNING: Question with ID ${questionId} does not contain a 'results' field`)
      return;
    }
  }

  // ...TODO: We need to also get non-audio related data such as the title of the question etc.

  // ...let's return all the audio responses to the React component :)
  return {
    props: { audioResponses }
  }
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
            {props.audioResponses.map((audioResponse) => <a href={audioResponse.audioUrl} key={audioResponse.audioId}>{audioResponse.audioId}</a>)}
          </ul>
      </main>
    </div>
  );
}
