import * as fs from 'fs';
import * as path from 'path';

import { NextConfig } from "../pages";
import { downloadAudioFile } from './downloadAudioFile';

export async function fetchQuestion(nextConfig: NextConfig, formId: string, questionId: string): Promise<void> {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${nextConfig.serverRuntimeConfig.store.token}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };

  const res = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/questions/${questionId}/answers`, requestOptions);
  const data = await res.json();

  try {
    fs.readdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, questionId))
  } catch {
    fs.mkdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, questionId), )
  }

  const filename = `${questionId}.json`
  fs.writeFileSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, questionId, filename), JSON.stringify(data));

  for (const question of data.results) {
    switch (question.type) {
      case 'audio':
        await downloadAudioFile(nextConfig, formId, questionId, question.media_id, question.media_url)
        break;
      default:
        break;
    }
  }
}